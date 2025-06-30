import type { Context } from "@/trpc-server/context";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const baseProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
