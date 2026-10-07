"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { Band, SectionKey } from "@/lib/types";
import BandCard from "./BandCard";

interface HomeScreenProps {
  userName: string;
  bands: Band[];
  onSelectBand: (band: Band) => void;
}

const SECTIONS: { key: SectionKey; title: string }[] = [
  { key: "talento", title: "Impulsando el Talento Local" },
  { key: "tradiciones", title: "Rescate de Tradiciones" },
  { key: "nuevas", title: "Nuevas Voces" },
];

export default function HomeScreen({ userName, bands, onSelectBand }: HomeScreenProps) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = q
    ? bands.filter((b) => `${b.name} ${b.genre}`.toLowerCase().includes(q))
    : bands;

  return (
    <div className="pb-28 sm:pb-16">
      <header className="px-5 pt-10 sm:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">Hola, {userName}</h1>
        <label className="mt-5 flex items-center gap-3 rounded-xl bg-cream px-4 py-3.5 focus-within:ring-1 focus-within:ring-brand-600">
          <Search size={18} className="shrink-0 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar bandas o géneros"
            aria-label="Buscar bandas"
            className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
          />
        </label>
      </header>

      {SECTIONS.map(({ key, title }) => {
        const list = visible.filter((b) => b.sections.includes(key));
        if (list.length === 0) return null;
        return (
          <section key={key} className="mt-9">
            <h2 className="px-5 text-base font-semibold sm:px-8">{title}</h2>
            <div className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8">
              {list.map((band) => (
                <BandCard key={band.id} band={band} onSelect={onSelectBand} />
              ))}
            </div>
          </section>
        );
      })}

      {visible.length === 0 && (
        <p className="px-5 pt-12 text-center text-sm text-muted sm:px-8">
          No encontramos bandas para “{query}”.
        </p>
      )}
    </div>
  );
}
