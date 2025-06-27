import React, { useState, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import BannerSlider from '../../components/BannerSlider';
import styles from './style';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import { horizontalScale, verticalScale } from '../../utils/Metrics';
import IMAGES from '../../assets/images';
import HandmadeProducts from '../HomemadeProducts/HandmadeProducts';
import CategorySection from '../CategorySection/CategorySection';
import LatestProduct from './LatestProduct';
import FlashSale from '../FlashSale/FlashSale';
import TopSeller from './TopSeller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_Url } from '../../utils/ApiUrl';
import axios from 'axios';

type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  // Add other fields as needed from your API
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setCartItems([]);
        return;
      }
      const res = await axios.get(Base_Url.getcart, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure res.data is an array, or set to empty array if not
      setCartItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log('Error fetching cart:', err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshHomeData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Use both cart fetch and home refresh on focus
  useFocusEffect(
    useCallback(() => {
      refreshHomeData();
      fetchCart();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/subcategory/loading.gif')}
          style={{ width: 500, height: 500 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingBottom: verticalScale(20) }}>
          {/* Custom Header */}
          <View style={styles.headerContainer}>
            {/* Left Side: Cart with badge and Search */}
            <View style={styles.leftIcons}>
              <TouchableOpacity onPress={() => navigation.navigate('AddtoCart')}>
                <View>
                  <VectorIcon
                    size={28}
                    type="Feather"
                    name="shopping-cart"
                    color="#555"
                  />
                  {cartItems.length > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{cartItems.length}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowSearch((prev) => !prev);
                  if (!showSearch) setSearchQuery('');
                }}
              >
                <VectorIcon
                  size={32}
                  type="Feather"
                  name="search"
                  color="#555"
                  style={{ marginLeft: 18 }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.revistaText}>Revista</Text>
            {/* Right Side: Image */}
            <View style={styles.rightBrand}>
              <Image
                source={IMAGES.icon}
                style={styles.logoImg}
                resizeMode="contain"
              />
            </View>
          </View>

          {showSearch && (
            <View style={styles.searchBarContainer}>
              <VectorIcon
                size={20}
                type="Feather"
                name="search"
                color={COLORS.placeholder || '#888'}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor={COLORS.placeholder || '#888'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>
          )}
          {searchQuery ? (
            <LatestProduct searchQuery={searchQuery} />
          ) : (
            <>
              <BannerSlider />
              <CategorySection />
              <BannerSlider />
              <HandmadeProducts />
              {/* <FlashSale /> */}
              <TopSeller />
              <LatestProduct searchQuery={searchQuery} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
