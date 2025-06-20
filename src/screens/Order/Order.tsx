import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { CustomText } from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import IMAGES from '../../assets/images';
import styles from './style';
import VectorIcon from '../../components/VectorIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Order'>;
const getDefaultImage = (index: number) => {
  const images = [IMAGES.cream1, IMAGES.cream, IMAGES.cream2];
  return images[index % images.length];
};

const Order: React.FC<Props> = ({ navigation }) => {
 
  const orders = useSelector((state: RootState) => state.orders.orders);
  console.log('Orders:', orders);

const BASE_IMAGE_URL = 'https://www.revista-sa.com/storage/app/public/product/thumbnail/';

const renderOrder = ({ item, index }: { item: any; index: number }) => {
  const firstProduct = item.items[0];
  const firstImage = firstProduct.thumbnail;

  return (
    <SafeAreaView>
    <View style={styles.orderCard}>
      <Image
        source={firstImage ? { uri: `${BASE_IMAGE_URL}${firstImage}` } : getDefaultImage(index)}
        style={styles.productImage}
      />
      <View style={{ flex: 1, marginLeft: 8 }}>
        <CustomText style={styles.orderNumber}>
          Order #{item.timestamp.slice(0, 8).replace(/-/g, '')}
        </CustomText>
        <CustomText style={styles.deliveryType}>Standard Delivery</CustomText>
        <CustomText style={{ fontSize: 14, color: '#555' }}>
          {firstProduct.name}
        </CustomText>
        <View style={styles.statusRow}>
          <CustomText style={styles.statusDelivered}>Delivered</CustomText>
          <Icon
            name="check-circle"
            size={18}
            color="#2676FD"
            style={{ marginLeft: 4 }}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: 80,
        }}
      >
        <CustomText style={styles.itemsCount}>
          {item.items.length} items
        </CustomText>
        <TouchableOpacity style={styles.reviewBtn}>
          <CustomText style={styles.reviewBtnText}>Review</CustomText>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <VectorIcon
              type="AntDesign"
              name="left"
              size={24}
              color={COLORS.textColor}
            />
          </TouchableOpacity>
          <CustomText
            type="heading"
            color={COLORS.textColor}
            fontWeight="bold"
            style={styles.headerText}
          >
            My Orders
          </CustomText>
        </View>
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Order;
