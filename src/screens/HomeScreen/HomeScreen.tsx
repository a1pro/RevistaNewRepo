import React from 'react';
import {View, SafeAreaView, Image, ScrollView} from 'react-native';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: horizontalScale(10),
          }}>
          <View style={styles.header}>
            <VectorIcon
              size={25}
              type="AntDesign"
              name="hearto"
              color={COLORS.black}
              onPress={() => navigation.navigate('Register')}
            />

            <Image
              source={IMAGES.revista}
              resizeMode="contain"
              style={styles.logoImg}
            />

            <View
              style={{
                flexDirection: 'row',

                gap: horizontalScale(10),
              }}>
              <VectorIcon
                size={25}
                type="Feather"
                name="search"
                color={COLORS.black}
                onPress={() => navigation.navigate('Register')}
              />
              <VectorIcon
                size={25}
                type="AntDesign"
                name="shoppingcart"
                color={COLORS.black}
                onPress={() => navigation.navigate('Register')}
              />
              <VectorIcon
                size={25}
                type="AntDesign"
                name="user"
                color={COLORS.black}
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          </View>
          {/* Banner slider component */}
          <BannerSlider />
          {/* Handmade Products component */}
          <HandmadeProducts />

          {/* Category component */}
          <CategorySection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
