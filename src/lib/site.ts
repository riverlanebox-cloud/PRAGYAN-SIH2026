/**
 * Portal identity and contact details.
 *
 * Every banner, footer, policy page and metadata block reads from here so an
 * administrator changes a helpline number or review date in exactly one place.
 * Values that must differ per deployment are read from the environment.
 */

export const SITE = {
  /** Short brand name used in titles and the manifest. */
  name: "Pragyan",
  /** Brand name in Devanagari for the wordmark. */
  nativeName: "प्रज्ञान",
  /** Full portal title used in the document title and Open Graph cards. */
  title: "Pragyan — National Digital Learning Portal",
  tagline: "National Digital Learning Portal",
  description:
    "NCERT-aligned learning and assessment portal for Class 6 to 10: faculty lectures, moderated community notes, objective and subjective assessments, leaderboards and AI study tools.",
  /** Canonical origin for absolute URLs in metadata; falls back to the Vercel host. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export const ORGANISATION = {
  government: "Government of India",
  governmentNative: "भारत सरकार",
  ministry: "Ministry of Education",
  ministryNative: "शिक्षा मंत्रालय",
  department: "Department of School Education & Literacy",
  departmentNative: "स्कूल शिक्षा और साक्षरता विभाग",
} as const;

export const CONTACT = {
  helpline: "1800-11-8004",
  helplineHours: "Monday to Saturday, 8:00 AM – 8:00 PM IST",
  email: "support@pragyan.gov.in",
  /** Working days within which a grievance is acknowledged. */
  grievanceDays: 3,
} as const;

/**
 * Date shown as "Last updated" in the footer. Bump it with every content or
 * release change; a live clock would claim the site is reviewed every day.
 */
export const LAST_UPDATED = "2026-10-07";

/** Current build identifier, surfaced in the footer for support tickets. */
export const BUILD_VERSION = process.env.NEXT_PUBLIC_BUILD_VERSION ?? "1.4.0";

/** Primary navigation shared by the header and the footer sitemap. */
export const PRIMARY_NAV = [
  { href: "/home", label: "Dashboard" },
  { href: "/home#classes", label: "Classes" },
  { href: "/analytics", label: "Analytics" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/about", label: "About" },
  { href: "/about#help", label: "Help" },
] as const;

export const POLICY_LINKS = [
  { href: "/about#terms", label: "Terms of Use" },
  { href: "/about#privacy", label: "Privacy Policy" },
  { href: "/about#copyright", label: "Copyright Policy" },
  { href: "/about#hyperlinking", label: "Hyperlinking Policy" },
  { href: "/about#accessibility", label: "Accessibility Statement" },
  { href: "/about#faculty-verification", label: "Faculty Verification Policy" },
  { href: "/about#disclaimer", label: "Disclaimer" },
] as const;

/** Related national platforms linked from the footer. */
export const RELATED_PORTALS = [
  { href: "https://www.education.gov.in/", label: "Ministry of Education" },
  { href: "https://ncert.nic.in/", label: "NCERT" },
  { href: "https://diksha.gov.in/", label: "DIKSHA" },
  { href: "https://www.india.gov.in/", label: "National Portal of India" },
  { href: "https://www.digitalindia.gov.in/", label: "Digital India" },
] as const;

export function formatSiteDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
