'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { getAiSuggestions, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Bot, Feather, Wand2, PackageCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Bot className="mr-2 h-4 w-4 animate-spin" />
          Pensando...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Obtener Sugerencias
        </>
      )}
    </Button>
  );
}

export default function AiRecommender() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(getAiSuggestions, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
    // We don't reset the form on success anymore, so the user can see their choices
  }, [state, toast]);

  return (
    <section id="ai-recommender" className="py-16 lg:py-24 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-start">
        <div className="order-2 md:order-1">
          <Card>
            <form ref={formRef} action={formAction}>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                    <Wand2 className="h-8 w-8"/>
                    <CardTitle className="font-headline text-3xl">Asistente de Coreografía IA</CardTitle>
                </div>
                <CardDescription>
                  Responde estas preguntas y nuestra IA te recomendará el paquete perfecto para ti.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-3">
                  <Label>Además de los valses, ¿cuántos bailes modernos te gustaría tener?</Label>
                  <RadioGroup name="numModernDances" defaultValue="1" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="r1" />
                      <Label htmlFor="r1">Ninguno</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="r2" />
                      <Label htmlFor="r2">1 Mix Moderno</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="r3" />
                      <Label htmlFor="r3">2 Mixes Modernos</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <Label>¿Te interesa un show de apertura (Opening)?</Label>
                     <CardDescription className="text-xs">Ideal para un inicio espectacular.</CardDescription>
                  </div>
                  <Switch id="wantsOpeningShow" name="wantsOpeningShow" />
                </div>

                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <Label>¿Te gustaría tener bailarines profesionales?</Label>
                     <CardDescription className="text-xs">Añaden un toque profesional a tu evento.</CardDescription>
                  </div>
                  <Switch id="wantsProfessionalDancers" name="wantsProfessionalDancers" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="musicGenres">¿Qué géneros de música te gustan? (Opcional)</Label>
                  <Input id="musicGenres" name="musicGenres" placeholder="Ej: 'Reggaeton, Bachata, Pop...'" />
                </div>

              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="order-1 md:order-2">
            <h2 className="font-headline text-4xl font-bold mb-4">Tu Sugerencia Personalizada</h2>
            {pending && (
                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="h-8"></div>
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                </div>
            )}
            {state.data ? (
                <div className="space-y-8">
                     <div>
                        <h3 className="font-headline text-2xl text-primary mb-3 flex items-center gap-2">
                            <PackageCheck className="h-6 w-6"/>
                            Paquete Recomendado
                        </h3>
                        <p className="text-xl font-semibold bg-primary/10 text-primary-foreground border border-primary/20 rounded-lg px-4 py-2 inline-block">{state.data.recommendedPackage}</p>
                    </div>
                    {state.data.suggestedStyles.length > 0 && (
                      <div>
                          <h3 className="font-headline text-2xl text-primary mb-3">Ideas de Coreografía</h3>
                          <ul className="space-y-2 list-none">
                              {state.data.suggestedStyles.map((style, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                      <Feather className="h-4 w-4 text-accent"/>
                                      <span>{style}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                    )}
                    <div>
                        <h3 className="font-headline text-2xl text-primary mb-3">Nuestro Razonamiento</h3>
                        <p className="text-muted-foreground">{state.data.reasoning}</p>
                    </div>
                </div>
            ) : !pending && (
                <div className="text-center md:text-left text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <Bot className="h-12 w-12 mx-auto md:mx-0 mb-4 text-muted-foreground/50"/>
                    <p>Completa el formulario de la izquierda y tu recomendación personalizada aparecerá aquí.</p>
                    <p className="text-sm mt-2">¡Es rápido, fácil y te ayudará a encontrar el plan perfecto para tu fiesta!</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}
