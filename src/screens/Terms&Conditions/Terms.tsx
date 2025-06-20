import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './style';
import COLORS from '../../utils/Colors';
import {CustomText} from '../../components/CustomText';
import VectorIcon from '../../components/VectorIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Terms'>;
const Terms: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <VectorIcon
              type="AntDesign"
              name="left"
              size={24}
              color={COLORS.textColor}
            />
          </TouchableOpacity>
          <CustomText
            type="heading"
            color={COLORS.textColor}
            fontWeight="bold"
            style={styles.title}>
            Terms & Conditions
          </CustomText>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <CustomText style={styles.workingText}>Working on it...</CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Terms;
