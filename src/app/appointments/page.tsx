import type { Metadata } from "next";
import { AppointmentForm } from "@/components/AppointmentForm";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "Book an Appointment | Sanjivani Homeopathic Clinic",
  description:
    "Schedule a consultation with Dr. Yogesh M Patil at Sanjivani Homeopathic Clinic. Available from 9 AM to 6 PM on weekdays and 10 AM to 2 PM on Saturdays.",
};

export default function AppointmentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="lg:col-span-2">
          <h1 className="font-serif text-4xl md:text-5xl text-clinic-sage">Book a visit</h1>
          <p className="mt-4 text-clinic-muted leading-relaxed">
            Submit a request with your preferred date and time. We will confirm by phone or email
            within 24 hours. For urgent medical emergencies, please contact emergency services or
            your physician.
          </p>

          <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 md:p-10 shadow-sm">
            <AppointmentForm />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <div className="rounded-xl bg-clinic-sage/5 border border-clinic-sage/20 p-5">
              <h3 className="font-serif text-lg text-clinic-sage mb-3">Booking Info</h3>
              <ul className="text-sm text-clinic-muted space-y-3">
                <li className="flex gap-2">
                  <span className="text-clinic-sage font-bold shrink-0">📅</span>
                  <span>
                    Book <strong>{config.appointments.bookingDaysAhead}+ days</strong> in advance
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-clinic-sage font-bold shrink-0">⏱️</span>
                  <span>Initial: 75–90 minutes; Follow-up: 30–45 minutes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-clinic-sage font-bold shrink-0">📞</span>
                  <span>Confirmation by phone or email</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
              <h3 className="font-serif text-lg text-clinic-sage mb-3">Office Hours</h3>
              <ul className="text-sm text-clinic-muted space-y-2">
                <li>
                  <strong className="text-clinic-ink">Mon–Fri:</strong> {config.clinic.hours.monFri}
                </li>
                <li>
                  <strong className="text-clinic-ink">Saturday:</strong>{" "}
                  {config.clinic.hours.saturday}
                </li>
                <li>
                  <strong className="text-clinic-ink">Sunday:</strong> {config.clinic.hours.sunday}
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-green-50 border border-green-200 p-5">
              <h3 className="font-serif text-lg text-clinic-sage mb-3">Need Help?</h3>
              <p className="text-sm text-clinic-muted mb-3">
                Have questions before booking? We&apos;re here to help.
              </p>
              <a
                href="/contact"
                className="text-sm font-medium text-clinic-sage hover:text-clinic-moss transition-colors"
              >
                Send us a message →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
