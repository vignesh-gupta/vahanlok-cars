"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { BRANDS, BUDGET_RANGES, type FuelType } from "@/lib/types";

export interface FilterState {
  type: "all" | "new" | "pre-owned";
  brand: string;
  fuelType: string;
  budgetMax: number | null;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

const DEFAULT_FILTERS: FilterState = {
  type: "all",
  brand: "",
  fuelType: "",
  budgetMax: null,
};

const FUEL_TYPES: FuelType[] = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];

export default function FilterBar({ onFilterChange, initialFilters }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange(next);
  }

  const typeOptions: Array<{ label: string; value: FilterState["type"] }> = [
    { label: "All Cars", value: "all" },
    { label: "New Cars", value: "new" },
    { label: "Pre-Owned", value: "pre-owned" },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-[#1A1A1A]">
        <SlidersHorizontal className="h-4 w-4 text-[#D72828]" />
        Filters
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        {/* Type toggle */}
        <div className="flex-1 min-w-50">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
            Car Type
          </label>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update("type", opt.value)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                  filters.type === opt.value
                    ? "bg-[#D72828] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#1A1A1A]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand dropdown */}
        <div className="flex-1 min-w-40">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => update("brand", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A1A] bg-white focus:outline-none focus:ring-2 focus:ring-[#D72828]/30 focus:border-[#D72828] transition-colors"
          >
            <option value="">All Brands</option>
            {BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel type dropdown */}
        <div className="flex-1 min-w-40">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
            Fuel Type
          </label>
          <select
            value={filters.fuelType}
            onChange={(e) => update("fuelType", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A1A] bg-white focus:outline-none focus:ring-2 focus:ring-[#D72828]/30 focus:border-[#D72828] transition-colors"
          >
            <option value="">All Fuel Types</option>
            {FUEL_TYPES.map((ft) => (
              <option key={ft} value={ft}>
                {ft}
              </option>
            ))}
          </select>
        </div>

        {/* Budget dropdown */}
        <div className="flex-1 min-w-40">
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
            Budget
          </label>
          <select
            value={filters.budgetMax ?? ""}
            onChange={(e) =>
              update("budgetMax", e.target.value ? Number(e.target.value) : null)
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1A1A1A] bg-white focus:outline-none focus:ring-2 focus:ring-[#D72828]/30 focus:border-[#D72828] transition-colors"
          >
            <option value="">Any Budget</option>
            {BUDGET_RANGES.filter((r) => isFinite(r.max)).map((range) => (
              <option key={range.max} value={range.max}>
                {range.label}
              </option>
            ))}
            <option value="99999999">Above ₹30 Lakh</option>
          </select>
        </div>

        {/* Reset */}
        {(filters.type !== "all" ||
          filters.brand !== "" ||
          filters.fuelType !== "" ||
          filters.budgetMax !== null) && (
          <button
            onClick={() => {
              setFilters(DEFAULT_FILTERS);
              onFilterChange(DEFAULT_FILTERS);
            }}
            className="text-xs text-[#D72828] hover:underline font-medium self-end pb-2"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}
