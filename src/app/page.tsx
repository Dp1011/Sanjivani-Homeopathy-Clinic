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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "247",
    },
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      condition: "Chronic Migraines",
      rating: 5,
      text: "Dr. Patil's individualized approach helped me manage my migraines naturally. I've had fewer episodes in 3 months than in the previous year!",
      initials: "PS",
    },
    {
      name: "Rajesh Kumar",
      condition: "Sleep & Anxiety",
      rating: 5,
      text: "Professional, caring, and thorough. The remedies have helped me sleep better and feel more at peace. Highly recommended!",
      initials: "RK",
    },
    {
      name: "Meera Desai",
      condition: "Family Wellness",
      rating: 5,
      text: "We bring our whole family here. Dr. Patil has helped with everything from children's recurring infections to adult stress management.",
      initials: "MD",
    },
  ];

  const trustBadges = [
    { icon: "🎓", label: "MD Homeopathy", description: "Full post-graduate qualification" },
    { icon: "✓", label: "Licensed Practitioner", description: "Registered & certified" },
    { icon: "🔬", label: "Evidence-Based", description: "Classical Hahnemannian principles" },
    { icon: "👥", label: "500+ Patients", description: "Trusted by the community" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section with Calming Gradient */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-clinic-cream via-white to-clinic-sage/10 opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,213,186,0.1),transparent)]"></div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium tracking-wide text-clinic-moss uppercase">
              {config.clinic.name}{" "}
              <span aria-hidden className="normal-case text-lg">
                🍀
              </span>
            </p>
            <p className="mt-3 font-serif text-2xl md:text-4xl font-bold tracking-wide text-clinic-sage drop-shadow-sm">
              {config.clinic.doctorName}
            </p>
            <h1 className="mt-6 font-serif text-xl md:text-3xl font-medium leading-relaxed text-clinic-sage text-balance">
              Offering an elevated healing experience rooted in nature, guided by expertise, and crafted
              with care
            </h1>
            <p className="mt-6 text-lg text-clinic-muted max-w-2xl mx-auto leading-relaxed">
              Individualized remedies, careful case-taking, and follow-up care for acute and chronic
              conditions—supporting energy, sleep, immunity, and overall wellbeing.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center rounded-full bg-clinic-sage text-white px-8 py-3.5 text-sm font-semibold shadow-md hover:bg-clinic-moss hover:shadow-lg transition-all duration-300"
              >
                Schedule a consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border-2 border-clinic-sage/30 text-clinic-sage px-8 py-3.5 text-sm font-semibold hover:bg-clinic-sage/5 hover:border-clinic-sage/60 transition-all duration-300"
              >
                View services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-clinic-sage mb-3">Why Choose Sanjivani?</h2>
          <p className="text-clinic-muted max-w-2xl mx-auto">Trusted by hundreds of families for professional, compassionate care</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="group rounded-2xl border border-clinic-sage/20 bg-gradient-to-br from-white to-clinic-cream/30 p-6 text-center hover:shadow-md hover:border-clinic-sage/40 transition-all duration-300"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{badge.icon}</div>
              <h3 className="font-serif text-lg font-semibold text-clinic-sage mb-1">{badge.label}</h3>
              <p className="text-sm text-clinic-muted">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
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
              className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-clinic-sage/30"
            >
              <h2 className="font-serif text-xl text-clinic-sage">{item.title}</h2>
              <p className="mt-3 text-sm text-clinic-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-clinic-sage mb-3">Patient Stories</h2>
          <p className="text-clinic-muted">Real results from real patients</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group rounded-2xl border border-clinic-sage/20 bg-gradient-to-br from-white to-clinic-cream/20 p-6 shadow-sm hover:shadow-lg hover:border-clinic-sage/40 transition-all duration-300"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-clinic-accent text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm text-clinic-muted leading-relaxed mb-6">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Patient Info */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-clinic-sage to-clinic-moss text-white font-semibold text-sm">
                    {testimonial.initials}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-clinic-ink text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-clinic-muted italic">{testimonial.condition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* First Visit CTA Section */}
      <section className="bg-gradient-to-r from-clinic-sage to-clinic-moss text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl">First visit</h2>
            <p className="mt-3 text-white/90 leading-relaxed">
              Expect a detailed conversation (often 60–90 minutes), after which a remedy plan is
              proposed. Follow-ups are typically every 4–6 weeks at first.
            </p>
            <p className="mt-4 text-sm text-white/80">
              ✓ Comprehensive case history &nbsp;&nbsp; ✓ Personalized remedy &nbsp;&nbsp; ✓ Clear instructions
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex rounded-full bg-white text-clinic-sage px-8 py-3.5 text-sm font-semibold hover:bg-clinic-cream hover:shadow-lg transition-all duration-300"
          >
            Ask a question
          </Link>
        </div>
      </section>
    </>
  );
}
