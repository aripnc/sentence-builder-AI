import { mergeRouters } from "./init";
import { sentenceRouter } from "./routers/sentences";
import { vocabularyRouter } from "./routers/vocabulary";

export const appRouter = mergeRouters(vocabularyRouter, sentenceRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
