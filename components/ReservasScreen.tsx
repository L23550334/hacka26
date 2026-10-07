import { MapPin, ShieldCheck } from "lucide-react";
import type { Booking } from "@/lib/types";
import { hoursLabel, mxn } from "@/lib/format";

interface ReservasScreenProps {
  bookings: Booking[];
  onExplore: () => void;
  onCancel: (id: string) => void;
}

export default function ReservasScreen({ bookings, onExplore, onCancel }: ReservasScreenProps) {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-28 sm:px-6 sm:pb-16">
      <h1 className="pt-12 text-2xl font-semibold tracking-tight">Mis Reservas</h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center pt-24 text-center">
          <h2 className="text-lg font-semibold">Aún no tienes reservas</h2>
          <p className="mt-2 max-w-[260px] text-sm text-muted">
            Explora bandas locales y asegura tu fecha en solo unos toques.
          </p>
          <button
            onClick={onExplore}
            className="mt-6 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Explorar bandas
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {bookings.map((b) => (
            <article key={b.id} className="rounded-2xl border border-sand/40 bg-cream p-4">
              <div className="flex items-center gap-3">
                <img src={b.bandAvatar} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">{b.bandName}</h3>
                  <p className="text-xs text-muted">
                    {b.dateLabel} · {b.time} h · {hoursLabel(b.hours)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{mxn(b.total)}</p>
                  <p className="text-[10px] text-muted">sin anticipos</p>
                </div>
              </div>

              <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                <MapPin size={13} className="shrink-0 text-brand-600" />
                <span className="truncate">{b.address}</span>
              </p>

              <p className="mt-2 text-[11px] text-muted">
                Al grupo:{" "}
                <span className="font-semibold text-ink">
                  {mxn(b.artistAmount ?? b.total)}
                </span>{" "}
                · Cooperación (5%):{" "}
                <span className="font-semibold text-ink">
                  {mxn(b.coopFee ?? 0)}
                </span>
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-sand/40 pt-3 text-xs">
                <span className="flex items-center gap-1 font-medium text-brand-600">
                  <ShieldCheck size={12} />
                  Pago protegido
                </span>
                <button
                  onClick={() => onCancel(b.id)}
                  className="font-semibold text-danger transition hover:opacity-70"
                >
                  Cancelar reserva
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
