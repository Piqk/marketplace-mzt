import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import {
  SearchScreen,

} from '../OtherScreens';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import BookingsStack from './BookingsStack';



import MessagesScreen from '../screens/MessagesScreen';
const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Buscar" component={SearchScreen} />
      <Tab.Screen name="Mensajes" component={MessagesScreen} />
      <Tab.Screen name="Mis reservas" component={BookingsStack} />
    </Tab.Navigator>
  );
}
