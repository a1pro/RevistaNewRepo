import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import IMAGES from '../../assets/images';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import {addCartItem} from '../../redux/slice/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {addFavourite, removeFavourite} from '../../redux/slice/favouriteSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {Base_Url} from '../../utils/ApiUrl';
import styles from './style';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const ProductDetails: React.FC<Props> = ({route, navigation}) => {
  const {product} = route.params as any;
  console.log('product api ', product);
  const dispatch = useDispatch<AppDispatch>();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isReviewsModalVisible, setIsReviewsModalVisible] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const favourites = useSelector(
    (state: RootState) => state.favourite.favourites,
  );
  const isFavorite = favourites.some(item => item.id === product.id);

  let imageSource;
  if (
    product.images &&
    product.images.length &&
    product.images[0].startsWith('http')
  ) {
    imageSource = {uri: product.images[0]};
  } else {
    imageSource = IMAGES.perfume1;
  }
  const rating =
    Array.isArray(product.rating) && product.rating.length > 0
      ? Number(product.rating[0].average) || 0
      : 0;
  const reviewsCount = product.reviews_count || 0;

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    setQuantity(q => (type === 'inc' ? q + 1 : q > 1 ? q - 1 : 1));
  };

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setSimilarLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No token found');
          setSimilarLoading(false);
          return;
        }
        const res = await axios.get(
          `https://www.revista-sa.com/api/v4/products/related-products/${product.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('similar product', res.data);
        setSimilarProducts(res.data || []);
      } catch (error) {
        setSimilarProducts([]);
      } finally {
        setSimilarLoading(false);
      }
    };

    if (product?.id) {
      fetchSimilarProducts();
    }
  }, [product?.id]);

  const handleAddToWishlist = async () => {
    try {
      setWishlistLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        setWishlistLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('product_id', product.id.toString());
      const res = await axios.post(Base_Url.addWishlist, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data && res.data.message === 'Successfully added!') {
        dispatch(addFavourite(product));
        Alert.alert(
          'Success',
          res.data.message || 'Product added to wishlist!',
        );
      } else {
        Alert.alert('Error', res.data.message || 'Failed to add to wishlist.');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Error adding to wishlist.',
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      setWishlistLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        setWishlistLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('product_id', product.id.toString());
      const res = await axios.post(Base_Url.wishlistremove, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (
        res.data &&
        (res.data === 'successfully removed!' ||
          res.data.message === 'successfully removed!')
      ) {
        dispatch(removeFavourite({id: product.id}));
        Alert.alert('Removed', 'Product removed from wishlist.');
      } else {
        Alert.alert(
          'Error',
          res.data?.message || 'Failed to remove product from wishlist.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          'Failed to remove product from wishlist.',
      );
    } finally {
      setWishlistLoading(false);
    }
  };
  const handleAddToCart = async () => {
    try {
      setCartLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        setCartLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append('id', product.id.toString());
      formData.append('quantity', quantity.toString());
      const res = await axios.post(Base_Url.addtocart, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data && res.data.message === 'Successfully added!') {
        dispatch(addCartItem({...product, quantity}));
        Alert.alert('Success', res.data.message || 'Product added to cart!');
      } else {
        Alert.alert('Error', res.data.message || 'Failed to add to cart.');
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Error adding to cart.',
      );
    } finally {
      setCartLoading(false);
    }
  };

  const handleToggleFavourite = async () => {
    if (isFavorite) {
      await handleRemoveFromWishlist();
    } else {
      await handleAddToWishlist();
    }
  };

  // Review Modal Handlers
  const openReviewModal = () => {
    setReviewRating(0);
    setReviewComment('');
    setIsReviewModalVisible(true);
  };
  const closeReviewModal = () => setIsReviewModalVisible(false);

  const handleStarPress = (star: number) => {
    setReviewRating(star);
  };

  const submitReview = async () => {
    if (reviewRating === 0 || !reviewComment.trim()) {
      Alert.alert('Validation', 'Please provide a rating and comment.');
      return;
    }
    setSubmittingReview(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        setSubmittingReview(false);
        return;
      }
      const payload = {
        product_id: product.id,
        comment: reviewComment,
        rating: reviewRating,
      };
      const res = await axios.post(
        'https://www.revista-sa.com/api/v4/products/reviews/submit',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (res.data && res.data.message === 'successfully review submitted!') {
        Alert.alert('Thank you!', 'Your review has been submitted.');
        closeReviewModal();
      } else {
        Alert.alert('Error', res.data.message || 'Failed to submit review.');
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Error submitting review.',
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  // Reviews List Modal Handlers
  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const res = await axios.get(
        `https://www.revista-sa.com/api/v4/products/reviews/${product.id}`,
      );
      console.log('get review api data', res.data);
      setReviews(res.data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to load reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  const openReviewsModal = () => {
    fetchReviews();
    setIsReviewsModalVisible(true);
  };
  const closeReviewsModal = () => setIsReviewsModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={localStyles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={localStyles.backButton}>
          <VectorIcon
            size={24}
            type="AntDesign"
            name="left"
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text style={localStyles.headerTitle}>Product Details</Text>
        <View style={localStyles.placeholder} />
      </View>

      <ScrollView>
        <Image
          source={imageSource}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <View style={styles.card}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.row}>
            <VectorIcon
              size={18}
              type="FontAwesome"
              name="star"
              color="#FFD700"
              style={{marginRight: 4}}
            />
            <Text style={styles.ratingText}>
              {reviews.length > 0
                ? (
                    reviews.reduce((acc, review) => acc + review.rating, 0) /
                    reviews.length
                  ).toFixed(1)
                : rating > 0
                ? rating.toFixed(1)
                : 'No rating'}
            </Text>
            <TouchableOpacity onPress={openReviewsModal}>
              <Text
                style={[
                  styles.reviewText,
                  {textDecorationLine: 'underline', color: '#1663F7'},
                ]}>
                ({reviews.length || reviewsCount}{' '}
                {reviews.length === 1 || reviewsCount === 1
                  ? 'review'
                  : 'reviews'}
                )
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={localStyles.reviewBtn}
              onPress={openReviewModal}>
              <Text style={localStyles.reviewBtnText}>Add Review</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>
            {product.unit_price?.toFixed(2)}{' '}
            <Text style={styles.currency}>﷼</Text>
          </Text>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.detailsText}>
            {product.details
              ? product.details.replace(/<[^>]+>/g, '')
              : 'No details available.'}
          </Text>
          <View style={styles.quantityRow}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleQuantityChange('dec')}>
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleQuantityChange('inc')}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Similar Products</Text>
        {similarLoading ? (
          <ActivityIndicator
            size="small"
            color="#1663F7"
            style={{marginVertical: 16}}
          />
        ) : similarProducts.length === 0 ? (
          <Text style={{color: '#888', marginVertical: 8, marginLeft: 30}}>
            No similar product.
          </Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginVertical: 8}}>
            {similarProducts.map((item, idx) => (
              <TouchableOpacity
                key={item.id || idx}
                style={styles.similarCard}
                onPress={() =>
                  navigation.push('ProductDetails', {product: item})
                }>
                <Image
                  source={
                    item.images &&
                    item.images.length &&
                    item.images[0].startsWith('http')
                      ? {uri: item.images[0]}
                      : IMAGES.revista // fallback image
                  }
                  style={styles.similarImage}
                  resizeMode="cover"
                />
                <Text style={styles.similarName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.similarPrice}>
                  {item.unit_price?.toFixed(2)}{' '}
                  <Text style={styles.currency}>﷼</Text>
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={handleToggleFavourite}
          activeOpacity={0.7}
          disabled={wishlistLoading}>
          {wishlistLoading ? (
            <ActivityIndicator size={20} color="red" />
          ) : (
            <VectorIcon
              size={22}
              type="FontAwesome"
              name={isFavorite ? 'heart' : 'heart-o'}
              color={isFavorite ? 'red' : COLORS.black}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={handleAddToCart}
          disabled={cartLoading}>
          {cartLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.cartBtnText}>Add to Cart</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => navigation.navigate('Address')}>
          <Text style={styles.buyBtnText}>Buy now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBarUnderline} />

      {/* Review Submit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isReviewModalVisible}
        onRequestClose={closeReviewModal}>
        <TouchableOpacity
          style={localStyles.modalBackdrop}
          activeOpacity={1}
          onPress={closeReviewModal}
        />
        <View style={localStyles.halfModalContainer}>
          <Text style={localStyles.modalTitle}>Review</Text>
          <Text style={localStyles.orderText}>
            Order #{product.order_number || 'xxxxxxx'}
          </Text>
          <View style={localStyles.starsRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}>
                <VectorIcon
                  size={32}
                  type="FontAwesome"
                  name={reviewRating >= star ? 'star' : 'star-o'}
                  color="#FFD700"
                  style={{marginHorizontal: 2}}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={localStyles.commentInput}
            placeholder="Your comment"
            value={reviewComment}
            onChangeText={setReviewComment}
            multiline
            numberOfLines={4}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={localStyles.submitBtn}
            onPress={submitReview}
            disabled={submittingReview}>
            {submittingReview ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={localStyles.submitBtnText}>Say it!</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Reviews List Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isReviewsModalVisible}
        onRequestClose={closeReviewsModal}>
        <TouchableOpacity
          style={localStyles.modalBackdrop}
          activeOpacity={1}
          onPress={closeReviewsModal}
        />
        <View style={localStyles.halfModalContainer}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <View
              style={{
                width: 40,
                height: 5,
                backgroundColor: '#ccc',
                borderRadius: 2.5,
                marginBottom: 10,
              }}
            />
            <Text style={localStyles.modalTitle}>Product Reviews</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            {reviewsLoading ? (
              <ActivityIndicator
                size="large"
                color="#1663F7"
                style={{marginTop: 40}}
              />
            ) : reviews.length === 0 ? (
              <Text style={{textAlign: 'center', marginTop: 30, color: '#888'}}>
                No reviews yet.
              </Text>
            ) : (
              reviews.map((review, idx) => (
                <View key={review?.id || idx} style={localStyles.reviewCard}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                    <Image
                      source={
                        review?.customer?.image &&
                        review?.customer.image !== 'def.png'
                          ? {uri: review?.customer.image}
                          : IMAGES.profile
                      }
                      style={localStyles.reviewAvatar}
                    />
                    <View style={{marginLeft: 12}}>
                      <Text style={localStyles.reviewName}>
                        {review?.customer?.f_name || ''}{' '}
                        {review?.customer?.l_name || ''}
                      </Text>
                      <Text style={localStyles.reviewEmail}>
                        {review?.customer?.email || ''}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 2,
                    }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <VectorIcon
                        key={star}
                        size={18}
                        type="FontAwesome"
                        name={review?.rating >= star ? 'star' : 'star-o'}
                        color="#FFD700"
                        style={{marginRight: 2}}
                      />
                    ))}
                  </View>
                  <Text style={localStyles.reviewComment}>
                    {review?.comment}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // Same width as back button to center the title
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  halfModalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.55,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  commentInput: {
    width: '100%',
    minHeight: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 18,
    textAlignVertical: 'top',
    fontSize: 15,
    backgroundColor: '#F5F5F5',
  },
  submitBtn: {
    backgroundColor: '#1663F7',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewBtn: {
    marginLeft: 12,
    backgroundColor: '#1663F7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  reviewBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reviewCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  reviewName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  reviewEmail: {
    fontSize: 13,
    color: '#888',
  },
  reviewComment: {
    marginTop: 6,
    fontSize: 15,
    color: '#333',
  },
});

export default ProductDetails;
