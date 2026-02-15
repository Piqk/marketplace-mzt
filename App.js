import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './navigation/HomeStack';
import MainTabs from './navigation/MainTabs';
import {
  SearchScreen,
  MessagesScreen,
  FavoritesScreen,
} from './OtherScreens';

const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
     <MainTabs />
    </NavigationContainer>
  );
}