
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PackagePlus } from 'lucide-react';
import CustomPackageBuilder from './custom-package-builder';

export default function CustomPackageCTA() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <CustomPackageBuilder>
            <Card className="flex flex-col md:flex-row items-center text-center md:text-left transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/50 cursor-pointer overflow-hidden group">
              <div className="p-8 md:p-12 flex-grow">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                    <PackagePlus className="h-10 w-10" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
                      ¿Prefieres algo único?
                    </CardTitle>
                    <p className="text-xl text-muted-foreground">
                      Crea tu propio paquete personalizado seleccionando solo los servicios que necesitas.
                    </p>
                  </div>
                </div>
                <Button size="lg" className="w-full md:w-auto px-12 text-lg font-bold uppercase tracking-widest">
                  Comenzar a Construir
                </Button>
              </div>
              <div className="hidden md:block w-1/3 bg-primary/5 h-full self-stretch border-l border-primary/20 relative">
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <PackagePlus className="h-32 w-32 text-primary" />
                 </div>
              </div>
            </Card>
          </CustomPackageBuilder>
        </div>
        
        <div className="text-center mt-12 text-white/50 italic">
          <p>*Precios sujetos a cambio sin previo aviso. Todas nuestras cotizaciones son personalizadas.</p>
        </div>
      </div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
