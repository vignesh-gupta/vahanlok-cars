import { FUEL_TYPES } from "./constant";

export type FuelType = (typeof FUEL_TYPES)[number];
export type TransmissionType = "Manual" | "Automatic" | "AMT" | "CVT" | "DCT";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number | null; // null means price is unavailable (show as "N/A")
  fuelType: FuelType;
  transmission: TransmissionType;
  kmDriven?: number; // only for pre-owned
  color: string;
  images: string[]; // Cloudinary URLs derived from /cars paths
  features: string[];
  specs: {
    engine?: string;
    seating?: number;
    mileage?: string;
    bootSpace?: string;
  };
}

export const BRANDS = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Honda",
  "Toyota",
  "Kia",
  "MG",
  "Mahindra",
  "Renault",
  "Volkswagen",
] as const;

export const BUDGET_RANGES = [
  { label: "Under ₹5 Lakh", min: 0, max: 500000 },
  { label: "₹5–10 Lakh", min: 500000, max: 1000000 },
  { label: "₹10–15 Lakh", min: 1000000, max: 1500000 },
  { label: "₹15–20 Lakh", min: 1500000, max: 2000000 },
  { label: "₹20–30 Lakh", min: 2000000, max: 3000000 },
  { label: "Above ₹30 Lakh", min: 3000000, max: Infinity },
] as const;

interface FormatPriceOptions {
  startingPrice?: boolean;
}

export function formatPrice(
  price: number | null,
  options?: FormatPriceOptions,
): string {
  if (price === null) return "N/A";

  const startingSuffix = options?.startingPrice ? "* onwards" : "";

  if (price >= 10000000)
    return `₹${(price / 10000000).toFixed(2)} Cr${startingSuffix}`;
  if (price >= 100000)
    return `₹${(price / 100000).toFixed(2)} Lakh${startingSuffix}`;
  return `₹${price.toLocaleString("en-IN")}${startingSuffix}`;
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("en-IN")} km`;
}
