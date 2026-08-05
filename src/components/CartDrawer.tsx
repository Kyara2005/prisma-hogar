"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    clearCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px] animate-fade"
        aria-label="Cerrar carrito"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl animate-rise">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-2xl text-ink">Tu carrito</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-line px-3 py-1.5 text-sm text-muted hover:text-ink"
          >
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="font-display text-xl text-ink">Carrito vacío</p>
              <p className="text-sm text-muted">
                Explora la tienda y agrega tus favoritos.
              </p>
              <Link
                href="/#tienda"
                onClick={closeCart}
                className="mt-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-3 border-b border-line pb-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted">
                      {item.size} · {item.color}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-accent-deep">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-7 w-7 rounded border border-line text-sm"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1,
                          )
                        }
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="h-7 w-7 rounded border border-line text-sm"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-xs text-muted underline hover:text-ink"
                        onClick={() =>
                          removeItem(item.product.id, item.size, item.color)
                        }
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-display text-xl text-ink">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Link
              href="/carrito"
              onClick={closeCart}
              className="flex w-full items-center justify-center rounded-full bg-ink py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Ir al carrito / checkout
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full py-2 text-xs text-muted underline hover:text-ink"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
