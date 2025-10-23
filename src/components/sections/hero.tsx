
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const Hero = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[calc(100vh-112px)] w-full text-white bg-black flex flex-col items-center justify-center py-12 md:py-20">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <Image
            src="https://res.cloudinary.com/drylg7prb/image/upload/v1761183135/LOGO_ECOS_2024_cldy7v.png"
            alt="Logo Completo Ecos del Sur"
            width={400}
            height={133}
            className="object-contain w-[280px] h-auto md:w-[400px] mb-8"
            style={{ filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }}
        />
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-2xl">
          El Baile de Tus Sueños
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-lg">
          Ecos Del Sur trae pasión, elegancia y coreografías inolvidables a tu celebración de XV Años.
        </p>
        <Button asChild size="lg" className="mt-8 font-bold uppercase tracking-wider">
          <Link href="/projects">Explora Nuestro Trabajo</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
