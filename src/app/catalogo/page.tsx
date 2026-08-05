"use client";

import { AppImage } from "@/components/AppImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, products, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function CatalogoPage() {
  const [filter, setFilter] = useState<Category | "todos">("todos");

  const filtered = useMemo(() => {
    if (filter === "todos") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="relative min-h-screen pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-background/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/85 via-background/88 to-background/92" />
      </div>

      <div className="relative border-b border-line/60 bg-surface/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link
            href="/#tienda"
            className="text-sm font-medium text-accent-deep hover:underline"
          >
            ← Volver a tienda
          </Link>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Catálogo completo
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Filtra por categoría desde el panel izquierdo y agrega al carrito
            sin perder tu lugar.
          </p>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface/95 p-4 shadow-sm backdrop-blur-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Categorías
            </p>
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {categories.map((cat) => {
                const active = filter === cat.id;
                const count =
                  cat.id === "todos"
                    ? products.length
                    : products.filter((p) => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilter(cat.id)}
                    className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                      active
                        ? "bg-ink text-white"
                        : "text-ink hover:bg-surface-2"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-xs ${active ? "text-white/70" : "text-muted"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div>
          <p className="mb-6 text-sm text-muted">
            {filtered.length} producto{filtered.length === 1 ? "" : "s"}
            {filter !== "todos" && (
              <>
                {" "}
                en{" "}
                <span className="font-semibold text-ink">
                  {categories.find((c) => c.id === filter)?.label}
                </span>
              </>
            )}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
