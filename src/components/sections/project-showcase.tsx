'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: 'OPENING',
    id: 'project-5',
    // TODO: Reemplaza 'YOUTUBE_VIDEO_ID' con el ID de tu video de YouTube
    youtubeVideoId: 'dQw4w9WgXcQ', // ID de ejemplo
  },
  {
    title: 'Vals de Entrada',
    id: 'project-7',
    // TODO: Reemplaza 'YOUTUBE_VIDEO_ID' con el ID de tu video de YouTube
    youtubeVideoId: 'dQw4w9WgXcQ', // ID de ejemplo
  },
  {
    title: 'Vals Principal',
    id: 'project-6',
    // TODO: Reemplaza 'YOUTUBE_VIDEO_ID' con el ID de tu video de YouTube
    youtubeVideoId: 'dQw4w9WgXcQ', // ID de ejemplo
  },
  {
    title: 'El Bosque Encantado de Sofía',
    id: 'project-1',
  },
  {
    title: 'El Baile Real de Isabella',
    id: 'project-2',
  },
  {
    title: 'La Fiesta Salsera de Camila',
    id: 'project-3',
  },
  {
    title: 'El Cuento de Hadas de Valentina',
    id: 'project-4',
  },
];

const ProjectShowcase = () => {
  return (
    <section
      id="projects"
      className="py-12 lg:pt-12 lg:pb-20 bg-cover bg-center bg-no-repeat relative bg-fixed"
      style={{ backgroundImage: "url('/Fondo_Proyectos.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="container relative z-10">
        <div className="text-center mb-12 flex flex-col items-center">
            <Image
                src="/LOGO ECOS 2024.png"
                alt="Logo Completo Ecos del Sur"
                width={480}
                height={160}
                className="object-contain w-[320px] h-auto md:w-[480px] mb-8"
                style={{ filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))' }}
            />
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Nuestros Eventos Pasados</h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/80">
            Un vistazo a los momentos mágicos que hemos ayudado a crear.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const image = PlaceHolderImages.find((img) => img.id === project.id);

            if (project.youtubeVideoId) {
              return (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <Card className="bg-black/30 border-white/20 text-white overflow-hidden transition-all duration-300 hover:shadow-primary/60 hover:-translate-y-2 cursor-pointer relative group shadow-xl shadow-primary/20">
                      <CardHeader className="text-center relative z-10">
                        <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                        {image && <CardDescription className="text-white/80">{image.description}</CardDescription>}
                      </CardHeader>
                      <CardContent className="relative z-10">
                        {image && (
                          <div className="aspect-video overflow-hidden rounded-lg">
                            <Image
                              src={image.imageUrl}
                              alt={project.title}
                              width={600}
                              height={400}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                              data-ai-hint={image.imageHint}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 aspect-video">
                     <iframe 
                        className="w-full h-full" 
                        src={`https://www.youtube.com/embed/${project.youtubeVideoId}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                  </DialogContent>
                </Dialog>
              );
            }

            return (
              <Card key={project.id} className="bg-black/30 border-white/20 text-white overflow-hidden transition-all duration-300 hover:shadow-primary/60 hover:-translate-y-2 relative group shadow-xl shadow-primary/20">
                <CardHeader className="relative z-10">
                  <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                  {image && <CardDescription className="text-white/80">{image.description}</CardDescription>}
                </CardHeader>
                <CardContent className="relative z-10">
                  {image && (
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={image.imageUrl}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
