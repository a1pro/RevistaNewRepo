import React, {useEffect} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './style';
import IMAGES from '../../assets/images';
import {useAuth} from '../../context/AuthContext';
import COLORS from '../../utils/Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const {isAuthenticated, isLoading} = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          navigation.replace('Dashboard');
        } else {
          navigation.replace('Welcome');
        }
      }
    }, 2000); // Show splash for at least 2 seconds

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={IMAGES.logo}
          resizeMode="contain"
          style={styles.logoImg}
        />
        <ActivityIndicator 
          size="large" 
          color={COLORS.primary || '#007AFF'} 
          style={styles.loader}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
