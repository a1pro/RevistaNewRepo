import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next'; // or your i18n hook
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AllCategories from '../screens/AllCategories/AllCategories';
import Profile from '../screens/Profile/Profile';
import AddtoCart from '../screens/AddtoCart/AddtoCart';
import Magzine from '../screens/Book/Magzine';
import COLORS from '../utils/Colors';

// Define types for route names
type TabParamList = {
  Home: undefined;
  AddtoCart: undefined;
  Magzine: undefined;
  Profile: undefined;
  AllCategories: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomNavigator: React.FC = () => {
  const { t } = useTranslation();

  const getTabLabel = (routeName: keyof TabParamList): string => {
    switch (routeName) {
      case 'Home':
        return t('home');
      case 'AllCategories':
        return t('allCategories');
      case 'Magzine':
        return t('magazine');
      case 'AddtoCart':
        return t('cart');
      case 'Profile':
        return t('profile');
      default:
        return routeName;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#EDEDED',
        tabBarInactiveTintColor: '#214357',
        tabBarLabelStyle: {
          fontSize: 12,
          color: COLORS.revista2,
          marginTop: 5,
        },
        tabBarStyle: {
          backgroundColor: '#ffff',
          borderTopWidth: 0,
          shadowRadius: 10,
          paddingTop: 5,
          paddingBottom: 5,
          height: 70,
        },
        tabBarLabel: getTabLabel(route.name),
        tabBarIcon: ({ focused, color }) => {
          let iconName: string;
          let IconComponent: typeof Feather;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              IconComponent = Feather;
              break;
            case 'AllCategories':
              iconName = 'layout';
              IconComponent = Feather;
              break;
            case 'Profile':
              iconName = 'user';
              IconComponent = Feather;
              break;
            case 'AddtoCart':
              iconName = 'shopping-cart';
              IconComponent = Feather;
              break;
            case 'Magzine':
              iconName = 'book-open';
              IconComponent = Feather;
              break;
            default:
              iconName = 'users';
              IconComponent = MaterialIcons;
          }

          return (
            <View
              style={{
                backgroundColor: focused ? '#ffff' : '#ffff',
                borderRadius: 30,
                width: 46,
                height: 46,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconComponent name={iconName} size={22} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AllCategories"
        component={AllCategories}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Magzine"
        component={Magzine}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="AddtoCart"
        component={AddtoCart}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
