import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Pricing from '@/components/sections/pricing';
import PremiumAddOns from '@/components/sections/premium-add-ons';
import CustomPackageCTA from '@/components/sections/custom-package-cta';
import { Button } from '@/components/ui/button';
import { Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Drone & Photo Packages Spotlight Banner */}
        <div className="bg-gradient-to-r from-primary/20 via-secondary/40 to-accent/20 border-y border-primary/30 py-8 px-6 text-center">
          <div className="container max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-2">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                <Camera className="h-3.5 w-3.5" /> Nuevo Apartado de Recuerdos
              </div>
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">
                Paquetes de Cobertura Dron, Cuadros de Firmas & Foto de Recepción
              </h2>
              <p className="text-muted-foreground text-sm">
                Inmortaliza tu ensayo, tu vals y la recepción con cuadros personalizados y tomas aéreas cinematográficas.
              </p>
            </div>
            <Link href="/packages/drone-photo">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shrink-0 gap-2 shadow-lg">
                <Sparkles className="h-4 w-4" /> Ver Paquetes de Foto & Dron
              </Button>
            </Link>
          </div>
        </div>

        <Pricing />
        <PremiumAddOns />
        <CustomPackageCTA />
      </main>
      <Footer />
    </div>
  );
}