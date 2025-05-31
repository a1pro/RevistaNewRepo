import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import IMAGES from '../../assets/images';
import styles from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'Terms'>;
const Terms: React.FC<Props> = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
       <View style={styles.container}>
        <Text>Working on it </Text>
       </View>
        </SafeAreaView>
    )
}
export default Terms