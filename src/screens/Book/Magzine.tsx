import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base_Url } from '../../utils/ApiUrl';
import IMAGES from '../../assets/images';

const staticImages = [
  require('../../assets/subcategory/perfume2.jpg'),
  require('../../assets/images/cream1.png'),
  require('../../assets/subcategory/face3.jpg'),
  require('../../assets/subcategory/body5.jpg'),
  require('../../assets/subcategory/face4.jpg'),
  require('../../assets/images/cream1.png'),
];

const Magzine = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;
        const response = await axios.get(Base_Url.magzinecategory, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCategories(response.data);
        setFilteredCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategoryId(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategoryId) return;
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;
        const response = await axios.get(
          `${Base_Url.magzineproduct}?category_id=${selectedCategoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [selectedCategoryId]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
      if (filtered.length > 0) {
        setSelectedCategoryId(filtered[0].id);
      } else {
        setSelectedCategoryId(null);
      }
    }
  }, [searchQuery, categories]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../assets/subcategory/loading.gif')}
          style={styles.loadingImage}
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
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filteredCategories}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.categoryScroll}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategoryId === item.id && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategoryId(item.id)}
          >
            <Text style={styles.categoryButtonText} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {loadingProducts ? (
        <Image
          source={require('../../assets/subcategory/loading.gif')}
          style={styles.loadingImageSmall}
        />
      ) : products.length === 0 ? (
        <FlatList
          data={staticImages}
          renderItem={({ item, index }) => (
            <View style={styles.productCard}>
              <Image
                source={item}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image
                source={item.thumbnail ? { uri: item.thumbnail } : IMAGES.sport}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex: 1 instead of height: "100%"
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    height: 40, // Use fixed height for predictability
  },
  categoryScroll: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 60, // Fixed height for the horizontal FlatList
  },
  categoryButton: {
    backgroundColor: '#4d574d',
    borderRadius: 12,
    height: 36,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#333',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingVertical: 10,
    // Do not set height here! Let FlatList determine its own height.
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
  },
  productImage: {
    width: 180,
    height: 180,
    marginBottom: 10,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#e9ecef',
    alignSelf: 'center',
  },
  loadingImage: {
    width: 220,
    height: 220,
    alignSelf: 'center',
  },
  loadingImageSmall: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});

export default Magzine;
