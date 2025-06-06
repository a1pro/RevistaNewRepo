import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {View} from 'react-native';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AllCategories from '../screens/AllCategories/AllCategories';
import Profile from '../screens/Profile/Profile';
import AddtoCart from '../screens/AddtoCart/AddtoCart';
import Magzine from '../screens/Book/Magzine';

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
  return (
    <Tab.Navigator
      screenOptions={({route}): BottomTabNavigationOptions => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#0C18BF',
        tabBarInactiveTintColor: '#214357',
        tabBarLabelStyle: {
          fontSize: 12,
          color: '#0C18BF',
          marginTop: 5,
        },
        tabBarStyle: {
          backgroundColor: '#ffff',
          borderTopWidth: 0,
          shadowRadius: 10,
          paddingTop: 5,
          paddingBottom: 5,
          height: 70,
          // marginHorizontal: 10,
          //   borderRadius: 20,
        },
        tabBarIcon: ({focused, color}) => {
          let iconName: string;
          let IconComponent: typeof Icon;

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
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AllCategories"
        component={AllCategories}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Magzine"
        component={Magzine}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AddtoCart"
        component={AddtoCart}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
