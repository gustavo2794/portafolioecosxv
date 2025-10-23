'use server';
/**
 * @fileOverview Choreography style suggestion AI agent.
 *
 * - suggestChoreography - A function that suggests choreography styles based on user input.
 * - SuggestChoreographyInput - The input type for the suggestChoreography function.
 * - SuggestChoreographyOutput - The return type for the suggestChoreography function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestChoreographyInputSchema = z.object({
  theme: z.string().describe('The theme of the XV Años celebration.'),
  music: z.string().describe('The music to be used for the dance.'),
});
export type SuggestChoreographyInput = z.infer<typeof SuggestChoreographyInputSchema>;

const SuggestChoreographyOutputSchema = z.object({
  recommendedPackage: z.string().describe('The name of the most suitable package (e.g., "Paquete Oro").'),
  suggestedStyles: z.array(z.string()).describe('An array of suggested choreography styles.'),
  reasoning: z.string().describe('The reasoning behind the suggested package and styles.'),
});
export type SuggestChoreographyOutput = z.infer<typeof SuggestChoreographyOutputSchema>;

export async function suggestChoreography(input: SuggestChoreographyInput): Promise<SuggestChoreographyOutput> {
  return suggestChoreographyFlow(input);
}

const packagesInfo = `
- Paquete Básico: Vals entrada, Vals protocolos, Vals principal. (El más sencillo)
- Paquete Plata: Incluye lo del Básico + Vals familiar y un Mix moderno.
- Paquete Oro: Incluye lo del Plata pero con dos Mixes modernos en lugar de uno.
- Paquete Platinum: Incluye lo del Oro + un "Opening" (show de apertura) y 4 bailarines.
- Paquete Diamante: El más completo. Incluye lo del Platinum + Vestuario para todos y Pirotecnia. (Full experience)
`;

const prompt = ai.definePrompt({
  name: 'suggestChoreographyPrompt',
  input: {schema: SuggestChoreographyInputSchema},
  output: {schema: SuggestChoreographyOutputSchema},
  prompt: `You are a professional choreographer and event planner for XV Años dances.
Your goal is to recommend the best package and choreography styles based on the user's theme and music.

Here are the available packages:
${packagesInfo}

Analyze the user's request:
Theme: {{{theme}}}
Music: {{{music}}}

Based on the theme and music, first decide which package is the most suitable. A very elaborate theme like "Hollywood Glamour" might need the Diamante package, while something simple might only need the Básico or Plata.
Then, suggest specific choreography styles that fit the theme and music.
Finally, provide a clear reasoning for your recommendation, explaining why you chose that package and those styles.

Output the recommendation in a structured format.`,
});

const suggestChoreographyFlow = ai.defineFlow(
  {
    name: 'suggestChoreographyFlow',
    inputSchema: SuggestChoreographyInputSchema,
    outputSchema: SuggestChoreographyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
