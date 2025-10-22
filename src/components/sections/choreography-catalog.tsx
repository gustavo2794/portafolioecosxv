'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { GalleryVertical } from 'lucide-react';

const galleryItems = PlaceHolderImages.filter(img => img.id.startsWith('project-'));

const ChoreographyCatalog = () => {
  if (!galleryItems.length) {
    return (
      <section id="choreography" className="py-16 lg:py-24 bg-card">
        <div className="container">
          <div className="text-center flex flex-col items-center justify-center min-h-[400px] text-muted-foreground border-2 border-dashed rounded-lg p-8">
            <GalleryVertical className="h-20 w-20 text-primary mb-6" />
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
              Galería Próximamente
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-lg">
              No hay imágenes para mostrar en este momento. ¡Vuelve pronto para inspirarte!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="choreography" className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Nuestra Galería</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explora una selección de los momentos mágicos y coreografías que hemos creado.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer group relative">
                  <CardContent className="p-0">
                    <div className="aspect-w-1 aspect-h-1">
                      <Image
                        src={item.imageUrl}
                        alt={item.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={item.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-2 bg-background/80 backdrop-blur-md">
                <DialogTitle className="sr-only">{item.description}</DialogTitle>
                <DialogDescription className="sr-only">Imagen de la galería: {item.description}</DialogDescription>
                <div className="relative aspect-video w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.description}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="text-center p-4">
                  <p className="text-lg font-medium text-foreground">{item.description}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoreographyCatalog;
