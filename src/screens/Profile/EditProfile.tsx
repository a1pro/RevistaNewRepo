import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import IMAGES from '../../assets/images';
import {CustomText} from '../../components/CustomText';
import CustomInput from '../../components/CustomInput';
import COLORS from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile: React.FC<Props> = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    const [profileImage, setProfileImage] = useState<any>(IMAGES.profile);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePick = (type: 'camera' | 'gallery') => {
    setModalVisible(false);
    const options = {
      mediaType: 'photo' as const,
      quality: 0.7,
    };

    if (type === 'camera') {
      launchCamera(options, (response: ImagePickerResponse) => {
        if (response.assets && response.assets.length > 0) {
          setProfileImage({ uri: response.assets[0].uri });
        }
      });
    } else {
      launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.assets && response.assets.length > 0) {
          setProfileImage({ uri: response.assets[0].uri });
        }
      });
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={24} color={COLORS.textColor} />
      </TouchableOpacity>

      {/* Header */}
      <CustomText
        type="heading"
        color={COLORS.textColor}
        fontWeight="bold"
        style={styles.headerText}
      >
        My Profile
      </CustomText>

      {/* Profile Image with Edit Icon */}
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="edit" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <CustomText style={styles.label} fontWeight="bold" color={COLORS.textColor}>
        Name
      </CustomText>
      <CustomInput
        value={name}
        placeholder="Name"
        onChangeText={setName}
        style={styles.input}
      />

      {/* Email Input */}
      <CustomText style={styles.label} fontWeight="bold" color={COLORS.textColor}>
        Email
      </CustomText>
      <CustomInput
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Password Input */}
      <CustomText style={styles.label} fontWeight="bold" color={COLORS.textColor}>
        Password
      </CustomText>
      <CustomInput
        value={password}
        placeholder="Password"
        type='password'
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton}>
        <CustomText color="#fff" fontWeight="bold" style={styles.saveButtonText}>
          Save Changes
        </CustomText>
      </TouchableOpacity>
          <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleImagePick('camera')}
            >
              <CustomText color={COLORS.textColor} fontWeight="bold">Camera</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleImagePick('gallery')}
            >
              <CustomText color={COLORS.textColor} fontWeight="bold">Gallery</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption, { borderBottomWidth: 0 }]}
              onPress={() => setModalVisible(false)}
            >
              <CustomText color="red" fontWeight="bold">Cancel</CustomText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
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
    // marginHorizontal:horizontalScale(30),
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
