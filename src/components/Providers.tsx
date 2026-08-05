"use client";

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
