import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "user",
          content: `Forme 4 frases em inglês com a palavra "${input}".
               Retorne apenas um JSON bruto no formato: [{"frase": "...", "traducao": "..."}, ...].
               Não escreva nenhuma explicação, apenas o JSON.`,
        },
      ],
      max_tokens: 300,
      temperature: 0.3,
    });

    const response = completion.choices[0].message.content
      ? completion.choices[0].message.content.replace(/```json|```/g, "").trim()
      : null;

    const sentences = JSON.parse(response || "");

    return NextResponse.json({ data: sentences });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
