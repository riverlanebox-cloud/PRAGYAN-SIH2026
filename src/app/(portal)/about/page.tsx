import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TranslatedText as T } from "@/components/language-provider";
import { CLASSES, SUBJECTS } from "@/lib/curriculum";
import { LANGUAGES } from "@/lib/i18n/config";
import {
  CONTACT,
  formatSiteDate,
  LAST_UPDATED,
  ORGANISATION,
  SITE,
} from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About the Portal and Website Policies",
};

const SECTIONS = [
  { id: "about", label: "About the portal" },
  { id: "help", label: "Help and FAQ" },
  { id: "faculty-verification", label: "Faculty Verification Policy" },
  { id: "terms", label: "Terms of Use" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "copyright", label: "Copyright Policy" },
  { id: "hyperlinking", label: "Hyperlinking Policy" },
  { id: "accessibility", label: "Accessibility Statement" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "grievance", label: "Grievance Redressal" },
] as const;

const FAQ = [
  {
    q: "Who can register on the portal?",
    a: "Students of Class 6 to 10 and faculty members of schools or education departments. Students register with their class; faculty register with the email ID issued by their institution.",
  },
  {
    q: "Is the content free to use?",
    a: "Yes. All lectures, notes, assessments and analytics on the portal are free for educational, non-commercial use.",
  },
  {
    q: "How are community notes checked?",
    a: "Notes are ranked by upvotes and are marked as verified only by faculty members who have completed institutional email verification. Verified notes are listed above unverified notes.",
  },
  {
    q: "Do the AI features affect my marks or rank?",
    a: "No. AI-generated practice questions and study notes are learning aids. Only objective tests, subjective practice and note contributions earn points.",
  },
  {
    q: "What does Data Saver mode do?",
    a: "It defers video streams until you choose to play them and disables animations, which reduces data use on slow connections. It can be switched on or off from the top bar.",
  },
  {
    q: "How do I change the language or text size?",
    a: "Use the language menu and the A-, A and A+ controls in the top bar. The setting is remembered on your device.",
  },
] as const;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-6 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold text-navy-900">
        <T>{title}</T>
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="border-b border-line pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          <T>About the Portal and Website Policies</T>
        </h1>
        <p className="mt-1 text-[14px] text-slate-600">
          <T>Last updated</T>: {formatSiteDate(LAST_UPDATED)}
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-4 lg:self-start">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
            <T>On this page</T>
          </h2>
          <ul className="mt-2 space-y-1 border-l-2 border-line text-[14px]">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ml-0.5 block border-l-2 border-transparent py-1 pl-3 text-navy-700 hover:border-saffron-500 hover:text-navy-950"
                >
                  <T>{section.label}</T>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="min-w-0">
          <Section id="about" title="About the portal">
            <p>
              <T>{SITE.description}</T>
            </p>
            <p>
              <T>
                The portal is owned by the Department of School Education &amp;
                Literacy, Ministry of Education, Government of India. Content
                is organised by class, subject and chapter following the NCERT
                textbooks currently in use. Every chapter carries NCERT
                learning-outcome identifiers and a DIKSHA course code so that
                teaching, practice and reporting can be audited against the
                national curriculum framework.
              </T>
            </p>
            <dl className="grid gap-3 rounded border border-line bg-white p-4 text-[14px] sm:grid-cols-3">
              <div>
                <dt className="font-bold text-navy-900">
                  <T>Classes</T>
                </dt>
                <dd className="mt-0.5">{CLASSES.map((c) => `Class ${c}`).join(", ")}</dd>
              </div>
              <div>
                <dt className="font-bold text-navy-900">
                  <T>Subjects</T>
                </dt>
                <dd className="mt-0.5">{SUBJECTS.map((s) => s.name).join(", ")}</dd>
              </div>
              <div>
                <dt className="font-bold text-navy-900">
                  <T>Interface languages</T>
                </dt>
                <dd className="mt-0.5">{LANGUAGES.map((l) => l.name).join(", ")}</dd>
              </div>
            </dl>
          </Section>

          <Section id="help" title="Help and FAQ">
            <dl className="space-y-4">
              {FAQ.map((item) => (
                <div key={item.q}>
                  <dt className="font-bold text-navy-900">
                    <T>{item.q}</T>
                  </dt>
                  <dd className="mt-1">
                    <T>{item.a}</T>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="rounded border border-line bg-white p-4 text-[14px]">
              <span className="font-bold text-navy-900">
                <T>Helpline</T>
              </span>
              : {CONTACT.helpline} (<T>{CONTACT.helplineHours}</T>) ·{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-navy-700 underline underline-offset-2">
                {CONTACT.email}
              </a>
            </p>
          </Section>

          <Section id="faculty-verification" title="Faculty Verification Policy">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <T>
                  A teacher signs in or registers with the email ID issued by the
                  school or department.
                </T>
              </li>
              <li>
                <T>
                  A six-digit one-time code is sent to that mailbox. The code is
                  valid for ten minutes, may be attempted five times and is never
                  stored in plain form.
                </T>
              </li>
              <li>
                <T>
                  Institutional addresses (…gov.in, …nic.in, …edu.in, …ac.in) are
                  marked verified as soon as the mailbox is confirmed, which
                  unlocks verification of community notes.
                </T>
              </li>
              <li>
                <T>
                  Personal mailboxes (Gmail and similar) are accepted with review:
                  the mailbox is confirmed, but a verified reviewer must confirm the
                  institution before moderation rights are granted.
                </T>
              </li>
            </ol>
            <p>
              <T>
                Verification is mandatory. An unverified account cannot mark a
                community note as verified.
              </T>
            </p>
          </Section>

          <Section id="terms" title="Terms of Use">
            <p>
              <T>
                The portal publishes NCERT-aligned study material, faculty-verified
                notes and practice assessments for official, non-commercial
                educational use. By using the portal you agree to use it only for
                learning and teaching purposes.
              </T>
            </p>
            <p>
              <T>
                Learners and faculty must not upload material they do not have the
                right to share, attempt to access another user&apos;s account, or
                interfere with the operation of the portal. Accounts that breach
                these terms may be suspended.
              </T>
            </p>
          </Section>

          <Section id="privacy" title="Privacy Policy">
            <p>
              <T>
                Only the details needed to run the portal are stored: name, class
                or subject, school or institution ID, email ID and a hashed
                password. Assessment records are used for progress reports,
                learning analytics and class leaderboards.
              </T>
            </p>
            <p>
              <T>
                Conversations with the AI study tools are processed to generate a
                response and are not stored by the portal. The portal does not use
                advertising or third-party tracking. Preferences such as theme,
                language and text size are kept on your own device.
              </T>
            </p>
          </Section>

          <Section id="copyright" title="Copyright Policy">
            <p>
              <T>
                Material featured on this portal may be reproduced free of charge
                for educational, non-commercial use after taking proper permission
                from the Department. The material must be reproduced accurately and
                not used in a derogatory manner or in a misleading context, and the
                source must be acknowledged.
              </T>
            </p>
            <p>
              <T>
                Community notes remain the property of their authors. Chapter
                titles, learning-outcome identifiers and DIKSHA codes are published
                for academic audit.
              </T>
            </p>
          </Section>

          <Section id="hyperlinking" title="Hyperlinking Policy">
            <p>
              <T>
                Links to external websites, including YouTube lectures and Google
                Drive documents shared by faculty, open in a new window. The
                Department is not responsible for the content or reliability of
                linked websites and does not necessarily endorse the views
                expressed in them.
              </T>
            </p>
            <p>
              <T>
                Prior permission is not required to link to this portal. Pages
                should not be loaded into frames on other sites; they must open in
                a new browser window.
              </T>
            </p>
          </Section>

          <Section id="accessibility" title="Accessibility Statement">
            <p>
              <T>
                The portal is designed to meet WCAG 2.1 Level AA: controls are
                keyboard-navigable with visible focus, colour contrast meets the
                required ratio, the interface language can be changed, text size
                can be adjusted with the A-, A and A+ controls, and a dark theme
                and Data Saver mode are available.
              </T>
            </p>
            <p>
              <T>
                Screen reader users can navigate by headings and landmarks; a
                skip link is provided at the top of every page. If you face any
                difficulty accessing a page, report it on the helpline and it will
                be addressed in the next release.
              </T>
            </p>
          </Section>

          <Section id="disclaimer" title="Disclaimer">
            <p>
              <T>
                Every effort has been made to ensure the accuracy of the content
                on this portal. Community notes reflect the understanding of their
                authors and are moderated by verified faculty. AI-generated
                explanations and practice questions can contain errors and should
                be checked against the textbook or a teacher.
              </T>
            </p>
          </Section>

          <Section id="grievance" title="Grievance Redressal">
            <p>
              <T values={{ days: CONTACT.grievanceDays }}>
                {
                  "Write to the support email ID or call the toll-free helpline. Grievances are acknowledged within {days} working days and resolved as early as possible."
                }
              </T>
            </p>
            <address className="not-italic">
              <span className="font-bold text-navy-900">
                <T>{ORGANISATION.department}</T>
              </span>
              <br />
              <T>{ORGANISATION.ministry}</T>, <T>{ORGANISATION.government}</T>
              <br />
              <T>Toll-free</T>: {CONTACT.helpline} · {CONTACT.email}
            </address>
          </Section>
        </article>
      </div>
    </div>
  );
}
