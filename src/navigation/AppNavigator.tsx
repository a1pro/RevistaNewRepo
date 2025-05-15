import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStackParamList} from '../types';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import PasswordRecovery from '../screens/ForgotPassword/PasswordRecovery';
import NewPassword from '../screens/ForgotPassword/NewPassword';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PasswordRecovery"
          component={PasswordRecovery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  </NavigationContainer>
);

export default AppNavigator;
