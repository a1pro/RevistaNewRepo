import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base_Url } from '../../utils/ApiUrl';
import IMAGES from '../../assets/images';
import CategoryCard from './CategoryCard'; // Adjust path as needed

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
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
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
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Magzine;
