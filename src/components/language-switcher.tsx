"use client";

import { ChevronDown, Languages } from "lucide-react";
import { isLanguage, LANGUAGES } from "@/lib/i18n/config";
import { useTranslation } from "./language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();
  return (
    <div className="relative inline-flex shrink-0 items-center">
      <Languages
        aria-hidden="true"
        className="pointer-events-none absolute left-2 h-3.5 w-3.5 text-navy-200"
      />
      <select
        name="language"
        aria-label={t("Change language")}
        title={t("Change language")}
        value={language}
        onChange={(event) => {
          if (isLanguage(event.target.value)) setLanguage(event.target.value);
        }}
        className="h-7 w-32 cursor-pointer appearance-none rounded border border-navy-700 bg-navy-900 pl-7 pr-6 text-[12px] font-semibold text-white transition hover:bg-navy-800"
      >
        {LANGUAGES.map((item) => (
          <option
            key={item.code}
            value={item.code}
            lang={item.code}
            aria-label={
              item.code === "en" ? item.name : `${item.name} — ${item.nativeName}`
            }
          >
            {item.nativeName}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2 h-3 w-3 text-navy-200"
      />
    </div>
  );
}
