import React from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import styles from './style';
import IMAGES from '../../assets/images';
import {CustomText} from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import CustomButton from '../../components/Buttons/CustomButton';
import {verticalScale} from '../../utils/Metrics';
import VectorIcon from '../../components/VectorIcon';
import CustomInput from '../../components/CustomInput';
import {Formik} from 'formik';
import axios from 'axios';
import {Base_Url} from '../../utils/ApiUrl';
import {signupValidationSchema} from '../../utils/singupValidation';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const handleSignup = async (values: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    try {
      const res = await axios({
        method: 'post',
        url: Base_Url.signup,
        data: {
          f_name: values.first_name,
          l_name: values.last_name,
          email: values.email,
          password: values.password,
          phone: values.phoneNumber,
        },
      });

      if (res?.data) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Signup Successful!',
        });
        navigation.navigate('Login');
      }
    } catch (error: any) {
      console.log('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.message || 'Something went wrong',
      });
     
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <ImageBackground
            source={IMAGES.signupbackground}
            resizeMode="cover"
            style={{flex: 1, paddingHorizontal: 20, paddingVertical: 30}}>
            <View
              style={{alignItems: 'center', marginBottom: verticalScale(20)}}>
              <CustomText
                type="heading"
                color={COLORS.textColor}
                fontWeight="bold"
                style={{textAlign: 'center'}}>
                Create
              </CustomText>
              <CustomText
                type="heading"
                color={COLORS.textColor}
                fontWeight="bold"
                style={{textAlign: 'center'}}>
                Account
              </CustomText>
            </View>

            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                phoneNumber: '',
              }}
              validationSchema={signupValidationSchema}
              onSubmit={values => handleSignup(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.mainView}>
                  <View style={styles.inputContainer}>
                    <CustomInput
                      value={values.first_name}
                      placeholder="First name"
                      onBlur={handleBlur('first_name')}
                      onChangeText={handleChange('first_name')}
                      error={touched.first_name ? errors.first_name : ''}
                    />
                    <CustomInput
                      value={values.last_name}
                      placeholder="Last name"
                      onBlur={handleBlur('last_name')}
                      onChangeText={handleChange('last_name')}
                      error={touched.last_name ? errors.last_name : ''}
                    />
                    <CustomInput
                      value={values.email}
                      placeholder="Email"
                      keyboardType="email-address"
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
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
                    <CustomInput
                      value={values.phoneNumber}
                      placeholder="Phone number"
                      keyboardType="phone-pad"
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      error={touched.phoneNumber ? errors.phoneNumber : ''}
                    />
                  </View>

                  <CustomButton
                    style={{marginTop: verticalScale(40)}}
                    textSize="small"
                    title="Done"
                    onPress={handleSubmit}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: verticalScale(20),
                    }}>
                    <CustomText
                      type="small"
                      color={COLORS.titleColor}
                      style={{textAlign: 'center'}}>
                      Already have an account? Sign In
                    </CustomText>
                    <VectorIcon
                      size={30}
                      type="Ionicons"
                      name="arrow-forward-circle-sharp"
                      color={COLORS.blue}
                      onPress={() => navigation.navigate('Login')}
                      style={{marginLeft: verticalScale(10)}}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
