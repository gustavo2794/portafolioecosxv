// All content data for Ecos del Sur App

export const WHATSAPP_NUMBER = '525528098448';

export const LOGO_FULL = 'https://res.cloudinary.com/drylg7prb/image/upload/v1761183135/LOGO_ECOS_2024_cldy7v.png';
export const LOGO_ICON = 'https://res.cloudinary.com/drylg7prb/image/upload/v1761183133/Letra_E_Ecos_vikchj.png';
export const HERO_BACKGROUND = 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188172/XV_1_1_m4qbud.png';

export interface Project {
  id: string;
  title: string;
  youtubeVideoId: string;
  imageUrl: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 'project-5',
    title: 'OPENING',
    youtubeVideoId: 'xvStAvolUQU',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188199/min_opening_ywn6uw.png',
    description: 'Presentacion de quinceañera con tematica de arlequines.',
  },
  {
    id: 'project-7',
    title: 'Vals de Entrada',
    youtubeVideoId: 'V_wTqHT3Mh0',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761183361/Vals_Entrada_ahcplm.png',
    description: 'Una interpretación moderna y dinámica del tradicional vals de entrada.',
  },
  {
    id: 'project-6',
    title: 'Vals Principal',
    youtubeVideoId: 'Ihajp1w0rxA',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188092/vals_principal_mma1bf.png',
    description: 'El emotivo vals principal de la quinceañera.',
  },
  {
    id: 'project-mix-reggaeton',
    title: 'Mix Reggaeton',
    youtubeVideoId: '1ISY6kLm6Cg',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188117/Mix_reggaeton_1_rpqirl.png',
    description: 'Mix de Reggaeton moderno para XV años.',
  },
  {
    id: 'project-mix-salsa-merengue',
    title: 'Mix Salsa y Merengue',
    youtubeVideoId: 'w0EEKnJdJFk',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188168/Mix_salsa_merengue_w24qxb.png',
    description: 'Mix de Salsa y Merengue para XV años.',
  },
];

export interface Package {
  name: string;
  features: string[];
  bgColor: string;
  borderColor: string;
}

export const packages: Package[] = [
  {
    name: 'Paquete Básico',
    features: [
      'Vals entrada',
      'Vals protocolos (juguete, coronación, zapatilla, brindis)',
      'Vals principal',
    ],
    bgColor: 'rgba(107, 114, 128, 0.1)',
    borderColor: 'rgb(75, 85, 99)',
  },
  {
    name: 'Paquete Plata',
    features: [
      'Vals entrada',
      'Vals protocolos (juguete, coronación, zapatilla, brindis)',
      'Vals principal',
      'Vals familiar',
      'Mix moderno (3 canciones)',
    ],
    bgColor: 'rgba(148, 163, 184, 0.1)',
    borderColor: 'rgb(148, 163, 184)',
  },
  {
    name: 'Paquete Oro',
    features: [
      'Vals entrada',
      'Vals protocolos (juguete, coronación, zapatilla, brindis)',
      'Vals principal',
      'Vals familiar',
      'Mix moderno 1',
      'Mix moderno 2',
    ],
    bgColor: 'rgba(250, 204, 21, 0.1)',
    borderColor: 'rgb(250, 204, 21)',
  },
  {
    name: 'Paquete Platinum',
    features: [
      'Opening',
      'Vals entrada',
      'Vals protocolos (juguete, coronación, zapatilla, brindis)',
      'Vals principal',
      'Vals familiar',
      'Mix moderno 1',
      'Mix moderno 2',
      '4 Bailarines',
    ],
    bgColor: 'rgba(147, 197, 253, 0.1)',
    borderColor: 'rgb(147, 197, 253)',
  },
  {
    name: 'Paquete Diamante',
    features: [
      'Opening',
      'Vals entrada',
      'Vals protocolos (juguete, coronación, zapatilla, brindis)',
      'Vals principal',
      'Vals familiar',
      'Mix moderno 1',
      'Mix moderno 2',
      '4 Bailarines',
      'Vestuario para bailarines y quinceañera',
      'Pirotecnia',
    ],
    bgColor: 'rgba(192, 132, 252, 0.1)',
    borderColor: 'rgb(192, 132, 252)',
  },
];

export interface GalleryImage {
  id: string;
  imageUrl: string;
  description: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'project-sahory',
    description: 'Sesión de fotos de la quinceañera Sahory.',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761202685/XV_Sahory_hjsj9j.png',
  },
  {
    id: 'project-zayuri',
    description: 'Sesión de fotos de la quinceañera Zayuri.',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761202158/XV_Zayuri_slg8lh.png',
  },
  {
    id: 'project-5',
    description: 'Presentacion de quinceañera con tematica de arlequines.',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188199/min_opening_ywn6uw.png',
  },
  {
    id: 'project-7',
    description: 'Una interpretación moderna y dinámica del tradicional vals de entrada.',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761183361/Vals_Entrada_ahcplm.png',
  },
  {
    id: 'hero-background',
    description: 'Una impresionante foto de una quinceañera en su vestido, lista para bailar.',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188172/XV_1_1_m4qbud.png',
  },
  {
    id: 'project-6',
    description: 'El emotivo vals principal de la quinceañera.',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188092/vals_principal_mma1bf.png',
  },
  {
    id: 'project-mix-reggaeton',
    description: 'Mix de Reggaeton moderno para XV años.',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188117/Mix_reggaeton_1_rpqirl.png',
  },
  {
    id: 'project-mix-salsa-merengue',
    description: 'Mix de Salsa y Merengue para XV años.',
    imageUrl: 'https://res.cloudinary.com/drylg7prb/image/upload/v1761188168/Mix_salsa_merengue_w24qxb.png',
  },
];

export const customPackageFeatures = [
  { id: 'opening', label: 'Opening' },
  { id: 'vals-entrada', label: 'Vals entrada' },
  { id: 'vals-protocolos', label: 'Vals protocolos (juguete, coronación, zapatilla, brindis)' },
  { id: 'vals-principal', label: 'Vals principal' },
  { id: 'vals-familiar', label: 'Vals familiar' },
  { id: 'mix-moderno-1', label: 'Mix moderno 1' },
  { id: 'mix-moderno-2', label: 'Mix moderno 2' },
  { id: 'vestuario', label: 'Vestuario para bailarines y quinceañera' },
  { id: 'pirotecnia', label: 'Pirotecnia' },
];
