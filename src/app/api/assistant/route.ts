import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '';

const systemPrompt = `Eres "EcosBot", el Asesor Experto en Coreografías y Eventos de XV Años de la Compañía de Danza "Ecos del Sur".
Tu objetivo es orientar de forma amable, entusiasta y muy profesional a quinceañeras y padres de familia sobre:
1. Elección de canciones para el Vals de Entrada, Vals Principal (con papá/mamá/familiares) y el Baile Sorpresa / Mix Moderno (reggaetón, cumbia, pop, bachata, k-pop, regional, etc.).
2. Selección de paquetes de coreografía (Oro, Platino, Diamante) según el número de chambelanes o bailarines que deseen (4 a 8 bailarines).
3. Servicios complementarios de la compañía:
   - Cobertura con Dron y Cuadro de Bienvenida para firmas en recepción.
   - Carrito de Snacks, Dulces y Mocktail Shots sin alcohol para la fiesta.
   - Invitaciones Web Digitales con música, pases QR y confirmación por WhatsApp.
   - Batucada Ecos con personajes cabezones gigantes, robot LED y props luminosos.
4. Tiempos recomendados de ensayo (iniciar 2 a 4 meses antes del evento).

Normas de respuesta:
- Habla en un tono cálido, festivo y empático en español mexicano.
- Sé claro, organizado y breve (evita textos aburridos; usa viñetas y emojis como 💃, 👑, ✨).
- No inventes precios fijos, invita siempre a enviar la propuesta por WhatsApp con el botón correspondiente.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage } = await req.json();

    if (!apiKey) {
      return NextResponse.json({
        reply: `¡Hola! ✨ Me encanta poder ayudarte a planear los XV Años perfectos con Ecos del Sur. 

Para recomendarte el vals y show ideal, cuéntame:
1. ¿Qué temática o estilo de música le gusta más a la quinceañera (moderno, tradicional, urbano, etc.)?
2. ¿Bailará con chambelanes de la familia o les gustaría contratar a nuestros bailarines profesionales?
3. ¿Te gustaría incluir servicios adicionales como el Carrito de Snacks, Dron o la Batucada con Cabezones?

¡Escríbeme tus ideas o dale clic al botón de WhatsApp para cotizar directamente!`
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format prompt conversation
    const fullPrompt = `${systemPrompt}\n\nHistorial de conversación:\n${(messages || []).map((m: any) => `${m.role === 'user' ? 'Cliente' : 'EcosBot'}: ${m.content}`).join('\n')}\nCliente: ${userMessage}\nEcosBot:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    const replyText = response.text || '¡Estamos listos para hacer de tu vals un momento mágico! Puedes escribirnos directamente por WhatsApp para apartar tu fecha.';

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error('Error in AI Assistant API:', error);
    return NextResponse.json({
      reply: '¡Hola! En Compañía de Danza Ecos del Sur estamos listos para diseñar tu vals soñado. ¿Qué temática o canciones te gustaría bailar en tus XV Años?'
    });
  }
}
