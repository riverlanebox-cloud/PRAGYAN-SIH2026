"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslation } from "@/components/language-provider";
import { setDarkTheme, useDarkTheme } from "@/lib/ui-preferences";

export function ThemeToggle() {
  const { t } = useTranslation();
  const dark = useDarkTheme();
  const label = t(dark ? "Switch to Light Mode" : "Switch to Dark Mode");
  return (
    <button
      type="button"
      onClick={() => setDarkTheme(!dark)}
      aria-label={label}
      title={label}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-navy-700 bg-navy-900 text-white transition hover:bg-navy-800"
    >
      {dark ? (
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
      )}
    </button>
  );
}
