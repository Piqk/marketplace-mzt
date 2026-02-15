import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { providers } from '../data/providers';

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
    <View style={styles.providerInfo}>
      <Text style={styles.providerName}>{provider.name}</Text>
      <Text style={styles.providerCategory}>{provider.category}</Text>

      <Text style={styles.ratingText}>
        ⭐ {provider.rating} ({provider.reviews} reseñas)
      </Text>

      <Text style={styles.providerPrice}>
        Desde ${provider.priceFrom} MXN
      </Text>
    </View>
  </TouchableOpacity>
);

export default function CategoryProvidersScreen({ route, navigation }) {
  const { category } = route.params;

  // mismos datos de ejemplo del Home


const filteredProviders = providers.filter(
  (p) => p.category === category
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{category}</Text>

        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            navigation={navigation}
          />
        ))}

        {filteredProviders.length === 0 && (
          <Text style={styles.emptyText}>
            No hay proveedores en esta categoría.
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    padding: 20,
  },
  providerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  providerCategory: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 8,
  },
  providerPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.textLight,
  },
});
