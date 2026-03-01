import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { supabase } from '../services/supabase';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { bookings } = useBookings();
  const [providerProfile, setProviderProfile] = useState(null);

  useEffect(() => {
    fetchProviderProfile();
  }, []);

  const fetchProviderProfile = async () => {
    const { data } = await supabase
      .from('providers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setProviderProfile(data);
    }
  };

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.event_date) >= new Date()
  );

  const pendingBookings = bookings.filter(
    (b) => b.status === 'pending'
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {providerProfile ? (
        <>
          <Text style={styles.sectionTitle}>Panel de proveedor</Text>

          <View style={styles.card}>
            <Text>Reservas pendientes: {pendingBookings.length}</Text>
            <Text>Eventos próximos: {upcomingBookings.length}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Mis reservas')}
          >
            <Text style={styles.buttonText}>Ver reservas</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Tus reservas</Text>

          <View style={styles.card}>
            <Text>Próximas reservas: {upcomingBookings.length}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Mis reservas')}
          >
            <Text style={styles.buttonText}>Ver mis reservas</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 30 },
  title: { fontSize: 26, fontWeight: 'bold' },
  email: { color: '#64748B', marginTop: 5 },
  sectionTitle: { fontSize: 18, marginBottom: 10 },
  card: {
    backgroundColor: '#F1F5F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0EA5E9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  logout: { marginTop: 20, alignItems: 'center' },
  logoutText: { color: 'red' },
});
