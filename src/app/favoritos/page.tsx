"use client";

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useUser } from "@/context/UserContext";

export default function FavoritosPage() {
  const { favorites, count, clearFavorites } = useFavorites();
  const { user, openAuth } = useUser();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Wishlist
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink">Favoritos</h1>
          <p className="mt-2 text-muted">
            Guarda tu producto ideal y vuelve cuando quieras.
            {count > 0 ? ` Tienes ${count} guardado${count === 1 ? "" : "s"}.` : ""}
          </p>
        </div>
        {count > 0 && (
          <button
            type="button"
            onClick={clearFavorites}
            className="text-sm text-muted underline hover:text-ink"
          >
            Vaciar favoritos
          </button>
        )}
      </div>

      {!user && (
        <div className="mt-6 rounded-2xl border border-accent/30 bg-surface p-4 text-sm text-muted">
          <button
            type="button"
            onClick={openAuth}
            className="font-semibold text-accent-deep underline underline-offset-2"
          >
            Regístrate con tu correo
          </button>{" "}
          para asociar tus favoritos a tu cuenta en este dispositivo.
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-line bg-surface p-10 text-center">
          <p className="font-display text-2xl text-ink">Aún no hay favoritos</p>
          <p className="mt-2 text-sm text-muted">
            Toca el corazón en cualquier producto para guardarlo aquí.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
