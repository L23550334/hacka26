export const mxn = (n: number): string =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

export const hoursLabel = (n: number): string =>
  `${n} ${n === 1 ? "hora" : "horas"}`;

export const initial = (name: string): string =>
  name.trim().charAt(0).toUpperCase() || "S";
