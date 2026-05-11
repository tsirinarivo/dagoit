// Force dynamic rendering to avoid static generation worker crashes on CloudLinux
export const dynamic = "force-dynamic";

import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { WhatsAppButton } from "@/components/organisms/WhatsAppButton";
import { CustomCursor } from "@/components/atoms/CustomCursor";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
}
