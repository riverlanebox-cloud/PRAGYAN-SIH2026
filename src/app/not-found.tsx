import Link from "next/link";
import { SiteFooter } from "@/components/footer";
import { PublicHeader } from "@/components/header";
import { CONTACT } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-[13px] font-bold uppercase tracking-wider text-saffron-700">
          Error 404
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-navy-900">Page not found</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          The page you requested does not exist or has been moved. Check the
          address, or use the links below to continue.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3 text-[14px] font-bold">
          <li>
            <Link href="/home" className="rounded bg-navy-800 px-5 py-2.5 text-white hover:bg-navy-900">
              Go to dashboard
            </Link>
          </li>
          <li>
            <Link href="/" className="rounded border border-navy-300 bg-white px-5 py-2.5 text-navy-800 hover:bg-navy-50">
              Portal home
            </Link>
          </li>
          <li>
            <Link href="/about#help" className="rounded border border-navy-300 bg-white px-5 py-2.5 text-navy-800 hover:bg-navy-50">
              Help
            </Link>
          </li>
        </ul>
        <p className="mt-8 text-[13px] text-slate-500">
          If you reached this page from a link on the portal, please report it on
          the helpline {CONTACT.helpline} or {CONTACT.email}.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
