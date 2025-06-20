import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Order, OrderItem } from '../../types';
import { addOrder } from '../../redux/slice/ordersSlice';
import COLORS from '../../utils/Colors';
import VectorIcon from '../../components/VectorIcon';
import { Base_Url } from '../../utils/ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
type RootStackParamList = {
  CheckoutScreen: { cartItems: OrderItem[]; total: number; address?: string };
  Address: undefined;
};

type CheckoutRouteProp = RouteProp<RootStackParamList, 'CheckoutScreen'>;

const CheckoutScreen: React.FC = () => {
  const { params } = useRoute<CheckoutRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const calculateTotals = () => {
    let subTotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;
    let totalShipping = 0;

    params.cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subTotal += itemTotal;
      let discountAmount = 0;
      if (item.discount_type === 'flat') {
        discountAmount = item.discount * item.quantity;
      } else if (item.discount_type === 'percent') {
        discountAmount = (item.price * item.discount / 100) * item.quantity;
      }
      totalDiscount += discountAmount;
      let taxAmount = (item.tax / 100) * item.price * item.quantity;
      totalTax += taxAmount;
      totalShipping += item.shipping_cost;
    });

    const total = subTotal + totalTax + totalShipping - totalDiscount;

    return { subTotal, totalDiscount, totalTax, totalShipping, total };
  };

  const { subTotal, totalDiscount, totalTax, totalShipping, total } = calculateTotals();

  useEffect(() => {
    console.log('cartItems:', params.cartItems);
    if (params.address) {
      console.log('Address:', params.address);
    }
  }, [params]);




const handleCheckout = async () => {
  if (!selectedPaymentMethod) {
    Toast.show({
      type: 'error',
      text1: 'Select Payment Method',
      text2: 'Please select a payment method to proceed.',
    });
    return;
  }

  const orderDetails: Order = {
    items: params.cartItems,
    total,
    timestamp: new Date().toISOString(),
    address: params.address,
    paymentMethod: selectedPaymentMethod,
  };
  dispatch(addOrder(orderDetails));

  Toast.show({
    type: 'success',
    text1: 'Successful',
    text2: 'Your order has been placed.',
  });

  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');
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
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Products removed from cart.',
      });
      navigation.navigate('Dashboard');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: res.data?.message || 'Failed to remove products from cart.',
      });
    }
  } catch (err: any) {
    if (err.response) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.response.data?.message || 'Failed to clear product from cart.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to clear product from cart.',
      });
    }
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f5f8' }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <VectorIcon size={24} type="AntDesign" name="left" color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.summaryBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Sub total</Text>
            <Text style={styles.value}>{subTotal.toFixed(2)} ﷼</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tax</Text>
            <Text style={styles.value}>{totalTax.toFixed(2)} ﷼</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.value}>{totalShipping.toFixed(2)} ﷼</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Discount</Text>
            <Text style={styles.value}>- {totalDiscount.toFixed(2)} ﷼</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, styles.totalLabel]}>Total</Text>
            <Text style={[styles.value, styles.totalValue]}>{total.toFixed(2)} ﷼</Text>
          </View>
        </View>

        <Text style={styles.paymentTitle}>Select A Payment Method To Proceed</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[styles.paymentOption, selectedPaymentMethod === 'cod' && styles.selectedPayment]}
            onPress={() => setSelectedPaymentMethod('cod')}
          >
            <MaterialCommunityIcons name="cash" size={20} color="#333" />
            <Text style={styles.paymentText}> Cash On Delivery</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresRow}>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="truck-fast" size={28} color="#4caf50" />
            <Text style={styles.featureText}>Fast Delivery all across the country</Text>
          </View>
          <View style={styles.feature}>
            <FontAwesome5 name="shield-alt" size={28} color="#2196f3" />
            <Text style={styles.featureText}>Safe Payment</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="refresh-circle" size={28} color="#ff9800" />
            <Text style={styles.featureText}>7 Days Return Policy</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="certificate" size={28} color="#9c27b0" />
            <Text style={styles.featureText}>100% Authentic Products</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>Place Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.continueBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flexGrow: 1 },
  summaryBox: {
    backgroundColor: '#f8faff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  label: { fontSize: 16, color: '#333' },
  value: { fontSize: 16, color: '#222' },
  totalLabel: { fontWeight: 'bold', fontSize: 18 },
  totalValue: { fontWeight: 'bold', fontSize: 18, color: '#4caf50' },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  couponBtn: {
    marginLeft: 8,
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  couponBtnText: { color: '#333', fontWeight: 'bold' },
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
    shadowOffset: { width: 0, height: 2 },
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
    width: 40,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  selectedPayment: {
    borderColor: '#4caf50',
    backgroundColor: '#e0f2f1',
  },
  paymentText: { fontSize: 14, color: '#333' },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  feature: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: { fontSize: 13, color: '#555', flex: 1, marginLeft: 8 },
  checkoutBtn: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  continueBtn: { alignItems: 'center', padding: 12 },
  continueBtnText: { color: '#4caf50', fontSize: 15 },
});

export default CheckoutScreen;
function setCartItems(arg0: never[]) {
  throw new Error('Function not implemented.');
}

