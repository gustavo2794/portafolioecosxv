import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isBefore, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';
import { Button } from './Button';
import { buildPackageQuoteMessage, openWhatsApp } from '../utils/whatsapp';
import { scheduleAllEventReminders } from '../services/notifications';

interface QuoteModalProps {
  visible: boolean;
  onClose: () => void;
  packageName: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  visible,
  onClose,
  packageName,
}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [enableReminders, setEnableReminders] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Por favor, introduce tu nombre.');
      return;
    }
    if (date && isBefore(date, startOfToday())) {
      Alert.alert('Error', 'Por favor, selecciona una fecha válida en el futuro para tu evento.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Schedule reminders if enabled and date is provided
      if (enableReminders && date) {
        const scheduledIds = await scheduleAllEventReminders(date, name, packageName);
        if (scheduledIds.length > 0) {
          Alert.alert(
            '🔔 Recordatorios programados',
            `Te enviaremos recordatorios antes de tu evento para que no olvides ningún detalle.`,
            [{ text: 'Continuar', onPress: () => sendWhatsApp() }]
          );
        } else {
          sendWhatsApp();
        }
      } else {
        sendWhatsApp();
      }
    } catch (error) {
      console.error('Error scheduling reminders:', error);
      sendWhatsApp();
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendWhatsApp = async () => {
    const message = buildPackageQuoteMessage(packageName, name, date);
    await openWhatsApp(message);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setDate(undefined);
    setEnableReminders(true);
    onClose();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>Solicitar Cotización</Text>
              <Text style={styles.subtitle}>
                Por favor, completa tus datos para enviarte la cotización.
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tu Nombre</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Tu nombre"
                  placeholderTextColor={Colors.textMutedRgb}
                  testID="quote-name-input"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha del Evento (Opcional)</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                  testID="quote-date-picker"
                >
                  <FontAwesome name="calendar" size={18} color={Colors.textMutedRgb} />
                  <Text style={[styles.dateText, !date && styles.datePlaceholder]}>
                    {date ? format(date, 'PPP', { locale: es }) : 'Elige una fecha'}
                  </Text>
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}

              {date && (
                <View style={styles.reminderContainer}>
                  <View style={styles.reminderRow}>
                    <View style={styles.reminderTextContainer}>
                      <Feather name="bell" size={20} color={Colors.primaryRgb} />
                      <Text style={styles.reminderLabel}>Recordatorios del evento</Text>
                    </View>
                    <Switch
                      value={enableReminders}
                      onValueChange={setEnableReminders}
                      trackColor={{ false: Colors.textMutedRgb, true: Colors.primaryRgb }}
                      thumbColor={enableReminders ? '#fff' : '#f4f3f4'}
                      testID="reminder-switch"
                    />
                  </View>
                  <Text style={styles.reminderHint}>
                    Te notificaremos 7, 3 y 1 día antes de tu evento
                  </Text>
                </View>
              )}

              <Button
                title="Enviar por WhatsApp"
                onPress={handleSubmit}
                style={styles.submitButton}
                loading={isSubmitting}
                testID="quote-submit-button"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modal: {
    backgroundColor: Colors.backgroundRgb,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  title: {
    fontFamily: Fonts.headline,
    fontSize: 24,
    color: Colors.textRgb,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMutedRgb,
    marginBottom: Spacing.lg,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
    color: Colors.textRgb,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: Colors.textRgb,
    fontFamily: Fonts.body,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: Spacing.sm,
  },
  dateText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.textRgb,
  },
  datePlaceholder: {
    color: Colors.textMutedRgb,
  },
  reminderContainer: {
    backgroundColor: 'rgba(234, 195, 92, 0.1)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(234, 195, 92, 0.3)',
  },
  reminderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  reminderLabel: {
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
    color: Colors.textRgb,
  },
  reminderHint: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textMutedRgb,
    marginTop: Spacing.xs,
  },
  submitButton: {
    marginTop: Spacing.md,
  },
});
