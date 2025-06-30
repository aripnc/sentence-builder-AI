import { auth } from "@/lib/auth";
import { baseProcedure, router } from "@/trpc-server/init";
import { headers } from "next/headers";
import * as z from "zod/v4";

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_KEY,
});

export const sentenceRouter = router({
  generateSentences: baseProcedure
    .input(
      z.object({
        vocabulary: z.string(),
        quantidade: z.string(),
      }),
    )
    .output(
      z.array(
        z.object({
          frase: z.string(),
          traducao: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "user",
            content: `Forme ${input.quantidade} frases em inglês com a palavra "${input.vocabulary}".
                   Retorne apenas um JSON bruto no formato: [{"frase": "...", "traducao": "..."}, ...].
                   Não escreva nenhuma explicação, apenas o JSON.`,
          },
        ],
        max_tokens: 300,
        temperature: 0.3,
      });

      const response = completion.choices[0].message.content
        ? completion.choices[0].message.content
            .replace(/```json|```/g, "")
            .trim()
        : null;

      const sentences = JSON.parse(response || "");
      return sentences;
    }),
  createSentences: baseProcedure
    .input(
      z.object({
        vocabularyId: z.string(),
        sentences: z.array(
          z.object({
            frase: z.string(),
            traducao: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const mappedSentences = input.sentences.map((s) => {
        return {
          description: s.frase,
          translation: s.traducao,
          vocabularyId: input.vocabularyId,
        };
      });

      await ctx.prisma.sentence.createMany({
        data: [...mappedSentences],
      });
    }),
  fetchSentencesToReview: baseProcedure.query(async ({ ctx }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user;

    const sentences = await ctx.prisma.sentence.findMany({
      where: {
        nextReview: {
          lte: new Date(),
        },
        AND: {
          vocabulary: {
            userId: user?.id,
          },
        },
      },
    });

    return sentences;
  }),
  fetchSentencesByVocabularyId: baseProcedure
    .input(
      z.object({
        vocabularyId: z.string(),
      }),
    )
    .output(
      z.array(
        z.object({
          description: z.string(),
          translation: z.string(),
          nextReview: z.date(),
          interval: z.number(),
          repetitions: z.number(),
          fator: z.float64(),
        }),
      ),
    )
    .query(async ({ ctx, input }) => {
      const sentences = await ctx.prisma.sentence.findMany({
        where: {
          vocabularyId: input.vocabularyId,
        },
      });

      return sentences;
    }),
  updateSentence: baseProcedure
    .input(
      z.object({
        id: z.string(),
        description: z.string(),
        translation: z.string(),
        nextReview: z.date(),
        interval: z.number(),
        repetitions: z.number(),
        fator: z.float64(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.sentence.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});
