"use client";

import Link from "next/link";
import { useState } from "react";
import { AppImage } from "@/components/AppImage";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  formatPrice,
  products,
  type Product,
} from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const liked = isFavorite(product.id);
  const categoryLabel =
    categories.find((c) => c.id === product.category)?.label ?? product.category;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addItem(product, size, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
      <Link
        href="/catalogo"
        className="text-sm font-medium text-accent-deep hover:underline"
      >
        ← Volver al catálogo
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2">
          <AppImage
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          {product.compareAt && (
            <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase text-white">
              Oferta
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {categoryLabel}
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-lg text-muted line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          <p className="mt-5 text-base leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-medium text-muted">
              Tamaño
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-medium text-muted">
              Color
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              >
                {product.colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-medium text-muted">Cantidad</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="h-9 w-9 rounded-lg border border-line"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                className="h-9 w-9 rounded-lg border border-line"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              {added ? "Agregado al carrito ✓" : "Agregar al carrito"}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={`rounded-full border px-6 py-3.5 text-sm font-semibold transition ${
                liked
                  ? "border-accent bg-accent/10 text-accent-deep"
                  : "border-line text-ink hover:bg-surface-2"
              }`}
            >
              {liked ? "En favoritos" : "Favorito"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-ink">También te puede gustar</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
