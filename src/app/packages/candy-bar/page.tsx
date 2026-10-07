'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, Sparkles, GlassWater, CheckCircle2, ArrowLeft, HeartHandshake } from 'lucide-react';
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

const snackPackages = [
  {
    id: 'barra-clasica',
    name: 'Paquete 1: "Barra Dulce & Salada Clásica"',
    badge: 'La Favorita de Todos',
    description: 'Estación decorada con gran surtido de botanas mexicanas, gomilocas con chamoy y dulces selectos para consentir a tus invitados.',
    features: [
      'Barra decorada acorde a la temática de tus XV Años',
      'Surtido de botanas: papas preparadas, cacahuates, palomitas gourmet y chicharrones',
      'Barra de gomitas, gomilocas y banderillas con salsas y chamoy artesanal',
      'Dulces surtidos tradicionales y chocolates',
      'Desechables temáticos, copitas, cucharitas y servilletas de gala',
      'Servicio de atención y montaje impecable (2 horas)'
    ],
    bgGradient: 'from-amber-500/10 via-card to-card',
    borderColor: 'border-amber-400/40'
  },
  {
    id: 'carrito-shots-snacks',
    name: 'Paquete 2: "Carrito Vintage Snacks & Mocktail Shots"',
    badge: 'El Más Solicitado',
    description: 'Carrito vintage iluminado con servicio de bienvenida de shots refrescantes sin alcohol y botanas preparadas al momento.',
    features: [
      'Hermoso Carrito Vintage de madera iluminado con focos cálidos y guirnaldas',
      'Shots de Bienvenida (Mocktails sin alcohol) en variedad de sabores frutales para la recepción',
      'Barra de botanas calientes o preparadas al gusto: esquites gourmet, nachos con queso o papas locas',
      'Toppings ilimitados: chamoy, miguelito, quesos, aderezos y salsas especiales',
      'Anfitrión caracterizado para servicio ágil durante la fiesta (2 a 3 horas)',
      'Montaje estético ideal para fotos de tus invitados'
    ],
    bgGradient: 'from-primary/10 via-card to-card',
    borderColor: 'border-primary/50',
    popular: true
  },
  {
    id: 'estacion-vip-shots',
    name: 'Paquete 3: "Estación Gourmet & Shots VIP con Efecto Humo"',
    badge: 'Experiencia Total VIP',
    description: 'El máximo nivel de recepción con fuente de chocolate/chamoy, cócteles de bienvenida con hielo seco y barra de postres premium.',
    features: [
      'Carrito de gala iluminado con letrero Neón personalizado de la quinceañera',
      'Barra de Cócteles y Shots con efecto de humo (hielo seco) de bienvenida para invitados',
      'Fuente de Chocolate belga o Cascada de Chamoy con brochetas de fruta fresca y bombones',
      'Estación mixta de postres finos: mini donas, cupcakes, tartaletas y macarons',
      'Barra completa de botanas crujientes y dulces artesanales ilimitados durante el servicio',
      'Personal uniformado de servicio continuo durante 3 horas completas'
    ],
    bgGradient: 'from-purple-500/10 via-card to-card',
    borderColor: 'border-purple-400/40'
  }
];

const addOns = [
  {
    id: 'shots-neon',
    name: 'Ronda de Shots Neón Luminosos en Pista',
    description: 'Bandeja de shots fluorescentes repartidos por animadores en medio del baile para encender la fiesta.'
  },
  {
    id: 'letrero-neon',
    name: 'Letrero Neón Personalizado para el Carrito',
    description: 'Letrero luminoso con tu nombre o frase favorita para fotos increíbles en la recepción.'
  },
  {
    id: 'vasos-conmemorativos',
    name: 'Vasos / Tarros Conmemorativos de XV',
    description: 'Vasos personalizados con el logo y nombre de la quinceañera de recuerdo para los invitados.'
  }
];

export default function CandyBarPackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const [guestCount, setGuestCount] = useState('');
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
    let message = `Hola, mi nombre es ${clientName}. Me gustaría cotizar el servicio de *${selectedPackage.name}* para XV Años.\n`;
    if (eventDate) {
      message += `La fecha de mi evento es el ${format(eventDate, 'PPP', { locale: es })}.\n`;
    }
    if (guestCount) {
      message += `Número aproximado de invitados: ${guestCount} personas.\n`;
    }

    const addedAddonsList = Object.entries(selectedAddOns)
      .filter(([_, checked]) => checked)
      .map(([id]) => addOns.find(a => a.id === id)?.name)
      .filter(Boolean);

    if (addedAddonsList.length > 0) {
      message += `\nComplementos solicitados:\n- ${addedAddonsList.join('\n- ')}\n`;
    }

    message += '\n¿Tienen disponibilidad para esta fecha y qué opciones de personalización ofrecen?';

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
              Snacks, Dulces & Shots de Bienvenida
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary tracking-tight">
              Carrito de Snacks, Dulces & Shots Ecos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
              &quot;Consiente a tus invitados con una experiencia gastronómica y de coctelería divertida que elevará el ambiente desde el primer minuto.&quot;
            </p>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative rounded-3xl overflow-hidden border border-primary/30 mb-16 shadow-2xl">
            <div className="relative h-72 md:h-96 w-full">
              <Image 
                src="/snack_cart_xv.jpg"
                alt="Carrito de Snacks y Dulces para XV Años"
                fill
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 text-white">
                <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground font-bold text-xs uppercase px-3 py-1 rounded-full mb-3 shadow">
                  <GlassWater className="h-4 w-4" /> Estación Decorada & Carrito Vintage
                </div>
                <h2 className="font-headline text-2xl md:text-4xl font-bold text-primary mb-2">
                  Bebidas de Bienvenida, Botanas & Mesa Dulce a tu Gusto
                </h2>
                <p className="text-white/80 max-w-2xl text-sm md:text-base">
                  Ideal para recibir a tus invitados en la entrada del salón, durante los descansos del baile o en la recta final de la noche.
                </p>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {snackPackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative flex flex-col justify-between border ${pkg.borderColor} bg-gradient-to-b ${pkg.bgGradient} backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-primary/10 hover:-translate-y-1`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Más Pedido
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
                    Cotizar este Servicio
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="bg-card/50 border border-border rounded-2xl p-8 mb-16 shadow-lg">
            <div className="text-center mb-10">
              <h3 className="font-headline text-3xl font-bold text-primary mb-2">Adicionales para tu Barra</h3>
              <p className="text-muted-foreground">Agrega elementos especiales para hacer la experiencia aún más inolvidable.</p>
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
              Completa tus datos para enviarte la propuesta personalizada directamente por WhatsApp.
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
                  placeholder="Ej. Carmen Sanchez" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests-count">Cantidad Aproximada de Invitados</Label>
                <Input 
                  id="guests-count" 
                  type="number"
                  placeholder="Ej. 150" 
                  value={guestCount} 
                  onChange={(e) => setGuestCount(e.target.value)} 
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
