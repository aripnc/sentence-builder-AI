import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

import type { AppRouter } from "@/trpc-server";

export const trpc = createTRPCReact<AppRouter>({});
