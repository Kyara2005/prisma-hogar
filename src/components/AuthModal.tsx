"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export function AuthModal() {
  const {
    isAuthOpen,
    closeAuth,
    login,
    register,
    updateProfile,
    user,
    authMode,
    setAuthMode,
  } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isAuthOpen) return;
    setError("");
    setPassword("");
    setConfirm("");
    setShowPassword(false);
    if (authMode === "profile" && user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone ?? "");
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [isAuthOpen, authMode, user]);

  useEffect(() => {
    if (!isAuthOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isAuthOpen, closeAuth]);

  if (!isAuthOpen) return null;

  const title =
    authMode === "login"
      ? "Iniciar sesión"
      : authMode === "register"
        ? "Crear cuenta"
        : "Editar perfil";

  const subtitle =
    authMode === "login"
      ? "Accede para ver favoritos y compras."
      : authMode === "register"
        ? "Guarda tu historial en este dispositivo."
        : "Actualiza tus datos de contacto.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("El correo es obligatorio.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Ingresa un correo válido.");
      return;
    }

    if (authMode === "login") {
      if (!password) {
        setError("Ingresa tu contraseña.");
        return;
      }
      const result = login({ email, password });
      if (!result.ok) setError(result.error);
      return;
    }

    if (authMode === "register") {
      if (!name.trim()) {
        setError("El nombre es obligatorio.");
        return;
      }
      if (password.length < 4) {
        setError("La contraseña debe tener al menos 4 caracteres.");
        return;
      }
      if (password !== confirm) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      const result = register({ name, email, phone, password });
      if (!result.ok) {
        setError(result.error);
        if (result.error.includes("ya está registrado")) {
          setAuthMode("login");
        }
      }
      return;
    }

    if (!name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    updateProfile({ name, email, phone: phone || undefined });
    closeAuth();
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-line bg-background px-3.5 py-3 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 sm:text-sm";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] animate-fade"
        aria-label="Cerrar"
        onClick={closeAuth}
      />

      <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-2xl animate-sheet-up sm:max-h-[min(90vh,640px)] sm:max-w-[400px] sm:rounded-2xl sm:animate-rise">
        {/* Handle (móvil) */}
        <div className="flex shrink-0 justify-center pt-3 sm:hidden" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-line" />
        </div>

        <div className="flex shrink-0 items-start justify-between gap-3 px-5 pb-3 pt-2 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Prisma Hogar
            </p>
            <h2
              id="auth-title"
              className="mt-1 font-display text-[1.65rem] leading-tight text-ink sm:text-2xl"
            >
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={closeAuth}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition hover:bg-background hover:text-ink"
            aria-label="Cerrar"
          >
            <CloseIcon />
          </button>
        </div>

        {authMode !== "profile" && (
          <div className="mx-5 mb-4 grid shrink-0 grid-cols-2 border-b border-line sm:mx-6">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`relative py-3 text-sm font-semibold transition ${
                authMode === "login" ? "text-ink" : "text-muted"
              }`}
            >
              Entrar
              {authMode === "login" && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`relative py-3 text-sm font-semibold transition ${
                authMode === "register" ? "text-ink" : "text-muted"
              }`}
            >
              Registrarse
              {authMode === "register" && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
              )}
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-3.5 overflow-y-auto overscroll-contain px-5 pb-4 sm:px-6">
            {(authMode === "register" || authMode === "profile") && (
              <label className="block text-xs font-semibold text-muted">
                Nombre completo
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Tu nombre"
                  autoComplete="name"
                />
              </label>
            )}

            <label className="block text-xs font-semibold text-muted">
              Correo electrónico
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                inputMode="email"
              />
            </label>

            {(authMode === "register" || authMode === "profile") && (
              <label className="block text-xs font-semibold text-muted">
                Teléfono{" "}
                <span className="font-normal">(opcional)</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="09xxxxxxxx"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>
            )}

            {authMode !== "profile" && (
              <label className="block text-xs font-semibold text-muted">
                Contraseña
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-12`}
                    placeholder={
                      authMode === "register"
                        ? "Mínimo 4 caracteres"
                        : "Tu contraseña"
                    }
                    autoComplete={
                      authMode === "login" ? "current-password" : "new-password"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1.5 text-xs font-semibold text-muted hover:text-ink"
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </label>
            )}

            {authMode === "register" && (
              <label className="block text-xs font-semibold text-muted">
                Confirmar contraseña
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={inputClass}
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                />
              </label>
            )}

            {error && (
              <p
                className="rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-800"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <div className="shrink-0 border-t border-line bg-surface px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-6">
            <button
              type="submit"
              className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] hover:bg-accent-deep"
            >
              {authMode === "login"
                ? "Entrar"
                : authMode === "register"
                  ? "Crear cuenta"
                  : "Guardar cambios"}
            </button>

            {authMode === "login" && (
              <p className="mt-3.5 text-center text-sm text-muted">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                  className="font-semibold text-accent-deep underline underline-offset-2"
                >
                  Regístrate
                </button>
              </p>
            )}

            {authMode === "register" && (
              <p className="mt-3.5 text-center text-sm text-muted">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="font-semibold text-accent-deep underline underline-offset-2"
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </form>
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
