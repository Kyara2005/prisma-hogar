"use client";

import Link from "next/link";
import { useState } from "react";
import { AppImage } from "@/components/AppImage";
import { ReceiptModal } from "@/components/ReceiptModal";
import { formatPrice } from "@/data/products";
import {
  PAYMENT_LABELS,
  useUser,
  type Purchase,
} from "@/context/UserContext";
import { shareReceipt } from "@/lib/receipt";

export default function CuentaPage() {
  const { user, purchases, openAuth, logout } = useUser();
  const [selected, setSelected] = useState<Purchase | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [shareHint, setShareHint] = useState<Record<string, string>>({});

  const openReceipt = (order: Purchase) => {
    setSelected(order);
    setReceiptOpen(true);
  };

  const handleShare = async (order: Purchase) => {
    const result = await shareReceipt(order);
    setShareHint((prev) => ({
      ...prev,
      [order.id]:
        result === "shared"
          ? "Compartido."
          : result === "copied"
            ? "Copiado al portapapeles."
            : "No se pudo compartir. Ábrelo para descargar.",
    }));
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 pb-28 pt-24 sm:px-6 sm:pt-28">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_12px_40px_rgba(31,28,24,0.06)]">
          <div className="border-b border-line bg-gradient-to-br from-[#ebe4d6] via-surface to-[#ddd4c4]/40 px-6 py-8 text-center sm:px-8 sm:py-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-line bg-white/80">
              <UserMark />
            </div>
            <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
              Mi cuenta
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
              Inicia sesión para ver tu perfil, favoritos e historial. Si eres
              nuevo, crea una cuenta en segundos.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-5 sm:p-6">
            <button
              type="button"
              onClick={() => openAuth("login")}
              className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition hover:bg-accent-deep active:scale-[0.98]"
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => openAuth("register")}
              className="w-full rounded-full border border-line bg-background py-3.5 text-sm font-semibold text-ink transition hover:border-accent/40 hover:bg-surface-2/50 active:scale-[0.98]"
            >
              Crear cuenta
            </button>
            <Link
              href="/favoritos"
              className="mt-1 py-2 text-center text-sm font-medium text-accent-deep underline underline-offset-2"
            >
              Ver favoritos sin cuenta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
      <div className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-2 text-lg font-bold text-ink">
              {user.name.trim().charAt(0).toUpperCase() || "P"}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                Perfil
              </p>
              <h1 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                Hola, {user.name.split(" ")[0]}
              </h1>
              <p className="mt-1 truncate text-sm text-muted">{user.email}</p>
              {user.phone && (
                <p className="text-sm text-muted">{user.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => openAuth("profile")}
              className="rounded-full border border-line bg-background px-4 py-2.5 text-sm font-semibold text-ink sm:px-5"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-muted hover:text-ink sm:px-5"
            >
              Salir
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
          <Link
            href="/favoritos"
            className="rounded-full bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white sm:px-5"
          >
            Favoritos
          </Link>
          <Link
            href="/carrito"
            className="rounded-full border border-line bg-background px-4 py-2.5 text-center text-sm font-semibold text-ink sm:px-5"
          >
            Carrito
          </Link>
        </div>
      </div>

      <section className="mt-8 sm:mt-10">
        <h2 className="font-display text-xl text-ink sm:text-2xl">
          Historial de compras
        </h2>
        <p className="mt-1 text-sm text-muted">
          Abre o comparte tus comprobantes cuando quieras.
        </p>

        {purchases.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-line bg-surface/80 px-5 py-10 text-center">
            <p className="text-muted">Aún no hay compras registradas.</p>
            <Link
              href="/catalogo"
              className="mt-4 inline-block text-sm font-semibold text-accent-deep underline underline-offset-2"
            >
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <ul className="mt-5 space-y-3 sm:space-y-4">
            {purchases.map((order) => (
              <li
                key={order.id}
                className="rounded-2xl border border-line bg-surface p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                      {order.id}
                    </p>
                    <p className="mt-1 text-sm text-ink">
                      {new Date(order.date).toLocaleString("es-EC", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <p className="font-display text-lg text-ink sm:text-xl">
                    {formatPrice(order.total)}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted">Envío: {order.address}</p>
                {order.paymentMethod && (
                  <p className="mt-1 text-sm text-muted">
                    Pago: {PAYMENT_LABELS[order.paymentMethod]}
                  </p>
                )}
                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.productId}-${item.size}-${item.color}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                        <AppImage
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted">
                          {item.size} · {item.color} · x{item.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-medium text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openReceipt(order)}
                    className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Ver comprobante
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare(order)}
                    className="rounded-full border border-line bg-background px-4 py-2.5 text-sm font-semibold text-ink"
                  >
                    Compartir
                  </button>
                </div>
                {shareHint[order.id] && (
                  <p className="mt-2 text-center text-xs text-accent-deep">
                    {shareHint[order.id]}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <ReceiptModal
        order={selected}
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
      />
    </div>
  );
}

function UserMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
