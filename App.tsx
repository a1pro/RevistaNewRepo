import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';

import {Platform, Alert, LogBox} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {AuthProvider} from './src/context/AuthContext';
import Toast from 'react-native-toast-message';
LogBox.ignoreAllLogs();
const requestAppPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      const cameraStatus = await request(PERMISSIONS.ANDROID.CAMERA);
      if (Platform.Version >= 33) {
        await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      } else {
        await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      }
    } else if (Platform.OS === 'ios') {
      // await request(PERMISSIONS.IOS.CAMERA);
      // await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
  } catch (error) {
Toast.show({type: 'error',
   text1: 'Error',
    text2: 'There was a problem requesting permissions.'});    

    console.log('Error requesting permissions:', error);
  }
};

export default function App() {
  useEffect(() => {
    requestAppPermissions();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppNavigator />
          <Toast/>
        </GestureHandlerRootView>
      </AuthProvider>
    </Provider>
  );
}
