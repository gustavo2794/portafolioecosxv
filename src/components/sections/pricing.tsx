'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format, isBefore, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';

const packages = [
    {
      name: 'Paquete Básico',
      features: [
        'Vals entrada',
        'Vals protocolos (juguete, coronación, zapatilla, brindis)',
        'Vals principal',
      ],
      bgColor: 'bg-gray-700/10',
      borderColor: 'border-gray-600',
      shadow: 'shadow-xl shadow-gray-500/20'
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
      bgColor: 'bg-slate-500/10',
      borderColor: 'border-slate-400',
      shadow: 'shadow-xl shadow-slate-400/20'
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
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-400',
      shadow: 'shadow-xl shadow-yellow-400/20'
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
        bgColor: 'bg-blue-400/10',
        borderColor: 'border-blue-300',
        shadow: 'shadow-xl shadow-blue-300/20'
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
            'Pirotecnia'
        ],
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-400',
        shadow: 'shadow-xl shadow-purple-400/20'
    },
  ];

const QuoteDialog = ({ trigger, messageGenerator }: { trigger: React.ReactNode; messageGenerator: (name: string, date?: Date) => string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const whatsappNumber = '525528098448';

  const handleRequest = () => {
    if (!name) {
      alert('Por favor, introduce tu nombre.');
      return;
    }
    if (date && isBefore(date, startOfToday())) {
        alert('Por favor, selecciona una fecha válida en el futuro para tu evento.');
        return;
    }
    const message = messageGenerator(name, date);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setName('');
    setDate(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitar Cotización</DialogTitle>
          <DialogDescription>
            Por favor, completa tus datos para enviarte la cotización.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tu Nombre</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Fecha del Evento (Opcional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: es }) : <span>Elige una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} disabled={{ before: new Date() }} initialFocus locale={es} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleRequest} className="w-full">
            Enviar por WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Pricing = () => {
  return (
    <section 
        className="pt-8 pb-16 lg:pb-24 bg-cover bg-center bg-no-repeat relative bg-fixed"
        style={{ backgroundImage: "url('https://res.cloudinary.com/drylg7prb/image/upload/v1761188167/Fondo_Paquetes_1_fkmcrk.png')" }}
    >
        <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="container relative z-10">
        <div className="text-center mb-12 flex flex-col items-center">
        <Image
            src="https://res.cloudinary.com/drylg7prb/image/upload/v1761183135/LOGO_ECOS_2024_cldy7v.png"
            alt="Logo Completo Ecos del Sur"
            width={480}
            height={160}
            className="object-contain w-[320px] h-auto md:w-[480px] mb-8"
            style={{ filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))' }}
        />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Nuestros Paquetes</h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/80">
            Elige el plan perfecto para hacer de tu celebración un evento inolvidable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`flex flex-col transition-all duration-300 hover:-translate-y-2 ${pkg.bgColor} border ${pkg.borderColor} ${pkg.shadow}`}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold font-headline">
                  {pkg.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <QuoteDialog
                  trigger={<Button className="w-full">Solicitar</Button>}
                  messageGenerator={(name, date) => {
                    let message = `Hola, mi nombre es ${name}. Estoy interesado(a) en el ${pkg.name}.\n`;
                    if (date) {
                      message += `La fecha de mi evento es el ${format(date, 'PPP', { locale: es })}.\n`;
                    }
                    message += '¿Podrían darme más información?';
                    return message;
                  }}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;