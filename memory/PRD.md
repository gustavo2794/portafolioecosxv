# PRD - Ecos del Sur Mobile App

## Problema Original
Crear una aplicación móvil React Native para "Compañía de Danza Ecos del Sur" - un portafolio digital para mostrar servicios de coreografía para fiestas de XV Años, con integración de WhatsApp para cotizaciones.

## Arquitectura
- **Framework**: React Native con Expo SDK 55
- **Navegación**: React Navigation (Drawer)
- **Animaciones**: React Native Reanimated
- **Notificaciones**: Expo Notifications
- **Estado**: React Hooks (useState, useEffect, useCallback)

## User Personas
1. **Padres de familia**: Buscan servicios de coreografía para la fiesta de XV años de su hija
2. **Quinceañeras**: Jóvenes que quieren personalizar su celebración
3. **Organizadores de eventos**: Profesionales buscando servicios de baile

## Core Requirements (Estático)
- ✅ Tema oscuro elegante con acentos dorados
- ✅ Navegación con menú hamburguesa
- ✅ Portafolio de videos de YouTube
- ✅ Catálogo de paquetes de servicios
- ✅ Galería de fotos con lightbox
- ✅ Integración con WhatsApp para cotizaciones
- ✅ Constructor de paquete personalizado
- ✅ Botón flotante de WhatsApp

## Implementado

### Versión 1.0 (24 Marzo 2026)
- Estructura inicial del proyecto React Native/Expo
- 4 pantallas principales: Inicio, Proyectos, Paquetes, Galería
- Navegación Drawer completa
- Componentes: Button, Card, QuoteModal, CustomPackageModal, WhatsAppFAB
- Sistema de temas con constantes (Colors, Fonts, Spacing)
- Datos hardcodeados de contenido (videos, paquetes, galería)
- TypeScript sin errores

### Versión 1.1 (24 Marzo 2026)
- **Notificaciones Push** con expo-notifications
- Recordatorios automáticos de eventos (7, 3, 1 días antes)
- Nueva pantalla: RemindersScreen para gestionar recordatorios
- Toggle de activación en modales de cotización
- Servicio de notificaciones con funciones completas

## Backlog Priorizado

### P0 (Crítico)
- Ninguno pendiente

### P1 (Alta prioridad)
- Añadir persistencia local con AsyncStorage
- Soporte offline para contenido

### P2 (Media prioridad)
- Analytics con Expo Analytics
- Deep linking para compartir paquetes
- Modo claro alternativo

### P3 (Baja prioridad)
- Animaciones Lottie para transiciones
- Soporte multi-idioma (inglés)
- Widget de Android para próximo evento

## Próximos Pasos
1. Probar en dispositivo físico con Expo Go
2. Configurar EAS Build para generar APK/AAB
3. Preparar assets para Google Play Store
4. Configurar notificaciones push remotas con Expo Push Service (opcional)
