import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  Platform,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import { CustomText } from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../redux/slice/addressSlice';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import VectorIcon from '../../components/VectorIcon';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
type Props = NativeStackScreenProps<RootStackParamList, 'Address'>;

const Address: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [billing, setBilling] = useState('Others');
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    const getLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: t('locationPermissionTitle'),
            message: t('locationPermissionMessage'),
            buttonPositive: t('ok'),
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Toast.show({
            type: 'error',
            text1: t('permissionDenied'),
            text2: t('enableLocationToSaveAddress'),
          });
          return;
        }
      }

      Geolocation.getCurrentPosition(
        pos => {
          setLatitude(pos.coords.latitude.toString());
          setLongitude(pos.coords.longitude.toString());
        },
        err =>
          Toast.show({
            type: 'error',
            text1: t('error'),
            text2: err.message,
          }),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
      );
    };

    getLocation();
  }, []);

  const handleSave = async () => {
    if (!name || !phone || !billing || !country || !city || !postcode || !address || !latitude || !longitude) {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: t('pleaseFillAllFields'),
      });
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: t('authenticationTokenNotFound'),
      });
      return;
    }

    const payload = {
      contact_person_name: name,
      phone,
      address_type: billing,
      country: country.name,
      city,
      zip: postcode,
      address,
      latitude,
      longitude,
      is_billing: 1,
    };

    try {
      const response = await fetch('https://www.revista-sa.com/api/v4/customer/address/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(
          addAddress({
            name,
            phone,
            billing,
            country: country.name,
            city,
            postcode,
            address,
            address1: '',
            latitude,
            longitude,
            id: '',
          })
        );
        Toast.show({
          type: 'success',
          text1: t('success'),
          text2: t('addressSavedSuccessfully'),
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: data.message || t('failedToSaveAddress'),
        });
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: t('failedToSaveAddress'),
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <VectorIcon type="AntDesign" name="left" size={24} color={COLORS.textColor} />
        </TouchableOpacity>

        <Text style={styles.heading}>{t('shippingAddress')} *</Text>

        <Text style={styles.label}>{t('contactPersonName')} *</Text>
        <CustomInput value={name} onChangeText={setName} placeholder="Enter name" style={styles.input} />

        <Text style={styles.label}>{t('phone')} *</Text>
        <CustomInput value={phone} onChangeText={setPhone} placeholder={t('enterPhone')} keyboardType="phone-pad" style={styles.input} />

        <Text style={styles.label}>{t('addressType')}</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowBillingModal(true)}>
          <Text>{billing}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>{t('country')} *</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowCountryPicker(true)}>
          <Text>{country?.name || 'Select country'}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>{t('city')} *</Text>
        <CustomInput value={city} onChangeText={setCity} placeholder={t('enterCity')} style={styles.input} />

        <Text style={styles.label}>{t('zipCode')} *</Text>
        <CustomInput value={postcode} onChangeText={setPostcode} placeholder={t('enterZipCode')} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>{t('address')} *</Text>
        <CustomInput value={address} onChangeText={setAddress} placeholder={t('enterAddress')}  style={styles.input} />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>{t('saveChanges')}</Text>
        </TouchableOpacity>

        {/* Address type Modal */}
        <Modal visible={showBillingModal} transparent animationType="slide">
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowBillingModal(false)}>
            <View style={styles.modalContent}>
               {[t('permanent'), t('home'), t('others')].map(type => (
                <TouchableOpacity key={type} onPress={() => { setBilling(type); setShowBillingModal(false); }}>
                  <Text style={styles.modalItem}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Country Picker Modal */}
        <CountryPicker
          withFilter
          withFlag
          withCountryNameButton={true}
          withAlphaFilter
          withCallingCode
          withEmoji
          visible={showCountryPicker}
          onClose={() => setShowCountryPicker(false)}
          onSelect={country => {
            setCountry(country);
            setShowCountryPicker(false);
          }} countryCodes={''}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 16,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
    color: COLORS.textColor,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  saveBtn: {
    backgroundColor: COLORS.appColor,
    padding: 14,
    marginTop: 30,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
});
