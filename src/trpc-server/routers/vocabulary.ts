import { auth } from "@/lib/auth";
import { baseProcedure, router } from "@/trpc-server/init";
import { headers } from "next/headers";
import z from "zod";

const difficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);
const typeEnum = z.enum([
  "Unknown",
  "Noun",
  "Verb",
  "Adjective",
  "Adverb",
  "PhrasalVerb",
]);

export const vocabularyRouter = router({
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
});
