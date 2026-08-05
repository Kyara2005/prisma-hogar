"use client";

import { AppImage } from "@/components/AppImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const shipping = items.length > 0 ? 3.5 : 0;
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const lines = items
      .map(
        (i) =>
          `• ${i.product.name} (${i.size}, ${i.color}) x${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`,
      )
      .join("%0A");

    const message =
      `Hola Prisma Hogar, quiero hacer este pedido:%0A%0A` +
      `${lines}%0A%0A` +
      `Subtotal: ${formatPrice(subtotal)}%0A` +
      `Envío estimado: ${formatPrice(shipping)}%0A` +
      `Total: ${formatPrice(total)}%0A%0A` +
      `Nombre: ${name}%0A` +
      `Teléfono: ${phone}%0A` +
      `Dirección: ${address}%0A` +
      (note ? `Nota: ${note}%0A` : "");

    window.open(`https://wa.me/593993480433?text=${message}`, "_blank");
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Carrito</h1>
      <p className="mt-2 text-muted">
        Revisa tu pedido y envíalo por WhatsApp para confirmar.
      </p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-line bg-surface p-10 text-center">
          <p className="font-display text-2xl text-ink">Tu carrito está vacío</p>
          <Link
            href="/#tienda"
            className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-4 rounded-2xl border border-line bg-surface p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                  <AppImage
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-medium text-ink">{item.product.name}</h2>
                  <p className="text-sm text-muted">
                    {item.size} · {item.color}
                  </p>
                  <p className="mt-1 font-semibold text-accent-deep">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      className="h-8 w-8 rounded-lg border border-line"
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
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-lg border border-line"
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
                      className="ml-auto text-xs text-muted underline"
                      onClick={() =>
                        removeItem(item.product.id, item.size, item.color)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-muted underline hover:text-ink"
            >
              Vaciar carrito
            </button>
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-display text-2xl text-ink">Resumen</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Envío estimado</dt>
                <dd className="font-medium">{formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-2xl">{formatPrice(total)}</dd>
              </div>
            </dl>

            <form onSubmit={handleCheckout} className="mt-6 space-y-3">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
                className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dirección de entrega"
                rows={2}
                className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nota (opcional)"
                rows={2}
                className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
              >
                Confirmar por WhatsApp
              </button>
              {sent && (
                <p className="text-center text-xs text-accent-deep">
                  Se abrió WhatsApp con tu pedido. ¡Gracias!
                </p>
              )}
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}
