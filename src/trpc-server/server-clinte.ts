import { prisma } from "@/lib/prisma";
import { appRouter } from "@/trpc-server";
import { httpBatchLink } from "@trpc/client";

export const serverClient = appRouter.createCaller({
  prisma,
  req: undefined,
});
