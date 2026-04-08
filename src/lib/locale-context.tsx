"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Locale, Bilingual } from "@/types/portfolio";

type LocaleContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  t: (bilingual: Bilingual) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "id" : "en"));
  }, []);

  const t = useCallback(
    (bilingual: Bilingual) => bilingual[locale],
    [locale],
  );

  return (
    <LocaleContext value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
