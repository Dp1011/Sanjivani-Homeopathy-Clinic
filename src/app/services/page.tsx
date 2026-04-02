import type { Metadata } from "next";
import { getServicesList } from "@/lib/config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Homeopathic services including initial consultations, follow-up visits, acute care, and family & children treatments.",
};

export default function ServicesPage() {
  const services = getServicesList();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-clinic-sage">Services & Pricing</h1>
      <p className="mt-4 text-clinic-muted max-w-2xl leading-relaxed">
        We offer individualized homeopathic care for the whole family. All consultations begin with
        a thorough case history to ensure the remedy suits your unique needs.
      </p>

      <div className="mt-12 bg-clinic-sage/5 border border-clinic-sage/20 rounded-xl p-6 mb-10">
        <p className="text-sm text-clinic-muted">
          <strong className="text-clinic-ink">Insurance & Policies:</strong> Please contact us
          directly to discuss insurance coverage and payment options available in your area.
        </p>
      </div>

      <ul className="space-y-6">
        {services.map((s) => (
          <li
            key={s.name}
            className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
              <div>
                <h2 className="font-serif text-xl text-clinic-sage">{s.name}</h2>
                {s.duration && (
                  <p className="text-sm text-clinic-accent font-medium mt-1">{s.duration}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-clinic-sage">{s.price}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-clinic-muted leading-relaxed">{s.detail}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-serif text-lg text-clinic-sage mb-3">What to Expect</h3>
        <ul className="space-y-2 text-sm text-clinic-muted">
          <li className="flex gap-3">
            <span className="text-clinic-sage font-bold">•</span>
            <span>Detailed case history and symptom review at your first visit</span>
          </li>
          <li className="flex gap-3">
            <span className="text-clinic-sage font-bold">•</span>
            <span>Personalized remedy selection based on your unique presentation</span>
          </li>
          <li className="flex gap-3">
            <span className="text-clinic-sage font-bold">•</span>
            <span>Clear instructions on remedy use and expected timeline</span>
          </li>
          <li className="flex gap-3">
            <span className="text-clinic-sage font-bold">•</span>
            <span>Regular follow-ups to assess progress and adjust as needed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
