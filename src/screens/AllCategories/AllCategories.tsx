import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {verticalScale} from '../../utils/Metrics';
import axios from 'axios';
import {Base_Url} from '../../utils/ApiUrl';
import IMAGES from '../../assets/images';

type SubCategory = {
  id: number;
  title: string;
  image: string;
};

export type Category = {
  id: number;
  title: string;
  image: string;
  subCategories: SubCategory[];
};

type Props = NativeStackScreenProps<RootStackParamList, 'AllCategories'>;

const ITEM_WIDTH = Dimensions.get('window').width / 3 - 24;
const DEFAULT_ICON_URL =
  'https://www.revista-sa.com/public/storage/category/def.png';

const AllCategories: React.FC<Props> = ({navigation}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(Base_Url.allcategory);
        const mappedCategories: Category[] = res.data.map((cat: any) => ({
          id: cat.id,
          title: cat.name,
          image: cat.icon || DEFAULT_ICON_URL,
          subCategories: (cat.childes || []).map((sub: any) => ({
            id: sub.id,
            title: sub.name,
            image: sub.icon || DEFAULT_ICON_URL,
          })),
        }));
        setCategories(mappedCategories);
      } catch (error) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const renderItem = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('SubCategories', {category: item})}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        defaultSource={IMAGES.beauty} // Local fallback for iOS
        onError={e => {
          // fallback for Android

          e.currentTarget.setNativeProps({
            src: [{uri: DEFAULT_ICON_URL}],
          });
        }}
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
           <Image
                  source={require('../../assets/subcategory/loading.gif')}
                  style={{ width: 500, height: 500 ,alignSelf:"center"}}
                />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>All Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f9f9f9'},
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: verticalScale(30),
  },
  flatListContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 8,
    borderRadius: 12,
    paddingVertical: 26,
    width: ITEM_WIDTH,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default AllCategories;
