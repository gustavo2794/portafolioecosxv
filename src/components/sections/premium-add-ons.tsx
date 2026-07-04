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
    videoUrl: '', // AQUÍ PEGARÁS EL LINK DE TU VIDEO DE PIROTECNIA
  },
  {
    id: 'premium-drone',
    title: 'Cobertura Drone',
    icon: Camera,
    description: 'Captura la magnitud de tu fiesta desde el cielo con tomas cinematográficas.',
    videoUrl: '', // AQUÍ PEGARÁS EL LINK DE TU VIDEO DE DRONE
  },
  {
    id: 'premium-invitacion',
    title: 'Invitación Digital',
    icon: Smartphone,
    description: 'Sorprende a tus invitados con una invitación interactiva, música y cuenta regresiva.',
    videoUrl: '', // AQUÍ PEGARÁS EL LINK DE TU VIDEO DE INVITACIONES
  },
  {
    id: 'premium-batucada',
    title: 'Batucada Ecos',
    icon: PartyPopper,
    description: 'El momento más loco de la fiesta con botargas, cabezones y mucha energía.',
    videoUrl: '', // AQUÍ PEGARÁS EL LINK DE TU VIDEO DE BATUCADA
  },
];

export default function PremiumAddOns() {
  return (
    <section className="py-20 bg-black border-t border-primary/20">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Experiencias Premium</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Añade ese toque extra de magia que hará que tus XV Años sean recordados por siempre.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {addOns.map((item) => {
            const placeholder = PlaceHolderImages.find((img) => img.id === item.id);
            return (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-2xl bg-card border border-primary/10 transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 aspect-[4/5]"
              >
                {/* Contenedor de Video / Imagen */}
                <div className="absolute inset-0 z-0">
                  {item.videoUrl ? (
                    <video
                      src={item.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-700"
                    />
                  ) : (
                    <div className="h-full w-full relative">
                      <Image
                        src={placeholder?.imageUrl || ''}
                        alt={item.title}
                        fill
                        className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-700"
                        data-ai-hint={placeholder?.imageHint}
                      />
                    </div>
                  )}
                  {/* Gradiente Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </div>

                {/* Contenido */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50 text-primary group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-2 text-primary">{item.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
