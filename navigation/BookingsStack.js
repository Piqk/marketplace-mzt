import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function BookingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{ title: 'Mis reservas' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'Chat' }}
      />
    </Stack.Navigator>
  );
}
