import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IMAGES from '../../assets/images';

interface CategoryCardProps {
  item: {
    id: number;
    name: string;
    icon: string;
  };
}

const CategoryCard = ({ item }: CategoryCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('MagazineProduct', { categoryId: item.id })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={item.icon ? { uri: item.icon } : IMAGES.sport}
          style={styles.categoryImage}
          resizeMode="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
        {imageLoading && (
          <Image
            source={require('../../assets/subcategory/loading.gif')}
            style={{ width: 200, height: 200,  alignItems: "center" ,position:"absolute"}}
          />
        )}
      </View>
      <Text style={styles.categoryName} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#e9ecef',
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
  },
  categoryName: {
    textAlign: 'center',
    padding: 8,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryCard;
