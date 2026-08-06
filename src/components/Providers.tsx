"use client";

import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { UserProvider } from "@/context/UserContext";
import { CartDrawer } from "./CartDrawer";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { AuthModal } from "./AuthModal";
import { MobileBottomNav } from "./MobileBottomNav";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <FavoritesProvider>
        <CartProvider>
          <Header />
          <main className="flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
            {children}
          </main>
          <div className="hidden md:block">
            <Footer />
          </div>
          {/* Footer compacto solo en móvil */}
          <footer className="border-t border-line bg-ink px-4 py-6 text-center text-[11px] leading-relaxed text-white/55 md:hidden">
            <p>Prisma Hogar · Demo Fermenta</p>
            <p className="mt-1">
              Baja:{" "}
              <a href="https://wa.me/593969088646" className="underline">
                0969088646
              </a>
            </p>
          </footer>
          <CartDrawer />
          <AuthModal />
          <MobileBottomNav />
          <WhatsAppFloat />
        </CartProvider>
      </FavoritesProvider>
    </UserProvider>
  );
}
