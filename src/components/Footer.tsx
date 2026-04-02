import Link from "next/link";
import { config, getFormattedAddress } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-clinic-cream mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold text-clinic-sage">
            {config.clinic.name}
          </p>
          <p className="mt-1 text-sm font-medium text-clinic-ink">{config.clinic.doctorName}</p>
          <p className="mt-2 text-sm text-clinic-muted leading-relaxed max-w-xs">
            Classical homeopathy for the whole family. Evidence-informed, patient-centered care.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-clinic-sage/80">
            Hours
          </p>
          <ul className="mt-3 text-sm text-clinic-muted space-y-1">
            <li>
              <span className="font-medium">Mon–Fri:</span> {config.clinic.hours.monFri}
            </li>
            <li>
              <span className="font-medium">Saturday:</span> {config.clinic.hours.saturday}
            </li>
            <li>
              <span className="font-medium">Sunday:</span> {config.clinic.hours.sunday}
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-clinic-sage/80">
            Contact
          </p>
          <address className="mt-3 text-sm text-clinic-muted not-italic space-y-1">
            <p>
              <a
                href={`tel:${config.clinic.phone.replace(/\D/g, "")}`}
                className="hover:text-clinic-sage transition-colors"
                aria-label={`Call ${config.clinic.name} at ${config.clinic.phone}`}
              >
                {config.clinic.phone}
              </a>
            </p>
            <p>{getFormattedAddress()}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-stone-200/80 py-4 text-center text-xs text-stone-500">
        <span>© {new Date().getFullYear()} {config.clinic.name}. </span>
        <Link
          href="/report-errors"
          className="text-stone-400 hover:text-clinic-muted ml-1"
          aria-label="Report website errors"
        >
          Report errors
        </Link>
        <span className="text-stone-300 mx-1">·</span>
        <Link
          href="/admin"
          className="text-stone-400 hover:text-clinic-muted"
          aria-label="Admin dashboard"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}
