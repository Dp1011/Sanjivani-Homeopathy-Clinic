import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { config, getFormattedAddress } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-clinic-sage">Contact</h1>
          <p className="mt-4 text-clinic-muted leading-relaxed">
            Questions about whether homeopathy might suit you? Send a message—we typically respond
            within two business days.
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-clinic-sage/80 mb-3">
                Clinic Information
              </p>
              <div className="space-y-2 text-sm text-clinic-muted">
                <p>
                  <strong className="text-clinic-ink">{config.clinic.name}</strong>
                </p>
                <p className="text-clinic-ink font-medium">{config.clinic.doctorName}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-clinic-sage/80 mb-3">
                Office Hours
              </p>
              <ul className="text-sm text-clinic-muted space-y-1">
                <li>
                  <strong className="text-clinic-ink">Mon–Fri:</strong> {config.clinic.hours.monFri}
                </li>
                <li>
                  <strong className="text-clinic-ink">Saturday:</strong> {config.clinic.hours.saturday}
                </li>
                <li>
                  <strong className="text-clinic-ink">Sunday:</strong> {config.clinic.hours.sunday}
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-clinic-sage/80 mb-3">
                Contact Details
              </p>
              <address className="text-sm text-clinic-muted not-italic space-y-2">
                <p>
                  <a
                    href={`tel:${config.clinic.phone.replace(/\D/g, "")}`}
                    className="text-clinic-sage hover:underline font-medium"
                    aria-label={`Call clinic at ${config.clinic.phone}`}
                  >
                    {config.clinic.phone}
                  </a>
                </p>
                <p>{getFormattedAddress()}</p>
              </address>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
