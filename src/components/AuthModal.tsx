"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export function AuthModal() {
  const { isAuthOpen, closeAuth, register, user } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthOpen) return;
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
    setError("");
  }, [isAuthOpen, user]);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) {
      setError("Nombre y correo son obligatorios.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Ingresa un correo válido.");
      return;
    }
    register({ name, email, phone });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
        aria-label="Cerrar"
        onClick={closeAuth}
      />
      <div className="relative w-full max-w-md animate-rise rounded-2xl border border-line bg-surface p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Cuenta
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink">
              {user ? "Tu perfil" : "Regístrate"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Guarda tus favoritos e historial de compras con tu correo.
            </p>
          </div>
          <button
            type="button"
            onClick={closeAuth}
            className="rounded-full border border-line px-3 py-1 text-sm text-muted hover:text-ink"
          >
            Cerrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-xs font-medium text-muted">
            Nombre completo
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              placeholder="Tu nombre"
            />
          </label>
          <label className="block text-xs font-medium text-muted">
            Correo electrónico
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              placeholder="correo@ejemplo.com"
            />
          </label>
          <label className="block text-xs font-medium text-muted">
            Teléfono (opcional)
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              placeholder="09xxxxxxxx"
            />
          </label>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
          >
            {user ? "Actualizar datos" : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}
