import { Star } from "lucide-react";
import type { Band } from "@/lib/types";
import { mxn } from "@/lib/format";

interface BandCardProps {
  band: Band;
  onSelect: (band: Band) => void;
}

export default function BandCard({ band, onSelect }: BandCardProps) {
  return (
    <button
      onClick={() => onSelect(band)}
      className="w-52 shrink-0 snap-start text-left transition-transform active:scale-[0.98] sm:w-60"
    >
      <img
        src={band.cover}
        alt={`Portada de ${band.name}`}
        loading="lazy"
        className="h-36 w-full rounded-2xl object-cover"
      />
      <h3 className="mt-3 truncate text-sm font-semibold">{band.name}</h3>
      <p className="mt-0.5 truncate text-xs text-muted">{band.genre}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm">
        <Star size={12} className="fill-brand-600 text-brand-600" />
        <span className="font-medium">{band.rating.toFixed(1)}</span>
        <span className="text-muted">· {mxn(band.hourlyRate)} / hora</span>
      </p>
    </button>
  );
}
