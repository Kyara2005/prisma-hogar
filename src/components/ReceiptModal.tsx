"use client";

import { useEffect, useState } from "react";
import { AppImage } from "@/components/AppImage";
import {
  PAYMENT_LABELS,
  type Purchase,
} from "@/context/UserContext";
import { formatPrice } from "@/data/products";
import { downloadReceipt, shareReceipt } from "@/lib/receipt";

type ReceiptModalProps = {
  order: Purchase | null;
  open: boolean;
  onClose: () => void;
};

export function ReceiptModal({ order, open, onClose }: ReceiptModalProps) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStatus("");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !order) return null;

  const handleShare = async () => {
    setBusy(true);
    setStatus("");
    const result = await shareReceipt(order);
    if (result === "shared") setStatus("Compartido.");
    else if (result === "copied")
      setStatus("Comprobante copiado al portapapeles.");
    else setStatus("No se pudo compartir. Prueba descargarlo.");
    setBusy(false);
  };

  const handleDownload = () => {
    downloadReceipt(order);
    setStatus("Descarga iniciada.");
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] animate-fade"
        aria-label="Cerrar"
        onClick={onClose}
      />

      <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-2xl animate-sheet-up sm:max-h-[min(90vh,680px)] sm:max-w-[440px] sm:rounded-2xl sm:animate-rise">
        <div className="flex shrink-0 justify-center pt-3 sm:hidden" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-line" />
        </div>

        <div className="flex shrink-0 items-start justify-between gap-3 px-5 pb-3 pt-2 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Prisma Hogar
            </p>
            <h2
              id="receipt-title"
              className="mt-1 font-display text-[1.5rem] leading-tight text-ink"
            >
              Comprobante
            </h2>
            <p className="mt-1 font-mono text-sm text-muted">{order.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 sm:px-6">
          <div className="rounded-2xl border border-line bg-background p-4 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-muted">Fecha</span>
              <span className="text-right text-ink">
                {new Date(order.date).toLocaleString("es-EC", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            {order.paymentMethod && (
              <div className="mt-2 flex justify-between gap-3">
                <span className="text-muted">Pago</span>
                <span className="text-ink">
                  {PAYMENT_LABELS[order.paymentMethod]}
                </span>
              </div>
            )}
            <div className="mt-2 flex justify-between gap-3">
              <span className="text-muted">Envío</span>
              <span className="max-w-[60%] text-right text-ink">
                {order.address}
              </span>
            </div>
            {order.note && (
              <div className="mt-2 flex justify-between gap-3">
                <span className="text-muted">Nota</span>
                <span className="max-w-[60%] text-right text-ink">
                  {order.note}
                </span>
              </div>
            )}
            <div className="mt-3 flex justify-between border-t border-line pt-3">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-display text-xl text-ink">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {order.items.map((item) => (
              <li
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
              </li>
            ))}
          </ul>

          <p className="mt-4 text-center text-[11px] text-muted">
            Pago simulado · No es factura electrónica.
          </p>
        </div>

        <div className="shrink-0 space-y-2 border-t border-line px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={handleShare}
              className="rounded-full bg-ink py-3 text-sm font-semibold text-white transition hover:bg-accent-deep disabled:opacity-60"
            >
              Compartir
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-full border border-line bg-background py-3 text-sm font-semibold text-ink transition hover:border-accent/40"
            >
              Descargar
            </button>
          </div>
          {status && (
            <p className="text-center text-xs text-accent-deep">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
}
