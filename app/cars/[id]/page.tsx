import ImageGallery from "@/components/ImageGallery";
import LeadForm from "@/components/LeadForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllCars, getCarById } from "@/lib/cars";
import { formatKm, formatPrice } from "@/lib/types";
import { Check, Fuel, Gauge, Palette, Settings2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const cars = getAllCars();
  return cars.map((car) => ({ id: car.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const car = getCarById(id);

  if (!car) return { title: "Car Not Found — Vahanlok" };

  const title = `${car.brand} ${car.model} (${car.year}) — Vahanlok`;
  const description = `Brand new ${car.model} ${car.year} for ${formatPrice(car.price)}. ${car.fuelType} · ${car.transmission}.`;
  const image = car.images[0] ? encodeURI(car.images[0]) : "/thumbnail.png";
  const pageUrl = `/cars/${car.id}`;

  return {
    title,
    description,
    keywords: [
      car.brand,
      car.model,
      `${car.brand} ${car.model}`,
      `new car in Mumbai`,
      `${car.fuelType} ${car.transmission}`,
      "Vahanlok",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      images: [
        {
          url: image,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { id } = await params;
  const car = getCarById(id);

  if (!car) notFound();

  const carLabel = `${car.brand} ${car.model}`;

  const specs = [
    { label: "Make", value: car.brand },
    { label: "Model", value: car.model },
    { label: "Year", value: String(car.year) },
    {
      label: "Fuel Type",
      value: car.fuelType,
      icon: <Fuel className="h-4 w-4" />,
    },
    {
      label: "Transmission",
      value: car.transmission,
      icon: <Settings2 className="h-4 w-4" />,
    },
    {
      label: "Kilometers",
      value: car.kmDriven !== undefined ? formatKm(car.kmDriven) : "Brand New",
      icon: <Gauge className="h-4 w-4" />,
    },
    { label: "Color", value: car.color, icon: <Palette className="h-4 w-4" /> },
    ...(car.specs.engine ? [{ label: "Engine", value: car.specs.engine }] : []),
    ...(car.specs.seating
      ? [{ label: "Seating", value: `${car.specs.seating} Seats` }]
      : []),
    ...(car.specs.mileage
      ? [{ label: "Mileage", value: car.specs.mileage }]
      : []),
    ...(car.specs.bootSpace
      ? [{ label: "Boot Space", value: car.specs.bootSpace }]
      : []),
  ];

  return (
    <>
      <WhatsAppButton carName={carLabel} />

      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#D72828]">
              Home
            </Link>
            <span>/</span>
            <Link href="/cars" className="hover:text-[#D72828]">
              Cars
            </Link>
            <span>/</span>
            <span className="text-[#1A1A1A] font-medium truncate">
              {carLabel}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left: Image + specs */}
            <div className="lg:col-span-3 space-y-6">
              {/* Title row */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#D72828] text-white">
                    NEW
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {car.year}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  {carLabel}
                </h1>
                <p className="text-2xl font-bold text-[#D72828] mt-2">
                  {formatPrice(car.price, { startingPrice: true })}
                </p>
              </div>

              {/* Image gallery */}
              <ImageGallery images={car.images} carName={carLabel} />

              {/* Car Specs */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-[#1A1A1A] text-lg mb-4">
                  Car Details
                </h2>
                <div className="grid grid-cols-2 gap-y-4">
                  {specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                        {spec.label}
                      </p>
                      <p className="font-medium text-[#1A1A1A] text-sm flex items-center gap-1.5">
                        {"icon" in spec && spec.icon}
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-[#1A1A1A] text-lg mb-4">
                  Key Features
                </h2>
                <ul className="space-y-2">
                  {car.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-gray-600"
                    >
                      <Check className="h-4 w-4 text-[#D72828] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Lead Form (sticky on desktop) */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h2 className="font-bold text-[#1A1A1A] text-lg mb-1">
                    Get the Best Deal
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    Fill in your details and we&apos;ll connect you via WhatsApp
                    instantly.
                  </p>
                  <LeadForm carModel={carLabel} carId={car.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
