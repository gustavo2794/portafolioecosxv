'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PartyPopper, Sparkles, Flame, CheckCircle2, ArrowLeft, Users } from 'lucide-react';
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

const batucadaPackages = [
  {
    id: 'show-neon',
    name: 'Paquete 1: "Show Neón & Glow Party"',
    badge: 'La Pista en Llamas',
    description: '45 minutos de animación interactiva con accesorios luminosos LED para llenar la pista de baile de pura fiesta.',
    features: [
      '45 minutos continuos de animación y coreografías interactivas guiadas',
      '2 Animadores / Bailarines caracterizados en pista con energía total',
      'Kit de accesorios luminosos neón (lentes de colores, varitas de luz, collares glow, pulseras)',
      'Globos gigantes tipo salchicha repartidos a los invitados',
      'Dinámicas y retos de baile con amigos y familiares'
    ],
    bgGradient: 'from-amber-500/10 via-card to-card',
    borderColor: 'border-amber-400/40'
  },
  {
    id: 'batucada-cabezones',
    name: 'Paquete 2: "Batucada Ecos con Cabezones Gigantes"',
    badge: 'El Más Divertido & Viral',
    description: 'El show más viral con 2 personajes Cabezones gigantes temáticos, animadores, lluvia de confeti y accesorios.',
    features: [
      '2 Personajes Cabezones Gigantes Temáticos a elegir (estilo urbano, fiesta o personajes)',
      '2 Bailarines / Animadores de apoyo dirigiendo el tren del baile y coreografías',
      'Lluvia de confeti metálico en los momentos clímax de la música',
      'Paquete completo de props y sombreros divertidos para los invitados',
      'Momento especial para fotos y videos épicos con la quinceañera y los personajes'
    ],
    bgGradient: 'from-primary/10 via-card to-card',
    borderColor: 'border-primary/50',
    popular: true
  },
  {
    id: 'mega-show-robot-led',
    name: 'Paquete 3: "Mega Show Robot LED & Pirotecnia Fría VIP"',
    badge: 'Impacto Visual Total',
    description: 'El show de gala definitivo con Robot LED gigante de 2.5m, disparo de bazooka de CO2 frío, chisperos y cabezones.',
    features: [
      'Impactante Robot LED gigante (2.5 metros) con lásers y luces multicolor sincronizadas',
      'Pistola / Bazooka de CO2 frío disparada en la pista de baile',
      '2 Personajes Cabezones Gigantes + Animadores profesionales',
      'Chisperos de Pirotecnia Fría (indoor) activados durante la entrada del show',
      'Paquete Ultra VIP de antifaces, lentes LED recargables y bastones de espuma luminosos'
    ],
    bgGradient: 'from-purple-500/10 via-card to-card',
    borderColor: 'border-purple-400/40'
  }
];

const addOns = [
  {
    id: 'bazooka-co2',
    name: 'Disparo Adicional de Bazooka de Humo CO2 Frío',
    description: 'Efecto de ráfagas de humo helado para refrescar e impactar a todos los jóvenes en la pista.'
  },
  {
    id: 'chisperos-frios',
    name: 'Chisperos de Pirotecnia Fría Indoor (4 unidades)',
    description: 'Fuentes de chispas frías 100% seguras para interiores que se activan en el clímax del baile.'
  },
  {
    id: 'cabezon-extra',
    name: 'Personaje Cabezón Temático Adicional',
    description: 'Agrega un personaje extra para duplicar la diversión y la interacción con tus invitados.'
  }
];

export default function BatucadaPackagesPage() {
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
    let message = `Hola, mi nombre es ${clientName}. Me gustaría cotizar el servicio de *${selectedPackage.name}* para mis XV Años.\n`;
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

    message += '\n¿Tienen disponibilidad de horario para este show y qué personajes tienen disponibles?';

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
              Animación, Cabezones & Show de Pista
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary tracking-tight">
              Batucada Ecos & Show de Animación
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
              &quot;El momento más explosivo y divertido de tu fiesta. Llevamos la energía al máximo con cabezones gigantes, robot LED y accesorios luminosos.&quot;
            </p>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative rounded-3xl overflow-hidden border border-primary/30 mb-16 shadow-2xl">
            <div className="relative h-72 md:h-96 w-full">
              <Image 
                src="/batucada_ecos.jpg"
                alt="Batucada Ecos y Show de Animación de XV Años"
                fill
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 text-white">
                <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground font-bold text-xs uppercase px-3 py-1 rounded-full mb-3 shadow">
                  <PartyPopper className="h-4 w-4" /> ¡Pura Energía & Fiesta en Pista!
                </div>
                <h2 className="font-headline text-2xl md:text-4xl font-bold text-primary mb-2">
                  Cabezones Gigantes, Robot LED & Efectos Especiales
                </h2>
                <p className="text-white/80 max-w-2xl text-sm md:text-base">
                  Coordinado por nuestros mismos coreógrafos y animadores para que nadie se quede sentado durante el baile sorpresa y la tanda de fiesta.
                </p>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {batucadaPackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative flex flex-col justify-between border ${pkg.borderColor} bg-gradient-to-b ${pkg.bgGradient} backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-primary/10 hover:-translate-y-1`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    El Más Divertido
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
                    Cotizar esta Batucada
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="bg-card/50 border border-border rounded-2xl p-8 mb-16 shadow-lg">
            <div className="text-center mb-10">
              <h3 className="font-headline text-3xl font-bold text-primary mb-2">Efectos & Extras de Animación</h3>
              <p className="text-muted-foreground">Lleva el show al siguiente nivel con estos complementos de impacto.</p>
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
              Completa tus datos para enviarte la cotización y verificar la disponibilidad de fecha por WhatsApp.
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
                  placeholder="Ej. Paola Miranda" 
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
