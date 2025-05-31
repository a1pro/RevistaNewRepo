import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {CustomText} from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import {verticalScale} from '../../utils/Metrics';
import {useDispatch} from 'react-redux';
import {addCartItem} from '../../redux/slice/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Base_Url} from '../../utils/ApiUrl';
import {removeFavourite} from '../../redux/slice/favouriteSlice';
import VectorIcon from '../../components/VectorIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'WishList'>;

interface WishlistItem {
  id: number; // wishlist row id
  product_id: number; // actual product id
  product_full_info: {
    id: number;
    name: string;
    unit_price: number;
    images: string;
    thumbnail: string;
    details?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const WishList: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartLoading, setCartLoading] = useState<number | null>(null);
  const [clearLoading, setClearLoading] = useState(false);

  // Fetch wishlist data from API
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      const response = await axios.get(Base_Url.getWishlist, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch wishlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    try {
      setCartLoading(item.id);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        setCartLoading(null);
        return;
      }
      const formData = new FormData();
      formData.append('id', item.product_full_info.id.toString());
      formData.append('quantity', '1');
      const res = await axios.post(Base_Url.addtocart, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data && res.data.message === 'Successfully added!') {
        Alert.alert('Success', res.data.message || 'Product added to cart!');
        dispatch(
          addCartItem({
            id: item.product_full_info.id.toString(),
            name: item.product_full_info.name,
            price: item.product_full_info.unit_price,
            image: item.product_full_info.thumbnail,
            quantity: 1,
          }),
        );
      } else {
        Alert.alert('Error', res.data.message || 'Failed to add to cart.');
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Error adding to cart.',
      );
    } finally {
      setCartLoading(null);
    }
  };

  const handleRemoveFromWishlist = async (product_id: number) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('product_id', product_id.toString());
      const res = await axios.post(Base_Url.wishlistremove, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      // Accept both possible response formats
      if (
        res.data &&
        (res.data === 'successfully removed!' ||
          res.data.message === 'successfully removed!' ||
          res.data.message === 'Successfully removed')
      ) {
        setWishlistItems(prev =>
          prev.filter(item => item.product_id !== product_id),
        );
        dispatch(removeFavourite({id: product_id}));
        Alert.alert('Removed', 'Product removed from wishlist.');
      } else {
        Alert.alert(
          'Error',
          res.data?.message || 'Failed to remove product from wishlist.',
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          'Failed to remove product from wishlist.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearWishlist = async () => {
    try {
      setClearLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        setClearLoading(false);
        return;
      }
      const res = await axios.post(
        Base_Url.clearWishlist,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (
        res.data &&
        (res.data.message === 'successfully removed!' ||
          res.data.message === 'Successfully removed!')
      ) {
        setWishlistItems([]);
        Alert.alert('Success', 'Wishlist cleared!');
      } else {
        Alert.alert('Error', res.data?.message || 'Failed to clear wishlist.');
      }
    } catch (err: any) {
      console.error('Clear wishlist error:', err);
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'Failed to clear wishlist.',
      );
    } finally {
      setClearLoading(false);
    }
  };

  const getFirstImage = (images: string) => {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0];
      }
    } catch (e) {
      return images; // fallback if parsing fails
    }
    return images;
  };

  const renderItem = ({item}: {item: WishlistItem}) => {
    const imageName = getFirstImage(item.product_full_info.images);
    const imageUrl = imageName
      ? `https://www.revista-sa.com/public/storage/product/${imageName}`
      : `https://www.revista-sa.com/public/storage/product/${item.product_full_info.thumbnail}`;

    return (
      <View style={styles.itemRow}>
        <Image source={{uri: imageUrl}} style={styles.itemImage} />
        <View style={{flex: 1, marginLeft: 10}}>
          <CustomText style={styles.itemName}>
            {item.product_full_info.name}
          </CustomText>
          <CustomText style={styles.itemDesc}>
            {item.product_full_info.details
              ? item.product_full_info.details.replace(/<[^>]*>/g, '')
              : 'No description available'}
          </CustomText>
          <CustomText fontWeight="bold" style={styles.itemPrice}>
            ${item.product_full_info.unit_price?.toFixed(2)}
          </CustomText>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => handleAddToCart(item)}
            disabled={cartLoading === item.id}>
            {cartLoading === item.id ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <CustomText color="#fff" fontWeight="bold" style={{fontSize: 13}}>
                Add to Cart
              </CustomText>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => handleRemoveFromWishlist(item.product_id)}
          disabled={loading}>
          <Icon name="delete" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0066FF" style={{flex: 1}} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomText style={styles.errorText}>{error}</CustomText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <VectorIcon
            type="AntDesign"
            name="left"
            size={24}
            color={COLORS.textColor}
          />
        </TouchableOpacity>

        {/* Header */}
        <CustomText
          type="heading"
          color={COLORS.textColor}
          fontWeight="bold"
          style={styles.header}>
          Wishlist
        </CustomText>

        {/* Wishlist List */}
        <FlatList
          data={wishlistItems}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={renderItem}
          ListEmptyComponent={
            <CustomText style={styles.emptyText}>
              Your wishlist is empty
            </CustomText>
          }
        />

        {/* Clear Wishlist Button */}
        {wishlistItems.length > 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClearWishlist}
            disabled={clearLoading}>
            {clearLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <CustomText color="#fff" fontWeight="bold">
                Clear Wishlist
              </CustomText>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  innerContainer: {flex: 1, paddingHorizontal: 10, paddingTop: 10},
  backButton: {
    position: 'absolute',
    left: 20,
    top: verticalScale(25),
    zIndex: 1,
    padding: 8,
  },
  header: {
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
    marginTop: verticalScale(16),
    marginLeft: 36, // To offset for back button
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    position: 'relative',
  },
  itemImage: {width: 70, height: 70, borderRadius: 8, marginRight: 6},
  itemName: {fontSize: 14, color: COLORS.textColor, marginBottom: 2},
  itemDesc: {fontSize: 12, color: '#888', marginBottom: 4},
  itemPrice: {fontSize: 16, color: COLORS.textColor, marginBottom: 6},
  addToCartBtn: {
    backgroundColor: '#0066FF',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  removeBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 4,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  clearBtn: {
    backgroundColor: '#ff4444',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
});

export default WishList;
