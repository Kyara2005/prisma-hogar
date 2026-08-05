"use client";

import Link from "next/link";
import { useMemo } from "react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

const PREVIEW_LIMIT = 6;

export function ProductGrid() {
  const preview = useMemo(() => {
    const featured = products.filter((p) => p.featured);
    const rest = products.filter((p) => !p.featured);
    return [...featured, ...rest].slice(0, PREVIEW_LIMIT);
  }, []);

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
            Una selección de 6 productos destacados. Entra al catálogo completo
            para filtrar por categoría, incluido Infantil.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/catalogo"
            className="rounded-full bg-ink px-8 py-3.5 text-sm font-bold text-white transition hover:bg-accent-deep"
          >
            Ver catálogo completo
          </Link>
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          {products.length} productos en total
        </p>
      </div>
    </section>
  );
}
