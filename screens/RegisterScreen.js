import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const COLORS = {
  primary: '#0EA5E9',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  border: '#E2E8F0',
};

export default function RegisterScreen({ navigation, route }) {
  const { register } = useAuth();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
  try {
    await register(email, password, 'buyer');
    navigation.goBack();
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
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
    marginBottom: 30,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
});
