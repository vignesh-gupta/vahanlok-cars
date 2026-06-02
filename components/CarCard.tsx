import type { Car } from "@/lib/types";
import { formatPrice } from "@/lib/types";
import { Fuel } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const mainImage = car.images[0] ?? "/cars/placeholder.jpg";

  return (
    <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Image */}
      <Link
        href={`/cars/${car.id}`}
        className="block relative aspect-video overflow-hidden bg-gray-50"
      >
        <CldImage
          src={mainImage}
          alt={`${car.brand} ${car.model}`}
          fill
          quality="auto"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Name & year */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/cars/${car.id}`}>
            <h3 className="font-semibold text-[#1A1A1A] text-base leading-tight hover:text-[#D72828] transition-colors">
              {car.brand} {car.model}
            </h3>
          </Link>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 my-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            {car.fuelType}
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-[#D72828] mb-4">
          {formatPrice(car.price, { startingPrice: true })}
        </p>

        {/* CTA */}
        <Link
          href={`/cars/${car.id}`}
          className="block w-full text-center bg-[#D72828] hover:bg-[#b82020] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
        >
          Get Best Deal
        </Link>
      </div>
    </div>
  );
}
