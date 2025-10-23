'use server';
import { suggestChoreography, SuggestChoreographyInput } from '@/ai/flows/ai-suggest-choreography';
import { z } from 'zod';

const schema = z.object({
  numModernDances: z.enum(['0', '1', '2']),
  wantsOpeningShow: z.preprocess(value => value === 'on', z.boolean()),
  wantsProfessionalDancers: z.preprocess(value => value === 'on', z.boolean()),
  musicGenres: z.string().optional(),
});

export type FormState = {
  message: string;
  errors?: {
    numModernDances?: string[];
    wantsOpeningShow?: string[];
    wantsProfessionalDancers?: string[];
    musicGenres?: string[];
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
    numModernDances: formData.get('numModernDances'),
    wantsOpeningShow: formData.get('wantsOpeningShow'),
    wantsProfessionalDancers: formData.get('wantsProfessionalDancers'),
    musicGenres: formData.get('musicGenres'),
  });

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'Datos de formulario no válidos. Por favor, revisa tus entradas.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await suggestChoreography(validatedFields.data as SuggestChoreographyInput);
    if (result) {
        return { message: 'Success', data: result };
    } else {
        return { message: 'La IA no pudo generar una sugerencia. Por favor, inténtalo de nuevo.' };
    }
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return { message: 'Ocurrió un error inesperado al obtener las sugerencias.' };
  }
}
