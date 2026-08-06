"use client";

import Link from "next/link";
import { AppImage } from "@/components/AppImage";
import { formatPrice } from "@/data/products";
import { useUser } from "@/context/UserContext";

export default function CuentaPage() {
  const { user, purchases, openAuth, logout } = useUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 pb-20 pt-28 text-center sm:px-6">
        <h1 className="font-display text-4xl text-ink">Mi cuenta</h1>
        <p className="mt-3 text-muted">
          Regístrate con tu correo para guardar compras y favoritos en este
          dispositivo.
        </p>
        <button
          type="button"
          onClick={openAuth}
          className="mt-8 rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white"
        >
          Registrarme
        </button>
        <Link
          href="/favoritos"
          className="mt-4 block text-sm font-medium text-accent-deep underline"
        >
          Ver favoritos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Perfil
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink">Hola, {user.name}</h1>
          <p className="mt-2 text-muted">{user.email}</p>
          {user.phone && <p className="text-sm text-muted">{user.phone}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openAuth}
            className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink"
          >
            Editar datos
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/favoritos"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
        >
          Mis favoritos
        </Link>
        <Link
          href="/carrito"
          className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink"
        >
          Ir al carrito
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink">Historial de compras</h2>
        <p className="mt-1 text-sm text-muted">
          Pedidos confirmados desde este dispositivo.
        </p>

        {purchases.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-8 text-center">
            <p className="text-muted">Aún no hay compras registradas.</p>
            <Link
              href="/#tienda"
              className="mt-4 inline-block text-sm font-semibold text-accent-deep underline"
            >
              Empezar a comprar
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {purchases.map((order) => (
              <li
                key={order.id}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {order.id}
                    </p>
                    <p className="mt-1 text-sm text-ink">
                      {new Date(order.date).toLocaleString("es-EC", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <p className="font-display text-xl text-ink">
                    {formatPrice(order.total)}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Envío a: {order.address}
                  {order.phone ? ` · ${order.phone}` : ""}
                </p>
                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.productId}-${item.size}-${item.color}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-surface-2">
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
                      <p className="text-sm font-medium text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
