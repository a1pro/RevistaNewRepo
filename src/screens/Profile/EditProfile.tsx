import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import IMAGES from '../../assets/images';
import { CustomText } from '../../components/CustomText';
import CustomInput from '../../components/CustomInput';
import COLORS from '../../utils/Colors';
import { horizontalScale, verticalScale } from '../../utils/Metrics';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import VectorIcon from '../../components/VectorIcon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_Url } from '../../utils/ApiUrl';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
// Replace with your actual storage base URL
const STORAGE_BASE_URL = 'https://revista-sa.com/storage/app/public/profile/';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile: React.FC<Props> = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<any>(IMAGES.profile);
  const [imageAsset, setImageAsset] = useState<Asset | null>(null); // To keep the picked image asset
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
 const { t } = useTranslation();
  useEffect(() => {
    if (route.params?.userData) {
      const user = route.params.userData;
      setName(user.f_name || '');
      setLastName(user.l_name || '');
      setPhoneNumber(user.phone || '');
      setEmail(user.email || '');
      if (user.image) {
        setProfileImage({ uri: `${STORAGE_BASE_URL}${user.image}` });
      }
    }
  }, [route.params]);

  const handleImagePick = (type: 'camera' | 'gallery') => {
    setModalVisible(false);
    const options = {
      mediaType: 'photo' as const,
      quality: 0.7,
    };

    const callback = (response: ImagePickerResponse) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage({ uri: response.assets[0].uri });
        setImageAsset(response.assets[0]);
      }
    };

    if (type === 'camera') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: t("noToken"),
        });
        setLoading(false);
        return;
      }

      // Use FormData for image upload
      const formData = new FormData();
      formData.append('f_name', name);
      formData.append('l_name', lastName);
      formData.append('phone', phoneNumber);
      if (password) formData.append('password', password);

      // Only append image if a new one was picked
      if (imageAsset && imageAsset.uri) {
        // Get file name and type
        const uriParts = imageAsset.fileName
          ? imageAsset.fileName.split('.')
          : ['profile', 'jpg'];
        const fileType = imageAsset.type || `image/${uriParts[uriParts.length - 1]}`;
        formData.append('image', {
          uri: imageAsset.uri,
          name: imageAsset.fileName || `profile.${uriParts[uriParts.length - 1]}`,
          type: fileType,
        });
      }

      const response = await axios.post(
        Base_Url.updateProfile,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && response.data.message) {
        Toast.show({
          type: 'success',
          text1: t('success'),
          text2: response.data.message,
        });
        Alert.alert('Success', response.data.message, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Toast.show({
          type: 'error',
          text1:t('error') ,
          text2: t("profilefail"),
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: error?.response?.data?.message || t("wrong"),
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <VectorIcon
              type="AntDesign"
              name="left"
              size={24}
              color={COLORS.textColor}
            />
          </TouchableOpacity>

          {/* Header */}
          <CustomText
            type="heading"
            color={COLORS.textColor}
            fontWeight="bold"
            style={styles.headerText}>
            {t("myprofile")}
          </CustomText>

          {/* Profile Image with Edit Icon */}
          <View style={styles.profileSection}>
            <Image source={profileImage} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setModalVisible(true)}>
              <Icon name="edit" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <CustomText
            style={styles.label}
            fontWeight="bold"
            color={COLORS.textColor}>
            {t("name")}
          </CustomText>
          <CustomInput
            value={name}
            placeholder="Name"
            onChangeText={setName}
            style={styles.input}
          />
          <CustomText
            style={styles.label}
            fontWeight="bold"
            color={COLORS.textColor}>
            {t("lastname")}
          </CustomText>
          <CustomInput
            value={lastName}
            placeholder="Last Name"
            onChangeText={setLastName}
            style={styles.input}
          />
          <CustomText
            style={styles.label}
            fontWeight="bold"
            color={COLORS.textColor}>
            {t("phoneNumber")}
          </CustomText>
          <CustomInput
            value={phoneNumber}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
          {/* Email Input */}
          {/* <CustomText
            style={styles.label}
            fontWeight="bold"
            color={COLORS.textColor}>
            Email
          </CustomText>
          <CustomInput
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            style={styles.input}
            editable={false} // Email usually not editable
          /> */}

          {/* Password Input */}
          <CustomText
            style={styles.label}
            fontWeight="bold"
            color={COLORS.textColor}>
            {t("password")}
          </CustomText>
          <CustomInput
            value={password}
            placeholder="Password"
            type='password'
            onChangeText={setPassword}
            style={styles.input}
          />

          {/* Save Changes Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            <CustomText
              color="#fff"
              fontWeight="bold"
              style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save Changes'}
            </CustomText>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setModalVisible(false)}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleImagePick('camera')}>
                  <CustomText color={COLORS.textColor} fontWeight="bold">
                    {t("camera")}
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleImagePick('gallery')}>
                  <CustomText color={COLORS.textColor} fontWeight="bold">
                    {t("gallery")}
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalOption, { borderBottomWidth: 0 }]}
                  onPress={() => setModalVisible(false)}>
                  <CustomText color="red" fontWeight="bold">
                    {t("cancel")}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(20),
    left: 10,
    zIndex: 1,
    padding: 8,
  },
  headerText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    fontSize: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 110,
    backgroundColor: COLORS.appColor || '#0066FF',
    borderRadius: 16,
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  label: {
    marginTop: verticalScale(10),
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    marginBottom: verticalScale(8),
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: verticalScale(32),
  },
  saveButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
});

export default EditProfile;
