import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-[#10345E]">vahan</span>
            <span className="text-[#D72828]">lok</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-[#1A1A1A] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="text-sm font-medium text-gray-600 hover:text-[#1A1A1A] transition-colors"
            >
              Cars
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/cars"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[#D72828] text-white text-sm font-semibold hover:bg-[#b82020] transition-colors"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    </header>
  );
}
