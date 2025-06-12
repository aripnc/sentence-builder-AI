import { ThemeProvider } from "@/providers/theme-provider";
import type { ReactNode } from "react";
import ReactQueryClientProvider from "./query-client-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
}
