import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/header";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
