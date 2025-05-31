import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import styles from './style';
import IMAGES from '../../assets/images';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import { verticalScale } from '../../utils/Metrics';

const {width} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const PRODUCTS = [
  {
    id: '1',
    name: 'Sun Screen Lotion',
    image:IMAGES.cream1,
    price: 17,
  },
  {
    id: '2',
    name: 'Moisturizer SPF',
    image: IMAGES.cream2,
    price: 17,
  },
  {
    id: '3',
    name: 'Lakme Sun Expert',
    image: IMAGES.cream,
    price: 17,
  },
  {
    id: '4',
    name: 'Sun Screen Lotion',
    image:IMAGES.cream1,
    price: 17,
  },
  {
    id: '5',
    name: 'Moisturizer SPF',
    image: IMAGES.cream2,
    price: 17,
  },
  {
    id: '6',
    name: 'Lakme Sun Expert',
    image: IMAGES.cream,
    price: 17,
  },
   {
    id: '7',
    name: 'Sun Screen Lotion',
    image:IMAGES.cream1,
    price: 17,
  },
  {
    id: '8',
    name: 'Moisturizer SPF',
    image: IMAGES.cream2,
    price: 17,
  },
];

const Details: React.FC<Props> = ({navigation}) => {
  const renderProduct = ({item}: any) => (
<TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <VectorIcon
                    size={30}
                    type="AntDesign"
                    name="left"
                    color={COLORS.black}
                    style={{marginRight:verticalScale(30)}}
                  />
                  </TouchableOpacity>
        <Text style={styles.headerTitle}>Sun Protection</Text>
      </View>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Details;
