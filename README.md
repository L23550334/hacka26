# Sonora — Lado del Cliente (MVP Hackathon)

Plataforma descentralizada (PWA, mobile-first) que conecta clientes con grupos musicales locales. **Toda la complejidad Web3 está oculta**: la UI habla el idioma de una app tradicional de reservas (estilo Spotify / Uber), mientras la creación de cuenta segura, el pago con anticipo protegido y la compra de obras digitales ocurren "por debajo".

## Stack

- **Next.js 14** (App Router, client components)
- **React 18** + **TypeScript**
- **Tailwind CSS 3** (tema claro; paleta: azul acero `#44749D`, azul cielo `#C6D4E1`, blanco `#FFFFFF`, crema `#EBE7E0` y arena `#BDB8AD`; tonos derivados para texto: `ink`, `muted`, `danger`)
- **Lucide React** para iconografía
- Datos mockeados en `data/bands.json` (6 bandas: mariachi, norteño, rock, cumbia, indie pop, jazz)

## Levantar el proyecto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verifica que compila sin errores
```

## Estructura

```
app/
  layout.tsx            # Layout raíz (marco "teléfono" en desktop, PWA metadata)
  page.tsx              # Orquestador de navegación y estado global
  manifest.json         # Manifiesto PWA
components/
  OnboardingScreen.tsx  # 1. Login minimalista (correo + contraseña, Google, invitado)
  HomeScreen.tsx        # 2. Descubrimiento + carruseles
  BandCard.tsx          #    Tarjeta de banda (portada, género, ★, tarifa/hora)
  BandProfileScreen.tsx # 3. Perfil de banda (tabs Contratar / Bazar Digital + CTA sticky)
  BookingBottomSheet.tsx# 4. Flujo de reserva y pago (fecha, hora, horas, dirección, resumen, pago)
  ReservasScreen.tsx    #    Tab "Mis Reservas"
  PerfilScreen.tsx      #    Tab "Perfil" (incluye tarjeta "Bóveda segura")
  BottomTabBar.tsx      #    Tab bar inferior: Inicio / Mis Reservas / Perfil
data/bands.json         # Datos mockeados (bandas, paquetes, canciones)
lib/types.ts            # Tipos TypeScript
lib/format.ts           # Formateo de moneda (es-MX)
```

## Flujos implementados

1. **Onboarding** — Logo, botón "Iniciar sesión con Google / Correo" (simula la creación de la cuenta segura con un loading "Creando tu cuenta segura…"), continuación como invitado.
2. **Home** — Barra inferior con badge de reservas, buscador, banner y 3 carruseles horizontales: *Impulsando el Talento Local*, *Rescate de Tradiciones* y *Nuevas Voces*.
3. **Perfil de banda** — Portada amplia, avatar superpuesta, métricas (eventos exitosos / calificación / reseñas), tab **Contratar** (paquetes de horas seleccionables, disponibilidad, CTA sticky "Reservar Banda - Pago Seguro") y tab **Bazar Digital** (canciones con Play + "Comprar $20 MXN" que simula la adquisición del token de la obra con DRM).
4. **Reserva y pago** — Bottom Sheet con selector de fecha (7 días), horario, stepper de horas, dirección, resumen dinámico (`N horas × tarifa`), caja de confianza con escudo ("Tu dinero está protegido en nuestra bóveda segura…") y botón "Pagar Anticipo Seguro" (anticipo = 30%). Al pagar: procesamiento → confirmación → la reserva aparece en "Mis Reservas".

## Notas de UX

- Diseño responsive real: en móvil usa la barra inferior de tabs; en PC una barra superior con navegación, contenedor amplio (máx. `max-w-6xl`) y grids de 2 columnas en paquetes y canciones. El Bottom Sheet de pago se convierte en un diálogo centrado en pantallas grandes.
- Áreas seguras (`safe-area-inset`) para dispositivos con notch.
- Nada de jerga Web3 visible: no aparece "smart contract", "gas", "wallet" ni "token" en la interfaz.
- Imágenes de placeholder vía `picsum.photos` (seeds fijas para consistencia).
