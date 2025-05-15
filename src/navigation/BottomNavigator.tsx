import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AllCategories from '../screens/AllCategories/AllCategories';

// Define types for route names
type TabParamList = {
  Home: undefined;
  Chat: undefined;
  Review: undefined;
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
        tabBarInactiveTintColor: '#0C18BF',
        tabBarLabelStyle: {
          fontSize: 13,
          color: '#0C18BF',
          marginTop: 5,
        },
        tabBarStyle: {
          backgroundColor: '#ffff',
          borderTopWidth: 0,
          shadowRadius: 10,
          paddingTop: 15,
          paddingBottom: 5,
          height: 80,
          marginHorizontal: 10,
          //   borderRadius: 20,
        },
        tabBarIcon: ({focused, color}) => {
          let iconName: string;
          let IconComponent: typeof Icon;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              IconComponent = Icon;
              break;
            case 'AllCategories':
              iconName = 'dashboard';
              IconComponent = MaterialIcons;
              break;
            case 'Review':
              iconName = 'thumbs-up-down';
              IconComponent = MaterialIcons;
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
              <IconComponent name={iconName} size={26} color={color} />
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
    </Tab.Navigator>
  );
};

export default BottomNavigator;
