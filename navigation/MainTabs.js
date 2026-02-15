import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import {
  SearchScreen,
  MessagesScreen,
  FavoritesScreen,
} from '../OtherScreens';
import MyBookingsScreen from '../screens/MyBookingsScreen';
const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Buscar" component={SearchScreen} />
      <Tab.Screen name="Mensajes" component={MessagesScreen} />
      <Tab.Screen name="Mis reservas" component={MyBookingsScreen} />
    </Tab.Navigator>
  );
}
