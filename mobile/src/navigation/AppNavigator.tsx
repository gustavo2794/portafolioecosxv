import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { HomeScreen, ProjectsScreen, PackagesScreen, GalleryScreen, RemindersScreen } from '../screens';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';
import { LOGO_ICON } from '../constants/data';
import { Button } from '../components/Button';

export type RootDrawerParamList = {
  Inicio: undefined;
  Proyectos: undefined;
  Paquetes: undefined;
  Galeria: undefined;
  Recordatorios: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { state, navigation } = props;
  const currentRoute = state.routes[state.index].name;

  const menuItems: { name: keyof RootDrawerParamList; label: string; icon: string }[] = [
    { name: 'Inicio', label: 'Inicio', icon: 'home' },
    { name: 'Proyectos', label: 'Proyectos', icon: 'video' },
    { name: 'Paquetes', label: 'Paquetes', icon: 'package' },
    { name: 'Galeria', label: 'Galería', icon: 'image' },
    { name: 'Recordatorios', label: 'Recordatorios', icon: 'bell' },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      style={styles.drawerContainer}
      contentContainerStyle={styles.drawerContent}
    >
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: LOGO_ICON }}
          style={styles.drawerLogo}
          resizeMode="contain"
        />
        <Text style={styles.drawerTitle}>Ecos del Sur</Text>
      </View>

      <View style={styles.menuItems}>
        {menuItems.map((item) => {
          const isActive = currentRoute === item.name;
          return (
            <TouchableOpacity
              key={item.name}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => navigation.navigate(item.name)}
              testID={`drawer-${item.name.toLowerCase()}`}
            >
              <Feather
                name={item.icon as any}
                size={22}
                color={isActive ? Colors.primaryRgb : Colors.textMutedRgb}
              />
              <Text
                style={[
                  styles.menuItemText,
                  isActive && styles.menuItemTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};

const HeaderRight: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  return (
    <Button
      title="Cotiza Aquí"
      onPress={() => navigation.navigate('Paquetes')}
      size="sm"
      style={styles.headerButton}
      testID="header-quote-btn"
    />
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.backgroundRgb,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.cardBorder,
        },
        headerTintColor: Colors.textRgb,
        headerTitleStyle: {
          fontFamily: Fonts.headline,
          fontSize: 18,
        },
        headerTitle: () => (
          <Image
            source={{ uri: LOGO_ICON }}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        ),
        headerRight: () => <HeaderRight />,
        drawerStyle: {
          backgroundColor: Colors.backgroundRgb,
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Proyectos" component={ProjectsScreen} />
      <Drawer.Screen name="Paquetes" component={PackagesScreen} />
      <Drawer.Screen name="Galeria" component={GalleryScreen} />
      <Drawer.Screen name="Recordatorios" component={RemindersScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: Colors.backgroundRgb,
  },
  drawerContent: {
    flex: 1,
    paddingTop: Spacing.xl,
  },
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    marginHorizontal: Spacing.md,
  },
  drawerLogo: {
    width: 60,
    height: 60,
    marginBottom: Spacing.sm,
  },
  drawerTitle: {
    fontFamily: Fonts.headline,
    fontSize: 20,
    color: Colors.primaryRgb,
  },
  menuItems: {
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
    gap: Spacing.md,
  },
  menuItemActive: {
    backgroundColor: 'rgba(234, 195, 92, 0.15)',
  },
  menuItemText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.textMutedRgb,
  },
  menuItemTextActive: {
    fontFamily: Fonts.bodyBold,
    color: Colors.primaryRgb,
  },
  headerLogo: {
    width: 36,
    height: 36,
  },
  headerButton: {
    marginRight: Spacing.md,
  },
});
