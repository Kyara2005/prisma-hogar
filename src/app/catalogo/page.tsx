"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  categories,
  products,
  type Category,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { AppImage } from "@/components/AppImage";

type PriceRange = "todos" | "0-30" | "30-60" | "60-100" | "100+";
type SortOption = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

const priceRanges: { id: PriceRange; label: string }[] = [
  { id: "todos", label: "Cualquier precio" },
  { id: "0-30", label: "Hasta $30" },
  { id: "30-60", label: "$30 – $60" },
  { id: "60-100", label: "$60 – $100" },
  { id: "100+", label: "Más de $100" },
];

function matchesPrice(price: number, range: PriceRange) {
  switch (range) {
    case "0-30":
      return price <= 30;
    case "30-60":
      return price > 30 && price <= 60;
    case "60-100":
      return price > 60 && price <= 100;
    case "100+":
      return price > 100;
    default:
      return true;
  }
}

export default function CatalogoPage() {
  const [category, setCategory] = useState<Category | "todos">("todos");
  const [priceRange, setPriceRange] = useState<PriceRange>("todos");
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== "todos" && p.category !== category) return false;
      if (!matchesPrice(p.price, priceRange)) return false;
      if (onlyOffers && !p.compareAt) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "precio-asc") return a.price - b.price;
      if (sort === "precio-desc") return b.price - a.price;
      if (sort === "nombre") return a.name.localeCompare(b.name, "es");
      return 0;
    });

    return list;
  }, [category, priceRange, onlyOffers, sort]);

  const activeFiltersCount =
    (category !== "todos" ? 1 : 0) +
    (priceRange !== "todos" ? 1 : 0) +
    (onlyOffers ? 1 : 0);

  const clearFilters = () => {
    setCategory("todos");
    setPriceRange("todos");
    setOnlyOffers(false);
    setSort("relevancia");
  };

  const FiltersPanel = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? "space-y-6" : "space-y-5"}>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Categorías
        </p>
        <div className={mobile ? "flex flex-wrap gap-2" : "space-y-1"}>
          {categories.map((cat) => {
            const active = category === cat.id;
            const count =
              cat.id === "todos"
                ? products.length
                : products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  mobile ? "border" : "w-full"
                } ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line text-ink hover:bg-surface-2"
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
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Precio
        </p>
        <div className={mobile ? "flex flex-wrap gap-2" : "space-y-1"}>
          {priceRanges.map((range) => {
            const active = priceRange === range.id;
            return (
              <button
                key={range.id}
                type="button"
                onClick={() => setPriceRange(range.id)}
                className={`rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  mobile ? "border" : "block w-full"
                } ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line text-ink hover:bg-surface-2"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Ofertas
        </p>
        <button
          type="button"
          onClick={() => setOnlyOffers((v) => !v)}
          className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
            onlyOffers
              ? "border-accent bg-accent/10 text-accent-deep"
              : "border-line text-ink hover:bg-surface-2"
          }`}
        >
          <span>Solo productos en oferta</span>
          <span
            className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${
              onlyOffers ? "bg-accent" : "bg-surface-2"
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-white shadow transition ${
                onlyOffers ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </span>
        </button>
        <p className="mt-2 text-xs text-muted">
          {products.filter((p) => p.compareAt).length} ofertas disponibles
        </p>
      </div>

      {activeFiltersCount > 0 && (
        <button
          type="button"
          onClick={clearFilters}
          className="w-full rounded-full border border-line py-2.5 text-sm font-semibold text-muted hover:text-ink"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen pt-14 sm:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-background/92" />
      </div>

      {/* Header móvil tipo app */}
      <div className="relative border-b border-line/60 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-10">
          <Link
            href="/#tienda"
            className="hidden text-sm font-medium text-accent-deep hover:underline sm:inline"
          >
            ← Volver a tienda
          </Link>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl text-ink sm:mt-3 sm:text-5xl">
                Catálogo
              </h1>
              <p className="mt-1 text-sm text-muted sm:mt-3 sm:max-w-2xl sm:text-base">
                {filtered.length} producto{filtered.length === 1 ? "" : "s"}
                {onlyOffers ? " en oferta" : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-sm lg:hidden"
            >
              Filtros
              {activeFiltersCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Chips activos móvil */}
          {(activeFiltersCount > 0 || sort !== "relevancia") && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {category !== "todos" && (
                <Chip
                  label={categories.find((c) => c.id === category)?.label ?? ""}
                  onClear={() => setCategory("todos")}
                />
              )}
              {priceRange !== "todos" && (
                <Chip
                  label={
                    priceRanges.find((r) => r.id === priceRange)?.label ?? ""
                  }
                  onClear={() => setPriceRange("todos")}
                />
              )}
              {onlyOffers && (
                <Chip label="Ofertas" onClear={() => setOnlyOffers(false)} />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-6 px-3 py-5 sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar desktop */}
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <div className="rounded-2xl border border-line bg-surface/95 p-5 shadow-sm backdrop-blur-sm">
            <p className="mb-4 font-display text-lg text-ink">Filtros</p>
            <FiltersPanel />
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Mostrando{" "}
              <span className="font-semibold text-ink">{filtered.length}</span>
            </p>
            <label className="flex items-center gap-2 text-sm text-muted">
              Ordenar
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-xl border border-line bg-surface px-3 py-2 text-sm font-medium text-ink outline-none focus:border-accent"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre A–Z</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-line bg-surface p-10 text-center">
              <p className="font-display text-xl text-ink">Sin resultados</p>
              <p className="mt-2 text-sm text-muted">
                Prueba otra combinación de filtros.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-5 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom sheet filtros móvil */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[75] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/45"
            aria-label="Cerrar filtros"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] animate-rise overflow-y-auto rounded-t-3xl border border-line bg-surface pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface px-4 py-4">
              <h2 className="font-display text-xl text-ink">Filtros</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink"
              >
                Listo
              </button>
            </div>
            <div className="p-4">
              <FiltersPanel mobile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-deep"
    >
      {label}
      <span aria-hidden>×</span>
    </button>
  );
}
