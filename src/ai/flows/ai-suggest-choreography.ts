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
  suggestedStyles: z.array(z.string()).describe('An array of suggested choreography styles.'),
  reasoning: z.string().describe('The reasoning behind the suggested styles.'),
});
export type SuggestChoreographyOutput = z.infer<typeof SuggestChoreographyOutputSchema>;

export async function suggestChoreography(input: SuggestChoreographyInput): Promise<SuggestChoreographyOutput> {
  return suggestChoreographyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestChoreographyPrompt',
  input: {schema: SuggestChoreographyInputSchema},
  output: {schema: SuggestChoreographyOutputSchema},
  prompt: `You are a professional choreographer specializing in XV Años dances. Based on the theme and music provided, suggest suitable choreography styles. Provide a brief reasoning for each suggestion.

Theme: {{{theme}}}
Music: {{{music}}}

Output the suggested styles and reasoning in a structured format.`,
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
