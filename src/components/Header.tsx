"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useUser } from "@/context/UserContext";
import { AppImage } from "./AppImage";
import { SearchModal } from "./SearchModal";

const links = [
  { href: "/#tienda", label: "Tienda" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/tree", label: "Contacto" },
];

export function Header() {
  const { itemCount, openCart } = useCart();
  const { count: favCount } = useFavorites();
  const { user, openAuth } = useUser();
  const [pop, setPop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (itemCount === 0) return;
    setPop(true);
    const t = setTimeout(() => setPop(false), 350);
    return () => clearTimeout(t);
  }, [itemCount]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/92 pt-[env(safe-area-inset-top)] shadow-[0_8px_30px_rgba(31,28,24,0.08)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 sm:h-20 sm:px-6">
          <Link href="/" className="group flex min-w-0 items-center gap-2">
            <AppImage
              src="/logo.png"
              alt="Prisma Hogar"
              width={44}
              height={44}
              className="h-9 w-9 shrink-0 bg-transparent object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
              priority
              unoptimized
            />
            <span className="font-display hidden truncate text-xl tracking-tight text-ink sm:inline sm:text-2xl">
              Prisma <span className="text-accent">Hogar</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-ink/80 transition-colors hover:text-accent-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-accent/40 hover:bg-surface-2 sm:h-11 sm:w-auto sm:gap-2 sm:px-3.5"
              aria-label="Buscar productos"
              title="Buscar (Ctrl+K)"
            >
              <SearchIcon />
              <span className="hidden text-sm font-semibold md:inline">Buscar</span>
            </button>

            <Link
              href="/favoritos"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-accent/40 hover:bg-surface-2 sm:h-11 sm:w-11"
              aria-label="Favoritos"
            >
              <HeartIcon filled={favCount > 0} />
              {favCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                  {favCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link
                href="/cuenta"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-2.5 text-sm font-semibold text-ink transition hover:border-accent/40 hover:bg-surface-2 sm:h-11 sm:px-3"
                aria-label="Mi cuenta"
                title={user.email}
              >
                <UserIcon />
                <span className="hidden max-w-[90px] truncate lg:inline">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={openAuth}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-accent/40 hover:bg-surface-2 sm:h-11 sm:w-11"
                aria-label="Registrarse"
                title="Registrarse"
              >
                <UserIcon />
              </button>
            )}

            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-2.5 text-sm font-semibold text-ink transition hover:border-accent/40 hover:bg-surface-2 sm:h-11 sm:px-3.5"
              aria-label="Abrir carrito"
            >
              <CartIcon />
              <span className="hidden md:inline">Carrito</span>
              {itemCount > 0 && (
                <span
                  className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white ${
                    pop ? "animate-cart-pop" : ""
                  }`}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16 16l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.2" fill="currentColor" />
      <circle cx="17" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20s-7-4.4-7-10a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 19 10c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
        className={filled ? "text-accent" : undefined}
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 19.5c1.6-3.2 4-4.5 7-4.5s5.4 1.3 7 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
