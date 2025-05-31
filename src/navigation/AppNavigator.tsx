import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStackParamList} from '../types';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import PasswordRecovery from '../screens/ForgotPassword/PasswordRecovery';
import NewPassword from '../screens/ForgotPassword/NewPassword';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BottomNavigator from './BottomNavigator';
import Details from '../screens/Details/Details';
import ProductDetails from '../screens/ProductDetails/ProductDetails';
import EditProfile from '../screens/Profile/EditProfile';
import WishList from '../screens/Profile/WishList';
import Address from '../screens/Address/Address';
import Order from '../screens/Order/Order';
import Language from '../screens/Language/Language';
import SaveAddress from '../screens/SaveAddress/SaveAddress';
import Terms from '../screens/Terms&Conditions/Terms';
import SubCategories from '../screens/AllCategories/SubCategories';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
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
          name="Details"
          component={Details}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubCategories"
          component={SubCategories}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WishList"
          component={WishList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Language"
          component={Language}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SaveAddress"
          component={SaveAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  </NavigationContainer>
);

export default AppNavigator;
