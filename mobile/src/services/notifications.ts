import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Alert } from 'react-native';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface EventReminder {
  id: string;
  eventDate: Date;
  clientName: string;
  packageName: string;
}

// Request permissions for notifications
export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    Alert.alert('Error', 'Las notificaciones push requieren un dispositivo físico');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert(
      'Permisos requeridos',
      'Para recibir recordatorios de eventos, necesitas habilitar las notificaciones en la configuración de tu dispositivo.'
    );
    return false;
  }

  // Configure Android channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('event-reminders', {
      name: 'Recordatorios de Eventos',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#eac35c',
    });
  }

  return true;
}

// Schedule a reminder notification
export async function scheduleEventReminder(
  eventDate: Date,
  clientName: string,
  packageName: string,
  daysBefore: number = 7
): Promise<string | null> {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return null;

  const reminderDate = new Date(eventDate);
  reminderDate.setDate(reminderDate.getDate() - daysBefore);
  reminderDate.setHours(10, 0, 0, 0); // 10:00 AM

  // Don't schedule if reminder date is in the past
  if (reminderDate <= new Date()) {
    return null;
  }

  const formattedEventDate = format(eventDate, "d 'de' MMMM", { locale: es });
  const daysText = daysBefore === 1 ? 'mañana' : `en ${daysBefore} días`;

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: '💃 ¡Tu evento se acerca!',
      body: `Hola ${clientName}, tu celebración de XV Años es ${daysText} (${formattedEventDate}). ¡Estamos emocionados de bailar contigo!`,
      data: { eventDate: eventDate.toISOString(), clientName, packageName },
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDate,
    },
  });

  return notificationId;
}

// Schedule multiple reminders (7 days, 3 days, 1 day before)
export async function scheduleAllEventReminders(
  eventDate: Date,
  clientName: string,
  packageName: string
): Promise<string[]> {
  const notificationIds: string[] = [];
  const daysToRemind = [7, 3, 1];

  for (const days of daysToRemind) {
    const daysUntilEvent = differenceInDays(eventDate, new Date());
    if (daysUntilEvent >= days) {
      const id = await scheduleEventReminder(eventDate, clientName, packageName, days);
      if (id) notificationIds.push(id);
    }
  }

  return notificationIds;
}

// Cancel a scheduled notification
export async function cancelEventReminder(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

// Cancel all scheduled notifications
export async function cancelAllReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Get all scheduled notifications
export async function getScheduledReminders(): Promise<Notifications.NotificationRequest[]> {
  return await Notifications.getAllScheduledNotificationsAsync();
}

// Get push token for backend integration (optional future use)
export async function getExpoPushToken(): Promise<string | null> {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return null;

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'ecos-del-sur-app',
    });
    return token.data;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
}
