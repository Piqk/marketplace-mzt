import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useBookings } from '../context/BookingContext';
import { TouchableOpacity } from 'react-native';


const COLORS = {
  primary: '#0EA5E9',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
  border: '#E2E8F0',
};

export default function MyBookingsScreen({navigation}) {
  const { bookings } = useBookings();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis reservas</Text>
       <ScrollView>
  {bookings.map((booking) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.card}
      onPress={() =>
        navigation.navigate('Chat', { booking })
      }
    >
      <Text style={styles.provider}>
        {booking.providerName}
      </Text>
      <Text style={styles.package}>
        {booking.packageName}
      </Text>
      <Text style={styles.date}>
        Fecha: {booking.date}
      </Text>
      <Text style={styles.price}>
        ${booking.price} MXN
      </Text>
      <Text style={styles.status}>
        Estado: {booking.status}
      </Text>

      <Text style={styles.chatLink}>
        Contactar proveedor
      </Text>
    </TouchableOpacity>
  ))}

  {bookings.length === 0 && (
    <Text style={styles.empty}>
      Aún no tienes reservas.
    </Text>
  )}
      </ScrollView> 
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  provider: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  package: {
    color: COLORS.textLight,
    marginTop: 4,
  },
  date: {
    marginTop: 6,
  },
  price: {
    marginTop: 4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textLight,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.textLight,
  },
  chatLink: {
  marginTop: 8,
  color: COLORS.primary,
  fontWeight: 'bold',
},
});
