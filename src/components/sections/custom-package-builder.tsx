'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PackagePlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format, isBefore, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const allFeatures = [
  { id: 'opening', label: 'Opening' },
  { id: 'vals-entrada', label: 'Vals entrada' },
  { id: 'vals-protocolos', label: 'Vals protocolos (juguete, coronación, zapatilla, brindis)' },
  { id: 'vals-principal', label: 'Vals principal' },
  { id: 'vals-familiar', label: 'Vals familiar'},
  { id: 'mix-moderno-1', label: 'Mix moderno 1' },
  { id: 'mix-moderno-2', label: 'Mix moderno 2' },
  { id: 'vestuario', label: 'Vestuario para bailarines y quinceañera' },
  { id: 'pirotecnia', label: 'Pirotecnia' },
];

export default function CustomPackageBuilder({ children }: { children: React.ReactNode }) {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>(
    allFeatures.reduce((acc, feature) => ({ ...acc, [feature.id]: false }), {})
  );
  const [numBailarines, setNumBailarines] = useState('0');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>();

  const handleCheckboxChange = (featureId: string) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  };
  
  const whatsappNumber = '525528098448';

  const handleRequestQuote = () => {
    if (!name) {
      alert('Por favor, introduce tu nombre.');
      return;
    }
    if (date && isBefore(date, startOfToday())) {
      alert('Por favor, selecciona una fecha válida en el futuro para tu evento.');
      return;
    }

    const selectedItems = allFeatures
      .filter((feature) => selectedFeatures[feature.id])
      .map((feature) => feature.label);
    
    if (parseInt(numBailarines) > 0) {
      selectedItems.push(`${numBailarines} Bailarin${parseInt(numBailarines) > 1 ? 'es' : ''}`);
    }

    if (selectedItems.length === 0 && !specialRequest) {
      alert('Por favor, selecciona al menos una opción o escribe una petición para solicitar una cotización.');
      return;
    }

    let message = `Hola, mi nombre es ${name}. Me gustaría solicitar una cotización para un paquete personalizado de XV Años.\n`;

    if (date) {
      message += `La fecha de mi evento es el ${format(date, 'PPP', { locale: es })}.\n\n`;
    }

    message += 'Características solicitadas:\n'

    if (selectedItems.length > 0) {
      message += `- ${selectedItems.join('\n- ')}\n`;
    }
    if (specialRequest) {
      message += `\nPeticiones especiales:\n${specialRequest}`;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
            <div className="flex items-center gap-3 text-primary mb-2">
                <PackagePlus className="h-8 w-8"/>
                <DialogTitle className="font-headline text-3xl md:text-4xl">Arma tu Paquete Personalizado</DialogTitle>
            </div>
          <DialogDescription>
            Selecciona los elementos que deseas incluir en tu celebración y solicita una cotización a tu medida.
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
            {/* Column 1: Features */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-primary">Elige los Componentes</h4>
              <div className="space-y-3">
                {allFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-3 bg-card p-3 rounded-lg border">
                    <Checkbox
                      id={`modal-${feature.id}`}
                      checked={selectedFeatures[feature.id]}
                      onCheckedChange={() => handleCheckboxChange(feature.id)}
                    />
                    <Label htmlFor={`modal-${feature.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      {feature.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between space-x-3 bg-card p-3 rounded-lg border">
                  <Label htmlFor="bailarines" className="text-sm font-medium">
                    Bailarines para XV Años
                  </Label>
                  <Select value={numBailarines} onValueChange={setNumBailarines}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona cantidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 Bailarines</SelectItem>
                      <SelectItem value="1">1 Bailarín</SelectItem>
                      <SelectItem value="2">2 Bailarines</SelectItem>
                      <SelectItem value="3">3 Bailarines</SelectItem>
                      <SelectItem value="4">4 Bailarines</SelectItem>
                      <SelectItem value="5">5 Bailarines</SelectItem>
                      <SelectItem value="6">6 Bailarines</SelectItem>
                      <SelectItem value="7">7 Bailarines</SelectItem>
                      <SelectItem value="8">8 Bailarines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </div>

            {/* Column 2: Contact Info & Special Requests */}
            <div className="space-y-6">
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-primary">Tus Datos</h4>
                    <div className="space-y-2">
                        <Label htmlFor="name-custom">Tu Nombre</Label>
                        <Input id="name-custom" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date-custom">Fecha del Evento (Opcional)</Label>
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
                 <div className="space-y-2">
                    <Label htmlFor="special-request">Peticiones Especiales (Opcional)</Label>
                    <Textarea
                        id="special-request"
                        placeholder="¿Hay algo más que te gustaría incluir? Escríbelo aquí. Ej: temática, canción especial, etc."
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        rows={5}
                    />
                </div>
            </div>
        </div>
        <DialogFooter className="p-0 pt-4">
            <Button onClick={handleRequestQuote} className="w-full">
              Solicitar Cotización por WhatsApp
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
