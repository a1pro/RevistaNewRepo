import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import BannerSlider from '../../components/BannerSlider';
import styles from './style';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import { horizontalScale, verticalScale } from '../../utils/Metrics';
import IMAGES from '../../assets/images';
import HandmadeProducts from '../HomemadeProducts/HandmadeProducts';
import CategorySection from '../CategorySection/CategorySection';
import LatestProduct from './LatestProduct';
import FlashSale from '../FlashSale/FlashSale';
import TopSeller from './TopSeller';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const refreshHomeData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useFocusEffect(useCallback(() => {
    refreshHomeData();
  }, [refreshHomeData]));

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Image
        source={require('../../assets/subcategory/loading.gif')}
        style={{ width: 500, height: 500 }}
      />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: horizontalScale(10) }}>
          <View style={styles.header}>
            <VectorIcon
              size={25}
              type="AntDesign"
              name="hearto"
              color={COLORS.black}
              onPress={() => navigation.navigate('WishList')}
            />
            <Image
              source={IMAGES.revista}
              resizeMode="contain"
              style={styles.logoImg}
            />
            <View style={{ flexDirection: 'row', gap: horizontalScale(10) }}>
              <VectorIcon
                size={25}
                type="Feather"
                name="search"
                color={COLORS.black}
                onPress={() => {
                  setShowSearch(prev => !prev);
                  if (!showSearch) setSearchQuery('');
                }}
              />
            </View>
          </View>

          {showSearch && (
            <View style={styles.searchBarContainer}>
              <VectorIcon
                size={20}
                type="Feather"
                name="search"
                color={COLORS.placeholder || '#888'}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor={COLORS.placeholder || '#888'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>
          )}
          {searchQuery ? (
            <LatestProduct searchQuery={searchQuery} />
          ) : (
            <>
              <BannerSlider />
              <HandmadeProducts />
              <FlashSale />
              <TopSeller />
              <LatestProduct searchQuery={searchQuery} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
