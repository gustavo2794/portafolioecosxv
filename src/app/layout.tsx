
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import FloatingWhatsappButton from '@/components/layout/floating-whatsapp-button';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-sans',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});


export const metadata: Metadata = {
  title: 'Compañia de Danza Ecos del Sur',
  description: 'XV Años Dance Choreography by Ecos Del Sur',
  icons: {
    icon: '/Letra E Ecos.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${playfairDisplay.variable} ${ptSans.variable}`}>
      <head>
      </head>
      <body className="font-body antialiased relative">
        <FirebaseClientProvider>
          {children}
          <FloatingWhatsappButton />
        </FirebaseClientProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
