import React, {useState} from 'react';
import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import styles from './style';
import {SafeAreaView} from 'react-native-safe-area-context';
import IMAGES from '../../assets/images';
import {CustomText} from '../../components/CustomText';
import COLORS from '../../utils/Colors';
import CustomButton from '../../components/Buttons/CustomButton';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import VectorIcon from '../../components/VectorIcon';
import {KeyboardAvoidingContainer} from '../../components/KeyboardAvoidingComponent';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Forgot'>;

const ForgotPassword: React.FC<Props> = ({navigation}) => {
  const [selected, setSelected] = useState<'sms' | 'email'>('sms');

  return (
    <KeyboardAvoidingContainer>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={IMAGES.passwordbackground}
          resizeMode="cover"
          style={{flex: 1, width: '100%', height: '100%'}}>
          <View style={styles.mainView}>
            <Image
              source={IMAGES.userimage}
              style={styles.userImage}
              resizeMode="contain"
            />
            <CustomText
              type="heading"
              color={COLORS.textColor}
              fontWeight="bold"
              style={{textAlign: 'center', marginBottom: 10}}>
              Password Recovery
            </CustomText>
            <CustomText
              type="subTitle"
              color={COLORS.titleColor}
              style={{textAlign: 'center'}}>
              How you would like to restore your password?
            </CustomText>
            <View style={{paddingVertical: verticalScale(8)}} />
            {/* SMS Option */}
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor:
                    selected === 'sms' ? COLORS.smsBack : COLORS.emailBck,
                },
              ]}
              onPress={() => setSelected('sms')}>
              <CustomText
                type="small"
                color={COLORS.textColor}
                style={{textAlign: 'center'}}></CustomText>
              <CustomText
                type="small"
                color={COLORS.textColor}
                style={{textAlign: 'center'}}>
                SMS
              </CustomText>
              <View
                style={[
                  styles.checkCircle,
                  selected === 'sms'
                    ? styles.checkedCircle
                    : styles.uncheckedCircle,
                ]}>
                {selected === 'sms' && (
                  <VectorIcon
                    size={14}
                    type="Ionicons"
                    name="checkmark"
                    color="#fff"
                  />
                )}
              </View>
            </TouchableOpacity>

            {/* Email Option */}
            <View style={{paddingVertical: verticalScale(8)}} />
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor:
                    selected === 'email' ? COLORS.smsBack : COLORS.emailBck,
                },
              ]}
              onPress={() => setSelected('email')}>
              <CustomText
                type="small"
                color={COLORS.textColor}
                style={{textAlign: 'center'}}></CustomText>
              <CustomText
                type="small"
                color={COLORS.textColor}
                style={{textAlign: 'center'}}>
                Email
              </CustomText>
              <View
                style={[
                  styles.checkCircle,
                  selected === 'email'
                    ? styles.checkedCircle
                    : styles.uncheckedCircle,
                ]}>
                {selected === 'email' && (
                  <VectorIcon
                    size={14}
                    type="Ionicons"
                    name="checkmark"
                    color="#fff"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: horizontalScale(15),
            }}>
            <CustomButton
              style={{marginTop: verticalScale(50)}}
              textSize="small"
              title="Next"
              onPress={() => navigation.navigate('PasswordRecovery')}
            />
            <CustomText
              type="subTitle"
              color={COLORS.titleColor}
              style={{textAlign: 'center', marginTop: verticalScale(20)}}
              onPress={() => navigation.navigate('Login')}>
              Cancel
            </CustomText>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default ForgotPassword;
