import { formatPrice } from "@/data/products";
import {
  PAYMENT_LABELS,
  type Purchase,
} from "@/context/UserContext";

export function buildReceiptText(order: Purchase): string {
  const date = new Date(order.date).toLocaleString("es-EC", {
    dateStyle: "long",
    timeStyle: "short",
  });
  const method = order.paymentMethod
    ? PAYMENT_LABELS[order.paymentMethod]
    : "Simulado";
  const lines = [
    "══════════════════════════════════",
    "         PRISMA HOGAR",
    "      Comprobante de compra",
    "══════════════════════════════════",
    "",
    `Pedido:     ${order.id}`,
    `Fecha:      ${date}`,
    `Pago:       ${method} (simulado)`,
    "",
  ];

  if (order.customerName) lines.push(`Cliente:    ${order.customerName}`);
  if (order.customerEmail) lines.push(`Correo:     ${order.customerEmail}`);
  if (order.phone) lines.push(`Teléfono:   ${order.phone}`);

  lines.push(`Envío:      ${order.address}`);
  if (order.location) {
    lines.push(
      `GPS:        ${order.location.lat.toFixed(6)}, ${order.location.lng.toFixed(6)}`,
    );
  }
  if (order.note) lines.push(`Nota:       ${order.note}`);

  lines.push("", "────────── Productos ──────────", "");

  for (const item of order.items) {
    lines.push(
      `• ${item.name}`,
      `  ${item.size} · ${item.color} · x${item.quantity}`,
      `  ${formatPrice(item.price * item.quantity)}`,
      "",
    );
  }

  lines.push(
    "──────────────────────────────────",
    `Envío:               ${formatPrice(order.shipping)}`,
    `TOTAL:               ${formatPrice(order.total)}`,
    "══════════════════════════════════",
    "",
    "Pago simulado · Prisma Hogar Ecuador",
    "No constituye factura electrónica.",
    "",
  );

  return lines.join("\n");
}

export function downloadReceipt(order: Purchase) {
  const text = buildReceiptText(order);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `comprobante-${order.id}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function shareReceipt(order: Purchase): Promise<"shared" | "copied" | "failed"> {
  const text = buildReceiptText(order);
  const title = `Comprobante Prisma Hogar ${order.id}`;

  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      const file = new File([text], `comprobante-${order.id}.txt`, {
        type: "text/plain",
      });
      const canFiles =
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] });

      if (canFiles) {
        await navigator.share({ title, text, files: [file] });
      } else {
        await navigator.share({ title, text });
      }
      return "shared";
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return "failed";
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}
