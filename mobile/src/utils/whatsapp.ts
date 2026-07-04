import { Linking } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { WHATSAPP_NUMBER } from '../constants/data';

export const openWhatsApp = async (message: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  } else {
    // Fallback to web WhatsApp
    await Linking.openURL(`https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`);
  }
};

export const buildPackageQuoteMessage = (
  packageName: string,
  name: string,
  date?: Date
): string => {
  let message = `Hola, mi nombre es ${name}. Estoy interesado(a) en el ${packageName}.\n`;
  if (date) {
    message += `La fecha de mi evento es el ${format(date, 'PPP', { locale: es })}.\n`;
  }
  message += '¿Podrían darme más información?';
  return message;
};

export const buildCustomPackageMessage = (
  name: string,
  selectedFeatures: string[],
  numBailarines: number,
  specialRequest: string,
  date?: Date
): string => {
  let message = `Hola, mi nombre es ${name}. Me gustaría solicitar una cotización para un paquete personalizado de XV Años.\n`;

  if (date) {
    message += `La fecha de mi evento es el ${format(date, 'PPP', { locale: es })}.\n\n`;
  } else {
    message += '\n';
  }

  const items = [...selectedFeatures];
  if (numBailarines > 0) {
    items.push(`${numBailarines} Bailarín${numBailarines > 1 ? 'es' : ''}`);
  }

  message += 'Características solicitadas:\n';
  if (items.length > 0) {
    message += `- ${items.join('\n- ')}\n`;
  }
  if (specialRequest) {
    message += `\nPeticiones especiales:\n${specialRequest}`;
  }

  return message;
};
