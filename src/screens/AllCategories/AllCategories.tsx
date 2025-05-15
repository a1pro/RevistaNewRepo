import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Category = {
  id: number;
  title: string;
  image: string;
};

const categories: Category[] = [
  {id: 1, title: 'Sun Protection', image: 'https://i.imgur.com/FtLNXIm.png'},
  {id: 2, title: 'Devices', image: 'https://i.imgur.com/Dw9MuZy.png'},
  {id: 3, title: 'Perfumes', image: 'https://i.imgur.com/8fGM9Fb.png'},
  {id: 4, title: 'Oral and Dental', image: 'https://i.imgur.com/COeN2TS.png'},
  {id: 5, title: 'Body Care', image: 'https://i.imgur.com/X1rHJyy.png'},
  {id: 6, title: 'Hand Care', image: 'https://i.imgur.com/3RRee5x.png'},
  {id: 7, title: 'Foot Care', image: 'https://i.imgur.com/ilx45sy.png'},
  {id: 8, title: 'Women’s Care', image: 'https://i.imgur.com/1k2r44a.png'},
  {
    id: 9,
    title: 'Mother and Child care',
    image: 'https://i.imgur.com/Yeh44zk.png',
  },
  {id: 10, title: 'Men’s Care', image: 'https://i.imgur.com/FXuA0uE.png'},
  {id: 11, title: 'Facial Care', image: 'https://i.imgur.com/sq5UCrX.png'},
  {id: 12, title: 'Home Fragrance', image: 'https://i.imgur.com/RM9XLHp.png'},
  {id: 13, title: 'Medicine', image: 'https://i.imgur.com/yAVOXWW.png'},
  {id: 14, title: 'Beauty', image: 'https://i.imgur.com/oA7TD5I.png'},
];
type Props = NativeStackScreenProps<RootStackParamList, 'AllCategories'>;
const AllCategories: React.FC<Props> = () => {
  const renderItem = ({item}: {item: Category}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Icon name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f9f9f9'},
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default AllCategories;
