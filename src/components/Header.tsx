"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { AppImage } from "./AppImage";

const links = [
  { href: "/#tienda", label: "Tienda" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/tree", label: "Contacto" },
];

export function Header() {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (itemCount === 0) return;
    setPop(true);
    const t = setTimeout(() => setPop(false), 350);
    return () => clearTimeout(t);
  }, [itemCount]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/92 shadow-[0_8px_30px_rgba(31,28,24,0.08)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <AppImage
            src="/logo.png"
            alt="Prisma Hogar"
            width={44}
            height={44}
            className="h-10 w-10 bg-transparent object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
            priority
            unoptimized
          />
          <span className="font-display text-xl tracking-tight text-ink sm:text-2xl">
            Prisma <span className="text-accent">Hogar</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-sm font-semibold text-ink transition hover:border-accent/40 hover:bg-surface-2"
            aria-label="Abrir carrito"
          >
            <CartIcon />
            <span className="hidden sm:inline">Carrito</span>
            {itemCount > 0 && (
              <span
                className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white ${
                  pop ? "animate-cart-pop" : ""
                }`}
              >
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            <span className="sr-only">Menú</span>
            <div className="flex w-4 flex-col gap-1">
              <span className="h-0.5 w-full bg-ink" />
              <span className="h-0.5 w-full bg-ink" />
              <span className="h-0.5 w-3 bg-ink" />
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-semibold text-ink hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
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
