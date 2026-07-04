import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';
import { galleryImages, GalleryImage, LOGO_FULL } from '../constants/data';
import { WhatsAppFAB } from '../components/WhatsAppFAB';
import { CustomPackageModal } from '../components/CustomPackageModal';

const { width, height } = Dimensions.get('window');
const COLUMN_WIDTH = (width - Spacing.md * 3) / 2;

// Create masonry-like heights
const getImageHeight = (index: number) => {
  const heights = [180, 240, 200, 260, 220, 200, 240, 180];
  return heights[index % heights.length];
};

export const GalleryScreen: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [customModalVisible, setCustomModalVisible] = useState(false);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return;
    if (direction === 'prev') {
      setSelectedIndex(
        selectedIndex > 0 ? selectedIndex - 1 : galleryImages.length - 1
      );
    } else {
      setSelectedIndex(
        selectedIndex < galleryImages.length - 1 ? selectedIndex + 1 : 0
      );
    }
  };

  // Split images into two columns for masonry effect
  const leftColumn = galleryImages.filter((_, i) => i % 2 === 0);
  const rightColumn = galleryImages.filter((_, i) => i % 2 === 1);

  const renderImage = (item: GalleryImage, globalIndex: number, columnIndex: number) => (
    <Animated.View
      key={item.id}
      entering={FadeInUp.delay(columnIndex * 100).duration(600)}
    >
      <TouchableOpacity
        style={[
          styles.imageCard,
          { height: getImageHeight(globalIndex) },
        ]}
        onPress={() => setSelectedIndex(globalIndex)}
        activeOpacity={0.8}
        testID={`gallery-image-${item.id}`}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[1]} // Just one item to render the header and columns
        renderItem={() => (
          <View style={styles.masonryContainer}>
            <View style={styles.column}>
              {leftColumn.map((item, idx) =>
                renderImage(item, idx * 2, idx)
              )}
            </View>
            <View style={styles.column}>
              {rightColumn.map((item, idx) =>
                renderImage(item, idx * 2 + 1, idx)
              )}
            </View>
          </View>
        )}
        keyExtractor={() => 'masonry'}
        ListHeaderComponent={
          <View style={styles.header}>
            <Image
              source={{ uri: LOGO_FULL }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Nuestra Galería</Text>
            <Text style={styles.subtitle}>
              Momentos capturados de nuestras celebraciones más especiales.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Lightbox Modal */}
      <Modal
        visible={selectedIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedIndex(null)}
      >
        <View style={styles.lightboxOverlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedIndex(null)}
            testID="close-lightbox"
          >
            <Feather name="x" size={28} color="white" />
          </TouchableOpacity>

          {selectedIndex !== null && (
            <>
              <TouchableOpacity
                style={[styles.navButton, styles.navLeft]}
                onPress={() => navigateImage('prev')}
                testID="lightbox-prev"
              >
                <Feather name="chevron-left" size={36} color="white" />
              </TouchableOpacity>

              <Image
                source={{ uri: galleryImages[selectedIndex].imageUrl }}
                style={styles.lightboxImage}
                resizeMode="contain"
              />

              <TouchableOpacity
                style={[styles.navButton, styles.navRight]}
                onPress={() => navigateImage('next')}
                testID="lightbox-next"
              >
                <Feather name="chevron-right" size={36} color="white" />
              </TouchableOpacity>

              <Text style={styles.lightboxCaption}>
                {galleryImages[selectedIndex].description}
              </Text>
              <Text style={styles.lightboxCounter}>
                {selectedIndex + 1} / {galleryImages.length}
              </Text>
            </>
          )}
        </View>
      </Modal>

      <WhatsAppFAB onPress={() => setCustomModalVisible(true)} />
      <CustomPackageModal
        visible={customModalVisible}
        onClose={() => setCustomModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundRgb,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  logo: {
    width: 240,
    height: 80,
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.headline,
    fontSize: 28,
    color: Colors.primaryRgb,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMutedRgb,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  masonryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: COLUMN_WIDTH,
  },
  imageCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  lightboxOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: Spacing.sm,
  },
  lightboxImage: {
    width: width - Spacing.xl * 2,
    height: height * 0.6,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  navLeft: {
    left: Spacing.md,
  },
  navRight: {
    right: Spacing.md,
  },
  lightboxCaption: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textRgb,
    textAlign: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  lightboxCounter: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMutedRgb,
    marginTop: Spacing.sm,
  },
});
