
'use client';

import { Sparkles, Camera, Smartphone, PartyPopper } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const addOns = [
  {
    id: 'premium-pirotecnia',
    title: 'Pirotecnia Fría',
    icon: Sparkles,
    description: 'Ilumina tu vals principal con chispas mágicas totalmente seguras para interiores.',
    videoUrl: '', 
  },
  {
    id: 'premium-drone',
    title: 'Cobertura Drone',
    icon: Camera,
    description: 'Captura la magnitud de tu fiesta desde el cielo con tomas cinematográficas.',
    videoUrl: '', 
  },
  {
    id: 'premium-invitacion',
    title: 'Invitación Digital',
    icon: Smartphone,
    description: 'Sorprende a tus invitados con una invitación interactiva, música y cuenta regresiva.',
    videoUrl: '',
  },
  {
    id: 'premium-batucada',
    title: 'Batucada Ecos',
    icon: PartyPopper,
    description: 'El momento más loco de la fiesta con botargas, cabezones y mucha energía.',
    videoUrl: '',
  },
];

export default function PremiumAddOns() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-black to-accent/20 z-0" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image
          src="https://res.cloudinary.com/drylg7prb/image/upload/v1761183133/Letra_E_Ecos_vikchj.png"
          alt="Watermark"
          width={800}
          height={800}
          className="object-contain"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container relative z-10 px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary mb-4 drop-shadow-lg">
            Experiencias Premium
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl italic">
            "Elevamos tu celebración a otro nivel con detalles que cautivan."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {addOns.map((item) => {
            const placeholder = PlaceHolderImages.find((img) => img.id === item.id);
            return (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/20 transition-all duration-500 hover:border-primary hover:-translate-y-3 aspect-[4/5] shadow-2xl shadow-black/50"
              >
                <div className="absolute inset-0 z-0">
                  {item.videoUrl ? (
                    <video
                      src={item.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover brightness-50 group-hover:brightness-90 transition-all duration-700"
                    />
                  ) : (
                    <div className="h-full w-full relative">
                      <Image
                        src={placeholder?.imageUrl || ''}
                        alt={item.title}
                        fill
                        className="object-cover brightness-50 group-hover:brightness-90 transition-all duration-700"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md border border-primary/30 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-2 text-primary group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors duration-500">
                    {item.description}
                  </p>
                  <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
