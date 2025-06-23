import React, { useEffect, useState } from 'react';
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
import { verticalScale } from '../../utils/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base_Url } from '../../utils/ApiUrl';
import IMAGES from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

interface Product {
  id: number;
  name: string;
  images: string[];
  unit_price: number;
  flash_deal_id?: number;
  discount?: string;
  discount_type?: string;
}

const PRODUCT_IMAGE_MAP: Record<string, any> = {
  'dior': IMAGES.perfume1,
  // Add more static fallbacks for product names if needed
};

const FlashSale: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: false });
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalDuration, setTotalDuration] = useState<number>(0); // For progress bar
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      if (!token) {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: t("noToken"),
        });
        console.error('No token found');
        return;
      }

      const res = await axios.get(Base_Url.flashsale, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.data && res.data.products) {
        const mappedProducts = res.data.products.map((item: any) => ({
          ...item.product,
          flash_deal_id: item.flash_deal_id,
          discount: item.discount,
          discount_type: item.discount_type,
        }));
        setProducts(mappedProducts);
        if (res.data.end_date && res.data.start_date) {
          const end = new Date(res.data.end_date);
          const start = new Date(res.data.start_date);
          setEndDate(end);
          setTotalDuration(end.getTime() - start.getTime());
        }
      }
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!endDate) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }

      const days = Math.floor(diff / (10000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimer({ days, hours, minutes, seconds, ended: false });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(timerId);
  }, [endDate]);

  // Progress bar calculation
  let progressPercent = 0;
  if (endDate && totalDuration > 0) {
    const now = new Date();
    const remaining = endDate.getTime() - now.getTime();
    progressPercent = Math.max(0, Math.min(1, remaining / totalDuration));
  }

  const BASE_IMAGE_URL = 'https://revista-sa.com/storage/app/public/product/';
const renderProduct = ({ item }: { item: Product }) => {
  let imageSource;

  let images: string[] = [];

  // Check if images is a stringified array
  if (item.images && typeof item.images === 'string') {
    try {
      images = JSON.parse(item.images);
    } catch (e) {
      console.warn('Invalid image format:', item.images);
    }
  }

  if (images.length > 0) {
    const firstImage = images[0];
    const isFullUrl = firstImage.startsWith('http');
    imageSource = { uri: isFullUrl ? firstImage : `${BASE_IMAGE_URL}${firstImage}` };
  } else if (item.name && PRODUCT_IMAGE_MAP[item.name.toLowerCase()]) {
    imageSource = PRODUCT_IMAGE_MAP[item.name.toLowerCase()];
  } else {
    imageSource = IMAGES.perfume1;
  }

    return (
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product: item })}>
        <View style={styles.card}>
          <Image
            source={imageSource}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.productPrice}>
            {item.unit_price?.toFixed(2)} <Text style={styles.currency}>﷼</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{t('flashDeal')}</Text>
        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={styles.viewAllText}>{t("seeAll")}</Text>
          <VectorIcon
            size={20}
            type="Ionicons"
            name="arrow-forward"
            color={COLORS.appColor || '#007bff'}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>
      {/* TIMER */}
      <View style={styles.timerContainer}>
        {timer.ended ? (
          <Text style={styles.timerEnded}>{t("saleEnd")}</Text>
        ) : (
          <>
            <View style={styles.timerBoxRow}>
              <View style={styles.timerBox}>
                <Text style={styles.timerValue}>{String(timer.days).padStart(2, '0')}</Text>
                <Text style={styles.timerLabel}>Days</Text>
              </View>
              <Text style={styles.timerColon}>:</Text>
              <View style={styles.timerBox}>
                <Text style={styles.timerValue}>{String(timer.hours).padStart(2, '0')}</Text>
                <Text style={styles.timerLabel}>Hrs</Text>
              </View>
              <Text style={styles.timerColon}>:</Text>
              <View style={styles.timerBox}>
                <Text style={styles.timerValue}>{String(timer.minutes).padStart(2, '0')}</Text>
                <Text style={styles.timerLabel}>Min</Text>
              </View>
              <Text style={styles.timerColon}>:</Text>
              <View style={styles.timerBox}>
                <Text style={styles.timerValue}>{String(timer.seconds).padStart(2, '0')}</Text>
                <Text style={styles.timerLabel}>Sec</Text>
              </View>
            </View>
            {/* Progress Bar */}
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent * 100}%` }
                ]}
              />
            </View>
          </>
        )}
      </View>
      {/* PRODUCTS */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProduct}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
};

const CARD_HEIGHT = 220;
const IMAGE_SIZE = 85;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7fbff',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#888',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  timerBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerBox: {
    backgroundColor: '#aaa',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: 50,
  },
  timerValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  timerLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  timerColon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  timerEnded: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    width: '90%',
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginTop: 8,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 5,
    backgroundColor: COLORS.appColor || '#fff',
    borderRadius: 3,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: COLORS.appColor || '#007bff',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 16,
    paddingBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
  },
  productImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginTop: 12,
    marginBottom: 10,
    zIndex: 1,
  },
  productTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: COLORS.black,
    marginTop: 8,
    textAlign: 'center',
    width: '90%',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.appColor || '#007bff',
    marginTop: 6,
    textAlign: 'center',
  },
  currency: {
    fontWeight: 'normal',
    fontSize: 15,
    color: COLORS.black || '#888',
  },
});

export default FlashSale;
