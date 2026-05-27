"use client";

import Link from "next/link";
import { ArrowRight, Shield, Award, Users, Car } from "lucide-react";
import { getAllCars } from "@/lib/cars";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/config";

export default function HomePage() {
  const allCars = getAllCars();
  const featuredCars = allCars.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-linear-to-br from-[#1A1A1A] to-[#2d2d2d] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D72828] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#D72828] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#D72828]/20 text-[#ff6b6b] text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              Mumbai&apos;s Trusted Car Dealership
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Perfect Car —{" "}
              <span className="text-[#D72828]">New or Pre-Owned</span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-xl leading-relaxed">
              Discover the best deals on your next vehicle with ease. We connect
              you directly with our team through WhatsApp, allowing you to get
              instant quotes, expert guidance, and a smooth, hassle-free buying
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/cars">
                  Browse All Cars
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const url = buildWhatsAppUrl(
                    "Hi Vahanlok! I'm interested in buying a car",
                  );

                  window.open(url, "_blank");
                }}
              >
                Get Best Deal on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Car Type CTA Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/cars?type=new"
            className="group flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover:border-[#D72828]/30"
          >
            <div>
              <span className="inline-block bg-[#D72828]/10 text-[#D72828] text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                {allCars.length} Cars Available
              </span>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">
                New Cars
              </h2>
              <p className="text-gray-500 text-sm">
                Latest models with full warranty
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#D72828] font-medium text-sm group-hover:gap-3 transition-all">
              Explore
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>

          <Link
            href="/cars?type=pre-owned"
            className="group flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover:border-gray-300"
          >
            <div>
              <span className="inline-block bg-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                CUSTOM REQUEST
              </span>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">
                Looking for a Specific Car?
              </h2>
              <p className="text-gray-600 text-sm">
                Tell us your requirement and we&apos;ll find it for you
              </p>
            </div>
            <div className="flex items-center gap-2 font-medium text-sm group-hover:gap-3 transition-all">
              Submit
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Car className="h-6 w-6 text-[#D72828]" />,
              value: `${allCars.length}+`,
              label: "Cars in Stock",
            },
            {
              icon: <Users className="h-6 w-6 text-[#D72828]" />,
              value: "1,200+",
              label: "Happy Customers",
            },
            {
              icon: <Award className="h-6 w-6 text-[#D72828]" />,
              value: "8+",
              label: "Years in Business",
            },
            {
              icon: <Shield className="h-6 w-6 text-[#D72828]" />,
              value: "100%",
              label: "Verified Listings",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <p className="text-3xl font-bold text-[#1A1A1A] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Featured Cars
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Hand-picked deals just for you
            </p>
          </div>
          <Link
            href="/cars"
            className="text-[#D72828] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 border-2 border-[#D72828] text-[#D72828] hover:bg-[#D72828] hover:text-white font-semibold px-8 py-3 rounded-xl transition-all"
          >
            See All {allCars.length} Cars <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] text-center mb-12">
            Why Buy From Vahanlok?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Transparent Pricing",
                desc: "No hidden charges. The price you see is what you pay. We also help you beat dealer quotes.",
                emoji: "💯",
              },
              {
                title: "Instant WhatsApp Support",
                desc: "Our sales team responds within minutes on WhatsApp. Get quotes, schedule test drives, and close deals fast.",
                emoji: "⚡",
              },
              {
                title: "Verified Inventory",
                desc: "Every pre-owned car is thoroughly inspected. All documents are clear and ready for RC transfer.",
                emoji: "✅",
              },
            ].map((item) => (
              <div key={item.title} className="text-center px-4">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
