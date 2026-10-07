'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Sparkles, MapPin, Music, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, isBefore, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const invitationPackages = [
  {
    id: 'invitacion-esencial',
    name: 'Paquete 1: "Invitación Digital Esencial"',
    badge: 'Práctica & Elegante',
    description: 'Diseño web móvil personalizado con todos los datos clave de tu misa y recepción para compartir en WhatsApp.',
    features: [
      'Diseño web responsive adaptable a celulares y computadoras',
      'Cuenta regresiva en vivo para el gran día',
      'Ubicaciones con botón directo a Google Maps y Waze (Iglesia y Salón)',
      'Itinerario del evento con horarios de misa, vals y cena',
      'Código de vestimenta con sugerencias visuales y paleta de colores',
      'Información de mesa de regalos o número de cuenta para sobre virtual'
    ],
    bgGradient: 'from-blue-500/10 via-card to-card',
    borderColor: 'border-blue-400/40'
  },
  {
    id: 'invitacion-interactiva',
    name: 'Paquete 2: "Invitación Glam Interactiva"',
    badge: 'La Más Completa',
    description: 'Experiencia interactiva con música de fondo, confirmación automática de asistencia por WhatsApp y galería de fotos.',
    features: [
      'Todo lo del paquete Esencial',
      'Música de fondo personalizada con reproductor interactivo',
      'Botón RSVP de confirmación de asistencia directo a tu WhatsApp con plantilla de invitados',
      'Galería de fotos previa de la quinceañera (sesión casual o vestido)',
      'Sección de aviso de color reservado para la Quinceañera (para que nadie vista igual)',
      'Efecto de apertura de sobre digital con animación de lujo'
    ],
    bgGradient: 'from-primary/10 via-card to-card',
    borderColor: 'border-primary/50',
    popular: true
  },
  {
    id: 'invitacion-vip-qr',
    name: 'Paquete 3: "Experiencia Digital VIP + Pase QR"',
    badge: 'Control Total y Filtro de Redes',
    description: 'El máximo nivel tecnológico con pase digital con código QR para recepción, asignación de mesas y filtro para redes.',
    features: [
      'Todo lo del paquete Glam Interactivo',
      'Generador de Pases Digitales con Código QR único por familia/invitado',
      'Módulo de consulta de mesa asignada para agilizar el ingreso al salón',
      'Filtro temático personalizado de Instagram & TikTok con el nombre de la quinceañera',
      'Video animación tipo "Save The Date" para compartir en historias y estados',
      'Actualizaciones y cambios ilimitados de información hasta el día del evento'
    ],
    bgGradient: 'from-purple-500/10 via-card to-card',
    borderColor: 'border-purple-400/40'
  }
];

const addOns = [
  {
    id: 'filtro-redes',
    name: 'Filtro Personalizado para Instagram & TikTok',
    description: 'Efecto con destellos dorados, corona y el nombre de la quinceañera para que todos suban historias en la fiesta.'
  },
  {
    id: 'save-the-date',
    name: 'Video Teaser "Save The Date" Animado',
    description: 'Video corto vertical (15-30 seg) con música épica y fotos para avisar la fecha a familiares y amigos.'
  },
  {
    id: 'pase-qr',
    name: 'Sistema de Pases QR para Recepción en Salón',
    description: 'Pases personalizados por familia que facilitan la bienvenida y control de mesas en la entrada.'
  }
];

export default function InvitacionesPackagesPage() {
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
    let message = `Hola, mi nombre es ${clientName}. Me interesa cotizar el *${selectedPackage.name}* para mis XV Años.\n`;
    if (eventDate) {
      message += `La fecha de mi evento es el ${format(eventDate, 'PPP', { locale: es })}.\n`;
    }

    const addedAddonsList = Object.entries(selectedAddOns)
      .filter(([_, checked]) => checked)
      .map(([id]) => addOns.find(a => a.id === id)?.name)
      .filter(Boolean);

    if (addedAddonsList.length > 0) {
      message += `\nAdicionales de interés:\n- ${addedAddonsList.join('\n- ')}\n`;
    }

    message += '\n¿Me podrían mostrar ejemplos de invitaciones en vivo y cómo es el proceso de diseño?';

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
              Invitaciones Web & Pases Digitales
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary tracking-tight">
              Invitaciones Digitales Interactivas de XV
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
              &quot;Sorprende a tus familiares y amigos con una invitación moderna que incluye música, confirmación por WhatsApp, mapas GPS y pases digitales.&quot;
            </p>
          </div>

          {/* Showcase visual card */}
          <div className="relative rounded-3xl overflow-hidden border border-primary/30 mb-16 shadow-2xl">
            <div className="relative h-72 md:h-96 w-full">
              <Image 
                src="/invitacion_digital_xv.jpg"
                alt="Invitación Digital Interactiva de XV Años"
                fill
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 text-white">
                <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground font-bold text-xs uppercase px-3 py-1 rounded-full mb-3 shadow">
                  <Smartphone className="h-4 w-4" /> Diseño Exclusivo para Celulares
                </div>
                <h2 className="font-headline text-2xl md:text-4xl font-bold text-primary mb-2">
                  Música, Confirmación RSVP & Mapas en un solo Clic
                </h2>
                <p className="text-white/80 max-w-2xl text-sm md:text-base">
                  Envía tu invitación fácilmente por WhatsApp o redes sociales sin gastar de más en papel y con confirmaciones automáticas.
                </p>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {invitationPackages.map((pkg) => (
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
                    Cotizar esta Invitación
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="bg-card/50 border border-border rounded-2xl p-8 mb-16 shadow-lg">
            <div className="text-center mb-10">
              <h3 className="font-headline text-3xl font-bold text-primary mb-2">Complementos Digitales</h3>
              <p className="text-muted-foreground">Herramientas extras para hacer tu fiesta viral y moderna.</p>
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
                      <h4 className="font-headline font-bold text-lg mb-2">{addon.name}</h4>
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
              Completa tus datos para enviarte la propuesta y ver ejemplos en vivo por WhatsApp.
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
                  placeholder="Ej. Valeria Montes" 
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
