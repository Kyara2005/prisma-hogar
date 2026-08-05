"use client";

import { AppImage } from "./AppImage";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, size, color, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(31,28,24,0.08)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
        <AppImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        {product.compareAt && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            Oferta
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-xl leading-snug text-ink">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {product.description}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>

        <div className="mt-4 grid gap-3">
          <label className="text-xs font-medium text-muted">
            Tamaño
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink outline-none focus:border-accent"
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
              className="mt-1 w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            >
              {product.colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
        >
          {added ? "Agregado ✓" : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
}
