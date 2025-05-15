import React from 'react';
import {View, ImageBackground, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './style';
import IMAGES from '../../assets/images';
import {CustomText} from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import CustomButton from '../../components/Buttons/CustomButton';
import {verticalScale} from '../../utils/Metrics';
import VectorIcon from '../../components/VectorIcon';
import CustomInput from '../../components/CustomInput';
import {KeyboardAvoidingContainer} from '../../components/KeyboardAvoidingComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {loginUser} from '../../service/AuthService';
import {loginValidationSchema} from '../../utils/loginValidation';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Base_Url} from '../../utils/ApiUrl';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  // const handleLogin = async (email: string, password: string) => {
  //   try {
  //     const res = await loginUser(email, password);
  //     console.log('Login Response:', res);

  //     if (res.temporary_token) {
  //       await AsyncStorage.setItem('token', res.temporary_token);
  //       navigation.navigate('Dashboard');
  //     } else {
  //       throw new Error('Unexpected response');
  //     }
  //   } catch (error: any) {
  //     console.log('Login Error:', {
  //       message: error?.message,
  //       status: error?.response?.status,
  //       data: error?.response?.data,
  //     });

  //     Alert.alert(
  //       'Login Failed',

  //       error?.response?.data?.message ||
  //         error?.message ||
  //         'Something went wrong',
  //     );
  //   }
  // };

  const handleLogin = async (values: {email: string; password: string}) => {
    try {
      const res = await axios({
        method: 'post',
        url: Base_Url.login,
        data: {
          email: values.email,
          password: values.password,
          guest_id: '1',
        },
      });

      if (res?.data?.temporary_token) {
        await AsyncStorage.setItem('token', res.data.temporary_token);
        Alert.alert('Login Successful!');
        navigation.navigate('Dashboard');
      }
    } catch (error: any) {
      console.log('Login error:', error);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <KeyboardAvoidingContainer>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={IMAGES.loginimage}
          resizeMode="cover"
          style={{flex: 1, width: '100%', height: '100%'}}>
          <View style={styles.mainView}>
            <CustomText
              type="heading"
              color={COLORS.textColor}
              fontWeight="bold"
              style={{textAlign: 'center', marginBottom: 10}}>
              Login
            </CustomText>
            <View style={styles.heartView}>
              <CustomText
                type="subTitle"
                color={COLORS.titleColor}
                style={{textAlign: 'center'}}>
                Good to see you back!
              </CustomText>
              <VectorIcon
                size={30}
                type="AntDesign"
                name="heart"
                color={COLORS.black}
                style={{marginLeft: verticalScale(10)}}
              />
            </View>

            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={loginValidationSchema}
              onSubmit={values => handleLogin(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <CustomInput
                      keyboardType="email-address"
                      value={values.email}
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={touched.email ? errors.email : ''}
                    />
                    <CustomInput
                      value={values.password}
                      placeholder="Password"
                      type="password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password ? errors.password : ''}
                    />
                  </View>

                  <View>
                    <CustomText
                      type="extraSmall"
                      color={COLORS.titleColor}
                      style={{
                        textAlign: 'right',
                        marginRight: verticalScale(10),
                      }}
                      onPress={() => navigation.navigate('Forgot')}>
                      Forgot your password?
                    </CustomText>
                  </View>

                  <CustomButton
                    style={{marginTop: verticalScale(50)}}
                    textSize="small"
                    title="Next"
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: verticalScale(10),
              }}>
              <CustomText type="small" color={COLORS.titleColor}>
                Don't have an account? Sign Up
              </CustomText>
              <VectorIcon
                size={30}
                type="Ionicons"
                name="arrow-forward-circle-sharp"
                color={COLORS.blue}
                onPress={() => navigation.navigate('Register')}
                style={{marginLeft: verticalScale(10)}}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default LoginScreen;
