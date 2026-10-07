import { DataSaverToggle } from "./data-saver-toggle";
import { FontSizeControl } from "./font-size-control";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

/** Accessibility and display controls shown in the top utility strip. */
export function AppearanceControls() {
  return (
    <div className="inline-flex shrink-0 flex-wrap items-center gap-1.5">
      <FontSizeControl />
      <ThemeToggle />
      <DataSaverToggle />
      <LanguageSwitcher />
    </div>
  );
}
