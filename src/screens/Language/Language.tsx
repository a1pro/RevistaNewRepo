import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';

import styles from './style';
import COLORS from '../../utils/Colors';
import { CustomText } from '../../components/CustomText';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import VectorIcon from '../../components/VectorIcon';

const LANGUAGES = [
  { key: 'en', label: 'English' },
  { key: 'sa', label: 'Arabic' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;

const Language: React.FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>('en');

  const changeLanguageApi = async (language_code: string) => {
    try {
      console.log('Sending language code:', language_code);
      const response = await axios.post('https://www.revista-sa.com/api/change-language', {
        language_code,
      });
      console.log('API response:', response.data);

      if (
        response.data.message === "Language changed successfully." ||
        response.data.message === "تم تغيير اللغة بنجاح."
      ) {
        const alertMessage = 
          language_code === 'en' 
            ? 'Language changed successfully.' 
            : 'تم تغيير اللغة بنجاح.';
        Alert.alert('Success', alertMessage);
      }
    } catch (error) {
      console.error('Error changing language:', error);
      Alert.alert('Error', 'Failed to change language. Please try again.');
    }
  };

  const onSelectLanguage = (langKey: string) => {
    setSelected(langKey);
    // Note: You had `codeToSend = langKey === 'en' ? 'sa' : langKey;`
    // This would send 'sa' for English and 'sa' for Arabic, which seems wrong.
    // Based on your description, you want to send 'en' for English, 'sa' for Arabic.
    // So, send langKey directly as codeToSend.
    const codeToSend = langKey; // This matches your LANGUAGES array keys
    changeLanguageApi(codeToSend);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
          style={styles.header}>
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
              onPress={() => onSelectLanguage(lang.key)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.optionText,
                  selected === lang.key && styles.optionTextSelected,
                ]}>
                {lang.label}
              </Text>
              <View style={styles.iconContainer}>
                {selected === lang.key ? (
                  <VectorIcon
                    type="Ionicons"
                    name="radio-button-on"
                    size={22}
                    color="#2676FD"
                  />
                ) : (
                  <VectorIcon
                    type="Ionicons"
                    name="radio-button-off"
                    size={22}
                    color="#E2E4E9"
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Language;
