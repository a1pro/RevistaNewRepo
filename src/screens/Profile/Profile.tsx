import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {CustomText} from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import {responsiveFontSize, verticalScale} from '../../utils/Metrics';
import IMAGES from '../../assets/images';
import styles from './style';




type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const menuItems = [
 { title: 'Orders', screen: 'Order' },
  { title: 'Wishlist', screen: 'WishList' },
  { title: 'Language', screen: 'Language' },
  { title: 'Save Address', screen: 'SaveAddress' },
  { title: 'Terms & Conditions', screen: 'Terms' },
];

const Profile: React.FC<Props> = ({navigation}) => {
const renderItem = ({ item }: { item: { title: string; screen: string } }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() => {
      if (item?.screen) {
        navigation.navigate(item?.screen as any);
      }
    }}
  >
    <CustomText style={styles.menuItemText} color={COLORS.textColor}>
      {item.title}
    </CustomText>
    <Icon name="chevron-right" size={24} color="#B0B0B0" />
  </TouchableOpacity>
);

  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        type="heading"
        color={COLORS.textColor}
        fontWeight="bold"
        style={{textAlign:"center",padding:verticalScale(30)}}
      >
        Account Settings
      </CustomText>

      <View style={styles.profileSection}>
        <Image source={IMAGES.profile} style={styles.profileImage} />
        <TouchableOpacity style={styles.editProfileButton} onPress={()=>navigation.navigate('EditProfile')}>
          <CustomText
            style={styles.editProfileText}
            color="#fff"
            fontWeight="bold"
          >
            Edit Profile
          </CustomText>
        </TouchableOpacity>
      </View>

      <CustomText
      type='heading'
        style={styles.sectionTitle}
        fontWeight="bold"
        color={COLORS.textColor}
      >
        Personal
      </CustomText>

      <View style={styles.menuList}>
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={item => item.title}
          scrollEnabled={false}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <CustomText
          style={styles.logoutText}
          color="#fff"
          fontWeight="bold"
        >
          Log Out
        </CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



export default Profile;
