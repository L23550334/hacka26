import type { Band } from "./types";

/** Comisión que recibe la cooperación sobre el total del evento. */
export const COOP_FEE_RATE = 0.05;

const MIN_HOURS = 1;
const MAX_HOURS = 8;

/**
 * Excepción a la comisión: las bandas de "Nuevas Voces"
 * (artistas emergentes) están exentas — el 100% va al grupo.
 */
export const isFeeExempt = (band: Band): boolean =>
  band.sections.includes("nuevas");

export interface PriceBreakdown {
  total: number;
  /** Comisión de la cooperación (0 cuando aplica la excepción). */
  feeRate: number;
  coopFee: number;
  artistAmount: number;
  exempt: boolean;
}

/**
 * Desglose del pago (sin anticipos):
 * - Regla general: 95% al grupo/artista · 5% a la cooperación.
 * - Excepción "Nuevas Voces": 100% al grupo, 0% cooperación.
 */
export function getPriceBreakdown(band: Band, hours: number): PriceBreakdown {
  const safeHours = Number.isFinite(hours)
    ? Math.min(MAX_HOURS, Math.max(MIN_HOURS, Math.round(hours)))
    : MIN_HOURS;
  const rate = Number.isFinite(band?.hourlyRate)
    ? Math.max(0, band.hourlyRate)
    : 0;
  const total = safeHours * rate;
  const exempt = isFeeExempt(band);
  const feeRate = exempt ? 0 : COOP_FEE_RATE;
  const coopFee = Math.round(total * feeRate);
  return { total, feeRate, coopFee, artistAmount: total - coopFee, exempt };
}
