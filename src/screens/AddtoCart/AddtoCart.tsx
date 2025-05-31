import React, { useState, useCallback } from 'react';
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  // Add other fields as needed
}

const AddtoCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>(
    '26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh City'
  );
  const navigation = useNavigation();
   console.log('id',cartItems)
  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const res = await axios.get(Base_Url.getcart, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(Array.isArray(res.data) ? res.data : []);
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
    console.log('Remove API payload:', {
      id: item?.id,
    });
    const formData = new FormData();
    formData.append('key', String(item?.id));
    const res = await axios.post(Base_Url.cartremove, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
         'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Remove API response:', res.data);
    if (res.data && (res.data === "Successfully removed" || res.data.message === "Successfully removed")) {
      setCartItems(prev => prev.filter(item => item.id !== id));
      Alert.alert('Removed', 'Product removed from cart.');
    } else {
      Alert.alert('Error', res.data?.message || 'Failed to remove product from cart.');
    }
  } catch (err: any) {
    if (err.response) {
      console.log('Error removing cart item:', err.response.data);
      Alert.alert('Error', err.response.data?.message || 'Failed to remove product from cart.');
    } else {
      console.log('Error removing cart item:', err);
      Alert.alert('Error', 'Failed to remove product from cart.');
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
    console.log('Clear Cart API response:', res.data);
    if (
      res.data &&
      (res.data === 'Successfully removed' ||
        res.data.message === 'Successfully removed')
    ) {
      setCartItems([]);
      Alert.alert('Removed', 'Products removed from cart.');
    } else {
      Alert.alert(
        'Error',
        res.data?.message || 'Failed to remove products from cart.'
      );
    }
  } catch (err: any) {
    if (err.response) {
      console.log('Error clear cart item:', err.response.data);
      Alert.alert(
        'Error',
        err.response.data?.message || 'Failed to clear product from cart.'
      );
    } else {
      console.log('Error clear cart item:', err);
      Alert.alert('Error', 'Failed to clear product from cart.');
    }
  } finally {
    setLoading(false);
  }
};

 

  const getTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading)
    return <ActivityIndicator size="large" color={COLORS.appColor} style={{ flex: 1 }} />;

  const renderItem = ({ item }: ListRenderItemInfo<CartItem>) => {
    const imageUri = item.images && item.images.length > 0 ? item.images[0] : undefined;
    return (
      <View style={styles.cartItemRow}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.cartImage} />}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <CustomText numberOfLines={1} style={styles.cartTitle}>
            {item.name}
          </CustomText>
          <CustomText style={styles.cartPrice}>${item.price.toFixed(2)}</CustomText>
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Address Section */}
      <View style={styles.addressContainer}>
        <View style={{ flex: 1 }}>
          <CustomText style={styles.addressLabel}>Shipping Address</CustomText>
          <CustomText style={styles.addressText}>{address}</CustomText>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate?.('Address' as never)}>
          <Icon name="edit" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Total & Checkout */}
      <CustomText style={styles.totalText}>Total: ${getTotal().toFixed(2)}</CustomText>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => Alert.alert('Proceeding to checkout')}>
          <CustomText style={styles.checkoutText}>Checkout</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearCartBtn} onPress={clearCart}>
          <CustomText style={styles.clearCartText}>Clear Cart</CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddtoCart;
