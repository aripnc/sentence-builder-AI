import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as z from "zod/v4";
import { baseProcedure, router } from "./init";

const difficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);
const typeEnum = z.enum([
  "Unknown",
  "Noun",
  "Verb",
  "Adjective",
  "Adverb",
  "PhrasalVerb",
]);

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_KEY,
});

export const appRouter = router({
  createVocabulary: baseProcedure
    .input(
      z.object({
        description: z.string(),
        type: typeEnum,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const user = session?.user;
      const data = await ctx.prisma.vocabulary.create({
        data: {
          description: input.description,
          type: input.type,
          userId: user?.id,
        },
      });

      return data;
    }),
  fetchVocabularies: baseProcedure
    .output(
      z.array(
        z.object({
          id: z.string(),
          description: z.string(),
          difficulty: difficultyEnum,
          type: typeEnum,
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
      ),
    )
    .query(async ({ ctx }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      const user = session?.user;
      return ctx.prisma.vocabulary.findMany({
        where: {
          userId: user?.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  updateVocabulary: baseProcedure
    .input(
      z.object({
        id: z.string(),
        difficulty: difficultyEnum.optional(),
        type: typeEnum.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.vocabulary.findUnique({
        where: {
          id: input.id,
        },
      });
      const dataUpdated = await ctx.prisma.vocabulary.update({
        where: {
          id: input.id,
        },
        data: {
          difficulty: input.difficulty ? input.difficulty : data?.difficulty,
          type: input.type ? input.type : data?.type,
          updatedAt: new Date(),
        },
      });
      return dataUpdated;
    }),
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
  fetchSentencesToReview: baseProcedure
    // .output(
    //   z.array(
    //     z.object({
    //       description: z.string(),
    //       translation: z.string(),
    //       nextReview: z.date(),
    //       interval: z.number(),
    //       repetitions: z.number(),
    //       fator: z.float64(),
    //     }),
    //   ),
    // )
    .query(async ({ ctx }) => {
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

// export type definition of API
export type AppRouter = typeof appRouter;
