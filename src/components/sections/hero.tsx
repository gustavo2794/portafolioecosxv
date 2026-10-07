'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const [sparkles, setSparkles] = useState<{left: string, top: string, delay: string}[]>([]);

  useEffect(() => {
    // Generate random positions for sparkles
    const newSparkles = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <section className="relative h-[calc(100vh-112px)] w-full text-white bg-black flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden">
      {/* Sparkle Overlay */}
      <div className="sparkle-container">
        {sparkles.map((s, i) => (
          <div key={i} className="sparkle" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
        ))}
      </div>

      {heroImage && (
        <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
        >
            <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
            />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            <Image
                src="https://res.cloudinary.com/drylg7prb/image/upload/v1761183135/LOGO_ECOS_2024_cldy7v.png"
                alt="Logo Completo Ecos del Sur"
                width={400}
                height={133}
                className="object-contain w-[280px] h-auto md:w-[400px] mb-8"
                style={{ filter: 'drop-shadow(0 0 20px rgba(234, 195, 92, 0.5))' }}
            />
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary via-white to-primary shimmer"
        >
          El Baile de Tus Sueños
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light text-white/90"
        >
          Ecos Del Sur trae pasión, elegancia y coreografías inolvidables a tu celebración de XV Años.
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
        >
            <Button asChild size="lg" className="mt-10 font-bold uppercase tracking-widest bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20 border border-white/10">
            <Link href="/projects">Ver Portafolio de Gala</Link>
            </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
