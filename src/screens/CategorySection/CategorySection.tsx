import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import {verticalScale} from '../../utils/Metrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Base_Url} from '../../utils/ApiUrl';

interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found !');
        return;
      }

      const res = await axios.get(Base_Url.categories, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.data) {
        console.log('Category Data', res.data);
        setCategories(res.data);
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategory = ({item}: {item: Category}) => (
    <View style={styles.categoryBox}>
      <View style={styles.imageGrid}>
        <Image
          source={{uri: item.icon}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.categoryText}>{item.name}</Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{item.count}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <VectorIcon
            size={30}
            type="Ionicons"
            name="arrow-forward-circle"
            color={COLORS.black}
            style={{marginLeft: verticalScale(10)}}
          />
        </TouchableOpacity>
      </View>

      {/* Grid List */}
      <View>
        <FlatList
          data={categories.slice(0, 2)}
          keyExtractor={item => item.id}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 12}}
        />
        <FlatList
          data={categories.slice(2)}
          keyExtractor={item => item.id}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const IMAGE_SIZE = 75;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: verticalScale(20),
  },
  header: {
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
    marginRight: 4,
  },
  categoryBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginRight: 12,
    padding: 10,
    width: 180,
  },
  imageGrid: {
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 14,
  },
  countPill: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CategorySection;
