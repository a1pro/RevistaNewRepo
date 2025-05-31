import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {CustomText} from '../../components/CustomText';
import CustomInput from '../../components/CustomInput';
import COLORS from '../../utils/Colors';
import {useDispatch} from 'react-redux';
import {addAddress} from '../../redux/slice/addressSlice';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import VectorIcon from '../../components/VectorIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Address'>;

const Address: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [billing, setBilling] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    const getLocation = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'App needs access to your location',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
              'Permission denied',
              'Location permission is required to save address',
            );
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        error => {
          Alert.alert('Location Error', error.message);
        },
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
      );
    };

    getLocation();
  }, []);

  const handleSave = async () => {
    if (
      !address ||
      !city ||
      !postcode ||
      !phone ||
      !address1 ||
      !country ||
      !billing ||
      !name ||
      !latitude ||
      !longitude
    ) {
      Alert.alert(
        'Error',
        'Please fill all fields and ensure location is enabled',
      );
      return;
    }

    try {
      // Get bearer token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      // Prepare payload
      const payload = {
        contact_person_name: name,
        address_type: billing,
        address: address,
        address2: address1,
        city: city,
        zip: postcode,
        country: country,
        phone: phone,
        is_billing: 1,
        latitude: latitude,
        longitude: longitude,
      };

      const response = await fetch(
        'https://www.revista-sa.com/api/v4/customer/address/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(
          addAddress({
            address,
            city,
            postcode,
            phone,
            id: '',
            name,
            country,
            billing,
            address1,
            latitude,
            longitude,
          }),
        );
        Alert.alert('Success', 'Address saved successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to save address');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save address');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <View style={styles.inner}>
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
          <CustomText
            type="heading"
            fontWeight="bold"
            color={COLORS.textColor}
            style={styles.title}>
            Address
          </CustomText>

          <CustomText style={styles.label} color={COLORS.textColor}>
            Name
          </CustomText>
          <CustomInput
            value={name}
            placeholder="Required"
            onChangeText={setName}
            style={styles.input}
          />
          <CustomText style={styles.label} color={COLORS.textColor}>
            Address
          </CustomText>
          <CustomInput
            value={address}
            placeholder="Required"
            onChangeText={setAddress}
            style={styles.input}
          />
          <CustomText style={styles.label} color={COLORS.textColor}>
            Address 2
          </CustomText>
          <CustomInput
            value={address1}
            placeholder="Required"
            onChangeText={setAddress1}
            style={styles.input}
          />
          <CustomText style={styles.label} color={COLORS.textColor}>
            City
          </CustomText>
          <CustomInput
            value={city}
            placeholder="Required"
            onChangeText={setCity}
            style={styles.input}
          />
          <CustomText style={styles.label} color={COLORS.textColor}>
            Country
          </CustomText>
          <CustomInput
            value={country}
            placeholder="Required"
            onChangeText={setCountry}
            style={styles.input}
          />
          <CustomText style={styles.label} color={COLORS.textColor}>
            Postcode
          </CustomText>
          <CustomInput
            value={postcode}
            placeholder="Required"
            onChangeText={setPostcode}
            style={styles.input}
          />
          <CustomText style={styles.label} color={COLORS.textColor}>
            Phone Number
          </CustomText>
          <CustomInput
            value={phone}
            placeholder="Required"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            style={styles.input}
          />
          <CustomText style={styles.label} color={COLORS.textColor}>
            Billing
          </CustomText>
          <CustomInput
            value={billing}
            placeholder="Required"
            keyboardType="default"
            onChangeText={setBilling}
            style={styles.input}
          />
          {/* Optionally, show lat/long to the user
          <CustomText style={styles.label} color={COLORS.textColor}>
            Latitude: {latitude}
          </CustomText>
          <CustomText style={styles.label} color={COLORS.textColor}>
            Longitude: {longitude}
          </CustomText> */}

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <CustomText
              color="#fff"
              fontWeight="bold"
              style={styles.saveBtnText}>
              Save Changes
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;
