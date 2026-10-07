import type { ReactNode } from "react";
import Link from "next/link";
import { Phone, UserRound } from "lucide-react";
import { eq, sql } from "drizzle-orm";
import { TranslatedText as T } from "@/components/language-provider";
import { db } from "@/db";
import { xpEvents } from "@/db/schema";
import { getActiveUser } from "@/lib/session";
import { CONTACT, ORGANISATION, SITE } from "@/lib/site";
import { GovBanner } from "./gov-banner";
import { PrimaryNav } from "./primary-nav";
import { ChakraMark } from "./ui";

export { Wordmark } from "./ui";

/** Emblem, portal name and owning department — the identity row of the masthead. */
function Masthead({ children }: { children?: ReactNode }) {
  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${SITE.name} home`}>
          <ChakraMark className="h-12 w-12 text-navy-800 dark:text-saffron-400" />
          <span className="leading-tight">
            <span className="flex items-baseline gap-2">
              <span
                lang="hi"
                className="text-[26px] font-black tracking-tight text-navy-900 dark:text-white"
                style={{ fontFamily: "var(--font-deva), serif" }}
              >
                {SITE.nativeName}
              </span>
              <span className="text-[20px] font-extrabold text-navy-900 dark:text-white">
                {SITE.name}
              </span>
            </span>
            <span className="block text-[12px] font-bold uppercase tracking-wide text-navy-700 dark:text-navy-200">
              <T>{SITE.tagline}</T>
            </span>
            <span className="block text-[12px] text-slate-600 dark:text-navy-200">
              <T>{ORGANISATION.department}</T>, <T>{ORGANISATION.ministry}</T>
            </span>
          </span>
        </Link>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
          <p className="m-0 hidden text-right text-[12px] leading-snug text-slate-600 lg:block dark:text-navy-200">
            <span className="flex items-center justify-end gap-1.5 font-bold text-navy-800 dark:text-white">
              <Phone className="h-3.5 w-3.5 text-saffron-600" aria-hidden="true" />
              <T>Toll-free</T> {CONTACT.helpline}
            </span>
            <span>
              <T>{CONTACT.helplineHours}</T>
            </span>
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Header for signed-in portal pages. Reads the session and the user's XP total. */
export async function SiteHeader() {
  const user = await getActiveUser();
  let xp = 0;
  if (user) {
    try {
      const [row] = await db
        .select({ x: sql<number>`coalesce(sum(${xpEvents.amount}), 0)` })
        .from(xpEvents)
        .where(eq(xpEvents.userId, user.id));
      xp = Number(row?.x ?? 0);
    } catch {
      xp = 0;
    }
  }

  return (
    <header>
      <GovBanner />
      <div className="tricolor-strip h-1 w-full" aria-hidden="true" />
      <Masthead>
        {user ? (
          <Link
            href="/account"
            className="inline-flex max-w-[240px] items-center gap-2 rounded border border-line bg-paper px-3 py-1.5 text-left hover:border-navy-300"
          >
            <UserRound className="h-5 w-5 shrink-0 text-navy-700" aria-hidden="true" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[13px] font-bold text-navy-900">
                {user.name}
              </span>
              <span className="block text-[11px] text-slate-600">
                <T>{user.isGuest ? "Guest" : user.role}</T>
                {user.isGuest ? null : (
                  <>
                    {" · "}
                    {xp} XP
                  </>
                )}
              </span>
            </span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center rounded border border-navy-800 bg-navy-800 px-4 py-1.5 text-[13px] font-bold text-white hover:bg-navy-900"
          >
            <T>Sign In</T>
          </Link>
        )}
      </Masthead>
      <PrimaryNav signedIn={Boolean(user)} />
    </header>
  );
}

/** Header for the landing and authentication pages. Makes no database calls. */
export function PublicHeader() {
  return (
    <header>
      <GovBanner />
      <div className="tricolor-strip h-1 w-full" aria-hidden="true" />
      <Masthead>
        <Link
          href="/login"
          className="inline-flex items-center rounded border border-navy-800 bg-navy-800 px-4 py-1.5 text-[13px] font-bold text-white hover:bg-navy-900"
        >
          <T>Sign In</T>
        </Link>
      </Masthead>
      <PrimaryNav signedIn={false} />
    </header>
  );
}
