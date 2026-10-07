import type { ReactNode } from "react";
import { SiteFooter } from "@/components/footer";
import { PublicHeader } from "@/components/header";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
