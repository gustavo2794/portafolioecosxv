'use server';
import { suggestChoreography } from '@/ai/flows/ai-suggest-choreography';
import { z } from 'zod';

const schema = z.object({
  theme: z.string().min(3, { message: 'El tema debe tener al menos 3 caracteres.' }),
  music: z.string().min(3, { message: 'El estilo de música debe tener al menos 3 caracteres.' }),
});

export type FormState = {
  message: string;
  errors?: {
    theme?: string[];
    music?: string[];
  };
  data?: {
    recommendedPackage: string;
    suggestedStyles: string[];
    reasoning: string;
  };
};

export async function getAiSuggestions(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    theme: formData.get('theme'),
    music: formData.get('music'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Datos de formulario no válidos. Por favor, revisa tus entradas.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await suggestChoreography(validatedFields.data);
    if (result) {
        return { message: 'Success', data: result };
    } else {
        return { message: 'La IA no pudo generar una sugerencia. Por favor, inténtalo de nuevo.' };
    }
  } catch (error) {
    console.error(error);
    return { message: 'Ocurrió un error inesperado al obtener las sugerencias.' };
  }
}
