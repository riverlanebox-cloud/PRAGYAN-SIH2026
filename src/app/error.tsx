"use client";

import Link from "next/link";

export default function PortalError({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-[13px] font-bold uppercase tracking-wider text-saffron-700">
        Service unavailable
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-navy-900">
        This page could not be loaded
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
        The portal could not complete your request. Please try again in a few
        moments. If the problem continues, the service may be undergoing
        maintenance.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-[14px] font-bold">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-navy-800 px-5 py-2.5 text-white hover:bg-navy-900"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded border border-navy-300 bg-white px-5 py-2.5 text-navy-800 hover:bg-navy-50"
        >
          Portal home
        </Link>
      </div>
      <p className="mt-8 text-[13px] text-slate-500">
        Administrators: check the database configuration and the /api/health
        endpoint for this deployment.
      </p>
    </main>
  );
}
