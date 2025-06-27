import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ListRenderItemInfo,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CustomText } from '../../components/CustomText';
import styles from './style';
import { Base_Url } from '../../utils/ApiUrl';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import COLORS from '../../utils/Colors';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  thumbnail?: string;
}

interface Address {
  id: number;
  customer_id: string;
  is_guest: boolean;
  contact_person_name: string;
  email: string | null;
  address_type: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  created_at: string;
  updated_at: string;
  state: string | null;
  country: string;
  latitude: string;
  longitude: string;
  is_billing: boolean;
}

const AddtoCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();
  const navigation = useNavigation();

  // Fetch cart items
  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const res = await axios.get(Base_Url.getcart, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(Array.isArray(res.data) ? res.data : []);
      console.log("datta cart",res.data)
    } catch (err) {
      console.log('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      setError('');
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('No token found. Please login again.');
          setAddresses([]);
          setLoading(false);
          return;
        }
        const res = await axios.get(Base_Url.getAddress, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError('Failed to fetch addresses. Please try again.');
        setAddresses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const updateQuantity = (id: number, type: 'increment' | 'decrement') => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
            ...item,
            quantity:
              type === 'increment'
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
          : item
      )
    );
  };

  const removeItem = async (id: number) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const item = cartItems.find(i => i.id === id);
      const formData = new FormData();
      formData.append('key', String(item?.id));
      const res = await axios.post(Base_Url.cartremove, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data && (res.data === "Successfully removed" || res.data.message === "Successfully removed")) {
        setCartItems(prev => prev.filter(item => item.id !== id));
        Toast.show({
          type: 'success',
          text1: t('success'),
          text2: t('productRemoved'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: res.data?.message ||t("failedproductRemoved"),
        });
      }
    } catch (err: any) {
      if (err.response) {
        Toast.show({
          type: 'error',
          text1:t("error"),
          text2: err.response.data?.message || t("failedproductRemoved"),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: t("failedproductRemoved"),
        });

      }
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const res = await axios.post(
        Base_Url.clearCart,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (
        res.data &&
        (res.data === 'Successfully removed' ||
          res.data.message === 'Successfully removed')
      ) {
        setCartItems([]);
        Toast.show({
          type: 'success',
          text1: t('success'),
          text2: t("productRemoved"),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t("error"),
          text2: res.data?.message || t("failedproductRemoved"),
        });
      }
    } catch (err: any) {
      if (err.response) {
        Toast.show({
          type: 'error',
          text1: t("error"),
          text2: err.response.data?.message || t("failedproductRemoved"),
        });
       
      } else {
        Toast.show({
          type: 'error',
          text1: t("error"),
          text2: t("failedproductRemoved"),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const shippingAddress = addresses.find(addr => addr.address_type === 'Home');

  const renderItem = ({ item }: ListRenderItemInfo<CartItem>) => {
    const thumbnailUri = item.thumbnail
      ? `https://www.revista-sa.com/storage/app/public/product/thumbnail/${item.thumbnail}`
      : item.images && item.images.length > 0
        ? item.images[0]
        : undefined;
    return (
      <View style={styles.cartItemRow}>
        {thumbnailUri && <Image source={{ uri: thumbnailUri }} style={styles.cartImage} />}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <CustomText numberOfLines={1} style={styles.cartTitle}>
            {item.name}
          </CustomText>
          <CustomText style={styles.cartPrice}>﷼{item.price.toFixed(2)}</CustomText>
        </View>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrement')} style={styles.qtyBtn}>
            <CustomText style={styles.qtySymbol}>−</CustomText>
          </TouchableOpacity>
          <CustomText style={styles.qtyText}>{item.quantity}</CustomText>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'increment')} style={styles.qtyBtn}>
            <CustomText style={styles.qtySymbol}>+</CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => removeItem(item.id)}
        >
          <Icon name="delete" size={22} color="#ff4444" />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading)
    return  <Image
            source={require('../../assets/subcategory/loading.gif')}
            style={{ width: 500, height: 500 ,alignSelf:"center"}}
          />;

  return (
    <SafeAreaView style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <CustomText style={styles.emptyCartText}>
            {t("noProduct")}
          </CustomText>
        </View>
      ) : (
        <>
          {/* Shipping Address Section */}
          <View style={styles.addressContainer}>
            <View style={{ flex: 1 }}>
              <CustomText style={styles.addressLabel}>{t("shippingAddress")}</CustomText>
              {shippingAddress ? (
                <CustomText style={styles.addressText}>
                  {shippingAddress.contact_person_name}{"\n"}
                  {shippingAddress.address}, {shippingAddress.city}{"\n"}
                  {shippingAddress.zip}
                </CustomText>
              ) : (
                <CustomText style={styles.addressText}>{t("noHomeAddress")}</CustomText>
              )}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate?.('Address' as never)}>
              <Icon name="edit" size={20} color="#007bff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
          <CustomText style={styles.totalText}>{t("total")}: ﷼{getTotal().toFixed(2)}</CustomText>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() =>
                navigation.navigate('CheckoutScreen', {
                  cartItems,
                  total: getTotal(),
                  address: shippingAddress, 
                })
              }
            >
              <CustomText style={styles.checkoutText}>{t('checkout')}</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearCartBtn}
              onPress={clearCart}
            >
              <CustomText style={styles.clearCartText}>{t('clearCart')}</CustomText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default AddtoCart;
