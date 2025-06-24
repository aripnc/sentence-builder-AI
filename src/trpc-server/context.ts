import { prisma } from "@/lib/prisma";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export interface CreateInnerContextOptions
  extends Partial<FetchCreateContextFnOptions> {}

export async function createInnerTRPCContext(opts?: CreateInnerContextOptions) {
  return {
    prisma,
    ...opts,
  };
}

export const createTRPCContext = async (opts?: FetchCreateContextFnOptions) => {
  const innerContext = await createInnerTRPCContext({
    req: opts?.req,
  });

  return {
    ...innerContext,
    req: opts?.req,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
