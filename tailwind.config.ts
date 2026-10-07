import type { Config } from "tailwindcss";

// Paleta: #44749D · #C6D4E1 · #FFFFFF · #EBE7E0 · #BDB8AD
// ink / muted / danger son tonos derivados para texto y errores (la paleta
// base es demasiado clara para texto legible sobre blanco).
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1E2F3F", // texto principal (azul acero muy oscuro)
        muted: "#655F53", // texto secundario (derivado de la arena)
        danger: "#A8483A", // cancelar / cerrar sesión
        brand: {
          600: "#44749D", // primario
          700: "#365D80", // hover / texto sobre azul claro
        },
        mist: "#C6D4E1", // azul cielo: estados seleccionados
        cream: "#EBE7E0", // superficies e inputs
        sand: "#BDB8AD", // bordes y divisores
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pop: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.34s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "fade-in": "fade-in 0.2s ease-out forwards",
        pop: "pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
