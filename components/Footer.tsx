import Link from "next/link";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { BUSINESS, buildDefaultWhatsAppUrl } from "@/lib/config";

export default function Footer() {
  const whatsappUrl = buildDefaultWhatsAppUrl();

  return (
    <footer id="contact" className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <p className="mb-4">
              <span className="text-xl font-bold text-white">vahan</span>
              <span className="text-xl font-bold text-[#D72828]">lok</span>
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for buying new and pre-owned cars in Mumbai.
              We offer the best deals, transparent pricing, and personalised
              service — so you drive away happy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cars?type=new"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  New Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/cars?type=pre-owned"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Pre-Owned Cars
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#D72828] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">Mumbai, MH, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#D72828] shrink-0" />
                <div className="flex flex-col gap-1">
                  {BUSINESS.phone.map((phone, index) => (
                    <a
                      href={`tel:${phone}`}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                      key={index + phone}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#25D366] text-sm transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Vahanlok. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
