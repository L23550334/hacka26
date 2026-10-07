import { createClient } from "@supabase/supabase-js";
import { AlertTriangle, ArrowRight, Music } from "lucide-react";

// Siempre consulta en vivo: no cachear la lista de bandas.
export const dynamic = "force-dynamic";

interface BandRow {
  id?: string | number;
  nombre?: string | null;
  name?: string | null;
  genero?: string | null;
  genre?: string | null;
}

interface BandsResult {
  bands: BandRow[];
  error: string | null;
}

async function fetchBands(): Promise<BandsResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Excepción: credenciales ausentes.
  if (!url || !key) {
    return {
      bands: [],
      error:
        "No se encontraron las credenciales de Supabase. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu archivo .env.local.",
    };
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase.from("bands").select("*");

  // Excepción: la consulta falló (red, permisos RLS, tabla inexistente, etc.).
  if (error) {
    return {
      bands: [],
      error: `Error al consultar Supabase: ${error.message}`,
    };
  }

  return { bands: (data as BandRow[]) ?? [], error: null };
}

export default async function DiscoverPage() {
  const { bands, error } = await fetchBands();

  return (
    <main className="min-h-screen bg-ink px-5 py-10 sm:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Descubrir Talento Local
        </h1>
        <p className="mt-2 text-sm text-mist/80">
          Bandas conectadas directamente a la base de datos.
        </p>
      </header>

      {error ? (
        /* ── Estado de error ── */
        <div className="flex items-start gap-3 rounded-2xl border border-danger/40 bg-danger/10 p-4">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-danger" />
          <div>
            <p className="font-semibold text-danger">
              No pudimos cargar las bandas
            </p>
            <p className="mt-1 text-sm text-danger/80">{error}</p>
          </div>
        </div>
      ) : bands.length === 0 ? (
        /* ── Estado vacío ── */
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
          <Music size={36} className="text-mist/50" />
          <p className="mt-4 font-semibold text-white">Aún no hay bandas</p>
          <p className="mt-1 max-w-sm text-sm text-mist/70">
            La tabla &quot;bands&quot; está vacía. Agrega registros desde tu
            proyecto de Supabase.
          </p>
        </div>
      ) : (
        /* ── Grid responsive: 1 col. móvil · 2 tablet · 4 desktop ── */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bands.map((banda, index) => {
            const nombre = banda.nombre || banda.name || "Banda sin nombre";
            const genero = banda.genero || banda.genre || "Género no definido";
            const key = banda.id ?? `banda-${index}`;

            return (
              <article
                key={key}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-brand-600/60 hover:bg-white/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/20">
                  <Music size={20} className="text-mist" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">
                  {nombre}
                </h2>
                <p className="mt-1 text-sm text-mist/80">{genero}</p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Ver Perfil
                  <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
