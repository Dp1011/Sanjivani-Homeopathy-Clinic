"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/appointments", label: "Book visit" },
  { href: "/report-errors", label: "Report errors" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-stone-200/80 bg-clinic-cream/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16 md:h-[4.25rem]">
        <Link
          href="/"
          className="font-serif text-xl md:text-2xl font-semibold text-clinic-sage tracking-tight"
          aria-label="Sanjivani Homeopathic Clinic Home"
        >
          Sanjivani<span className="text-clinic-moss font-normal"> Homeopathic Clinic</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-clinic-muted">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-clinic-sage transition-colors"
              aria-label={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/appointments"
            className="rounded-full bg-clinic-sage text-white text-sm font-medium px-4 py-2 md:px-5 hover:bg-clinic-moss transition-colors shadow-sm"
            aria-label="Book an appointment"
          >
            Book
          </Link>
          <button
            className="md:hidden p-2 hover:bg-clinic-sage/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 text-clinic-sage"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden flex flex-col gap-1 px-4 pb-4 border-t border-stone-100/80 bg-white/50"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2.5 px-3 text-sm font-medium text-clinic-muted hover:text-clinic-sage hover:bg-clinic-sage/5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
