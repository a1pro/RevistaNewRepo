import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {CustomText} from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import IMAGES from '../../assets/images';
import styles from './style';
import VectorIcon from '../../components/VectorIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Order'>;

const ORDERS = [
  {
    id: '1',
    image: IMAGES.cream1,
    orderNumber: '#92287157',
    deliveryType: 'Standard Delivery',
    status: 'Delivered',
    itemsCount: 2,
  },
  {
    id: '2',
    image: IMAGES.cream,
    orderNumber: '#92783',
    deliveryType: 'Standard Delivery',
    status: 'Delivered',
    itemsCount: 1,
  },
  {
    id: '3',
    image: IMAGES.cream2,
    orderNumber: '#378246',
    deliveryType: 'Standard Delivery',
    status: 'Delivered',
    itemsCount: 5,
  },
];

const Order: React.FC<Props> = ({navigation}) => {
  const renderOrder = ({item}: {item: (typeof ORDERS)[0]}) => (
    <View style={styles.orderCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={{flex: 1, marginLeft: 8}}>
        <CustomText style={styles.orderNumber}>
          Order {item.orderNumber}
        </CustomText>
        <CustomText style={styles.deliveryType}>{item.deliveryType}</CustomText>
        <View style={styles.statusRow}>
          <CustomText style={styles.statusDelivered}>Delivered</CustomText>
          <Icon
            name="check-circle"
            size={18}
            color="#2676FD"
            style={{marginLeft: 4}}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: 80,
        }}>
        <CustomText style={styles.itemsCount}>
          {item.itemsCount} items
        </CustomText>
        <TouchableOpacity style={styles.reviewBtn}>
          <CustomText style={styles.reviewBtnText}>Review</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Header Row */}
        <View style={styles.headerRow}>
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
          <CustomText
            type="heading"
            color={COLORS.textColor}
            fontWeight="bold"
            style={styles.headerText}>
            My Orders
          </CustomText>
        </View>
        <FlatList
          data={ORDERS}
          keyExtractor={item => item.id}
          renderItem={renderOrder}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Order;
