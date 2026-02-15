import React, { useState } from 'react';
import { providers } from '../data/providers';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// COLORES DEL TEMA
// Inspirados en Mazatlán: mar, sol y fiestas con tonos que generan confianza
const COLORS = {
  primary: '#0EA5E9', // Azul cielo/mar - confianza y tranquilidad
  primaryDark: '#0284C7',
  secondary: '#F59E0B', // Naranja/dorado - celebración y alegría
  background: '#F8FAFC', // Gris muy claro - limpio y moderno
  white: '#FFFFFF',
  text: '#1E293B', // Gris oscuro para texto
  textLight: '#64748B', // Gris medio para texto secundario
  border: '#E2E8F0',
  success: '#10B981',
  star: '#FBBF24',
};

// COMPONENTE: Barra de búsqueda
const SearchBar = ({ value, onChangeText, navigation }) => {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Este es el buscador"
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => navigation.navigate('Buscar')}
      />
    </View>
  );
};

// COMPONENTE: Categoría de servicio
const CategoryCard = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <Text style={styles.categoryIcon}>{icon}</Text>
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

// COMPONENTE: Tarjeta de proveedor destacado
const ProviderCard = ({ provider, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.providerCard}
      onPress={() =>
        navigation.navigate('ProviderDetail', { provider })
      }
    >

      {/* Información del proveedor */}
      <View style={styles.providerInfo}>
        <Text style={styles.providerName}>{provider.name}</Text>
        <Text style={styles.providerCategory}>{provider.category}</Text>
        
        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.starIcon}>⭐</Text>
          <Text style={styles.ratingText}>
            {provider.rating} ({provider.reviews} reseñas)
          </Text>
        </View>

        {/* Precio */}
        <Text style={styles.providerPrice}>Desde ${provider.priceFrom} MXN</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');

  // DATOS DE EJEMPLO - Aquí conectarías tu API o base de datos
  const categories = [
    { id: 1, icon: '🎵', title: 'DJ & Música' },
    { id: 2, icon: '🎈', title: 'Decoración' },
    { id: 3, icon: '📸', title: 'Fotografía' },

  ];

const featuredProviders = providers;

const query = searchQuery.toLowerCase().trim();

// 1. Buscar coincidencias por categoría (servicio)
const categoryMatches = featuredProviders.filter((provider) =>
  provider.category.toLowerCase().includes(query)
);

// 2. Si hay coincidencias por categoría, usar esas
// 3. Si no hay, buscar por nombre del proveedor
const filteredProviders =
  categoryMatches.length > 0
    ? categoryMatches
    : featuredProviders.filter((provider) =>
        provider.name.toLowerCase().includes(query)
      );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <ScrollView style={styles.scrollView}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>tengo que hacer el booking screen</Text>
            <Text style={styles.headerTitle}>y todo el rollo de los perfiles tambien</Text>
            <Text style={styles.headerSubtitle}>ya luego pensare en esto y le podnre color</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* BARRA DE BÚSQUEDA */}
        <SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  navigation={navigation}
/>

        {/* CATEGORÍAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <CategoryCard
              key={category.id}
              icon={category.icon}
              title={category.title}
               onPress={() =>
              navigation.navigate('CategoryProviders', {
              category: category.title,
                    })
              }
          />
            ))}
          </ScrollView>
        </View>

        {/* PROVEEDORES DESTACADOS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Proveedores Destacados</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
         {filteredProviders.map((provider) => (
  <ProviderCard
    key={provider.id}
    provider={provider}
    navigation={navigation}
  />
    ))}
    {filteredProviders.length === 0 && searchQuery.length > 0 && (
  <Text style={{ textAlign: 'center', marginTop: 20 }}>
    No se encontraron resultados.
  </Text>
)}
        </View>

        {/* BANNER PROMOCIONAL */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoIcon}>🎉</Text>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>¡Temporada de fiestas!</Text>
            <Text style={styles.promoText}>
              Reserva ahora y obtén 10% de descuento
            </Text>
          </View>
        </View>

        {/* Espaciado al final */}
        <View style={{ height: 30 }} />
      </ScrollView>
      
    </SafeAreaView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerGreeting: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },

  // Búsqueda
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    margin: 20,
    marginTop: 15,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },

  // Secciones
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAllButton: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  // Categorías
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 15,
    marginRight: 12,
    width: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Tarjeta de proveedor
  providerCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  providerImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  providerImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  providerImageIcon: {
    fontSize: 36,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: COLORS.success,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  verifiedText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  providerInfo: {
    flex: 1,
    justifyContent: 'space-between',
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
  },
  providerPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  // Banner promocional
  promoBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  promoIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  promoText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.95,
  },

  // Navegación inferior
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 5,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  navTextActive: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },
});


