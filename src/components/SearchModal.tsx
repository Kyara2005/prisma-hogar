"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppImage } from "./AppImage";
import { categories, formatPrice, products } from "@/data/products";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 8);
    return products.filter((p) => {
      const cat =
        categories.find((c) => c.id === p.category)?.label.toLowerCase() ?? "";
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        cat.includes(q)
      );
    });
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-start justify-center px-3 pt-20 sm:pt-28">
      <button
        type="button"
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
        aria-label="Cerrar búsqueda"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl animate-rise overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <SearchIcon />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar sábanas, cobijas, edredones..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:text-base"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted hover:text-ink"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">
              No encontramos resultados para “{query}”.
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-surface-2"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                      <AppImage
                        src={product.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">
                        {product.name}
                      </p>
                      <p className="text-xs capitalize text-muted">
                        {product.category}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-accent-deep">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line px-4 py-3 text-center">
          <Link
            href="/catalogo"
            onClick={onClose}
            className="text-sm font-semibold text-accent-deep underline-offset-2 hover:underline"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-muted">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
