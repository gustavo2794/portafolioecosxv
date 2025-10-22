'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, GalleryVertical } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    title: 'XV Años',
    description: 'Coreografías espectaculares y elegantes para hacer de tu fiesta un sueño hecho realidad.',
    imageId: 'project-6',
    link: '#', // En el futuro, esto podría llevar a /gallery/xv-anos
  },
  {
    title: 'Eventos de Kinder',
    description: 'Bailes divertidos y creativos para los festivales y graduaciones de los más pequeños.',
    imageId: 'project-5', // Usaremos una imagen existente como placeholder
    link: '#', // En el futuro, esto podría llevar a /gallery/kinder
  },
  {
    title: 'Proyectos Culturales',
    description: 'Presentaciones de danza que exploran la riqueza y diversidad del folklore y la cultura.',
    imageId: 'project-7', // Usaremos una imagen existente como placeholder
    link: '#', // En el futuro, esto podría llevar a /gallery/cultural
  },
];


const ChoreographyCatalog = () => {
  return (
    <section id="choreography" className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Nuestra Galería</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explora una selección de los momentos mágicos y coreografías que hemos creado para diferentes eventos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const image = PlaceHolderImages.find((img) => img.id === category.imageId);
            return (
              <Link href={category.link} key={category.title} className="block group">
                <Card className="bg-card overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-primary/30 hover:-translate-y-2 shadow-lg">
                  {image && (
                    <div className="relative aspect-video">
                      <Image
                        src={image.imageUrl}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-foreground">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto flex justify-end">
                      <div className="flex items-center text-sm font-semibold text-primary group-hover:underline">
                        Ver más <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChoreographyCatalog;
