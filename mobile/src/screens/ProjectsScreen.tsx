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
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';
import { projects, Project, LOGO_FULL } from '../constants/data';
import { WhatsAppFAB } from '../components/WhatsAppFAB';
import { CustomPackageModal } from '../components/CustomPackageModal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 3) / 2;

export const ProjectsScreen: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Project | null>(null);
  const [customModalVisible, setCustomModalVisible] = useState(false);

  const renderProject = ({ item, index }: { item: Project; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(600)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setSelectedVideo(item)}
        activeOpacity={0.8}
        testID={`project-card-${item.id}`}
      >
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View style={styles.playOverlay}>
            <View style={styles.playButton}>
              <Feather name="play" size={32} color="white" />
            </View>
          </View>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Image
              source={{ uri: LOGO_FULL }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Nuestros Eventos Pasados</Text>
            <Text style={styles.subtitle}>
              Un vistazo a los momentos mágicos que hemos ayudado a crear.
            </Text>
          </View>
        }
      />

      {/* Video Modal */}
      <Modal
        visible={!!selectedVideo}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedVideo(null)}
      >
        <View style={styles.videoModalOverlay}>
          <TouchableOpacity
            style={styles.closeVideoButton}
            onPress={() => setSelectedVideo(null)}
            testID="close-video-modal"
          >
            <Feather name="x" size={28} color="white" />
          </TouchableOpacity>
          {selectedVideo && (
            <View style={styles.videoContainer}>
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${selectedVideo.youtubeVideoId}?autoplay=1&rel=0`,
                }}
                style={styles.video}
                allowsFullscreenVideo
                javaScriptEnabled
                mediaPlaybackRequiresUserAction={false}
              />
            </View>
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
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
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
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  thumbnailContainer: {
    position: 'relative',
    aspectRatio: 16 / 10,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  cardTitle: {
    fontFamily: Fonts.headline,
    fontSize: 14,
    color: Colors.textRgb,
    textAlign: 'center',
    padding: Spacing.sm,
  },
  videoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeVideoButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: Spacing.sm,
  },
  videoContainer: {
    width: width - Spacing.lg * 2,
    aspectRatio: 16 / 9,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
    backgroundColor: 'black',
  },
});
