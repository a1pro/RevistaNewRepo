import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Base_Url} from '../utils/ApiUrl';
import { useFocusEffect } from '@react-navigation/native';

const {width} = Dimensions.get('window');

// Default fallback images
const defaultImages = [
  require('../assets/images/sliderImage.png'),
  require('../assets/images/sliderImage.png'),
  require('../assets/images/sliderImage.png'),
];

const BannerSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bannerImages, setBannerImages] = useState<any[]>([]);

  const BannerApi = async () => {
    try {
      const res = await axios.get(Base_Url.banner, {
        params: {
          banner_type: 'all',
        },
      });

      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        // Map to just the photo URLs
        const images = res.data.map(item => item.photo);
        setBannerImages(images);
      } else {
        console.log('Empty or invalid banner data, using default images');
        setBannerImages([]);
      }
    } catch (error) {
      console.log('BannerApi Error:', error);
      setBannerImages([]);
    }
  };

useFocusEffect(
  useCallback(() => {
    BannerApi();
  }, [])
);
  const imagesToDisplay =
    bannerImages.length > 0 ? bannerImages : defaultImages;

  return (
    <View>
      <Carousel
        loop
        autoPlay
        data={imagesToDisplay}
        width={width}
        height={150}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={({item}) =>
          typeof item === 'string' ? (
            <Image
              source={{uri: item}}
              style={styles.image}
              resizeMode="stretch"
            />
          ) : (
            // For local image
            <Image source={item} style={styles.image} resizeMode="cover" />
          )
        }
        pagingEnabled
      />
      {/* Custom Pagination Dots */}
      <View style={styles.paginationContainer}>
        {imagesToDisplay.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '95%',
    height: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    marginRight: 20,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});

export default BannerSlider;
