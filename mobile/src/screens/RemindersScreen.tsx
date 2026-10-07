import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { WhatsAppFAB } from '../components/WhatsAppFAB';
import { CustomPackageModal } from '../components/CustomPackageModal';
import { cancelEventReminder, cancelAllReminders, getScheduledReminders } from '../services/notifications';

interface ScheduledNotification {
  identifier: string;
  content: {
    title: string | null;
    body: string | null;
    data: Record<string, unknown>;
  };
  trigger: {
    type: string;
    value?: number;
    date?: Date;
  } | null;
}

export const RemindersScreen: React.FC = () => {
  const [reminders, setReminders] = useState<Notifications.NotificationRequest[]>([]);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadReminders = useCallback(async () => {
    const scheduled = await getScheduledReminders();
    setReminders(scheduled);
  }, []);

  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadReminders();
    setRefreshing(false);
  };

  const handleCancelReminder = (id: string) => {
    Alert.alert(
      'Cancelar Recordatorio',
      '¿Estás seguro de que deseas cancelar este recordatorio?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: async () => {
            await cancelEventReminder(id);
            await loadReminders();
          },
        },
      ]
    );
  };

  const handleCancelAll = () => {
    if (reminders.length === 0) return;
    
    Alert.alert(
      'Cancelar Todos',
      '¿Estás seguro de que deseas cancelar todos los recordatorios?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar todos',
          style: 'destructive',
          onPress: async () => {
            await cancelAllReminders();
            await loadReminders();
          },
        },
      ]
    );
  };

  const formatTriggerDate = (trigger: any): string => {
    if (!trigger) return 'Fecha no disponible';
    
    if (trigger.type === 'date' && trigger.value) {
      return format(new Date(trigger.value), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es });
    }
    
    return 'Fecha no disponible';
  };

  const renderReminder = ({ item, index }: { item: Notifications.NotificationRequest; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(600)}>
      <Card style={styles.reminderCard}>
        <View style={styles.reminderHeader}>
          <View style={styles.bellContainer}>
            <Feather name="bell" size={24} color={Colors.primaryRgb} />
          </View>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle} numberOfLines={1}>
              {item.content.title || 'Recordatorio'}
            </Text>
            <Text style={styles.reminderDate}>
              {formatTriggerDate(item.trigger)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleCancelReminder(item.identifier)}
            style={styles.deleteButton}
            testID={`delete-reminder-${item.identifier}`}
          >
            <Feather name="trash-2" size={20} color={Colors.accentRgb} />
          </TouchableOpacity>
        </View>
        <Text style={styles.reminderBody} numberOfLines={2}>
          {item.content.body || ''}
        </Text>
      </Card>
    </Animated.View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="bell-off" size={64} color={Colors.textMutedRgb} />
      <Text style={styles.emptyTitle}>Sin recordatorios</Text>
      <Text style={styles.emptyText}>
        Cuando solicites una cotización con fecha de evento, podrás activar recordatorios automáticos.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item) => item.identifier}
        contentContainerStyle={[
          styles.listContent,
          reminders.length === 0 && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primaryRgb}
            colors={[Colors.primaryRgb]}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Feather name="bell" size={32} color={Colors.primaryRgb} />
              <Text style={styles.title}>Mis Recordatorios</Text>
            </View>
            <Text style={styles.subtitle}>
              {reminders.length > 0
                ? `Tienes ${reminders.length} recordatorio${reminders.length > 1 ? 's' : ''} programado${reminders.length > 1 ? 's' : ''}`
                : 'Gestiona tus recordatorios de eventos aquí'}
            </Text>
            {reminders.length > 0 && (
              <Button
                title="Cancelar todos"
                onPress={handleCancelAll}
                variant="outline"
                size="sm"
                style={styles.cancelAllButton}
                testID="cancel-all-reminders"
              />
            )}
          </View>
        }
        ListEmptyComponent={EmptyState}
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
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 100,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  header: {
    paddingVertical: Spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  title: {
    fontFamily: Fonts.headline,
    fontSize: 28,
    color: Colors.primaryRgb,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMutedRgb,
    marginBottom: Spacing.md,
  },
  cancelAllButton: {
    alignSelf: 'flex-start',
  },
  reminderCard: {
    marginBottom: Spacing.md,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  bellContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(234, 195, 92, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 16,
    color: Colors.textRgb,
  },
  reminderDate: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.primaryRgb,
    marginTop: 2,
  },
  deleteButton: {
    padding: Spacing.sm,
  },
  reminderBody: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMutedRgb,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontFamily: Fonts.headline,
    fontSize: 22,
    color: Colors.textRgb,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMutedRgb,
    textAlign: 'center',
    lineHeight: 22,
  },
});
