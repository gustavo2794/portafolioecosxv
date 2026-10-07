'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Bot, Sparkles, Send, User, MessageCircle, RefreshCw } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/constants/data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! 💃 Soy el Asesor Virtual de Ecos del Sur. ¿Tienes dudas sobre qué vals bailar, ideas para tu baile sorpresa o qué paquete te conviene más? ¡Cuéntame tus gustos y te ayudo a diseñar tu show!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.slice(-6),
          userMessage: textToSend
        })
      });

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply || '¡Con gusto te asesoramos! Puedes mandarnos mensaje a WhatsApp para afinar los detalles.' }]);
    } catch (error) {
      console.error('Error fetching AI reply:', error);
      setMessages([...newMessages, { role: 'assistant', content: '¡Nos encantaría ayudarte a planear tu vals! Puedes escribirnos directamente por WhatsApp para darte atención personalizada.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToWhatsApp = () => {
    const lastAssistantMsg = messages.filter(m => m.role === 'assistant').pop()?.content || '';
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
    
    let text = `Hola Ecos del Sur, estuve usando su asesor virtual de coreografías.\n`;
    if (lastUserMsg) {
      text += `Mi consulta fue: "${lastUserMsg}"\n`;
    }
    text += `¿Podrían brindarme informes y asesoría personalizada para mi evento?`;

    const url = `https://wa.me/525528098448?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const quickQuestions = [
    '¿Qué canciones me recomiendas para el baile sorpresa?',
    '¿Cuántos bailarines me recomiendan contratar?',
    '¿Qué servicios extras tienen para la fiesta?'
  ];

  return (
    <>
      {/* Discreet AI Consultant button fixed at bottom-left */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-2xl bg-gradient-to-r from-primary via-amber-500 to-primary text-primary-foreground font-bold px-4 py-3 h-auto flex items-center gap-2 border border-primary/40 hover:scale-105 transition-all shadow-black/40"
        >
          <Bot className="h-5 w-5 animate-bounce" />
          <span className="hidden sm:inline text-xs">Asesor de Vals IA</span>
          <Sparkles className="h-3.5 w-3.5 text-black" />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col p-0 overflow-hidden bg-card border-primary/30">
          {/* Header */}
          <DialogHeader className="p-4 bg-gradient-to-r from-secondary/80 via-black to-accent/60 border-b border-primary/20 text-white">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="font-headline text-xl text-primary flex items-center gap-2">
                  Asesor Coreográfico Ecos del Sur <Sparkles className="h-4 w-4 text-primary" />
                </DialogTitle>
                <DialogDescription className="text-xs text-white/70">
                  Inteligencia Artificial para recomendarte canciones, shows y paquetes de XV
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[45vh] text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="h-7 w-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground font-medium rounded-br-none'
                      : 'bg-muted/70 text-foreground border border-border rounded-bl-none'
                  }`}
                >
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs italic">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> EcosBot está pensando tu recomendación...
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="p-3 bg-muted/30 border-t border-border/50 flex flex-wrap gap-1.5">
            <span className="text-[11px] text-muted-foreground w-full font-semibold">Sugerencias rápidas:</span>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] bg-card hover:bg-primary/20 hover:text-primary border border-border px-2.5 py-1 rounded-full text-left transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input & WhatsApp Action Footer */}
          <div className="p-3 bg-card border-t border-border flex flex-col gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Escribe tu consulta o idea (ej: vals con remix moderno)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="text-sm"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="bg-primary text-primary-foreground shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <Button
              onClick={handleSendToWhatsApp}
              variant="outline"
              size="sm"
              className="w-full text-xs font-semibold gap-1.5 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Enviar esta propuesta por WhatsApp a un Coreógrafo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
