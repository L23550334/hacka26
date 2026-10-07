"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Music } from "lucide-react";
import GoogleIcon from "./GoogleIcon";

interface OnboardingScreenProps {
  onLogin: (name: string) => void;
}

type Mode = "login" | "signup";
type Loading = "email" | "google" | "guest" | null;

const inputClass =
  "w-full rounded-xl bg-cream px-4 py-3.5 text-sm text-ink ring-1 ring-transparent transition placeholder:text-muted/70 focus:bg-white focus:outline-none focus:ring-brand-600";

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 ${
        light ? "text-white" : "text-brand-600"
      }`}
    >
      <Music size={20} strokeWidth={2.25} aria-hidden="true" />
      <span className="text-lg font-semibold tracking-tight">sonora</span>
    </div>
  );
}

export default function OnboardingScreen({ onLogin }: OnboardingScreenProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<Loading>(null);

  const isSignup = mode === "signup";

  const start = (kind: Exclude<Loading, null>, displayName: string) => {
    if (loading) return;
    setError("");
    setLoading(kind);
    // Simula la creación de la cuenta segura "por debajo", sin exponer complejidad.
    setTimeout(() => onLogin(displayName), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup && name.trim().length < 2) {
      return setError("Escribe tu nombre.");
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return setError("Ingresa un correo válido.");
    }
    if (password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres.");
    }
    const fallback = email.split("@")[0];
    const display = isSignup ? name.trim() : fallback;
    start("email", display.charAt(0).toUpperCase() + display.slice(1));
  };

  const switchMode = () => {
    setMode(isSignup ? "login" : "signup");
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-[5fr_6fr]">
      {/* Panel de marca (solo PC) */}
      <aside className="hidden bg-brand-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Wordmark light />
        <p className="max-w-sm text-4xl font-semibold leading-[1.15] tracking-tight">
          La música de tu evento, directo con las bandas locales.
        </p>
      </aside>

      {/* Formulario */}
      <main className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm">
          <div className="mb-14 lg:hidden">
            <Wordmark />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            {isSignup ? "Crea tu cuenta" : "Inicia sesión"}
          </h1>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
            {isSignup && (
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ana"
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Correo
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:text-ink"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading !== null}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-[0.99] disabled:opacity-60"
            >
              {loading === "email" || loading === "google" ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Creando tu cuenta segura…
                </>
              ) : isSignup ? (
                "Crear cuenta"
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-muted">
            <span className="h-px flex-1 bg-sand/50" />
            o
            <span className="h-px flex-1 bg-sand/50" />
          </div>

          <button
            type="button"
            onClick={() => start("google", "Ana")}
            disabled={loading !== null}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-sand/60 bg-white py-3.5 text-sm font-semibold transition hover:bg-cream active:scale-[0.99] disabled:opacity-60"
          >
            <GoogleIcon size={18} />
            Continuar con Google
          </button>

          <div className="mt-8 flex flex-col items-center gap-3 text-sm">
            <p className="text-muted">
              {isSignup ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                className="font-semibold text-brand-600 hover:text-brand-700"
              >
                {isSignup ? "Inicia sesión" : "Crea una"}
              </button>
            </p>
            <button
              type="button"
              onClick={() => start("guest", "Invitado")}
              disabled={loading !== null}
              className="font-medium text-muted underline-offset-4 transition hover:text-ink hover:underline disabled:opacity-60"
            >
              {loading === "guest" ? "Entrando…" : "Continuar como invitado"}
            </button>
          </div>

          <p className="mt-10 text-center text-xs leading-relaxed text-muted">
            Al continuar aceptas los Términos de uso y la Política de
            privacidad.
          </p>
        </div>
      </main>
    </div>
  );
}
