import React, { useState, useEffect } from 'react';
import { 
  FlatList, 
  SafeAreaView, 
  StyleSheet, 
  Image, 
  TextInput 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base_Url } from '../../utils/ApiUrl';
import IMAGES from '../../assets/images';
import CategoryCard from './CategoryCard';

interface MagazineCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  parent_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  home_status: number;
  priority: number | null;
  translations: any[];
}

const Magzine: React.FC = () => {
  const [categories, setCategories] = useState<MagazineCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<MagazineCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }
        const response = await axios.get(
          Base_Url.magzinecategory,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ContentType': 'application/json',
            },
          }
        );
        console.log('Magazine categories data:', response.data);
        setCategories(response.data);
        setFilteredCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery, categories]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../assets/subcategory/loading.gif')}
          style={{ width: 500, height: 500, alignSelf: 'center' }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search categories..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredCategories}
        renderItem={({ item }) => <CategoryCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Magzine;
