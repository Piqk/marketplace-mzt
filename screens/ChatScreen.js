import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

const COLORS = {
  primary: '#0EA5E9',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  border: '#E2E8F0',
};

export default function ChatScreen({ route }) {
  const { booking } = route.params;
  const { user } = useAuth();
  const { sendMessage, getMessagesForBooking } = useChat();

  const [text, setText] = useState('');

  const messages = getMessagesForBooking(booking.id);

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage({
      bookingId: booking.id,
      senderId: user.id,
      text,
    });

    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.messages}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.senderId === user.id
                ? styles.myMessage
                : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}

        {messages.length === 0 && (
          <Text style={styles.empty}>
            No hay mensajes aún.
          </Text>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  messages: {
    flex: 1,
    padding: 15,
  },
  message: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '75%',
  },
  myMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  messageText: {
    color: '#000',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  sendText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
