"use client";

import { useTranslation } from "@/components/language-provider";
import { setFontScale, useFontScale, type FontScale } from "@/lib/ui-preferences";

const OPTIONS: { value: FontScale; label: string; title: string }[] = [
  { value: "s", label: "A-", title: "Decrease text size" },
  { value: "m", label: "A", title: "Default text size" },
  { value: "l", label: "A+", title: "Increase text size" },
];

/** Standard A- / A / A+ text-size control used on Government of India portals. */
export function FontSizeControl() {
  const { t } = useTranslation();
  const scale = useFontScale();
  return (
    <div
      role="group"
      aria-label={t("Text size")}
      className="inline-flex overflow-hidden rounded border border-navy-700 text-[12px] font-bold"
    >
      {OPTIONS.map((option) => {
        const active = option.value === scale;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setFontScale(option.value)}
            aria-pressed={active}
            title={t(option.title)}
            className={`px-2 py-0.5 leading-5 transition ${
              active
                ? "bg-saffron-500 text-navy-950"
                : "bg-navy-900 text-white hover:bg-navy-800"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
