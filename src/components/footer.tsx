import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TranslatedText as T } from "@/components/language-provider";
import {
  BUILD_VERSION,
  CONTACT,
  formatSiteDate,
  LAST_UPDATED,
  ORGANISATION,
  POLICY_LINKS,
  PRIMARY_NAV,
  RELATED_PORTALS,
  SITE,
} from "@/lib/site";
import { ChakraMark } from "./ui";

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-3 border-b border-navy-700 pb-2 text-[13px] font-bold uppercase tracking-wider text-saffron-400">
      <T>{children}</T>
    </h2>
  );
}

/** Government of India style footer: sitemap, policies, related links, ownership. */
export function SiteFooter() {
  return (
    <footer className="mt-12 bg-navy-900 text-navy-100">
      <div className="tricolor-strip h-1 w-full" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <ChakraMark className="h-10 w-10 text-saffron-400" />
            <span className="leading-tight">
              <span
                lang="hi"
                className="block text-[20px] font-black text-white"
                style={{ fontFamily: "var(--font-deva), serif" }}
              >
                {SITE.nativeName}
              </span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-navy-200">
                {SITE.name} · <T>{SITE.tagline}</T>
              </span>
            </span>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-navy-200">
            <T>{SITE.description}</T>
          </p>
        </div>

        <div>
          <FooterHeading>Portal</FooterHeading>
          <ul className="space-y-1.5">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline">
                  <T>{item.label}</T>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="hover:text-white hover:underline">
                <T>Sign In</T>
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white hover:underline">
                <T>Register</T>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeading>Website Policies</FooterHeading>
          <ul className="space-y-1.5">
            {POLICY_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white hover:underline">
                  <T>{item.label}</T>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Related Links</FooterHeading>
          <ul className="space-y-1.5">
            {RELATED_PORTALS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white hover:underline"
                >
                  {item.label}
                  <ExternalLink className="h-3 w-3 text-navy-300" aria-hidden="true" />
                  <span className="sr-only">
                    (<T>opens in a new window</T>)
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <FooterHeading>Help &amp; Support</FooterHeading>
          <ul className="space-y-1.5 text-[13px]">
            <li>
              <T>Toll-free</T>:{" "}
              <a href={`tel:${CONTACT.helpline.replace(/-/g, "")}`} className="font-semibold text-white hover:underline">
                {CONTACT.helpline}
              </a>
            </li>
            <li className="text-navy-200">
              <T>{CONTACT.helplineHours}</T>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white hover:underline">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto max-w-6xl px-4 py-4 text-[12px] leading-relaxed text-navy-300">
          <p className="m-0">
            <T>Content owned, maintained and updated by</T>{" "}
            <span className="text-navy-100">
              <T>{ORGANISATION.department}</T>, <T>{ORGANISATION.ministry}</T>,{" "}
              <T>{ORGANISATION.government}</T>
            </span>
            .{" "}
            <T>
              Content on this portal is published under the policies listed above.
              For queries about the content, write to the helpline email.
            </T>
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <span>
              © {new Date(`${LAST_UPDATED}T00:00:00Z`).getUTCFullYear()} {SITE.name}.{" "}
              <T>All rights reserved.</T>
            </span>
            <span>
              <T>Last updated</T>: {formatSiteDate(LAST_UPDATED)} · <T>Version</T> {BUILD_VERSION}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
