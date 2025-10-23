'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const galleryProjects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));

const ChoreographyCatalog = () => {
  return (
    <section id="choreography" className="py-16 lg:py-24 bg-black relative overflow-hidden border-b-4 border-primary">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
                src="/Letra E Ecos.png"
                alt="Ecos del Sur Watermark"
                width={500}
                height={500}
                className="opacity-5"
            />
        </div>
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Nuestra Galería</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explora una selección de los momentos mágicos y coreografías que hemos creado. Cada imagen cuenta la historia de un sueño hecho realidad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryProjects.map((project) => (
             <Dialog key={project.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer group relative">
                    <div className="aspect-square">
                      <Image
                        src={project.imageUrl}
                        alt={project.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={project.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <h3 className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-4 group-hover:translate-y-0">
                          {project.description}
                        </h3>
                      </div>
                    </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-background/80 backdrop-blur-lg">
                 <DialogTitle className="sr-only">{project.description}</DialogTitle>
                 <DialogDescription className="sr-only">Imagen de la galería: {project.description}</DialogDescription>
                 <div className="aspect-video relative">
                    <Image
                      src={project.imageUrl}
                      alt={project.description}
                      fill
                      className="object-contain"
                    />
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
