"use client";

import {
  TranslatedText as T,
  useTranslation,
} from "@/components/language-provider";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { EmailVerifyCard, type Challenge } from "@/components/email-verify-card";
import { DEMO_ACCOUNTS } from "@/lib/demo-accounts";
import { CONTACT } from "@/lib/site";

export function LoginForm({
  initialEmail = "",
  initialRole = "student",
}: {
  initialEmail?: string;
  initialRole?: "student" | "faculty";
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const [role, setRole] = useState<"student" | "faculty">(initialRole);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<
    (Challenge & { name: string }) | null
  >(null);

  const inFlight = useRef(false);

  const signIn = async (email: string, password: string) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          data?.error ?? t("Login failed. Please check your credentials."),
        );
      }

      // Faculty must prove ownership of the mailbox before a session is issued.
      if (data?.requiresVerification) {
        setChallenge({
          challengeId: data.challengeId,
          maskedEmail: data.maskedEmail,
          resendAfter: data.resendAfter ?? 60,
          delivered: !!data.delivered,
          devCode: data.devCode,
          name: data.name ?? "",
        });
        return;
      }

      router.push("/home");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("An unexpected error occurred."),
      );
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void signIn(email, password);
  };
  const quickLogin = (account: (typeof DEMO_ACCOUNTS)[number]) => {
    setRole(account.role);
    setEmail(account.email);
    setPassword(account.pw);
    setError(null);
    setChallenge(null);
    void signIn(account.email, account.pw);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="border-b border-line pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          <T>Sign In</T>
        </h1>
        <p className="mt-1 text-[14px] text-slate-600">
          <T>
            Use the email ID and password registered with the portal. Faculty
            accounts additionally confirm a one-time code sent by email.
          </T>
        </p>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_340px]">
        {/* Main Login Box */}
        <div>
          {challenge ? (
            <EmailVerifyCard
              challenge={challenge}
              name={challenge.name}
              onBack={() => {
                setChallenge(null);
                setPassword("");
                setError(null);
              }}
            />
          ) : (
            <div className="rounded border border-line bg-white p-6 sm:p-8">
              {/* Role selector tabs */}
              <div className="mb-6 flex rounded border border-line bg-paper p-1" role="group" aria-label="Account type">
                <button
                  type="button"
                  onClick={() => {
                    setRole("student");
                    setError(null);
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-bold transition ${
                    role === "student"
                      ? "bg-navy-800 text-white"
                      : "text-navy-700 hover:text-navy-950"
                  }`}
                >
                  <UserRound className="h-4 w-4" />
                  <T>Student</T>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("faculty");
                    setError(null);
                  }}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-bold transition ${
                    role === "faculty"
                      ? "bg-navy-800 text-white"
                      : "text-navy-700 hover:text-navy-950"
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  <T>Faculty</T>
                </button>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-800"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-bold uppercase tracking-wider text-navy-800"
                  >
                    <T>Email Address</T>
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      id="login-email"
                      autoComplete="email"
                      maxLength={120}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.in"
                      className="w-full rounded border border-line bg-white py-2.5 pl-10 pr-3 text-[15px] text-navy-950 transition focus:border-navy-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-bold uppercase tracking-wider text-navy-800"
                  >
                    <T>Password</T>
                  </label>
                  <div className="relative mt-1.5">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      id="login-password"
                      autoComplete="current-password"
                      maxLength={200}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded border border-line bg-white py-2.5 pl-10 pr-3 text-[15px] text-navy-950 transition focus:border-navy-600 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded bg-navy-800 py-3 text-[15px] font-bold text-white transition hover:bg-navy-900 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <T>
                      {role === "faculty"
                        ? "Sign In as Faculty"
                        : "Sign In as Student"}
                    </T>
                  )}
                </button>
              </form>

              {role === "faculty" && (
                <p className="mt-4 flex items-start gap-2 rounded border border-navy-200 bg-navy-50 p-3 text-[13px] text-navy-700">
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-navy-600"
                    aria-hidden="true"
                  />
                  <span>
                    <T>
                      Faculty sign-in sends a one-time code to your registered
                      email ID. Institutional addresses are verified instantly;
                      personal mailboxes are confirmed after an institutional
                      check.
                    </T>
                  </span>
                </p>
              )}

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[13px] font-bold text-navy-900">
                  <T>Guest access</T>
                </p>
                <p className="mt-1 text-[13px] text-slate-600">
                  <T>
                    Browse content without an account. Progress and points are
                    not saved for guest sessions.
                  </T>
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <a
                    href="/api/auth/guest?role=student"
                    className="flex items-center justify-center gap-1.5 rounded border border-navy-300 bg-white px-3 py-2.5 text-center text-[13px] font-bold text-navy-900 transition hover:bg-navy-50"
                  >
                    <UserRound className="h-3.5 w-3.5 text-navy-600" aria-hidden="true" />
                    <T>Guest student</T>
                  </a>
                  <a
                    href="/api/auth/guest?role=faculty"
                    className="flex items-center justify-center gap-1.5 rounded border border-navy-300 bg-white px-3 py-2.5 text-center text-[13px] font-bold text-navy-900 transition hover:bg-navy-50"
                  >
                    <GraduationCap className="h-3.5 w-3.5 text-navy-600" aria-hidden="true" />
                    <T>Guest faculty</T>
                  </a>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-slate-600">
                <T>New to the portal?</T>{" "}
                <Link
                  href="/register"
                  className="font-bold text-navy-800 underline underline-offset-2 hover:text-navy-950"
                >
                  <T>Register</T>
                </Link>
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded border border-line bg-white p-4 text-[13px] text-slate-600">
            <h2 className="flex items-center gap-2 text-[14px] font-bold text-navy-900">
              <ShieldCheck className="h-4 w-4 text-navy-600" aria-hidden="true" />
              <T>Faculty verification</T>
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-4 leading-relaxed">
              <li>
                <T>
                  Sign in with the email ID issued by your school or
                  department.
                </T>
              </li>
              <li>
                <T>
                  A six-digit code is mailed to you; it expires in ten minutes
                  and allows five attempts.
                </T>
              </li>
              <li>
                <T>
                  …gov.in, …nic.in, …edu.in, …ac.in addresses are verified
                  immediately.
                </T>
              </li>
              <li>
                <T>
                  Gmail and other personal IDs are marked pending institutional
                  review until a verified reviewer confirms your institution.
                </T>
              </li>
            </ul>
            <Link href="/about#faculty-verification" className="mt-2 inline-block font-semibold text-navy-700 hover:underline">
              <T>Faculty Verification Policy</T>
            </Link>
          </div>

          <div className="rounded border border-line bg-white p-4 text-[13px] text-slate-600">
            <h2 className="text-[14px] font-bold text-navy-900">
              <T>Need help signing in?</T>
            </h2>
            <p className="mt-2 leading-relaxed">
              <T>Toll-free</T> {CONTACT.helpline}
              <br />
              <T>{CONTACT.helplineHours}</T>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="text-navy-700 hover:underline">
                {CONTACT.email}
              </a>
            </p>
          </div>

          <details className="rounded border border-line bg-paper p-4 text-[13px] text-slate-600">
            <summary className="cursor-pointer text-[14px] font-bold text-navy-900">
              <T>Evaluation accounts (demo build)</T>
            </summary>
            <p className="mt-2 leading-relaxed">
              <T>
                Seeded accounts for reviewers and evaluators of the demonstration
                deployment. They are not present on production instances.
              </T>
            </p>
            <div className="mt-3 space-y-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => quickLogin(acc)}
                  disabled={loading}
                  className="w-full rounded border border-line bg-white p-2.5 text-left transition hover:border-navy-400 disabled:opacity-60"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-bold text-navy-900">
                      {acc.label}
                    </span>
                    <span className="rounded-xs bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy-700">
                      <T>{acc.role}</T>
                    </span>
                  </span>
                  <span className="block text-[11px] text-slate-500">{acc.desc}</span>
                </button>
              ))}
            </div>
          </details>
        </aside>
      </div>
    </div>
  );
}
