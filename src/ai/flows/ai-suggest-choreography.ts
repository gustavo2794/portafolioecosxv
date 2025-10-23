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
  numModernDances: z.enum(['0', '1', '2']).describe('The number of modern mix dances the user wants (0, 1, or 2).'),
  wantsOpeningShow: z.boolean().describe('Whether the user is interested in an opening show.'),
  wantsProfessionalDancers: z.boolean().describe('Whether the user wants professional dancers to accompany them.'),
  musicGenres: z.string().optional().describe('Optional field for preferred music genres.'),
});
export type SuggestChoreographyInput = z.infer<typeof SuggestChoreographyInputSchema>;

const SuggestChoreographyOutputSchema = z.object({
  recommendedPackage: z.string().describe('The name of the most suitable package (e.g., "Paquete Oro").'),
  suggestedStyles: z.array(z.string()).describe('An array of suggested choreography styles based on the music genres.'),
  reasoning: z.string().describe('The reasoning behind the suggested package and styles.'),
});
export type SuggestChoreographyOutput = z.infer<typeof SuggestChoreographyOutputSchema>;

const packagesInfo = `
- Paquete Básico: Vals entrada, Vals protocolos, Vals principal. (Ideal para 0 bailes modernos).
- Paquete Plata: Incluye lo del Básico + un Mix moderno. (Ideal para 1 baile moderno).
- Paquete Oro: Incluye lo del Plata pero con dos Mixes modernos. (Ideal para 2 bailes modernos).
- Paquete Platinum: Incluye lo del Oro + un "Opening" (show de apertura) y 4 bailarines. (Requiere "Opening" y "Bailarines").
- Paquete Diamante: El más completo. Incluye lo del Platinum + Vestuario para todos y Pirotecnia. (La opción más completa si quieren todo).
`;

const prompt = ai.definePrompt({
  name: 'suggestChoreographyPrompt',
  input: {schema: SuggestChoreographyInputSchema},
  output: {schema: SuggestChoreographyOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are a professional choreographer and event planner for XV Años dances.
Your goal is to recommend the best package and choreography styles based on the user's specific choices.

Here are the available packages:
${packagesInfo}

Analyze the user's explicit choices:
- Number of modern dances: "{{numModernDances}}"
- Wants an opening show: {{wantsOpeningShow}}
- Wants professional dancers: {{wantsProfessionalDancers}}
- Preferred music genres: "{{musicGenres}}"

Based on these choices, determine the most logical package.
- If 'wantsOpeningShow' is true OR 'wantsProfessionalDancers' is true, the recommendation MUST be 'Paquete Platinum'.
- If BOTH 'wantsOpeningShow' and 'wantsProfessionalDancers' are true, recommend 'Paquete Platinum' but mention 'Paquete Diamante' is an upgrade for the full experience.
- If 'wantsOpeningShow' and 'wantsProfessionalDancers' are both false, then the choice depends directly on the number of modern dances:
  - '0' modern dances -> 'Paquete Básico'
  - '1' modern dance -> 'Paquete Plata'
  - '2' modern dances -> 'Paquete Oro'

After choosing the package, if the user provided music genres, suggest some fun choreography ideas based on those genres. If not, suggest some popular styles like 'Reggaeton, Cumbia, Pop'.
Finally, provide a clear reasoning for your recommendation, explaining exactly why their choices led to your suggested package.

Output the recommendation in a structured JSON format.`,
});

const suggestChoreographyFlow = ai.defineFlow(
  {
    name: 'suggestChoreographyFlow',
    inputSchema: SuggestChoreographyInputSchema,
    outputSchema: SuggestChoreographyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a suggestion.');
    }
    return output;
  }
);

export async function suggestChoreography(input: SuggestChoreographyInput): Promise<SuggestChoreographyOutput> {
  return suggestChoreographyFlow(input);
}
