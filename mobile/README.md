# Ecos del Sur - Aplicación Móvil React Native

Aplicación móvil para la Compañía de Danza Ecos del Sur, desarrollada con React Native y Expo.

## 📱 Características

### Pantallas
- **Inicio**: Página principal con hero image, logo y llamada a la acción
- **Proyectos**: Galería de videos de YouTube con reproductor embebido
- **Paquetes**: Lista de paquetes de servicios con solicitud de cotización
- **Galería**: Galería tipo masonry con lightbox para ver imágenes

### Funcionalidades
- ✅ Menú lateral (drawer navigation)
- ✅ Reproductor de YouTube embebido
- ✅ Modal de cotización con WhatsApp
- ✅ Constructor de paquete personalizado
- ✅ Botón flotante de WhatsApp (FAB)
- ✅ Selector de fecha para eventos
- ✅ Lightbox para galería con navegación swipe
- ✅ Animaciones sutiles y elegantes
- ✅ **Notificaciones Push** - Recordatorios automáticos de eventos (7, 3 y 1 día antes)

## 🎨 Diseño

### Paleta de Colores
- **Fondo Principal**: Azul marino oscuro (`#0f172a`)
- **Color Primario**: Dorado (`#eac35c`)
- **Color de Acento**: Rojo vino (`#a32e49`)
- **Texto Principal**: Blanco/Gris claro
- **Texto Secundario**: Gris

### Tipografía
- **Títulos**: Playfair Display (serif)
- **Cuerpo**: PT Sans (sans-serif)

## 🚀 Instalación

```bash
# Instalar dependencias
cd mobile
npm install

# Iniciar en modo desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS (requiere macOS)
npm run ios

# Ejecutar en web
npm run web
```

## 📦 Construir para producción

### Android (APK/AAB)
```bash
# Instalar EAS CLI
npm install -g eas-cli

# Configurar EAS
eas build:configure

# Construir APK para desarrollo
eas build --platform android --profile preview

# Construir AAB para Play Store
eas build --platform android --profile production
```

### iOS
```bash
# Construir para App Store (requiere cuenta de Apple Developer)
eas build --platform ios --profile production
```

## 📁 Estructura del Proyecto

```
mobile/
├── App.tsx                 # Componente principal
├── app.json               # Configuración de Expo
├── package.json           # Dependencias
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── CustomPackageModal.tsx
│   │   ├── QuoteModal.tsx
│   │   └── WhatsAppFAB.tsx
│   ├── constants/         # Constantes y datos
│   │   ├── data.ts        # Contenido de la app
│   │   └── theme.ts       # Colores, fuentes, espaciado
│   ├── navigation/        # Configuración de navegación
│   │   └── AppNavigator.tsx
│   ├── screens/           # Pantallas
│   │   ├── HomeScreen.tsx
│   │   ├── ProjectsScreen.tsx
│   │   ├── PackagesScreen.tsx
│   │   ├── GalleryScreen.tsx
│   │   └── RemindersScreen.tsx  # Nueva: Gestión de recordatorios
│   ├── services/          # Servicios
│   │   └── notifications.ts     # Servicio de notificaciones push
│   └── utils/             # Utilidades
│       └── whatsapp.ts    # Funciones de WhatsApp
└── assets/                # Recursos estáticos
```

## 🔔 Notificaciones Push

La app incluye un sistema de recordatorios automáticos para eventos:

### Características
- **Recordatorios automáticos**: Se programan notificaciones 7, 3 y 1 día antes del evento
- **Toggle de activación**: El usuario puede activar/desactivar los recordatorios al solicitar cotización
- **Gestión de recordatorios**: Pantalla dedicada para ver y cancelar recordatorios programados
- **Permisos**: La app solicita permisos de notificación solo cuando es necesario

### Uso
1. Al solicitar una cotización con fecha de evento, aparece un switch para activar recordatorios
2. Si se activa, se programan notificaciones automáticas
3. En la pantalla "Recordatorios" del menú lateral se pueden ver y gestionar los recordatorios activos

## 🔧 Dependencias Principales

- **expo**: ~55.0.8
- **react-native**: 0.83.2
- **@react-navigation/drawer**: Navegación con menú lateral
- **react-native-reanimated**: Animaciones fluidas
- **react-native-webview**: Reproductor de YouTube
- **date-fns**: Formateo de fechas

## 📞 Contacto

Número de WhatsApp configurado: `+52 55 2809 8448`

## 🔄 Actualizaciones de Contenido

Para actualizar el contenido de la app, edita el archivo:
- `src/constants/data.ts`

Este archivo contiene:
- URLs de imágenes y logos
- Proyectos/videos de YouTube
- Paquetes y sus características
- Imágenes de la galería
- Opciones del constructor de paquetes

## 📱 Publicación en Play Store

1. Registra una cuenta de Google Play Developer ($25 USD)
2. Configura EAS Build en tu proyecto
3. Genera el AAB con `eas build --platform android`
4. Sube el AAB a Google Play Console
5. Completa la información de la app (descripción, capturas, etc.)
6. Envía para revisión
