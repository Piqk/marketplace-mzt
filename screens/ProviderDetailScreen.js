import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const COLORS = {
  primary: '#0EA5E9',
  primaryDark: '#0284C7',
  secondary: '#F59E0B',
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  star: '#FBBF24',
};

const { width } = Dimensions.get('window');

export default function ProviderDetailScreen({ route, navigation }) {
  const { provider } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Datos de ejemplo - en producción vendrían de tu API
  const providerDetails = {
    ...provider,
    description: 'Ofrecemos servicios profesionales de DJ para todo tipo de eventos en Mazatlán. Con más de 10 años de experiencia y equipo de sonido e iluminación de última generación, garantizamos que tu fiesta sea inolvidable.',
    images: [
      '🎵', // En producción serían URLs de imágenes reales
      '🎧',
      '🎤',
      '🎶',
    ],
    products: [
      {
        id: 1,
        name: 'Paquete Básico',
        description: 'DJ + Sonido básico para eventos pequeños',
        price: 3500,
        duration: '4 horas',
        icon: '🎵',
      },
      {
        id: 2,
        name: 'Paquete Premium',
        description: 'DJ + Sonido profesional + Iluminación LED',
        price: 6000,
        duration: '6 horas',
        icon: '✨',
      },
      {
        id: 3,
        name: 'Paquete VIP',
        description: 'DJ + Sonido + Iluminación + Efectos especiales + MC',
        price: 9500,
        duration: '8 horas',
        icon: '🌟',
      },
      {
        id: 4,
        name: 'Hora Extra',
        description: 'Tiempo adicional después del paquete contratado',
        price: 800,
        duration: '1 hora',
        icon: '⏰',
      },
    ],
    services: [
      'Música variada de todos los géneros',
      'Equipo profesional de audio',
      'Iluminación LED programable',
      'Micrófonos inalámbricos',
      'Cabina con pantalla LED',
      'Backup de equipo',
    ],
    reviews: [
      {
        id: 1,
        userName: 'María González',
        rating: 5,
        comment: '¡Excelente servicio! Hicieron de nuestra boda un evento inolvidable. Muy profesionales y la música estuvo perfecta.',
        date: '15 Dic 2024',
        avatar: '👩',
      },
      {
        id: 2,
        userName: 'Carlos Ramírez',
        rating: 5,
        comment: 'Muy profesionales, música variada y buen ambiente. Recomendados 100%.',
        date: '10 Nov 2024',
        avatar: '👨',
      },
      {
        id: 3,
        userName: 'Ana Martínez',
        rating: 4,
        comment: 'Buen servicio, aunque me gustaría que tuvieran más música regional mexicana.',
        date: '5 Oct 2024',
        avatar: '👩‍🦰',
      },
    ],
    stats: {
      events: 120,
      experience: '10 años',
      responseTime: '< 2 horas',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER CON BOTONES */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* GALERÍA DE IMÁGENES */}
        <View style={styles.imageGallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setSelectedImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {providerDetails.images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageIcon}>{image}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* INDICADOR DE IMÁGENES */}
          <View style={styles.imageIndicatorContainer}>
            {providerDetails.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.imageIndicatorDot,
                  selectedImageIndex === index && styles.imageIndicatorDotActive,
                ]}
              />
            ))}
          </View>

          {/* CONTADOR DE IMÁGENES */}
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {selectedImageIndex + 1} / {providerDetails.images.length}
            </Text>
          </View>
        </View>

        {/* CONTENIDO PRINCIPAL */}
        <View style={styles.content}>
          {/* INFORMACIÓN PRINCIPAL */}
          <View style={styles.mainInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.providerName}>{providerDetails.name}</Text>
              {providerDetails.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>

            <Text style={styles.category}>{providerDetails.category}</Text>

            {/* RATING Y RESEÑAS */}
            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.ratingText}>{providerDetails.rating}</Text>
                <Text style={styles.reviewsText}>
     ({providerDetails.reviews.length} reseñas)
    </Text>
              </View>
            </View>

            {/* ESTADÍSTICAS RÁPIDAS */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🎉</Text>
                <Text style={styles.statValue}>{providerDetails.stats.events}</Text>
                <Text style={styles.statLabel}>Eventos</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>⏱️</Text>
                <Text style={styles.statValue}>{providerDetails.stats.experience}</Text>
                <Text style={styles.statLabel}>Experiencia</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>💬</Text>
                <Text style={styles.statValue}>{providerDetails.stats.responseTime}</Text>
                <Text style={styles.statLabel}>Respuesta</Text>
              </View>
            </View>
          </View>

          {/* DESCRIPCIÓN */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acerca de nosotros</Text>
            <Text style={styles.descriptionText}>{providerDetails.description}</Text>
          </View>

          {/* SERVICIOS INCLUIDOS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios incluidos</Text>
            <View style={styles.servicesList}>
              {providerDetails.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <View style={styles.checkCircle}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* LISTA DE PRODUCTOS/PAQUETES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Paquetes y Precios</Text>
            {providerDetails.products.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productHeader}>
                  <View style={styles.productIconContainer}>
                    <Text style={styles.productIcon}>{product.icon}</Text>
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productDescription}>
                      {product.description}
                    </Text>
                    <View style={styles.productDetails}>
                      <Text style={styles.productDuration}>
                        ⏱️ {product.duration}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>${product.price} MXN</Text>
                </View>
              </View>
            ))}
          </View>

          {/* RESEÑAS */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reseñas</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllLink}>Ver todas</Text>
              </TouchableOpacity>
            </View>

            {providerDetails.reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewUserInfo}>
                    <View style={styles.reviewAvatar}>
                      <Text style={styles.reviewAvatarText}>{review.avatar}</Text>
                    </View>
                    <View>
                      <Text style={styles.reviewUserName}>{review.userName}</Text>
                      <View style={styles.reviewStars}>
                        {[...Array(5)].map((_, i) => (
                          <Text
                            key={i}
                            style={[
                              styles.reviewStar,
                              i < review.rating && styles.reviewStarFilled,
                            ]}
                          >
                            ⭐
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* ESPACIADO PARA EL BOTÓN FLOTANTE */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* BOTÓN DE ACCIÓN FLOTANTE */}
      <View style={styles.floatingButtonContainer}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Desde</Text>
          <Text style={styles.priceAmount}>${providerDetails.priceFrom} MXN</Text>
        </View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
          const firstPackage = providerDetails.products[0];

          navigation.navigate('Booking', {
          provider: providerDetails,
          packageItem: firstPackage,
          });
        }}
        >
          <Text style={styles.actionButtonText}>Verificar Disponibilidad</Text>
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

  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteIcon: {
    fontSize: 24,
  },

  // Galería de imágenes
  imageGallery: {
    height: 320,
    backgroundColor: COLORS.border,
  },
  imageContainer: {
    width: width,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    fontSize: 100,
  },
  imageIndicatorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  imageIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  imageIndicatorDotActive: {
    backgroundColor: COLORS.white,
    width: 24,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  imageCounterText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },

  // Contenido
  content: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
  },

  // Información principal
  mainInfo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  providerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: COLORS.success,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 12,
  },

  // Rating
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  // Estadísticas
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },

  // Secciones
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 24,
  },

  // Servicios
  servicesList: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkMark: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: 'bold',
  },
  serviceText: {
    fontSize: 15,
    color: COLORS.text,
    flex: 1,
  },

  // Productos/Paquetes
  productCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productIcon: {
    fontSize: 28,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDuration: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  // Reseñas
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reviewAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewAvatarText: {
    fontSize: 24,
  },
  reviewUserName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewStar: {
    fontSize: 12,
    opacity: 0.3,
  },
  reviewStarFilled: {
    opacity: 1,
  },
  reviewDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  reviewComment: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },

  // Botón flotante
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    gap: 16,
  },
  priceInfo: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  priceAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  actionButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});