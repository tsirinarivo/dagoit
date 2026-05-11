/**
 * Formate un prix en Ariary malgache
 * Ex: 275000 → "275 000 Ar"
 */
export function formatPrice(amount: number, currency: "ar" | "eur" | "usd" = "ar"): string {
  if (currency === "ar") {
    const formatted = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return `${formatted} Ar`;
  }

  if (currency === "eur") {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount / 5000);
  }

  if (currency === "usd") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount / 4800);
  }

  return `${amount} Ar`;
}

/** Formate un prix mensuel avec période */
export function formatMonthlyPrice(amount: number): string {
  return `${formatPrice(amount)}/mois`;
}
