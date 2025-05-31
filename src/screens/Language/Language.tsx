import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import COLORS from '../../utils/Colors';
import { CustomText } from '../../components/CustomText';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const LANGUAGES = [
  { key: 'en', label: 'English' },
  { key: 'ar', label: 'Arabic' },
];
type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;
const Language:  React.FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>('en');

  return (
    <SafeAreaView style={styles.container}>
     <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={24} color={COLORS.textColor} />
        </TouchableOpacity>

        {/* Header */}
        <CustomText
          type="heading"
          color={COLORS.textColor}
          fontWeight="bold"
          style={styles.header}
        >
          Language
        </CustomText>
      <View style={styles.optionsContainer}>
        {LANGUAGES.map(lang => (
          <TouchableOpacity
            key={lang.key}
            style={[
              styles.option,
              selected === lang.key && styles.optionSelected,
            ]}
            onPress={() => setSelected(lang.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selected === lang.key && styles.optionTextSelected,
              ]}
            >
              {lang.label}
            </Text>
            <View style={styles.iconContainer}>
              {selected === lang.key ? (
                <Icon name="check-circle" size={22} color="#2676FD" />
              ) : (
                <Icon name="radio-button-unchecked" size={22} color="#E2E4E9" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};



export default Language;
