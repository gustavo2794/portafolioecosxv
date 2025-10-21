import { GalleryVertical } from 'lucide-react';

const ChoreographyCatalog = () => {
  return (
    <section id="choreography" className="py-16 lg:py-24 bg-card">
      <div className="container">
        <div className="text-center flex flex-col items-center justify-center min-h-[400px] text-muted-foreground border-2 border-dashed rounded-lg p-8">
            <GalleryVertical className="h-20 w-20 text-primary mb-6" />
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
                Galería Próximamente
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-lg">
                Estamos preparando una increíble selección de nuestras mejores fotos y videos. ¡Vuelve pronto para inspirarte!
            </p>
        </div>
      </div>
    </section>
  );
};

export default ChoreographyCatalog;
