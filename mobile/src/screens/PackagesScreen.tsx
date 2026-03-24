import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';
import { packages, Package, LOGO_FULL } from '../constants/data';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { QuoteModal } from '../components/QuoteModal';
import { WhatsAppFAB } from '../components/WhatsAppFAB';
import { CustomPackageModal } from '../components/CustomPackageModal';

export const PackagesScreen: React.FC = () => {
  const [quoteModalVisible, setQuoteModalVisible] = useState(false);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const handleRequestQuote = (packageName: string) => {
    setSelectedPackage(packageName);
    setQuoteModalVisible(true);
  };

  const renderPackage = (pkg: Package, index: number) => (
    <Animated.View
      key={pkg.name}
      entering={FadeInUp.delay(index * 100).duration(600)}
    >
      <Card
        style={styles.packageCard}
        bgColor={pkg.bgColor}
        borderColor={pkg.borderColor}
      >
        <Text style={styles.packageName}>{pkg.name}</Text>
        <View style={styles.featuresList}>
          {pkg.features.map((feature, idx) => (
            <View key={idx} style={styles.featureRow}>
              <Feather name="check" size={18} color={Colors.success} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <Button
          title="Solicitar"
          onPress={() => handleRequestQuote(pkg.name)}
          style={styles.packageButton}
          testID={`package-btn-${pkg.name.replace(/\s/g, '-').toLowerCase()}`}
        />
      </Card>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: LOGO_FULL }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Nuestros Paquetes</Text>
          <Text style={styles.subtitle}>
            Elige el plan perfecto para hacer de tu celebración un evento
            inolvidable.
          </Text>
        </View>

        {packages.map((pkg, index) => renderPackage(pkg, index))}

        {/* Custom Package Card */}
        <Animated.View entering={FadeInUp.delay(packages.length * 100).duration(600)}>
          <Card style={styles.customCard}>
            <View style={styles.customHeader}>
              <Feather name="package" size={40} color={Colors.primaryRgb} />
              <Text style={styles.customTitle}>Crea tu Propio Paquete</Text>
            </View>
            <Text style={styles.customDescription}>
              ¿No encuentras lo que buscas? Diseña una experiencia a tu medida
              seleccionando solo lo que necesitas.
            </Text>
            <Button
              title="Comenzar a Construir"
              onPress={() => setCustomModalVisible(true)}
              variant="outline"
              style={styles.customButton}
              testID="custom-package-btn"
            />
          </Card>
        </Animated.View>

        <Text style={styles.disclaimer}>
          *Precios sujetos a cambio sin previo aviso
        </Text>
      </ScrollView>

      <QuoteModal
        visible={quoteModalVisible}
        onClose={() => setQuoteModalVisible(false)}
        packageName={selectedPackage}
      />

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
  scrollContent: {
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
  packageCard: {
    marginBottom: Spacing.md,
  },
  packageName: {
    fontFamily: Fonts.headline,
    fontSize: 22,
    color: Colors.textRgb,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  featuresList: {
    marginBottom: Spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
    gap: Spacing.sm,
  },
  featureText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMutedRgb,
    flex: 1,
  },
  packageButton: {
    marginTop: Spacing.sm,
  },
  customCard: {
    marginBottom: Spacing.md,
    borderColor: Colors.primaryRgb,
    backgroundColor: 'rgba(234, 195, 92, 0.1)',
  },
  customHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  customTitle: {
    fontFamily: Fonts.headline,
    fontSize: 22,
    color: Colors.textRgb,
    textAlign: 'center',
  },
  customDescription: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMutedRgb,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  customButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  disclaimer: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
});
