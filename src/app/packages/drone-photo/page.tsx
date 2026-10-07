'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Sparkles, Video, Gift, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format, isBefore, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const dronePhotoPackages = [
  {
    id: 'bienvenida-firmas',
    name: 'Paquete 1: "Bienvenida & Firmas"',
    badge: 'Más Vendido para Recepción',
    description: 'Pensado para la entrada del salón el día de la fiesta con un recuerdo que todos tus invitados firmarán.',
    features: [
      'Sesión previa (1-2 horas) con vestuario o casual',
      '1 Cuadro Grande de Bienvenida / Firmas (60x90 cm) con María Luisa blanca',
      '20 fotos digitales editadas en alta resolución',
      'Tomas aéreas de apoyo con Dron DJI Neo durante la sesión',
      'Entrega oportuna antes del evento para instalar en el salón'
    ],
    bgGradient: 'from-blue-500/10 via-card to-card',
    borderColor: 'border-blue-400/40'
  },
  {
    id: 'album-gala',
    name: 'Paquete 2: "Álbum de Gala & Cuadro"',
    badge: 'Elegancia y Recuerdo Impreso',
    description: 'Para quienes quieren guardar el recuerdo impreso en la sala de su casa para toda la vida.',
    features: [
      'Sesión previa + Cobertura fotográfica del Vals principal',
      '1 Photo Book Elegante de Pasta Dura (20x30 cm) de 20-30 páginas',
      '1 Cuadro Texturizado de Galería (50x60 cm) listo para colgar',
      '80 a 100 fotos digitales editadas en alta resolución',
      'Galería digital privada descargable'
    ],
    bgGradient: 'from-primary/10 via-card to-card',
    borderColor: 'border-primary/50',
    popular: true
  },
  {
    id: 'recuerdo-completo',
    name: 'Paquete 3: "Recuerdo Completo (Foto + Video Dron)"',
    badge: 'Experiencia Total VIP',
    description: 'La combinación perfecta de fotografía impresa, cuadros de bienvenida y video aéreo exclusivo del baile.',
    features: [
      'Sesión previa + Grabación aérea y 360° del Vals y Baile Sorpresa',
      'Cuadro de Firmas de Bienvenida (60x90 cm)',
      'Photo Book impreso de pasta dura con los mejores momentos',
      'Video resumen editado del baile (combinando Dron DJI Neo + Insta360)',
      'Galería digital completa con todas las fotos editadas'
    ],
    bgGradient: 'from-purple-500/10 via-card to-card',
    borderColor: 'border-purple-400/40'
  }
];

const addOns = [
  {
    id: 'marco-gigante',
    name: 'Marco Gigante Temático para Fotos',
    description: 'Marco físico gigante decorado según la temática de tu fiesta para las fotos divertidas en la pista.'
  },
  {
    id: 'video-behind',
    name: 'Video Clip "Behind the Scenes" de Ensayos',
    description: 'Video corto (1-2 min) con los mejores momentos de tus ensayos, ideal para proyectar en pantallas del salón.'
  },
  {
    id: 'cuadros-padrinos',
    name: 'Cuadros Individuales para Padrinos / Abuelos',
    description: 'Cuadros pequeños enmarcados (20x25 cm) con tu foto oficial de XV años para agradecer a tus seres queridos.'
  }
];

export default function DronePhotoPackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({});

  const handleOpenQuote = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendWhatsApp = () => {
    if (!clientName) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    if (eventDate && isBefore(eventDate, startOfToday())) {
      alert('Por favor selecciona una fecha válida en el futuro.');
      return;
    }

    const whatsappNumber = '525528098448';
    let message = `Hola, mi nombre es ${clientName}. Me interesa cotizar el *${selectedPackage.name}*.\n`;
    if (eventDate) {
      message += `La fecha de mi evento es el ${format(eventDate, 'PPP', { locale: es })}.\n`;
    }

    const addedAddonsList = Object.entries(selectedAddOns)
      .filter(([_, checked]) => checked)
      .map(([id]) => addOns.find(a => a.id === id)?.name)
      .filter(Boolean);

    if (addedAddonsList.length > 0) {
      message += `\nComplementos adicionales:\n- ${addedAddonsList.join('\n- ')}\n`;
    }

    message += '\n¿Me podrían dar más información sobre disponibilidad y cotización?';

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 py-12 px-6">
        <div className="container max-w-6xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/packages">
              <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4" /> Volver a Paquetes Principales
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-primary/20 text-primary border-primary/40 px-4 py-1 text-sm uppercase tracking-widest font-semibold">
              Recuerdos & Sesión de XV
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary tracking-tight">
              Cobertura Dron, Foto & Recepción
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
              &quot;Nosotros coordinamos tus pasos y también inmortalizamos tu mejor ángulo para el cuadro de tu recepción y el recuerdo eterno en familia.&quot;
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {dronePhotoPackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative flex flex-col justify-between border ${pkg.borderColor} bg-gradient-to-b ${pkg.bgGradient} backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-primary/10 hover:-translate-y-1`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Recomendado
                  </div>
                )}
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2 border-primary/30 text-primary">
                    {pkg.badge}
                  </Badge>
                  <CardTitle className="font-headline text-2xl font-bold">{pkg.name}</CardTitle>
                  <CardDescription className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">Incluye:</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/50">
                  <Button 
                    onClick={() => handleOpenQuote(pkg)} 
                    className="w-full font-semibold shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Cotizar este Paquete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="bg-card/50 border border-border rounded-2xl p-8 mb-16 shadow-lg">
            <div className="text-center mb-10">
              <h3 className="font-headline text-3xl font-bold text-primary mb-2">Complementos Adicionales (Add-ons)</h3>
              <p className="text-muted-foreground">Personaliza aún más tu experiencia con detalles únicos para tus invitados.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {addOns.map((addon) => {
                const isSelected = selectedAddOns[addon.id];
                return (
                  <div 
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`cursor-pointer rounded-xl p-5 border transition-all flex flex-col justify-between ${
                      isSelected 
                        ? 'border-primary bg-primary/10 shadow-md shadow-primary/10' 
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-headline font-bold text-lg">{addon.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{addon.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40">
                      <span className="text-xs font-medium text-primary">
                        {isSelected ? '✓ Agregado a la cotización' : '+ Clic para agregar'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Quote Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">
              Cotizar {selectedPackage?.name}
            </DialogTitle>
            <DialogDescription>
              Completa tus datos para enviar tu solicitud directamente por WhatsApp con nuestro equipo.
            </DialogDescription>
          </DialogHeader>

          {selectedPackage && (
            <div className="space-y-4 py-2">
              <div className="bg-muted/50 p-3 rounded-lg border text-sm">
                <p className="font-bold text-primary">{selectedPackage.name}</p>
                {Object.entries(selectedAddOns).some(([_, v]) => v) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    + Incluye complementos seleccionados.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-name">Tu Nombre / Nombre de la Quinceañera</Label>
                <Input 
                  id="client-name" 
                  placeholder="Ej. Sofia Gomez" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label>Fecha de tu Evento (Opcional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn('w-full justify-start text-left font-normal', !eventDate && 'text-muted-foreground')}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {eventDate ? format(eventDate, 'PPP', { locale: es }) : <span>Selecciona la fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar 
                      mode="single" 
                      selected={eventDate} 
                      onSelect={setEventDate} 
                      disabled={{ before: new Date() }} 
                      initialFocus 
                      locale={es} 
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button onClick={handleSendWhatsApp} className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold gap-2">
              Enviar Cotización por WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
