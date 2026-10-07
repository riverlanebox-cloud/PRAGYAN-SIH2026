import Link from "next/link";
import {
  BarChart3,
  BookOpenCheck,
  Bot,
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  Megaphone,
  PenLine,
  PlayCircle,
  School,
  ShieldCheck,
  Trophy,
  Users,
  WifiOff,
} from "lucide-react";
import { TranslatedText as T } from "@/components/language-provider";
import { SiteFooter } from "@/components/footer";
import { PublicHeader } from "@/components/header";
import { CLASSES, SUBJECTS } from "@/lib/curriculum";
import { LANGUAGES } from "@/lib/i18n/config";
import { NOTICES } from "@/lib/notices";
import { CONTACT, formatSiteDate, SITE } from "@/lib/site";

const SERVICES = [
  {
    icon: PlayCircle,
    title: "Faculty video lectures",
    text: "Chapter-wise lectures with topic markers, uploaded against the NCERT chapter index.",
  },
  {
    icon: FileText,
    title: "Community notes",
    text: "Notes shared by students as text or Google Drive PDFs, ranked by upvotes and faculty verification.",
  },
  {
    icon: ClipboardList,
    title: "Objective assessment",
    text: "Timed 20-question tests per chapter with instant scoring and explanations.",
  },
  {
    icon: PenLine,
    title: "Subjective practice",
    text: "2, 3 and 5-mark questions with the marking scheme and model answer revealed after attempting.",
  },
  {
    icon: BarChart3,
    title: "Learning analytics",
    text: "Activity heatmap, study streaks, competency profile and accuracy trend for every learner.",
  },
  {
    icon: Trophy,
    title: "Class leaderboards",
    text: "Standings within the learner's own class and chapter, driven by assessment and contribution points.",
  },
  {
    icon: Bot,
    title: "AI study assistance",
    text: "Chapter-aware tutor, practice-question generator and study notes in the selected language.",
  },
  {
    icon: WifiOff,
    title: "Data saver mode",
    text: "Defers video streams and disables animations for low-bandwidth connections.",
  },
] as const;

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: "Students",
    text: "Class 6 to 10 learners following the NCERT syllabus in any affiliated school.",
  },
  {
    icon: Users,
    title: "Faculty",
    text: "Teachers who publish lectures and question banks and verify community notes after institutional email verification.",
  },
  {
    icon: School,
    title: "Schools and departments",
    text: "Institutions that deploy the portal locally or use the hosted service with curriculum-mapped content.",
  },
] as const;

const STEPS = [
  { title: "Register", text: "Create a student or faculty account with your name, email ID and class." },
  { title: "Choose a chapter", text: "Open your class, select a subject and pick a chapter from the NCERT index." },
  { title: "Learn and practise", text: "Watch the lecture, read verified notes and attempt the objective and subjective sets." },
  { title: "Track progress", text: "Review your analytics dashboard and class standing after every attempt." },
] as const;

export default function LandingPage() {
  return (
    <>
      <PublicHeader />
      <main id="main">
        {/* Portal introduction */}
        <section className="bg-navy-900 text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.4fr_1fr] lg:py-14">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-saffron-400">
                <T>{SITE.tagline}</T>
              </p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
                <T>NCERT-aligned learning and assessment for Class 6 to 10</T>
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-100">
                <T>
                  Pragyan provides faculty lectures, moderated community notes,
                  objective and subjective assessments, learning analytics and
                  AI study assistance in one portal. Content is organised by
                  class, subject and NCERT chapter and is available in six
                  Indian languages.
                </T>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center rounded bg-saffron-500 px-5 py-2.5 text-[14px] font-bold text-navy-950 hover:bg-saffron-400"
                >
                  <T>Sign In</T>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center rounded border border-white/40 px-5 py-2.5 text-[14px] font-bold text-white hover:bg-white/10"
                >
                  <T>Register</T>
                </Link>
                <a
                  href="/api/auth/guest?role=student"
                  className="inline-flex items-center rounded border border-white/40 px-5 py-2.5 text-[14px] font-bold text-white hover:bg-white/10"
                >
                  <T>Continue as guest student</T>
                </a>
              </div>
              <p className="mt-3 text-[12px] text-navy-200">
                <T>
                  Guest access is limited to browsing content. Register to save
                  progress, earn points and appear on leaderboards.
                </T>
              </p>
            </div>

            <aside className="rounded border border-navy-700 bg-navy-950/60 p-5">
              <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-saffron-400">
                <Megaphone className="h-4 w-4" aria-hidden="true" />
                <T>Notices</T>
              </h2>
              <ul className="mt-3 divide-y divide-navy-800">
                {NOTICES.slice(0, 3).map((notice) => (
                  <li key={notice.title} className="py-2.5">
                    <p className="m-0 text-[12px] text-navy-300">
                      {formatSiteDate(notice.date)} · <T>{notice.tag}</T>
                    </p>
                    <p className="m-0 mt-0.5 text-[14px] font-semibold leading-snug text-white">
                      <T>{notice.title}</T>
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href="/home"
                className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-saffron-300 hover:underline"
              >
                <T>All notices</T>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="services-heading">
          <h2 id="services-heading" className="border-l-4 border-saffron-500 pl-3 text-2xl font-extrabold text-navy-900">
            <T>Services</T>
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded border border-line bg-white p-5">
                <Icon className="h-6 w-6 text-navy-700" aria-hidden="true" />
                <h3 className="mt-3 text-[16px] font-bold text-navy-900">
                  <T>{title}</T>
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                  <T>{text}</T>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Coverage and audience */}
        <section className="border-y border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
            <div>
              <h2 className="border-l-4 border-saffron-500 pl-3 text-2xl font-extrabold text-navy-900">
                <T>Curriculum coverage</T>
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                <T>
                  Chapters follow the NCERT textbooks currently in use, including
                  the NCF 2023 editions, and carry NCERT learning-outcome
                  identifiers and DIKSHA course codes.
                </T>
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-[14px]">
                  <caption className="sr-only">
                    <T>Classes and subjects available on the portal</T>
                  </caption>
                  <thead>
                    <tr className="bg-navy-50 text-left text-navy-900">
                      <th scope="col" className="border border-line px-3 py-2 font-bold">
                        <T>Classes</T>
                      </th>
                      <th scope="col" className="border border-line px-3 py-2 font-bold">
                        <T>Subjects</T>
                      </th>
                      <th scope="col" className="border border-line px-3 py-2 font-bold">
                        <T>Languages</T>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-top">
                      <td className="border border-line px-3 py-2 text-slate-700">
                        {CLASSES.map((c) => `Class ${c}`).join(", ")}
                      </td>
                      <td className="border border-line px-3 py-2 text-slate-700">
                        {SUBJECTS.map((s) => s.name).join(", ")}
                      </td>
                      <td className="border border-line px-3 py-2 text-slate-700">
                        {LANGUAGES.map((l) => l.name).join(", ")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="border-l-4 border-saffron-500 pl-3 text-2xl font-extrabold text-navy-900">
                <T>Who can use the portal</T>
              </h2>
              <ul className="mt-4 space-y-3">
                {AUDIENCES.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3 rounded border border-line bg-paper p-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden="true" />
                    <div>
                      <h3 className="text-[15px] font-bold text-navy-900">
                        <T>{title}</T>
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
                        <T>{text}</T>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Getting started and trust */}
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="border-l-4 border-saffron-500 pl-3 text-2xl font-extrabold text-navy-900">
              <T>How to get started</T>
            </h2>
            <ol className="mt-5 space-y-4">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-[14px] font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-navy-900">
                      <T>{step.title}</T>
                    </h3>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-slate-600">
                      <T>{step.text}</T>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4">
            <div className="rounded border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 text-[15px] font-bold text-navy-900">
                <ShieldCheck className="h-5 w-5 text-leaf-600" aria-hidden="true" />
                <T>Verified content</T>
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                <T>
                  Only faculty members who have completed institutional email
                  verification can mark community notes as verified. Verified
                  notes are ranked above unverified ones on every chapter.
                </T>
              </p>
              <Link href="/about#faculty-verification" className="mt-2 inline-block text-[13px] font-semibold text-navy-700 hover:underline">
                <T>Faculty Verification Policy</T>
              </Link>
            </div>
            <div className="rounded border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 text-[15px] font-bold text-navy-900">
                <BookOpenCheck className="h-5 w-5 text-navy-700" aria-hidden="true" />
                <T>Help and support</T>
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                <T>Toll-free</T> {CONTACT.helpline} (<T>{CONTACT.helplineHours}</T>)
                <br />
                <a href={`mailto:${CONTACT.email}`} className="text-navy-700 hover:underline">
                  {CONTACT.email}
                </a>
              </p>
              <Link href="/about#help" className="mt-2 inline-block text-[13px] font-semibold text-navy-700 hover:underline">
                <T>Frequently asked questions</T>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
