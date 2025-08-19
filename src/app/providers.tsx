"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Skip ThemeProvider for homepage
  if (pathname === "/") {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  // ✅ Apply ThemeProvider for all other pages
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
