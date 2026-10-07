"use client";

import { useState } from "react";
import { ArrowLeft, Check, Loader2, Play, Star } from "lucide-react";
import type { Band } from "@/lib/types";
import { hoursLabel, mxn } from "@/lib/format";

interface BandProfileScreenProps {
  band: Band;
  onBack: () => void;
  onBook: () => void;
  purchased: Set<string>;
  buyingSongId: string | null;
  onBuySong: (songId: string) => void;
}

const TABS = [
  { key: "contratar", label: "Contratar" },
  { key: "bazar", label: "Bazar Digital" },
] as const;

const SONG_PRICE = 20;
const heading = "text-sm font-semibold";
const pill =
  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold";

export default function BandProfileScreen({
  band,
  onBack,
  onBook,
  purchased,
  buyingSongId,
  onBuySong,
}: BandProfileScreenProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("contratar");
  const [packageId, setPackageId] = useState<string | null>(
    band.packages.find((p) => p.popular)?.id ?? band.packages[0]?.id ?? null
  );
  const selected =
    band.packages.find((p) => p.id === packageId) ?? band.packages[0] ?? null;

  return (
    <div className="fixed inset-0 z-40 flex justify-center bg-white">
      <div className="flex w-full max-w-md flex-col sm:max-w-3xl">
        <div className="no-scrollbar flex-1 overflow-y-auto pb-10">
          <div className="relative h-52 w-full">
            <img src={band.cover} alt={`Portada de ${band.name}`} className="h-full w-full object-cover" />
            <button
              onClick={onBack}
              aria-label="Volver"
              className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="px-5 pt-5">
            <h1 className="text-2xl font-semibold tracking-tight">{band.name}</h1>
            <p className="mt-1 text-sm text-muted">
              {band.genre} · {band.yearsActive} años · {band.successfulEvents} eventos
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-sm">
              <Star size={13} className="fill-brand-600 text-brand-600" />
              <span className="font-medium">{band.rating.toFixed(1)}</span>
              <span className="text-muted">({band.reviews} reseñas)</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{band.bio}</p>
          </div>

          <div className="mx-5 mt-6 flex gap-6 border-b border-sand/40">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition ${
                  tab === key ? "border-brand-600 text-ink" : "border-transparent text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "contratar" ? (
            <div className="space-y-7 px-5 pt-6">
              <section>
                <h2 className={heading}>Paquetes</h2>
                {band.packages.length === 0 ? (
                  <p className="mt-3 rounded-2xl bg-cream p-4 text-sm text-muted">
                    Por el momento no hay paquetes disponibles para este grupo.
                  </p>
                ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {band.packages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPackageId(p.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        p.id === packageId ? "border-brand-600 bg-mist/40" : "border-sand/40 bg-cream"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">
                            {p.label}
                            {p.popular && (
                              <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 align-middle text-[10px] font-semibold text-white">
                                Más pedido
                              </span>
                            )}
                          </h3>
                          <p className="mt-0.5 text-xs text-muted">
                            {hoursLabel(p.hours)} · {mxn(band.hourlyRate)}/h
                          </p>
                        </div>
                        <p className="text-lg font-semibold text-brand-600">
                          {mxn(p.hours * band.hourlyRate)}
                        </p>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {p.perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-2 text-xs">
                            <Check size={13} className="shrink-0 text-brand-600" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
                )}
              </section>

              <section>
                <h2 className={heading}>Disponibilidad</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {band.availability.map((day) => (
                    <span key={day} className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-brand-700">
                      {day}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          ) : band.songs.length === 0 ? (
            <p className="mx-5 mt-6 rounded-2xl border border-sand/40 bg-cream p-4 text-sm text-muted">
              Próximamente el grupo publicará aquí sus obras originales.
            </p>
          ) : (
            <div className="mt-6 grid gap-3 px-5 sm:grid-cols-2">
              {band.songs.map((song) => {
                const owned = purchased.has(song.id);
                const buying = buyingSongId === song.id;
                return (
                  <div key={song.id} className="flex items-center gap-3 rounded-2xl border border-sand/40 bg-cream p-3">
                    <button
                      aria-label={`Escuchar ${song.title}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-brand-700 transition active:scale-95"
                    >
                      <Play size={16} className="ml-0.5 fill-current" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{song.title}</p>
                      <p className="text-xs text-muted">
                        {song.duration} · {song.plays} reproducciones
                      </p>
                    </div>
                    {owned ? (
                      <span className={`${pill} bg-mist text-brand-700`}>
                        <Check size={12} />
                        Comprado
                      </span>
                    ) : buying ? (
                      <span className={`${pill} bg-mist text-brand-700`}>
                        <Loader2 size={12} className="animate-spin" />
                        Comprando…
                      </span>
                    ) : (
                      <button
                        onClick={() => onBuySong(song.id)}
                        className={`${pill} bg-brand-600 text-white transition hover:bg-brand-700 active:scale-95`}
                      >
                        Comprar {mxn(SONG_PRICE)}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {tab === "contratar" && (
          <div className="border-t border-sand/40 pb-safe">
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <div>
                {selected ? (
                  <>
                    <p className="text-xs text-muted">
                      {selected.label} · {hoursLabel(selected.hours)}
                    </p>
                    <p className="font-semibold">
                      {mxn(selected.hours * band.hourlyRate)}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted">
                    Tarifa: {mxn(band.hourlyRate)}/h
                  </p>
                )}
              </div>
              <button
                onClick={onBook}
                className="rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-[0.98]"
              >
                Reservar banda
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
