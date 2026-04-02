import Link from "next/link";
import { config, getFormattedAddress } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanjivani Homeopathic Clinic | Classical Homeopathy in Nandurbar",
  description:
    "Classical homeopathy for the whole family. Dr. Yogesh M Patil (MD) offers individualized remedies and careful case-taking for acute and chronic conditions in Nandurbar, Maharashtra.",
  keywords: "homeopathy, homeopathic clinic, Dr. Yogesh Patil, Nandurbar, natural remedies",
  openGraph: {
    title: "Sanjivani Homeopathic Clinic",
    description:
      "Individualized homeopathic care for the whole family. Classical homeopathy in Nandurbar.",
    type: "website",
    locale: "en_IN",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.clinic.name,
    description:
      "Classical homeopathy practice offering individualized remedies and case-taking for acute and chronic conditions.",
    image: "/logo.png",
    telephone: config.clinic.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.clinic.address.street,
      addressLocality: config.clinic.address.city,
      addressRegion: config.clinic.address.state,
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    priceRange: "₹₹",
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative overflow-hidden bg-white/25">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <p className="text-sm font-medium tracking-wide text-clinic-moss uppercase">
            {config.clinic.name}{" "}
            <span aria-hidden className="normal-case text-lg">
              🍀
            </span>
          </p>
          <p className="mt-3 font-serif text-xl font-bold tracking-wide text-clinic-sage sm:text-2xl md:text-3xl drop-shadow-sm">
            {config.clinic.doctorName}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-xl font-medium italic leading-relaxed text-clinic-sage sm:text-2xl md:text-3xl text-balance">
            Offering an elevated healing experience rooted in nature, guided by expertise, and crafted
            with care
          </h1>
          <p className="mt-6 text-lg text-clinic-muted max-w-2xl leading-relaxed">
            Individualized remedies, careful case-taking, and follow-up care for acute and chronic
            conditions—supporting energy, sleep, immunity, and overall wellbeing.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center rounded-full bg-clinic-sage text-white px-8 py-3.5 text-sm font-semibold shadow-md hover:bg-clinic-moss transition-colors"
            >
              Schedule a consultation
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border-2 border-clinic-sage/30 text-clinic-sage px-8 py-3.5 text-sm font-semibold hover:bg-clinic-sage/5 transition-colors"
            >
              View services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {[
            {
              title: "Whole-person care",
              text: "We consider physical symptoms alongside sleep, stress, and lifestyle—because you are more than a diagnosis.",
            },
            {
              title: "Safe & gentle",
              text: "Remedies are selected to match your unique picture, with minimal intervention and attention to long-term balance.",
            },
            {
              title: "Clear follow-up",
              text: "Structured reviews so we can adjust potency and track progress with honesty and care.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="font-serif text-xl text-clinic-sage">{item.title}</h2>
              <p className="mt-3 text-sm text-clinic-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-clinic-sage text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl">First visit</h2>
            <p className="mt-3 text-white/85 leading-relaxed">
              Expect a detailed conversation (often 60–90 minutes), after which a remedy plan is
              proposed. Follow-ups are typically every 4–6 weeks at first.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex rounded-full bg-white text-clinic-sage px-8 py-3.5 text-sm font-semibold hover:bg-clinic-cream transition-colors"
          >
            Ask a question
          </Link>
        </div>
      </section>
    </>
  );
}
