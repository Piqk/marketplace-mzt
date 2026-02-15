import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryProvidersScreen from '../screens/CategoryProvidersScreen';
import HomeScreen from '../screens/HomeScreen';
import ProviderDetailScreen from '../screens/ProviderDetailScreen';

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
    </Stack.Navigator>
  );
}
