import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Phone, User, Sparkles, Shield, ChevronRight, HelpCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const VirtualAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: '¡Hola! Soy el asistente virtual del Socio Independiente HGW Panamá. ¿En qué puedo ayudarte hoy?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data capture state
  const [showCaptureModal, setShowCaptureModal] = useState(false);
  const [capturedName, setCapturedName] = useState('');
  const [capturedPhone, setCapturedPhone] = useState('');
  const [visitorTypeHint, setVisitorTypeHint] = useState<string>('informacion');
  const [leadSaved, setLeadSaved] = useState(false);
  const [captureError, setCaptureError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleQuickPrompt = (promptText: string) => {
    sendMessage(promptText);
  };

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      const modelMsg: Message = { role: 'model', content: data.reply };
      setMessages([...newMessages, modelMsg]);

      // Trigger lead capture modal after 3 turns if not yet saved
      if (newMessages.length >= 4 && !leadSaved && !showCaptureModal) {
        setShowCaptureModal(true);
      }
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          role: 'model',
          content: 'Lo siento, tuve un pequeño problema al procesar tu mensaje. Puedes escribirnos directamente por WhatsApp al +507 6778-8375.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setCaptureError('');

    if (!capturedName.trim()) {
      setCaptureError('Por favor ingresa tu nombre y apellido.');
      return;
    }
    if (!capturedPhone.trim()) {
      setCaptureError('Por favor ingresa tu número de teléfono.');
      return;
    }

    try {
      const summaryText = messages.slice(-3).map(m => `${m.role}: ${m.content}`).join(' | ');
      await addDoc(collection(db, 'contacts'), {
        fullName: capturedName.trim(),
        phone: capturedPhone.trim(),
        visitorType: visitorTypeHint,
        interest: messages[messages.length - 1]?.content.slice(0, 150) || 'Interés general HGW',
        summary: summaryText.slice(0, 900),
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        status: 'nuevo',
        notes: 'Capturado por asistente virtual',
        createdAt: new Date().toISOString(),
      });
      setLeadSaved(true);
      setShowCaptureModal(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: `¡Gracias ${capturedName.trim()}! Hemos guardado tus datos con éxito. Un asesor de nuestro equipo te contactará muy pronto para dar seguimiento.`,
        },
      ]);
    } catch (err: any) {
      console.error('Error saving lead:', err);
      setCaptureError('Error al guardar datos. Puedes contactarnos por WhatsApp directamente.');
    }
  };

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 sm:w-96 max-w-[calc(100vw-2.5rem)] h-[500px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fade-in z-50">
          {/* Header */}
          <div className="bg-[#4472C4] text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center font-bold text-sm">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight">Asistente HGW Panamá</h3>
                <span className="text-[11px] text-blue-100 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Socio Independiente Yamilka
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#4472C4] text-white rounded-br-xs font-medium'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-2xs rounded-bl-xs'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-stone-500 border border-stone-200 p-3 rounded-2xl text-xs flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#4472C4] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#4472C4] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#4472C4] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Buttons */}
          <div className="px-3 py-2 bg-white border-t border-stone-100 flex gap-1.5 overflow-x-auto text-[11px] shrink-0 scrollbar-none">
            <button
              onClick={() => handleQuickPrompt("¿Ya soy socio")}
              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full font-medium whitespace-nowrap transition-colors"
            >
              Ya soy socio
            </button>
            <button
              onClick={() => handleQuickPrompt("Quiero unirme y emprender")}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#4472C4] rounded-full font-medium whitespace-nowrap transition-colors"
            >
              Quiero unirme
            </button>
            <button
              onClick={() => handleQuickPrompt("Ver productos y precios")}
              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full font-medium whitespace-nowrap transition-colors"
            >
              Ver productos
            </button>
          </div>

          {/* Data Capture Modal Overlay inside Chat */}
          {showCaptureModal && !leadSaved && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-20 p-5 flex flex-col justify-center animate-fade-in">
              <div className="text-center mb-3">
                <h4 className="font-extrabold text-sm text-black">¡Atención personalizada!</h4>
                <p className="text-[11px] text-stone-600 mt-1">
                  Tus datos serán usados solo para dar seguimiento a tu consulta.
                </p>
              </div>

              {captureError && (
                <div className="mb-2 p-2 bg-red-50 text-red-700 rounded-lg text-[10px] font-semibold">
                  {captureError}
                </div>
              )}

              <form onSubmit={handleSaveLead} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-700 mb-1">
                    Nombre y apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={capturedName}
                    onChange={e => setCapturedName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-700 mb-1">
                    Teléfono (+507) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={capturedPhone}
                    onChange={e => setCapturedPhone(e.target.value)}
                    placeholder="6123-4567"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-700 mb-1">
                    ¿Qué te interesa más?
                  </label>
                  <select
                    value={visitorTypeHint}
                    onChange={e => setVisitorTypeHint(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#4472C4]"
                  >
                    <option value="informacion">Información general / productos</option>
                    <option value="emprendedor">Quiero unirme al negocio (afiliación)</option>
                    <option value="socio">Ya soy socio HGW</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#4472C4] hover:bg-[#33599E] text-white font-extrabold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    Guardar y Continuar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCaptureModal(false)}
                    className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs rounded-xl font-medium"
                  >
                    Omitir
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              className="flex-1 px-3 py-2 text-xs bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#4472C4]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 bg-[#4472C4] hover:bg-[#33599E] disabled:opacity-50 text-white rounded-xl flex items-center justify-center shadow-sm transition-all shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir asistente virtual"
        className="w-14 h-14 bg-[#4472C4] hover:bg-[#33599E] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#4472C4]/40 hover:scale-105 active:scale-95 transition-all relative group"
      >
        <MessageSquare className="w-6 h-6 fill-white text-[#4472C4]" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[9px] font-black text-stone-900">
          AI
        </span>
      </button>
    </div>
  );
};
