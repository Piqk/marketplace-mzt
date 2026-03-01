import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryProvidersScreen from '../screens/CategoryProvidersScreen';
import HomeScreen from '../screens/HomeScreen';
import ProviderDetailScreen from '../screens/ProviderDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Stack.Screen
        name="ProviderDetail"
        component={ProviderDetailScreen}
        options={{ title: 'Detalle del proveedor' }}
      />
      <Stack.Screen
        name="CategoryProviders"
        component={CategoryProvidersScreen}
        options={{ title: 'Categoría' }}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{ title: 'Reservar' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Crear cuenta' }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Iniciar sesión' }}
      />
      <Stack.Screen
        name="Mis reservas"
        component={MyBookingsScreen}
        initialParams={{ title: 'MyBookings' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'Chat' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Mi perfil' }}
      />
    </Stack.Navigator>
  );
}
