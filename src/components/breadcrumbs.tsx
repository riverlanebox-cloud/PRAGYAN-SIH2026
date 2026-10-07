"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { TranslatedText as T } from "@/components/language-provider";
import {
  chapterSlug,
  classLabel,
  getChapters,
  subjectName,
  validClass,
  validSubject,
} from "@/lib/curriculum";

type Crumb = { href: string; label: string; translate: boolean };

const STATIC_LABELS: Record<string, string> = {
  home: "Dashboard",
  analytics: "Learning Analytics",
  leaderboard: "Leaderboard",
  account: "My Account",
  about: "About the Portal",
};

function buildCrumbs(pathname: string): Crumb[] {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ href: "/home", label: "Home", translate: true }];
  if (parts.length === 0 || parts[0] === "home") return crumbs;

  if (parts[0] === "class") {
    const [, classNo, subject, chapter] = parts;
    if (classNo && validClass(classNo)) {
      crumbs.push({
        href: `/home#classes`,
        label: classLabel(Number(classNo)),
        translate: false,
      });
      if (subject && validSubject(subject)) {
        crumbs.push({
          href: `/class/${classNo}/${subject}`,
          label: subjectName(subject),
          translate: false,
        });
        if (chapter) {
          const rows = getChapters(Number(classNo), subject);
          const index = rows.findIndex((row, i) => chapterSlug(row, i) === chapter);
          crumbs.push({
            href: pathname,
            label: index >= 0 ? rows[index].title : "Chapter",
            translate: index < 0,
          });
        }
      }
    }
    return crumbs;
  }

  let href = "";
  for (const part of parts) {
    href += `/${part}`;
    crumbs.push({
      href,
      label: STATIC_LABELS[part] ?? part.replace(/-/g, " "),
      translate: Boolean(STATIC_LABELS[part]),
    });
  }
  return crumbs;
}

/** Location trail shown under the navigation bar on every portal page. */
export function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);
  if (crumbs.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-white">
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 px-4 py-2 text-[13px] text-slate-600">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex min-w-0 items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              )}
              {last ? (
                <span aria-current="page" className="truncate font-semibold text-navy-900">
                  {crumb.translate ? <T>{crumb.label}</T> : crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="truncate hover:text-navy-900 hover:underline">
                  {crumb.translate ? <T>{crumb.label}</T> : crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
