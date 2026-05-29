// WhatsApp configuration — update WHATSAPP_NUMBER to change the sales agent number
export const WHATSAPP_NUMBER = "919930503688"; // +91-9930503688

export const BUSINESS = {
  name: "Vahanlok",
  tagline: "Find Your Perfect Ride",
  location: "Mumbai, Maharashtra",
  phone: ["+91-90760 33699", "+91 90760 33677"],
  email: process.env.NEXT_PUBLIC_EMAIL || "N/A",
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildDefaultWhatsAppUrl(carName?: string): string {
  const message = carName
    ? `Hi Vahanlok! I'm interested in the ${carName}. Please share more details.`
    : "Hi Vahanlok! I'm looking to buy a car. Can you help me?";
  return buildWhatsAppUrl(message);
}
