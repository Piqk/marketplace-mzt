import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useChat } from '../context/ChatContext';
import { useBookings } from '../context/BookingContext';

const COLORS = {
  primary: '#0EA5E9',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
  border: '#E2E8F0',
};

export default function MessagesScreen({ navigation }) {
  const { messages } = useChat();
  const { bookings } = useBookings();

  // obtener reservas que tienen mensajes
  const bookingsWithMessages = bookings.filter((booking) =>
    messages.some((msg) => msg.bookingId === booking.id)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mensajes</Text>

      <ScrollView>
        {bookingsWithMessages.map((booking) => {
          const bookingMessages = messages.filter(
            (m) => m.bookingId === booking.id
          );

          const lastMessage =
            bookingMessages[bookingMessages.length - 1];

          return (
            <TouchableOpacity
              key={booking.id}
              style={styles.card}
              onPress={() =>
            navigation.navigate('Mis reservas', {
              screen: 'Chat',
              params: { booking },
            })
}
            >
              <Text style={styles.provider}>
                {booking.providerName}
              </Text>

              <Text style={styles.lastMessage}>
                {lastMessage?.text || 'Sin mensajes'}
              </Text>
            </TouchableOpacity>
          );
        })}

        {bookingsWithMessages.length === 0 && (
          <Text style={styles.empty}>
            No tienes conversaciones aún.
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
  lastMessage: {
    marginTop: 4,
    color: COLORS.textLight,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.textLight,
  },
});
