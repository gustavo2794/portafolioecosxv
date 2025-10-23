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
    if (state.message === 'Success') {
      formRef.current?.reset();
    }
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
                    <CardTitle className="font-headline text-3xl">Asistente de Coreografía AI</CardTitle>
                </div>
                <CardDescription>
                  ¿No estás seguro por dónde empezar? Describe el tema y la música de tu evento, y deja que nuestra IA te sugiera los estilos de baile y el paquete ideal para ti.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema del Evento</Label>
                  <Input id="theme" name="theme" placeholder="Ej: 'Bosque Encantado', 'Glamour de Hollywood'" />
                  {state.errors?.theme && <p className="text-sm text-destructive">{state.errors.theme[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="music">Estilo de Música</Label>
                  <Input id="music" name="music" placeholder="Ej: 'Pop Moderno', 'Vals Clásico', 'Mix Latino'" />
                  {state.errors?.music && <p className="text-sm text-destructive">{state.errors.music[0]}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="order-1 md:order-2">
            <h2 className="font-headline text-4xl font-bold mb-4">Tus Sugerencias Personalizadas</h2>
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
                    <div>
                        <h3 className="font-headline text-2xl text-primary mb-3">Estilos Sugeridos</h3>
                        <ul className="space-y-2 list-none">
                            {state.data.suggestedStyles.map((style, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <Feather className="h-4 w-4 text-accent"/>
                                    <span>{style}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-headline text-2xl text-primary mb-3">Nuestro Razonamiento</h3>
                        <p className="text-muted-foreground">{state.data.reasoning}</p>
                    </div>
                </div>
            ) : !pending && (
                <div className="text-center md:text-left text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <p>Tus sugerencias de baile y el paquete ideal aparecerán aquí una vez que completes el formulario.</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
}
