import React, { useCallback, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { CustomText } from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import { horizontalScale, verticalScale } from '../../utils/Metrics';
import IMAGES from '../../assets/images';
import styles from './style';
import VectorIcon from '../../components/VectorIcon';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_Url } from '../../utils/ApiUrl';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuth();
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<any>(IMAGES.profile);
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();
  const PROFILE_IMAGE_BASE_URL = 'https://revista-sa.com/storage/app/public/profile/';

  // Define menuItems inside the component to use translations
  const menuItems = [
    { title: t('orders'), screen: 'Order' },
    { title: t('wishlist'), screen: 'WishList' },
    { title: t('language'), screen: 'Language' },
    { title: t('inbox'), screen: 'Inbox' },
    { title: t('saveAddress'), screen: 'SaveAddress' },
    { title: t('termsConditions'), screen: 'Terms' },
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            console.error('No token found');
            return;
          }

          const res = await axios.get(Base_Url.getProfile, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (res.data && res.data.customer) {
            const customer = res.data.customer;
            console.log('Profile data:', res.data.customer);
            setUserData(res.data.customer);
            setUserName(`${customer.f_name || ''} ${customer.l_name || ''}`.trim());
            if (customer.image) {
              setProfileImage({ uri: `${PROFILE_IMAGE_BASE_URL}${customer.image}` });
            } else {
              setProfileImage(IMAGES.profile);
            }
          }
        } catch (error) {
          console.log('Error fetching profile:', error);
        }
      };

      fetchProfile();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert(t('logout'), t('logoutConfirm'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('logout'),
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
              console.error('No token found');
              return;
            }

            // Call logout API
            const response = await axios.post(
              Base_Url.logout,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            if (response.data.message === 'Successfully logged out') {
              await AsyncStorage.removeItem('token');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          } catch (error) {
            console.error('Logout failed:', error);
            Toast.show({
              type: 'error',
              text1: t('error'),
              text2: t('logoutFailed'),
            });
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: { title: string; screen: string } }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (item?.screen) {
          navigation.navigate(item?.screen as any);
        }
      }}>
      <CustomText style={styles.menuItemText} color={COLORS.textColor}>
        {item.title}
      </CustomText>
      <VectorIcon type="AntDesign" name="right" size={22} color="#B0B0B0" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: horizontalScale(10), flex: 1 }}>
        <CustomText
          type="heading"
          color={COLORS.textColor}
          fontWeight="bold"
          style={{ textAlign: 'center', padding: verticalScale(30) }}>
          {t("accountSetting")}
        </CustomText>

        <View style={styles.profileSection}>
          <Image source={profileImage} style={styles.profileImage} />
          <CustomText
            type="heading"
            fontWeight="bold"
            style={styles.userNameText}
            color={COLORS.textColor}>
            {userName}
          </CustomText>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile', { userData: userData })}
          >
            <CustomText
              style={styles.editProfileText}
              color="#fff"
              fontWeight="bold">
              {t("editProfile")}
            </CustomText>
          </TouchableOpacity>
        </View>

        <CustomText
          type="heading"
          style={styles.sectionTitle}
          fontWeight="bold"
          color={COLORS.textColor}>
          {t('personal')}
        </CustomText>

        <View style={styles.menuList}>
          <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.title}_${index}`}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <CustomText style={styles.logoutText} color="#fff" fontWeight="bold">
            {t('logout')}
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
