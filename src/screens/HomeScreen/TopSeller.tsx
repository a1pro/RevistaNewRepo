import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base_Url } from '../../utils/ApiUrl';
import IMAGES from '../../assets/images';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;
const CARD_HEIGHT = 250;

const BANNER_BASE_URL = 'https://revista-sa.com/storage/app/public/shop/banner/';
const AVATAR_BASE_URL = 'https://revista-sa.com/storage/app/public/seller/';

const TopSeller = () => {
  const [sellers, setSellers] = useState([]);
  const navigation = useNavigation();

  const fetchSellers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const res = await axios.get(Base_Url.topseller, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.data) {
        setSellers(res.data);
      }
    } catch (error) {
      console.log('Error fetching sellers:', error);
    }
  };

  useFocusEffect(
     useCallback(() => {
     fetchSellers();
    }, [])
 )

  const renderSeller = ({ item }) => {
    const bannerSource = item.banner
      ? { uri: `${BANNER_BASE_URL}${item.banner}` }
      : IMAGES.defaultbanner;

    const avatarSource = item.seller?.image
      ? { uri: `${AVATAR_BASE_URL}${item.seller.image}` }
      : IMAGES.profile;
    const shopName = item.name || 'Shop';
    const rating = item.rating ?? 0.0;
    const reviews = item.reviews_count ?? 0;
    const productsCount = item.products_count ?? 0;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>navigation.navigate('SellerDetails', { seller: item })}
      >
        <Image source={bannerSource} style={styles.bannerImage} />
        <View style={styles.avatarContainer}>
          <Image source={avatarSource} style={styles.avatar} />
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.shopName} numberOfLines={1}>{shopName}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>{parseFloat(rating).toFixed(1)}</Text>
            <VectorIcon type="FontAwesome" name="star" size={14} color="#FFA500" style={{ marginLeft: 2 }} />
            <Text style={styles.ratingLabel}> Rating</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statsBox}>
              <Text style={styles.statsNumber}>{reviews}</Text>
              <Text style={styles.statsLabel}>Reviews</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsNumber}>{productsCount}</Text>
              <Text style={styles.statsLabel}>Products</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Top Sellers</Text>
        <TouchableOpacity style={styles.viewAllBtn} onPress={() => navigation.navigate('AllSellerScreen')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sellers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderSeller}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 6, paddingHorizontal: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  viewAllBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  viewAllText: {
    color: COLORS.appColor || '#007bff',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#f7fbff',
    borderRadius: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  bannerImage: {
    width: '100%',
    height: 70,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#e9ecef',
  },
  avatarContainer: {
    position: 'absolute',
    top: 38,
    left: CARD_WIDTH / 2 - 28,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 2,
    elevation: 2,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#e9ecef',
  },
 infoSection: {
    marginTop: 36,
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 100, // Fixed height for info section
    justifyContent: 'space-around', // Distribute space evenly
  },
  shopName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.black,
    marginTop: 8,
    marginBottom: 2,
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  ratingLabel: {
    fontSize: 13,
    color: '#888',
    marginLeft: 3,
  },
 

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 8,
  },

  statsBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsNumber: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 15,
  },
  statsLabel: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
});

export default TopSeller;
