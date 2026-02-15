import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';


const COLORS = {
  primary: '#0EA5E9',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
  border: '#E2E8F0',
};

export default function BookingScreen({ route, navigation }) {
  const { provider, packageItem } = route.params;

  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useAuth();
  const { createBooking } = useBookings();

// esta es la logica de resrva

  const handleConfirm = () => {
  if (!user) {
    navigation.navigate('Register');
    return;
  }

  if (!selectedDate) {
    alert('Selecciona una fecha');
    return;
  }

  createBooking({
    providerId: provider.id,
    providerName: provider.name,
    packageName: packageItem.name,
    price: packageItem.price,
    date: selectedDate,
    buyerId: user.id,
  });

  alert('Reserva creada');

  navigation.navigate('Mis reservas');
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Confirmar reserva</Text>

        <View style={styles.card}>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.packageName}>{packageItem.name}</Text>
          <Text style={styles.price}>
            ${packageItem.price} MXN
          </Text>
        </View>

        <Text style={styles.label}>Fecha del evento</Text>

        {/* Simulación de selección de fecha */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setSelectedDate('20 Dic 2026')}
        >
          <Text style={styles.dateText}>
            {selectedDate || 'Seleccionar fecha'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          disabled={!selectedDate}
        >
          <Text style={styles.confirmText}>
            Reservar con anticipo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  packageName: {
    color: COLORS.textLight,
    marginTop: 5,
  },
  price: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateText: {
    fontSize: 16,
  },
  footer: {
    padding: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
