"use client";

import { useEffect, useState } from "react";
import {
  PAYMENT_LABELS,
  type PaymentMethod,
} from "@/context/UserContext";
import { formatPrice } from "@/data/products";

type PaymentModalProps = {
  open: boolean;
  total: number;
  method: PaymentMethod;
  onClose: () => void;
  onSuccess: () => void;
};

type Step = "pay" | "processing" | "done";

export function PaymentModal({
  open,
  total,
  method,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>("pay");
  const [error, setError] = useState("");

  // Tarjeta (demo)
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // DeUna (demo)
  const [deunaPhone, setDeunaPhone] = useState("");

  // Transferencia
  const [transferRef, setTransferRef] = useState("");

  useEffect(() => {
    if (!open) return;
    setStep("pay");
    setError("");
    setCardName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setDeunaPhone("");
    setTransferRef("");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const runPayment = () => {
    setError("");

    if (method === "card") {
      const digits = cardNumber.replace(/\s/g, "");
      if (!cardName.trim()) {
        setError("Ingresa el nombre del titular.");
        return;
      }
      if (digits.length < 16) {
        setError("Ingresa un número de tarjeta válido (16 dígitos).");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setError("Fecha inválida. Usa MM/AA.");
        return;
      }
      if (cvv.length < 3) {
        setError("Ingresa el CVV (3 o 4 dígitos).");
        return;
      }
    }

    if (method === "deuna") {
      const phone = deunaPhone.replace(/\D/g, "");
      if (phone.length < 9) {
        setError("Ingresa el número celular vinculado a DeUna.");
        return;
      }
    }

    if (method === "transfer") {
      if (transferRef.trim().length < 4) {
        setError("Ingresa el número o referencia de transferencia.");
        return;
      }
    }

    setStep("processing");
    window.setTimeout(() => {
      setStep("done");
      window.setTimeout(() => {
        onSuccess();
      }, 1200);
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] animate-fade"
        aria-label="Cerrar"
        disabled={step === "processing"}
        onClick={() => step !== "processing" && onClose()}
      />

      <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-2xl animate-sheet-up sm:max-h-[min(90vh,620px)] sm:max-w-[420px] sm:rounded-2xl sm:animate-rise">
        <div className="flex shrink-0 justify-center pt-3 sm:hidden" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-line" />
        </div>

        <div className="flex shrink-0 items-start justify-between gap-3 px-5 pb-3 pt-2 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Pago simulado
            </p>
            <h2
              id="payment-title"
              className="mt-1 font-display text-[1.5rem] leading-tight text-ink sm:text-2xl"
            >
              {step === "done"
                ? "¡Pago exitoso!"
                : step === "processing"
                  ? "Procesando…"
                  : `Pagar con ${PAYMENT_LABELS[method]}`}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {step === "done"
                ? "Tu pedido quedó registrado en el historial."
                : step === "processing"
                  ? "Esto es una demostración, no se cobra de verdad."
                  : `Total a pagar: ${formatPrice(total)}`}
            </p>
          </div>
          {step !== "processing" && step !== "done" && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
              aria-label="Cerrar"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-6 sm:pb-6">
          {step === "processing" && (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-line border-t-accent" />
              <p className="mt-5 text-sm text-muted">
                Confirmando pago con {PAYMENT_LABELS[method]}…
              </p>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckIcon />
              </div>
              <p className="mt-4 font-display text-xl text-ink">
                {formatPrice(total)}
              </p>
              <p className="mt-1 text-sm text-muted">
                Pagado con {PAYMENT_LABELS[method]}
              </p>
            </div>
          )}

          {step === "pay" && method === "deuna" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-background p-4">
                <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-xl border border-dashed border-accent/40 bg-surface">
                  <div className="grid grid-cols-5 gap-1 p-3 opacity-80">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2.5 w-2.5 rounded-[2px] ${
                          [0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 19, 20, 22, 23, 24].includes(
                            i,
                          )
                            ? "bg-ink"
                            : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-muted">
                  Escanea con DeUna o paga con tu celular (demo).
                </p>
              </div>
              <label className="block text-xs font-semibold text-muted">
                Celular DeUna
                <input
                  value={deunaPhone}
                  onChange={(e) => setDeunaPhone(e.target.value)}
                  placeholder="09xxxxxxxx"
                  inputMode="tel"
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-3.5 py-3 text-base outline-none focus:border-accent sm:text-sm"
                />
              </label>
            </div>
          )}

          {step === "pay" && method === "card" && (
            <div className="space-y-3.5">
              <div className="rounded-2xl bg-gradient-to-br from-ink to-[#3d3428] p-5 text-white shadow-lg">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Tarjeta demo
                </p>
                <p className="mt-6 font-mono text-lg tracking-widest">
                  {cardNumber || "•••• •••• •••• ••••"}
                </p>
                <div className="mt-4 flex justify-between text-xs text-white/80">
                  <span>{cardName || "NOMBRE APELLIDO"}</span>
                  <span>{expiry || "MM/AA"}</span>
                </div>
              </div>
              <label className="block text-xs font-semibold text-muted">
                Nombre del titular
                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  placeholder="Como aparece en la tarjeta"
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-3.5 py-3 text-base outline-none focus:border-accent sm:text-sm"
                  autoComplete="cc-name"
                />
              </label>
              <label className="block text-xs font-semibold text-muted">
                Número de tarjeta
                <input
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-3.5 py-3 font-mono text-base outline-none focus:border-accent sm:text-sm"
                  autoComplete="cc-number"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs font-semibold text-muted">
                  Vencimiento
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/AA"
                    inputMode="numeric"
                    className="mt-1.5 w-full rounded-xl border border-line bg-background px-3.5 py-3 text-base outline-none focus:border-accent sm:text-sm"
                    autoComplete="cc-exp"
                  />
                </label>
                <label className="block text-xs font-semibold text-muted">
                  CVV
                  <input
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="123"
                    inputMode="numeric"
                    type="password"
                    className="mt-1.5 w-full rounded-xl border border-line bg-background px-3.5 py-3 text-base outline-none focus:border-accent sm:text-sm"
                    autoComplete="cc-csc"
                  />
                </label>
              </div>
            </div>
          )}

          {step === "pay" && method === "transfer" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-background p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Datos de transferencia (demo)
                </p>
                <dl className="mt-3 space-y-2">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Banco</dt>
                    <dd className="font-medium text-ink">Pichincha</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Cuenta</dt>
                    <dd className="font-mono font-medium text-ink">
                      2200123456
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Titular</dt>
                    <dd className="font-medium text-ink">Prisma Hogar</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-t border-line pt-2">
                    <dt className="text-muted">Monto</dt>
                    <dd className="font-display text-lg text-ink">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </dl>
              </div>
              <label className="block text-xs font-semibold text-muted">
                Nº de comprobante / referencia
                <input
                  value={transferRef}
                  onChange={(e) => setTransferRef(e.target.value)}
                  placeholder="Ej. TRX-45821"
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-3.5 py-3 text-base outline-none focus:border-accent sm:text-sm"
                />
              </label>
            </div>
          )}

          {error && step === "pay" && (
            <p
              className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-800"
              role="alert"
            >
              {error}
            </p>
          )}

          {step === "pay" && (
            <div className="mt-5 space-y-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={runPayment}
                className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition hover:bg-accent-deep active:scale-[0.98]"
              >
                {method === "deuna"
                  ? "Confirmar pago DeUna"
                  : method === "card"
                    ? "Pagar con tarjeta"
                    : "Confirmar transferencia"}
              </button>
              <p className="text-center text-[11px] leading-relaxed text-muted">
                Simulación de pago · No se procesa dinero real ni se envían
                datos a un banco.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l5 5L19 7"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
