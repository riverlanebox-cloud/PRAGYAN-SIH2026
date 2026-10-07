import { TranslatedText as T } from "@/components/language-provider";
import { ORGANISATION } from "@/lib/site";
import { AppearanceControls } from "./appearance-controls";

/**
 * Top utility strip: Government of India identification on the left,
 * accessibility links and display controls on the right.
 */
export function GovBanner() {
  return (
    <div className="bg-navy-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-1.5 text-[12px]">
        <p className="m-0 flex items-center gap-2 font-semibold">
          <span
            lang="hi"
            className="font-bold"
            style={{ fontFamily: "var(--font-deva), serif" }}
          >
            {ORGANISATION.governmentNative}
          </span>
          <span aria-hidden="true" className="text-navy-400">
            |
          </span>
          <span className="uppercase tracking-wide">
            <T>{ORGANISATION.government}</T>
          </span>
          <span aria-hidden="true" className="hidden text-navy-400 sm:inline">
            |
          </span>
          <span className="hidden sm:inline">
            <T>{ORGANISATION.ministry}</T>
          </span>
        </p>

        <nav
          aria-label="Accessibility"
          className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1.5"
        >
          <a
            href="#main"
            className="sr-only font-semibold underline-offset-2 focus:not-sr-only hover:underline md:not-sr-only"
          >
            <T>Skip to main content</T>
          </a>
          <a
            href="/about#accessibility"
            className="hidden font-semibold underline-offset-2 hover:underline md:inline"
          >
            <T>Screen Reader Access</T>
          </a>
          <AppearanceControls />
        </nav>
      </div>
    </div>
  );
}
