import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Pricing from '@/components/sections/pricing';
import PremiumAddOns from '@/components/sections/premium-add-ons';
import CustomPackageCTA from '@/components/sections/custom-package-cta';
import { Button } from '@/components/ui/button';
import { Utensils, Camera, Smartphone, PartyPopper, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Coreography and Vals Main Packages First */}
        <Pricing />

        {/* Section Intro for Premium Experiences (Non-intrusive, placed right before experiences section) */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/30 to-accent/15 border-y border-primary/20 py-8 px-6">
          <div className="container max-w-6xl mx-auto space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 bg-primary/20 text-primary px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" /> Servicios & Experiencias de Gala
                </div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">
                  Complementa tu Coreografía con Nuestras Experiencias
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl">
                  Arma un paquete completo con tomas de Dron, Cuadros de Bienvenida, Carrito de Snacks & Shots, Invitaciones Digitales y Batucada con Cabezones.
                </p>
              </div>
            </div>

            {/* Quick Experience Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <Link href="/packages/candy-bar" className="block">
                <Button variant="outline" className="w-full justify-start gap-2 text-xs border-primary/30 hover:bg-primary/20 hover:border-primary">
                  <Utensils className="h-4 w-4 text-primary" /> Carrito Snacks & Shots
                </Button>
              </Link>
              <Link href="/packages/drone-photo" className="block">
                <Button variant="outline" className="w-full justify-start gap-2 text-xs border-primary/30 hover:bg-primary/20 hover:border-primary">
                  <Camera className="h-4 w-4 text-primary" /> Dron & Cuadros Foto
                </Button>
              </Link>
              <Link href="/packages/invitaciones" className="block">
                <Button variant="outline" className="w-full justify-start gap-2 text-xs border-primary/30 hover:bg-primary/20 hover:border-primary">
                  <Smartphone className="h-4 w-4 text-primary" /> Invitación Digital
                </Button>
              </Link>
              <Link href="/packages/batucada" className="block">
                <Button variant="outline" className="w-full justify-start gap-2 text-xs border-primary/30 hover:bg-primary/20 hover:border-primary">
                  <PartyPopper className="h-4 w-4 text-primary" /> Batucada & Cabezones
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Premium Experiences Cards */}
        <PremiumAddOns />

        {/* Custom Package CTA */}
        <CustomPackageCTA />
      </main>
      <Footer />
    </div>
  );
}
