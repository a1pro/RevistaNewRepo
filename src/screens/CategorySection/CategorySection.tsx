import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import axios from 'axios';
import { Base_Url } from '../../utils/ApiUrl';
import IMAGES from '../../assets/images';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

type SubCategory = {
  id: number;
  title: string;
  image: string;
};

export type Category = {
  id: number;
  title: string;
  image: string;
  price: string; // Add price field
  subCategories: SubCategory[];
};

type Props = NativeStackScreenProps<RootStackParamList, 'AllCategories'>;

const DEFAULT_ICON_URL = 'https://www.revista-sa.com/public/storage/category/def.png';

const CategorySection: React.FC<Props> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation=useNavigation()

  
    const fetchCategories = async () => {
      try {
        const res = await axios.get(Base_Url.allcategory);
        const mappedCategories: Category[] = res.data.map((cat: any) => ({
          id: cat.id,
          title: cat.name,
          image: cat.icon || DEFAULT_ICON_URL,
          price: cat.price || '400.00 SAR', // Use actual price if available
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
 


    useFocusEffect(
      useCallback(() => {
        fetchCategories();
      }, [])
    );
  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('SubCategories', { category: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        defaultSource={IMAGES.beauty}
        onError={e => {
          e.currentTarget.setNativeProps({
            src: [{ uri: DEFAULT_ICON_URL }],
          });
        }}
      />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  
  const firstRow = categories.slice(0, 7);
  const secondRow = categories.slice(7, 14);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Categories</Text>
        <TouchableOpacity style={styles.seeAllRow} onPress={()=>navigation.navigate("AllCategories")}>
          <Text style={styles.seeAll}>See All</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={firstRow}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      <FlatList
        data={secondRow}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', paddingVertical: 12 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 4,
  },
  arrow: {
    fontSize: 18,
    color: '#007AFF',
  },
  flatListContent: {
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    width: 90,
    paddingVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#eee',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
  },
  price: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});

export default CategorySection;
