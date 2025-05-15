import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Base_Url} from '../utils/ApiUrl';

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
        console.log('API Banner Images', res.data);
        setBannerImages(res.data);
      } else {
        console.log('Empty or invalid banner data, using default images');
        setBannerImages([]);
      }
    } catch (error) {
      console.log('BannerApi Error:', error);
      setBannerImages([]);
    }
  };

  useEffect(() => {
    BannerApi();
  }, []);

  // Final images to be displayed
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
            // For API image (URL)
            <Image
              source={{uri: item}}
              style={styles.image}
              resizeMode="cover"
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
