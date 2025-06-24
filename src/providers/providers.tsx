import { ThemeProvider } from "@/providers/theme-provider";
import TRPCProvider from "@/trpc-client/trpc-provider";
import type { ReactNode } from "react";
import ReactQueryClientProvider from "./query-client-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TRPCProvider>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TRPCProvider>
  );
}
