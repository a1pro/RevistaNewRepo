import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import VectorIcon from '../../components/VectorIcon';
import {verticalScale} from '../../utils/Metrics';
import COLORS from '../../utils/Colors';
import IMAGES from '../../assets/images';

interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Test',
    price: '400.00 SAR',
    image: IMAGES.handmadeproducts,
  },
  {
    id: '2',
    name: 'Test 1',
    price: '400.00 SAR',
    image: IMAGES.handmadeproducts,
  },
  {
    id: '3',
    name: 'Test 1',
    price: '400.00 SAR',
    image: IMAGES.handmadeproducts,
  },
  {
    id: '4',
    name: 'Test 1',
    price: '400.00 SAR',
    image: IMAGES.handmadeproducts,
  },
  {
    id: '5',
    name: 'Test 1',
    price: '400.00 SAR',
    image: IMAGES.handmadeproducts,
  },
];

const {width} = Dimensions.get('window');

const HandmadeProducts: React.FC = () => {
  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Handmade Products</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <VectorIcon
            size={30}
            type="Ionicons"
            name="arrow-forward-circle"
            color={COLORS.black}
            // onPress={() => navigation.navigate('Register')}
            style={{marginLeft: verticalScale(10)}}
          />
          {/* <Ionicons name="arrow-forward-circle" size={20} color="#007bff" /> */}
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginTop: verticalScale(20),
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#007bff',
    fontSize: 14,
    marginRight: 4,
  },
  itemContainer: {
    width: 100,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});

export default HandmadeProducts;
