import { GoogleGenAI } from "@google/genai";
import { getSiteKnowledgeBase } from "../src/data/knowledgeBase";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Input validation: check message count and size to prevent abuse
    if (messages.length > 50) {
      return res.status(400).json({ error: "Too many messages in history" });
    }

    for (const m of messages) {
      if (!m || typeof m.content !== 'string' || m.content.length > 2000) {
        return res.status(400).json({ error: "Invalid message format or length exceeds 2000 characters" });
      }
    }

    const knowledgeBase = getSiteKnowledgeBase();

    const systemInstruction = `Eres el Asistente Virtual Oficial de Yamilka Batista, Socio Comercial Independiente de HGW Panamá. 
Tu objetivo es guiar a los visitantes de la tienda online con amabilidad, precisión y profesionalismo.

REGLAS ESTRICTAS DE RESPUESTA:
1. Eres asistente del Socio Independiente Yamilka Batista. NUNCA hables en nombre de la corporación HGW Corporativo.
2. Utiliza la siguiente BASE DE CONOCIMIENTO del sitio web para responder. Si la pregunta está fuera de esta base de conocimiento, NUNCA inventes: indica amablemente que lo consultarás y pide amablemente su nombre y teléfono (con código de país) para que el administrador le dé seguimiento.
3. DETECCIÓN DEL TIPO DE VISITANTE:
   - Si ya es socio: indícale amablemente que se comunique con su patrocinador o al teléfono de oficinas principales (+507 392-8415). No resuelvas trámites internos ni pidas que se registre otra vez.
   - Si quiere ser socio o emprender: explica los paquetes (Prejunior, Junior, Senior, Master con 30% descuento en inicial, recompra master 52% descuento, requerimiento de 10 puntos mensuales / ~$25) y envíalo al link de referido: https://www.healthgreenworld.com/?userName=Yamilka507 y WhatsApp +507 6778-8375.
   - Si es cliente interesado en productos: orienta según el catálogo, indica precios públicos y cómo comprar (vía WhatsApp o link de afiliado).
   - Si solo busca información: da información general y ofrece ayuda.
4. NUNCA prometas ingresos financieros garantizados ni curas o resultados médicosmilagrosos. Ante temas de salud, recomienda consultar a un profesional.
5. Mantén un tono cálido, humano, profesional y en español. Respuestas concisas, claras y estructuradas con viñetas cuando sea útil.

BASE DE CONOCIMIENTO OFICIAL:
${knowledgeBase}`;

    const formattedContents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: formattedContents,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || "Entendido. ¿En qué más puedo ayudarte con respecto a nuestros productos y membresías HGW?";

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("Vercel Serverless Function Gemini API Error:", error);
    return res.status(500).json({
      error: error.message || "Error al procesar la respuesta con el asistente virtual.",
    });
  }
}
