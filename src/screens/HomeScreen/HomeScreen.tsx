import React, { useState } from 'react';
import {View, SafeAreaView, Image, ScrollView, TextInput} from 'react-native';
import {RootStackParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BannerSlider from '../../components/BannerSlider';
import styles from './style';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import IMAGES from '../../assets/images';
import HandmadeProducts from '../HomemadeProducts/HandmadeProducts';
import CategorySection from '../CategorySection/CategorySection';
import LatestProduct from './LatestProduct';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
                onPress={() => setShowSearch(prev => !prev)}
              />
            </View>
          </View>

          {/* Search Bar */}
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

          {/* Banner slider component */}
          <BannerSlider />
          {/* Handmade Products component */}
          <HandmadeProducts />
          {/* Category component */}
          <CategorySection />
          <LatestProduct />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen