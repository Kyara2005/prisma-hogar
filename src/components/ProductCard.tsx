"use client";

import Link from "next/link";
import { AppImage } from "./AppImage";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(31,28,24,0.08)] sm:rounded-2xl">
      <Link
        href={`/producto/${product.slug}`}
        className="flex flex-1 flex-col"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-2 sm:aspect-[4/5]">
          <AppImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 33vw"
          />
          {product.compareAt && (
            <span className="absolute left-2 top-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:text-[11px]">
              Oferta
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-2.5 sm:p-5">
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-muted sm:block">
            {product.category}
          </p>
          <h3 className="font-display text-sm leading-snug text-ink sm:mt-1 sm:text-xl">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 hidden text-sm text-muted sm:mt-2 sm:block">
            {product.description}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5 sm:mt-4 sm:gap-2">
            <span className="font-display text-base text-ink sm:text-2xl">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="hidden text-sm text-muted line-through sm:inline">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
          <span className="mt-3 hidden text-sm font-semibold text-accent-deep sm:inline">
            Ver detalle →
          </span>
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className={`absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition sm:right-3 sm:top-3 sm:h-10 sm:w-10 ${
          liked
            ? "border-accent bg-white text-accent"
            : "border-white/70 bg-white/90 text-ink hover:text-accent"
        }`}
        aria-label={liked ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 20s-7-4.4-7-10a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 19 10c0 5.6-7 10-7 10Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill={liked ? "currentColor" : "none"}
          />
        </svg>
      </button>
    </article>
  );
}
