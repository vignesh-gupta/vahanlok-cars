"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Car } from "@/lib/types";
import FilterBar, { type FilterState } from "@/components/FilterBar";
import CarCard from "@/components/CarCard";
import { SlidersHorizontal } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/config";

interface CarsClientProps {
  initialCars: Car[];
  initialType?: string;
}

export default function CarsClient({
  initialCars,
  initialType,
}: CarsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    type: (initialType as FilterState["type"]) ?? "all",
    brand: searchParams.get("brand") ?? "",
    fuelType: searchParams.get("fuel") ?? "",
    budgetMax: searchParams.get("budget")
      ? Number(searchParams.get("budget"))
      : null,
  });

  // Inquiry form state (shown when Pre-Owned selected)
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryDetails, setInquiryDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync URL to filters on mount
  useEffect(() => {
    const type = searchParams.get("type") as FilterState["type"] | null;
    if (type && type !== filters.type) {
      setFilters((prev) => ({ ...prev, type: type ?? "all" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFilterChange(newFilters: FilterState) {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.type !== "all") params.set("type", newFilters.type);
    if (newFilters.brand) params.set("brand", newFilters.brand);
    if (newFilters.fuelType) params.set("fuel", newFilters.fuelType);
    if (newFilters.budgetMax)
      params.set("budget", String(newFilters.budgetMax));
    const query = params.toString();
    router.replace(query ? `/cars?${query}` : "/cars", { scroll: false });
  }

  async function submitInquiry() {
    setError(null);
    if (!inquiryName.trim()) return setError("Please enter your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inquiryEmail))
      return setError("Please enter a valid email address.");
    if (!inquiryDetails.trim())
      return setError("Please describe your requirement.");

    setSubmitting(true);
    try {
      // For now, just simulate a request. Replace with real API call.
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
      setInquiryName("");
      setInquiryEmail("");
      setInquiryDetails("");
    } catch (err) {
      console.log("Error submitting inquiry:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function sendViaWhatsApp() {
    setError(null);
    if (!inquiryName.trim()) return setError("Please enter your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inquiryEmail))
      return setError("Please enter a valid email address.");
    if (!inquiryDetails.trim())
      return setError("Please describe your requirement.");

    // Build message and open WhatsApp chat
    const message = `Name: ${inquiryName}\nEmail: ${inquiryEmail}\nRequirement: ${inquiryDetails}`;
    const url = buildWhatsAppUrl(message);
    // Open in a new tab/window (WhatsApp Web or app)
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setSubmitted(true);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryDetails("");
  }

  const filtered = initialCars.filter((car) => {
    if (filters.type === "pre-owned") return false; // NO Pre-owned cars (will show requirement box)
    if (filters.brand && car.brand !== filters.brand) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (
      filters.budgetMax !== null &&
      car.price !== null &&
      car.price > filters.budgetMax
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <FilterBar onFilterChange={handleFilterChange} initialFilters={filters} />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-[#1A1A1A]">
            {filtered.length}
          </span>{" "}
          car{filtered.length !== 1 ? "s" : ""}
          {filters.type !== "all" && (
            <span> · {filters.type === "new" ? "New" : "Pre-Owned"}</span>
          )}
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : filters.type === "pre-owned" ? (
        <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">
            Looking for a Pre-Owned car?
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Tell us your requirement and we&apos;ll get back to you.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-100 rounded-md p-4 text-green-700">
              Thanks — we&apos;ll contact you soon.
            </div>
          ) : (
            <>
              {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
              <div className="grid grid-cols-1 gap-3">
                <input
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A1A]"
                />
                <input
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A1A]"
                />
                <textarea
                  value={inquiryDetails}
                  onChange={(e) => setInquiryDetails(e.target.value)}
                  placeholder="Describe what you're looking for (budget, brand, model, location...)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A1A] h-28"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setInquiryName("");
                      setInquiryEmail("");
                      setInquiryDetails("");
                      setError(null);
                    }}
                    className="text-sm text-gray-600 hover:underline"
                    type="button"
                  >
                    Clear
                  </button>
                  <button
                    onClick={sendViaWhatsApp}
                    disabled={submitting}
                    className="text-sm bg-[#25D366] text-white px-4 py-2 rounded-md disabled:opacity-60"
                    type="button"
                  >
                    Send via WhatsApp
                  </button>
                  <button
                    onClick={submitInquiry}
                    disabled={submitting}
                    className="text-sm bg-[#D72828] text-white px-4 py-2 rounded-md disabled:opacity-60"
                    type="button"
                  >
                    {submitting ? "Sending..." : "Send Requirement"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <SlidersHorizontal className="h-12 w-12 text-gray-200 mx-auto mb-4" />
          <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">
            No cars found
          </h3>
          <p className="text-gray-500 text-sm">
            Try adjusting your filters to see more results.
          </p>
        </div>
      )}
    </div>
  );
}
