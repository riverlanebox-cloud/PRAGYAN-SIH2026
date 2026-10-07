"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TranslatedText as T } from "@/components/language-provider";
import { PRIMARY_NAV } from "@/lib/site";

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (href.includes("#")) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

/** Navy navigation bar; marks the current section for assistive technology. */
export function PrimaryNav({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const items = signedIn
    ? PRIMARY_NAV
    : PRIMARY_NAV.filter((item) => item.href.startsWith("/about"));
  return (
    <nav aria-label="Primary" className="bg-navy-800 text-white">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-stretch px-2 text-[14px] font-semibold">
        {!signedIn && (
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`block border-b-[3px] px-3 py-2.5 transition hover:bg-navy-700 ${
                pathname === "/" ? "border-saffron-500 bg-navy-900" : "border-transparent"
              }`}
            >
              <T>Home</T>
            </Link>
          </li>
        )}
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block border-b-[3px] px-3 py-2.5 transition hover:bg-navy-700 ${
                  active ? "border-saffron-500 bg-navy-900" : "border-transparent"
                }`}
              >
                <T>{item.label}</T>
              </Link>
            </li>
          );
        })}
        {!signedIn && (
          <li className="ml-auto">
            <Link
              href="/login"
              className="block border-b-[3px] border-transparent px-3 py-2.5 transition hover:bg-navy-700"
            >
              <T>Sign In</T>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
