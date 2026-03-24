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
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { format, isBefore, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';
import { Button } from './Button';
import { customPackageFeatures } from '../constants/data';
import { buildCustomPackageMessage, openWhatsApp } from '../utils/whatsapp';

interface CustomPackageModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CustomPackageModal: React.FC<CustomPackageModalProps> = ({
  visible,
  onClose,
}) => {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>(
    customPackageFeatures.reduce((acc, f) => ({ ...acc, [f.id]: false }), {})
  );
  const [numBailarines, setNumBailarines] = useState(0);
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [specialRequest, setSpecialRequest] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Por favor, introduce tu nombre.');
      return;
    }
    if (date && isBefore(date, startOfToday())) {
      Alert.alert('Error', 'Por favor, selecciona una fecha válida en el futuro para tu evento.');
      return;
    }

    const selectedLabels = customPackageFeatures
      .filter((f) => selectedFeatures[f.id])
      .map((f) => f.label);

    if (selectedLabels.length === 0 && numBailarines === 0 && !specialRequest.trim()) {
      Alert.alert(
        'Error',
        'Por favor, selecciona al menos una opción o escribe una petición para solicitar una cotización.'
      );
      return;
    }

    const message = buildCustomPackageMessage(
      name,
      selectedLabels,
      numBailarines,
      specialRequest,
      date
    );
    await openWhatsApp(message);
    handleClose();
  };

  const handleClose = () => {
    setSelectedFeatures(
      customPackageFeatures.reduce((acc, f) => ({ ...acc, [f.id]: false }), {})
    );
    setNumBailarines(0);
    setName('');
    setDate(undefined);
    setSpecialRequest('');
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
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Feather name="package" size={28} color={Colors.primaryRgb} />
              <Text style={styles.title}>Arma tu Paquete</Text>
            </View>
            <TouchableOpacity onPress={handleClose} testID="custom-package-close">
              <Feather name="x" size={24} color={Colors.textMutedRgb} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Selecciona los elementos que deseas incluir en tu celebración.
          </Text>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Elige los Componentes</Text>
            {customPackageFeatures.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.checkboxRow}
                onPress={() => toggleFeature(feature.id)}
                activeOpacity={0.7}
                testID={`feature-${feature.id}`}
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedFeatures[feature.id] && styles.checkboxChecked,
                  ]}
                >
                  {selectedFeatures[feature.id] && (
                    <Feather name="check" size={14} color={Colors.backgroundRgb} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{feature.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Bailarines para XV Años</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={numBailarines}
                  onValueChange={(value) => setNumBailarines(value)}
                  style={styles.picker}
                  dropdownIconColor={Colors.textMutedRgb}
                  testID="dancers-picker"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Picker.Item
                      key={num}
                      label={`${num} Bailarín${num !== 1 ? 'es' : ''}`}
                      value={num}
                      color={Colors.textRgb}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Tus Datos</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tu Nombre</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Tu nombre"
                placeholderTextColor={Colors.textMutedRgb}
                testID="custom-name-input"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha del Evento (Opcional)</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
                testID="custom-date-picker"
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

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Peticiones Especiales (Opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={specialRequest}
                onChangeText={setSpecialRequest}
                placeholder="¿Hay algo más que te gustaría incluir? Ej: temática, canción especial, etc."
                placeholderTextColor={Colors.textMutedRgb}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                testID="custom-special-request"
              />
            </View>
          </ScrollView>

          <Button
            title="Solicitar Cotización por WhatsApp"
            onPress={handleSubmit}
            style={styles.submitButton}
            testID="custom-package-submit"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: Colors.backgroundRgb,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontFamily: Fonts.headline,
    fontSize: 22,
    color: Colors.primaryRgb,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textMutedRgb,
    marginBottom: Spacing.md,
  },
  scrollView: {
    maxHeight: 400,
  },
  sectionTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 16,
    color: Colors.primaryRgb,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: Spacing.sm + 4,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.textMutedRgb,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  checkboxChecked: {
    backgroundColor: Colors.primaryRgb,
    borderColor: Colors.primaryRgb,
  },
  checkboxLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textRgb,
    flex: 1,
  },
  pickerContainer: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  pickerWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  picker: {
    color: Colors.textRgb,
    height: 50,
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
  textArea: {
    minHeight: 100,
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
  submitButton: {
    marginTop: Spacing.md,
  },
});
