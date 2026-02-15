import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { providers } from './data/providers';


const COLORS = {
  primary: '#0EA5E9',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
  border: '#E2E8F0',
};

const ProviderCard = ({ provider, navigation }) => (
  <TouchableOpacity
    style={styles.providerCard}
    onPress={() =>
      navigation.navigate('ProviderDetail', { provider })
    }
  >
    <Text style={styles.providerName}>{provider.name}</Text>
    <Text style={styles.providerCategory}>{provider.category}</Text>
    <Text>⭐ {provider.rating}</Text>
    <Text style={styles.providerPrice}>
      Desde ${provider.priceFrom} MXN
    </Text>
  </TouchableOpacity>
);

export function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  // mismos datos de ejemplo


  const query = searchQuery.toLowerCase().trim();

  const categoryMatches = providers.filter((provider) =>
    provider.category.toLowerCase().includes(query)
  );

  const filteredProviders =
    query.length === 0
      ? providers
      : categoryMatches.length > 0
      ? categoryMatches
      : providers.filter((provider) =>
          provider.name.toLowerCase().includes(query)
        );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar servicios..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <ScrollView>
        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            navigation={navigation}
          />
        ))}

        {filteredProviders.length === 0 && (
          <Text style={styles.emptyText}>
            No se encontraron resultados.
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
  },
  searchContainer: {
    backgroundColor: COLORS.white,
    margin: 20,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    fontSize: 16,
  },
  providerCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  providerCategory: {
    color: COLORS.textLight,
    marginBottom: 5,
  },
  providerPrice: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.textLight,
  },
});

export function MessagesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mensajes</Text>
    </View>
  );
}

export function FavoritesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Proximamente se podran agregar favoritos</Text>
    </View>
  );
}
