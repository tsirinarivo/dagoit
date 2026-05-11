/**
 * Formate un numéro de téléphone malgache
 * Ex: "0340000000" → "+261 34 00 000 00"
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  // Numéro malgache local (10 chiffres commençant par 0)
  if (cleaned.startsWith("0") && cleaned.length === 10) {
    const withCountry = "261" + cleaned.slice(1);
    return formatMalagasyInternational(withCountry);
  }

  // Numéro international malgache (12 chiffres commençant par 261)
  if (cleaned.startsWith("261") && cleaned.length === 12) {
    return formatMalagasyInternational(cleaned);
  }

  return phone;
}

function formatMalagasyInternational(digits: string): string {
  // 261 XX XX XXX XX
  const d = digits.replace(/^261/, "");
  const op = d.slice(0, 2);
  const a = d.slice(2, 4);
  const b = d.slice(4, 7);
  const c = d.slice(7, 9);
  return `+261 ${op} ${a} ${b} ${c}`;
}

/** Lien WhatsApp avec message pré-rempli */
export function whatsappLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleaned}${encoded ? `?text=${encoded}` : ""}`;
}
