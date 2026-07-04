import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, Fonts, Spacing } from '../constants/theme';
import { LOGO_FULL, HERO_BACKGROUND } from '../constants/data';
import { Button } from '../components/Button';
import { WhatsAppFAB } from '../components/WhatsAppFAB';
import { CustomPackageModal } from '../components/CustomPackageModal';

const { height } = Dimensions.get('window');

type RootDrawerParamList = {
  Inicio: undefined;
  Proyectos: undefined;
  Paquetes: undefined;
  Galeria: undefined;
};

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const [customModalVisible, setCustomModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: HERO_BACKGROUND }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(200).duration(800)}>
            <Image
              source={{ uri: LOGO_FULL }}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.Text
            style={styles.title}
            entering={FadeInUp.delay(400).duration(800)}
          >
            El Baile de Tus Sueños
          </Animated.Text>

          <Animated.Text
            style={styles.subtitle}
            entering={FadeInUp.delay(600).duration(800)}
          >
            Ecos Del Sur trae pasión, elegancia y coreografías inolvidables a tu
            celebración de XV Años.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(800).duration(800)}>
            <Button
              title="Explora Nuestro Portafolio"
              onPress={() => navigation.navigate('Proyectos')}
              size="lg"
              style={styles.ctaButton}
              testID="explore-portfolio-btn"
            />
          </Animated.View>
        </View>
      </ImageBackground>

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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  logo: {
    width: 280,
    height: 100,
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.headline,
    fontSize: 42,
    color: Colors.textRgb,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
    marginBottom: Spacing.xl,
  },
  ctaButton: {
    minWidth: 250,
  },
});
