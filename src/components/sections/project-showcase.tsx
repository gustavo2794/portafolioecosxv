
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: 'OPENING',
    id: 'project-5',
    youtubeVideoId: 'https://www.youtube.com/watch?v=xvStAvolUQU',
  },
  {
    title: 'Vals de Entrada',
    id: 'project-7',
    youtubeVideoId: 'https://youtu.be/V_wTqHT3Mh0',
  },
  {
    title: 'Vals Principal',
    id: 'project-6',
    youtubeVideoId: 'https://youtu.be/Ihajp1w0rxA',
  },
  {
    title: 'Mix Reggaeton',
    id: 'project-mix-reggaeton',
    youtubeVideoId: 'https://youtu.be/1ISY6kLm6Cg',
  },
  {
    title: 'Mix Salsa y Merengue',
    id: 'project-mix-salsa-merengue',
    youtubeVideoId: 'https://youtu.be/w0EEKnJdJFk',
  },
];

// Función para extraer el ID de video de una URL de YouTube
const getYouTubeId = (urlOrId: string): string => {
  if (!urlOrId) return '';
  // Si ya es solo el ID, devuélvelo
  if (!urlOrId.includes('http')) {
    return urlOrId;
  }
  try {
    const url = new URL(urlOrId);
    if (url.hostname === 'youtu.be') {
      return url.pathname.slice(1).split('?')[0];
    }
    if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
      if (url.pathname === '/watch') {
        return url.searchParams.get('v') || '';
      }
      if (url.pathname.startsWith('/embed/')) {
        return url.pathname.split('/embed/')[1].split('?')[0];
      }
    }
  } catch (error) {
    console.error('Invalid YouTube URL:', urlOrId);
    return urlOrId; // Devuelve el original si falla el parseo
  }
  return urlOrId; // Devuelve el original si no se encuentra el ID
};


const ProjectShowcase = () => {
  return (
    <section
      id="projects"
      className="py-12 lg:pt-12 lg:pb-20 bg-cover bg-center bg-no-repeat relative bg-fixed"
      style={{ backgroundImage: "url('https://res.cloudinary.com/drylg7prb/image/upload/v1761188173/Fondo_Proyectos_1_lpfdvp.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
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
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Nuestros Eventos Pasados</h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/80">
            Un vistazo a los momentos mágicos que hemos ayudado a crear.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const image = PlaceHolderImages.find((img) => img.id === project.id);
            const videoId = project.youtubeVideoId ? getYouTubeId(project.youtubeVideoId) : null;

            if (videoId) {
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
                  <DialogContent className="max-w-4xl p-0 aspect-video bg-black">
                     <DialogTitle className="sr-only">{project.title}</DialogTitle>
                     <DialogDescription className="sr-only">Video de YouTube para el proyecto: {project.title}</DialogDescription>
                     <iframe 
                        className="w-full h-full" 
                        src={`https://www.youtube.com/embed/${videoId}`}
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
