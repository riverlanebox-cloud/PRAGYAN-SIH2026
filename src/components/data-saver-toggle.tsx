"use client";

import { Wifi, WifiOff } from "lucide-react";
import {
  TranslatedText as T,
  useTranslation,
} from "@/components/language-provider";
import { setDataSaver, useDataSaver } from "@/lib/ui-preferences";

export function DataSaverToggle() {
  const { t } = useTranslation();
  const on = useDataSaver();
  return (
    <button
      type="button"
      onClick={() => setDataSaver(!on)}
      aria-pressed={on}
      title={t(
        "Data saver mode: lazy-loads video streams, removes animations. Built for low-bandwidth government schools.",
      )}
      className={`inline-flex h-7 shrink-0 items-center gap-1.5 rounded border px-2 text-[12px] font-bold transition ${
        on
          ? "border-leaf-500 bg-leaf-600 text-white"
          : "border-navy-700 bg-navy-900 text-white hover:bg-navy-800"
      }`}
    >
      {on ? (
        <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <T>Data Saver</T>
      <span className="sr-only">
        : <T>{on ? "ON" : "OFF"}</T>
      </span>
    </button>
  );
}
