/**
 * Language Context — CP-GPE Net
 * Provides EN/CN bilingual switching across the entire site.
 * English is the default language.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "cn";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (en: string, cn: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("cp-gpe-lang") as Lang) || "en";
    }
    return "en";
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("cp-gpe-lang", newLang);
  }, []);

  const t = useCallback(
    (en: string, cn: string) => (lang === "en" ? en : cn),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
