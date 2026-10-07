"use client";

import { useMemo, useState } from "react";
import { Check, Loader2, MapPin, Minus, Plus, Star, X } from "lucide-react";
import type { Band, Booking } from "@/lib/types";
import { hoursLabel, mxn } from "@/lib/format";
import { getPriceBreakdown } from "@/lib/pricing";

interface BookingBottomSheetProps {
  band: Band;
  onClose: () => void;
  onConfirm: (booking: Booking) => void;
  onViewReservas: () => void;
}

const TIME_SLOTS = ["12:00", "14:00", "16:00", "18:00", "20:00", "21:00"];
const MIN_HOURS = 1;
const MAX_HOURS = 8;

const heading = "mb-3 mt-6 text-sm font-semibold";
const chip = (on: boolean) =>
  `rounded-xl border transition ${
    on ? "border-brand-600 bg-mist/60 text-ink" : "border-sand/40 bg-cream text-muted"
  }`;

function buildDays() {
  const fmt = (d: Date, o: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("es-MX", o).replace(".", "");
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const weekday = i === 0 ? "Hoy" : i === 1 ? "Mañana" : fmt(d, { weekday: "short" });
    return { weekday, day: d.getDate(), month: fmt(d, { month: "short" }) };
  });
}

export default function BookingBottomSheet({
  band,
  onClose,
  onConfirm,
  onViewReservas,
}: BookingBottomSheetProps) {
  const days = useMemo(buildDays, []);
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [error, setError] = useState<string | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [time, setTime] = useState("18:00");
  const [hours, setHours] = useState(3);
  const [address, setAddress] = useState("");

  const day = days[dayIdx];
  const dateLabel = `${day.weekday} ${day.day} ${day.month}`;
  const { total, feeRate, coopFee, artistAmount, exempt } =
    getPriceBreakdown(band, hours);
  const addressOk = address.trim().length >= 5;

  const handlePay = () => {
    if (!addressOk || total <= 0) return;
    setError(null);
    setStep("processing");
    try {
      const booking: Booking = {
        id: `bk-${Date.now()}`,
        bandId: band.id,
        bandName: band.name,
        bandAvatar: band.avatar,
        dateLabel,
        time,
        hours,
        address: address.trim(),
        total,
        artistAmount,
        coopFee,
      };
      setTimeout(() => {
        try {
          onConfirm(booking);
          setStep("success");
        } catch {
          setStep("form");
          setError("No pudimos confirmar el pago. Inténtalo de nuevo.");
        }
      }, 1600);
    } catch {
      setStep("form");
      setError("Ocurrió un error al preparar la reserva. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      {step === "form" && (
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute inset-0 animate-fade-in bg-ink/40"
        />
      )}

      <div className="no-scrollbar relative max-h-[94vh] w-full max-w-md animate-slide-up overflow-y-auto rounded-t-3xl bg-white px-5 pb-safe sm:max-w-lg sm:rounded-3xl">
        <div className="mx-auto mb-4 mt-3 h-1.5 w-10 rounded-full bg-sand/60 sm:hidden" />

        {step === "success" ? (
          <div className="flex flex-col items-center pb-8 pt-4 text-center">
            <div className="flex h-16 w-16 animate-pop items-center justify-center rounded-full bg-brand-600">
              <Check size={32} className="text-white" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">¡Reserva confirmada!</h2>
            <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-muted">
              Pago sin anticipos: tu dinero queda protegido en la bóveda y se libera al grupo cuando finalice el evento.
            </p>
            {exempt && (
              <p className="mt-2 rounded-xl bg-mist/50 px-3 py-2 text-xs font-medium text-brand-700">
                ¡Promoción Nuevas Voces! Esta reserva es exenta de comisión: el 100% va al grupo.
              </p>
            )}

            <div className="mt-6 w-full rounded-2xl bg-cream p-4 text-left text-sm">
              <p className="font-semibold">
                {dateLabel} · {time} h · {hoursLabel(hours)}
              </p>
              <p className="mt-1 text-muted">{address.trim()}</p>
              <div className="mt-3 space-y-1 border-t border-sand/40 pt-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Total pagado</span>
                  <span className="font-semibold text-ink">{mxn(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">
                    Al grupo ({Math.round((1 - feeRate) * 100)}%)
                  </span>
                  <span className="font-semibold text-brand-600">
                    {mxn(artistAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">
                    Cooperación ({Math.round(feeRate * 100)}%)
                  </span>
                  <span className="font-semibold text-muted">
                    {exempt ? "Exento" : mxn(coopFee)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full space-y-3">
              <button
                onClick={onViewReservas}
                className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Ver mis reservas
              </button>
              <button
                onClick={onClose}
                className="w-full rounded-xl py-3.5 text-sm font-semibold text-muted transition hover:text-ink"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <div className="pb-6">
            <div className="flex items-center gap-3">
              <img src={band.avatar} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-semibold">{band.name}</h2>
                <p className="flex items-center gap-1 text-xs text-muted">
                  <Star size={11} className="fill-brand-600 text-brand-600" />
                  {band.rating.toFixed(1)} · {mxn(band.hourlyRate)}/hora
                </p>
              </div>
              {step === "form" && (
                <button
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-cream"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <h3 className={heading}>¿Cuándo?</h3>
            <div className="no-scrollbar -mt-1 flex gap-2 overflow-x-auto pb-1">
              {days.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setDayIdx(i)}
                  className={`flex w-16 shrink-0 flex-col items-center py-2.5 ${chip(i === dayIdx)}`}
                >
                  <span className="text-[10px] font-semibold">{d.weekday}</span>
                  <span className="text-lg font-semibold text-ink">{d.day}</span>
                  <span className="text-[10px]">{d.month}</span>
                </button>
              ))}
            </div>

            <h3 className={heading}>¿A qué hora?</h3>
            <div className="-mt-1 grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`py-2.5 text-sm font-semibold ${chip(slot === time)}`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <h3 className={heading}>¿Cuántas horas?</h3>
            <div className="-mt-1 flex items-center justify-between rounded-2xl border border-sand/40 bg-cream p-2">
              <button
                onClick={() => setHours((h) => Math.max(MIN_HOURS, h - 1))}
                disabled={hours <= MIN_HOURS}
                aria-label="Menos horas"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition active:scale-90 disabled:opacity-30"
              >
                <Minus size={18} />
              </button>
              <p className="text-lg font-semibold">{hoursLabel(hours)}</p>
              <button
                onClick={() => setHours((h) => Math.min(MAX_HOURS, h + 1))}
                disabled={hours >= MAX_HOURS}
                aria-label="Más horas"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition active:scale-90 disabled:opacity-30"
              >
                <Plus size={18} />
              </button>
            </div>

            <h3 className={heading}>¿Dónde es el evento?</h3>
            <div className="-mt-1 flex items-center gap-3 rounded-2xl border border-sand/40 bg-cream px-4">
              <MapPin size={18} className="shrink-0 text-brand-600" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle, colonia, ciudad…"
                aria-label="Dirección del evento"
                className="w-full bg-transparent py-3.5 text-sm placeholder:text-muted/70 focus:outline-none"
              />
            </div>

            <div className="mt-6 space-y-2 rounded-2xl bg-cream p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">
                  {hoursLabel(hours)} × {mxn(band.hourlyRate)}
                </span>
                <span className="font-semibold">{mxn(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">
                  Al grupo / artista ({Math.round((1 - feeRate) * 100)}%)
                </span>
                <span className="font-semibold text-brand-600">
                  {mxn(artistAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">
                  Cooperación ({Math.round(feeRate * 100)}%)
                </span>
                <span className="font-semibold text-muted">
                  {exempt ? "Exento" : mxn(coopFee)}
                </span>
              </div>
              {exempt && (
                <p className="rounded-xl bg-mist/50 px-3 py-2 text-xs font-medium text-brand-700">
                  ¡Promoción Nuevas Voces! Esta banda está exenta de comisión: el 100% va al grupo.
                </p>
              )}
              <p className="pt-1 text-xs text-muted">
                Pago sin anticipos: cubres el total al reservar. El dinero queda protegido en la bóveda y se libera al grupo cuando finalice el evento.
              </p>
            </div>

            <button
              onClick={handlePay}
              disabled={!addressOk || total <= 0 || step === "processing"}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-[0.99] disabled:opacity-40"
            >
              {step === "processing" ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Procesando pago…
                </>
              ) : (
                `Pagar total · ${mxn(total)}`
              )}
            </button>
            {error && (
              <p className="mt-3 rounded-xl bg-danger/10 px-4 py-3 text-center text-xs font-semibold text-danger">
                {error}
              </p>
            )}
            {!addressOk && !error && (
              <p className="mt-2 text-center text-xs text-muted">
                Ingresa la dirección del evento para continuar
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
