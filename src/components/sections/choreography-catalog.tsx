
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define explicitly which images should appear in the gallery
const galleryImageIds = ['project-sahory', 'project-zayuri', 'project-5', 'project-7', 'hero-background'];
const galleryProjects = PlaceHolderImages.filter(p => galleryImageIds.includes(p.id));



const ChoreographyCatalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openDialog = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryProjects.length);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryProjects.length) % galleryProjects.length);
  };

  const currentProject = galleryProjects[currentIndex];

  return (
    <section id="choreography" className="py-16 lg:py-24 bg-black relative overflow-hidden border-b-4 border-primary">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="https://res.cloudinary.com/drylg7prb/image/upload/v1761183133/Letra_E_Ecos_vikchj.png"
          alt="Ecos del Sur Watermark"
          fill
          sizes="100vw"
          className="object-contain opacity-20"
          priority
        />
      </div>
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Nuestra Galería</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explora una selección de los momentos mágicos y coreografías que hemos creado. Cada imagen cuenta la historia de un sueño hecho realidad.
          </p>
        </div>
        
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryProjects.map((project, index) => (
            <div key={project.id} onClick={() => openDialog(index)} className="overflow-hidden cursor-pointer group relative break-inside-avoid">
              <Image
                src={project.imageUrl}
                alt={project.description}
                width={500}
                height={750}
                className="object-cover w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={project.imageHint}
                priority={index < 2} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg -translate-y-4 group-hover:translate-y-0 transition-transform">
                  {project.description}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-5xl w-full p-2 bg-black/80 backdrop-blur-lg border-primary/50 text-white flex items-center justify-center">
            {currentProject && (
              <>
                <DialogTitle className="sr-only">Visor de Imágenes</DialogTitle>
                <DialogDescription className="sr-only" id="gallery-dialog-description">
                  Imagen de la galería: {currentProject.description}. Usa las flechas para navegar.
                </DialogDescription>
              </>
            )}
            <div className="relative w-full h-[80vh] flex items-center justify-center">
                
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-white/20 hover:bg-white/40 text-white"
              >
                <ChevronLeft className="h-8 w-8" />
                <span className="sr-only">Anterior</span>
              </Button>

              {/* Image */}
              {currentProject && (
                <div className="w-full h-full relative">
                  <Image
                    src={currentProject.imageUrl}
                    alt={currentProject.description}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-white/20 hover:bg-white/40 text-white"
              >
                <ChevronRight className="h-8 w-8" />
                <span className="sr-only">Siguiente</span>
              </Button>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ChoreographyCatalog;
