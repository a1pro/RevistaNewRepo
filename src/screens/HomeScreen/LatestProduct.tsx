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
import { verticalScale } from '../../utils/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base_Url } from '../../utils/ApiUrl';
import IMAGES from '../../assets/images';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

interface Product {
  id: number;
  name: string;
  images: string[];
  unit_price: number;
}

const PRODUCT_IMAGE_MAP: Record<string, any> = {
  'dior': IMAGES.perfume1,
};

interface LatestProductProps {
  searchQuery?: string;
}

const LatestProduct: React.FC<LatestProductProps> = ({ searchQuery = '' }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigation = useNavigation();
   const { t } = useTranslation();

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const res = await axios.get(Base_Url.latestpro, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.data && res.data.products) {
        setAllProducts(res.data.products);
        filterProducts(res.data.products, searchQuery);
      }
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const filterProducts = (products: Product[], query: string) => {
    if (!query) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts(allProducts, searchQuery);
  }, [searchQuery, allProducts]);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const renderProduct = ({ item }: { item: Product }) => {
    let imageSource;
    if (item.images && item.images.length && item.images[0].startsWith('http')) {
      imageSource = { uri: item.images[0] };
    } else if (PRODUCT_IMAGE_MAP[item.name.toLowerCase()]) {
      imageSource = PRODUCT_IMAGE_MAP[item.name.toLowerCase()];
    } else {
      imageSource = IMAGES.perfume1; // fallback
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
        <Text style={styles.headerTitle}>{t("latestProducts")}</Text>
        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={styles.viewAllText}>{t('seeAll')}</Text>
          <VectorIcon
            size={20}
            type="Ionicons"
            name="arrow-forward"
            color={COLORS.appColor || '#007bff'}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        numColumns={2}
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
    marginBottom:20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
  },
  bgSwirl: {
    position: 'absolute',
    width: '100%',
    height: '60%',
    top: 0,
    left: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 0,
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

export default LatestProduct;
