"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  cartItemsToPurchaseItems,
  PAYMENT_LABELS,
  useUser,
  type DeliveryMode,
  type PaymentMethod,
  type Purchase,
} from "@/context/UserContext";
import { formatPrice } from "@/data/products";
import { AppImage } from "@/components/AppImage";
import { PaymentModal } from "@/components/PaymentModal";
import { ReceiptModal } from "@/components/ReceiptModal";
import { downloadReceipt, shareReceipt } from "@/lib/receipt";

const METHODS: {
  id: PaymentMethod;
  title: string;
  desc: string;
}[] = [
  {
    id: "deuna",
    title: "DeUna",
    desc: "Paga desde tu app DeUna",
  },
  {
    id: "card",
    title: "Tarjeta",
    desc: "Crédito o débito",
  },
  {
    id: "transfer",
    title: "Transferencia",
    desc: "Banca en línea",
  },
];

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const { user, openAuth, savePurchase } = useUser();
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("address");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [formError, setFormError] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("deuna");
  const [payOpen, setPayOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Purchase | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [shareHint, setShareHint] = useState("");

  const shipping = items.length > 0 ? 3.5 : 0;
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const useDeviceLocation = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Tu navegador no soporta ubicación.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setDeliveryMode("location");
        setLocating(false);
      },
      () => {
        setLocationError(
          "No se pudo obtener la ubicación. Activa el GPS o escribe la dirección.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (items.length === 0) return;

    if (!user) {
      openAuth("login");
      return;
    }

    if (deliveryMode === "address" && !address.trim()) {
      setFormError("Escribe la dirección de entrega.");
      return;
    }
    if (deliveryMode === "location" && !location) {
      setFormError("Usa la ubicación del celular o escribe una dirección.");
      return;
    }

    setPayOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (!user) return;

    const deliveryAddress =
      deliveryMode === "location" && location
        ? `Ubicación GPS (${location.lat.toFixed(5)}, ${location.lng.toFixed(5)})`
        : address.trim();

    const order = savePurchase({
      total,
      shipping,
      address: deliveryAddress,
      phone: user.phone,
      note: note.trim() || undefined,
      paymentMethod: method,
      deliveryMode,
      location: deliveryMode === "location" && location ? location : undefined,
      customerName: user.name,
      customerEmail: user.email,
      items: cartItemsToPurchaseItems(items),
    });

    setLastOrder(order);
    setPayOpen(false);
    clearCart();
  };

  const handleQuickShare = async () => {
    if (!lastOrder) return;
    const result = await shareReceipt(lastOrder);
    if (result === "shared") setShareHint("Compartido.");
    else if (result === "copied")
      setShareHint("Comprobante copiado al portapapeles.");
    else setShareHint("No se pudo compartir. Ábrelo para descargar.");
  };

  if (lastOrder) {
    return (
      <div className="mx-auto max-w-lg px-4 pb-28 pt-24 sm:px-6 sm:pt-28">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface text-center shadow-[0_12px_40px_rgba(31,28,24,0.06)]">
          <div className="border-b border-line bg-gradient-to-br from-emerald-50 via-surface to-[#ebe4d6]/60 px-6 py-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12.5l5 5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="mt-4 font-display text-3xl text-ink">
              Compra confirmada
            </h1>
            <p className="mt-2 text-sm text-muted">
              Pago simulado con{" "}
              {lastOrder.paymentMethod
                ? PAYMENT_LABELS[lastOrder.paymentMethod]
                : "método demo"}
              . Puedes guardar o compartir el comprobante.
            </p>
          </div>
          <div className="space-y-3 px-6 py-6 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Pedido</span>
              <span className="font-mono font-medium text-ink">
                {lastOrder.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Total</span>
              <span className="font-display text-xl text-ink">
                {formatPrice(lastOrder.total)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Envío</span>
              <span className="max-w-[55%] text-right text-ink">
                {lastOrder.address}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-line px-5 pt-4">
            <button
              type="button"
              onClick={handleQuickShare}
              className="rounded-full bg-ink py-3 text-sm font-semibold text-white"
            >
              Compartir
            </button>
            <button
              type="button"
              onClick={() => {
                downloadReceipt(lastOrder);
                setShareHint("Descarga iniciada.");
              }}
              className="rounded-full border border-line py-3 text-sm font-semibold text-ink"
            >
              Descargar
            </button>
          </div>
          <div className="px-5 pt-2">
            <button
              type="button"
              onClick={() => setReceiptOpen(true)}
              className="w-full py-2 text-sm font-semibold text-accent-deep underline underline-offset-2"
            >
              Ver comprobante completo
            </button>
            {shareHint && (
              <p className="pb-1 text-center text-xs text-accent-deep">
                {shareHint}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 border-t border-line p-5 sm:flex-row">
            <Link
              href="/cuenta"
              className="flex-1 rounded-full bg-ink py-3 text-center text-sm font-semibold text-white"
            >
              Ver historial
            </Link>
            <Link
              href="/catalogo"
              className="flex-1 rounded-full border border-line py-3 text-center text-sm font-semibold text-ink"
            >
              Seguir comprando
            </Link>
          </div>
        </div>

        <ReceiptModal
          order={lastOrder}
          open={receiptOpen}
          onClose={() => setReceiptOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Carrito</h1>
      <p className="mt-2 text-sm text-muted sm:text-base">
        Indica el envío, elige DeUna, tarjeta o transferencia y paga (simulación).
      </p>

      {!user && (
        <div className="mt-4 rounded-2xl border border-accent/30 bg-surface p-4 text-sm text-muted">
          Para completar la compra,{" "}
          <button
            type="button"
            onClick={() => openAuth("login")}
            className="font-semibold text-accent-deep underline"
          >
            inicia sesión
          </button>{" "}
          o{" "}
          <button
            type="button"
            onClick={() => openAuth("register")}
            className="font-semibold text-accent-deep underline"
          >
            regístrate
          </button>
          .
        </div>
      )}

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-line bg-surface p-8 text-center sm:p-10">
          <p className="font-display text-2xl text-ink">Tu carrito está vacío</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/catalogo"
              className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
            >
              Explorar productos
            </Link>
            <Link
              href="/favoritos"
              className="inline-flex rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink"
            >
              Ver favoritos
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-3 rounded-2xl border border-line bg-surface p-3 sm:gap-4 sm:p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:h-24 sm:w-24">
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

          <aside className="h-fit rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="font-display text-2xl text-ink">Resumen</h2>
            {user && (
              <p className="mt-1 text-xs text-muted">
                {user.name} · {user.email}
              </p>
            )}
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

            <form onSubmit={handleStartPayment} className="mt-6 space-y-3">
              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Envío
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryMode("address");
                      setLocationError("");
                    }}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
                      deliveryMode === "address"
                        ? "border-accent bg-accent/5 text-ink"
                        : "border-line bg-background text-muted"
                    }`}
                  >
                    Escribir dirección
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryMode("location");
                      if (!location) useDeviceLocation();
                    }}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
                      deliveryMode === "location"
                        ? "border-accent bg-accent/5 text-ink"
                        : "border-line bg-background text-muted"
                    }`}
                  >
                    Usar ubicación
                  </button>
                </div>
              </fieldset>

              {deliveryMode === "address" ? (
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Dirección de entrega"
                  rows={2}
                  className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
                />
              ) : (
                <div className="rounded-xl border border-line bg-background p-3">
                  {location ? (
                    <p className="text-sm text-ink">
                      Ubicación lista:{" "}
                      <span className="font-mono text-xs">
                        {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm text-muted">
                      Necesitamos tu ubicación para el envío.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={useDeviceLocation}
                    disabled={locating}
                    className="mt-2 text-sm font-semibold text-accent-deep underline underline-offset-2 disabled:opacity-60"
                  >
                    {locating
                      ? "Obteniendo ubicación…"
                      : location
                        ? "Actualizar ubicación"
                        : "Permitir ubicación del celular"}
                  </button>
                  {locationError && (
                    <p className="mt-2 text-xs text-red-700">{locationError}</p>
                  )}
                </div>
              )}

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nota para el envío (opcional)"
                rows={2}
                className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />

              <fieldset className="pt-1">
                <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Método de pago
                </legend>
                <div className="mt-2 grid gap-2">
                  {METHODS.map((m) => {
                    const selected = method === m.id;
                    return (
                      <label
                        key={m.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 transition ${
                          selected
                            ? "border-accent bg-accent/5"
                            : "border-line bg-background hover:border-accent/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={selected}
                          onChange={() => setMethod(m.id)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-accent bg-accent"
                              : "border-line bg-surface"
                          }`}
                          aria-hidden
                        >
                          {selected && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink">
                            {m.title}
                          </span>
                          <span className="block text-xs text-muted">
                            {m.desc}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {formError && (
                <p className="text-sm text-red-700" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition hover:bg-accent-deep active:scale-[0.98]"
              >
                {user
                  ? `Pagar ${formatPrice(total)}`
                  : "Inicia sesión para pagar"}
              </button>
              <p className="text-center text-[11px] text-muted">
                Simulación · Los datos de cuenta salen de tu perfil.
              </p>
            </form>
          </aside>
        </div>
      )}

      <PaymentModal
        open={payOpen}
        total={total}
        method={method}
        onClose={() => setPayOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
