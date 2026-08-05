"use client";

import { useMemo, useState } from "react";
import { categories, products, type Category } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const [filter, setFilter] = useState<Category | "todos">("todos");

  const filtered = useMemo(() => {
    if (filter === "todos") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="tienda" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl animate-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Tienda
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Todo para tu cama
          </h2>
          <p className="mt-3 text-muted">
            Elige categoría, personaliza tamaño y color, y suma al carrito en un
            clic.
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-surface text-muted hover:border-ink/30 hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
