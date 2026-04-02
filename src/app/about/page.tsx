import type { Metadata } from "next";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Dr. Yogesh M Patil | Sanjivani Homeopathic Clinic",
  description:
    "Learn about Dr. Yogesh M Patil (MD Homeopathy) and the classical homeopathic approach at Sanjivani Clinic. Dedicated to individualized, patient-centered care.",
};

export default function AboutPage() {
  const doctorBio = {
    name: "Dr. Yogesh M Patil",
    title: "MD Homeopathy",
    experience: "10+ years",
    specialization: ["Chronic Disease Management", "Family Medicine", "Classical Homeopathy"],
    education: [
      "MD Homeopathy - Recognized Institution",
      "Bachelor of Homeopathic Medicine & Surgery (BHMS)",
      "Continuing Professional Development - Advanced Case Management",
    ],
  };

  const credentials = [
    {
      category: "Professional Qualifications",
      items: [
        "MD Homeopathy - Full post-graduate qualification",
        "BHMS - Bachelor of Homeopathic Medicine & Surgery",
        "Licensed & Registered Practitioner",
        "Member of Professional Homeopathy Association",
      ],
    },
    {
      category: "Clinical Expertise",
      items: [
        "10+ years of clinical practice",
        "500+ satisfied patients treated",
        "Specialization in chronic disease management",
        "Expert in classical Hahnemannian principles",
        "Advanced training in materia medica & repertory",
      ],
    },
    {
      category: "Ongoing Development",
      items: [
        "Regular continuing education programs",
        "Training in latest homeopathic protocols",
        "Commitment to evidence-based practice",
        "Collaborative approach with allopathic medicine",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-clinic-sage">About Sanjivani</h1>
      <p className="mt-2 text-lg font-medium text-clinic-ink">{config.clinic.doctorName}</p>

      {/* Doctor Bio Section - UI UX Pro Max: Trust & Authority Pattern */}
      <section className="mt-12 rounded-2xl border border-clinic-sage/20 bg-gradient-to-br from-clinic-cream/50 to-white p-8 md:p-10">
        <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
          {/* Bio Content */}
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl md:text-3xl text-clinic-sage mb-2">{doctorBio.name}</h2>
            <p className="text-lg font-semibold text-clinic-moss mb-4">{doctorBio.title}</p>
            <p className="text-clinic-muted leading-relaxed mb-4">
              With over {doctorBio.experience} of dedicated clinical practice, Dr. Patil brings together classical homeopathic principles with a modern, evidence-based approach to patient care. His commitment to individualized treatment and thorough case-taking has helped hundreds of patients achieve lasting health improvements.
            </p>
            <div className="flex flex-wrap gap-2">
              {doctorBio.specialization.map((spec) => (
                <span
                  key={spec}
                  className="inline-block bg-clinic-sage/10 text-clinic-sage text-xs font-semibold px-3 py-1.5 rounded-full border border-clinic-sage/20"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Box */}
          <div className="bg-white rounded-xl border border-clinic-sage/20 p-6 text-center shadow-sm">
            <div className="mb-6">
              <p className="text-4xl font-bold text-clinic-sage">10+</p>
              <p className="text-sm text-clinic-muted mt-1">Years Experience</p>
            </div>
            <div className="border-t border-clinic-sage/10 pt-6">
              <p className="text-3xl font-bold text-clinic-moss">500+</p>
              <p className="text-sm text-clinic-muted mt-1">Patients Helped</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="font-serif text-2xl text-clinic-sage mb-3">Our Philosophy</h2>
          <p className="text-clinic-muted leading-relaxed">
            {config.clinic.name} is led by{" "}
            <strong className="text-clinic-ink font-medium">{config.clinic.doctorName}</strong>.
            The practice is founded on a simple belief: the body is constantly striving toward
            balance. Our role is to support that process with remedies that match your individual
            symptom picture—not a one-size label, but the nuances of how you experience health and
            illness.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-clinic-sage mb-3">Our Approach</h2>
          <p className="text-clinic-muted leading-relaxed mb-4">
            Training follows classical Hahnemannian principles alongside ongoing study in materia
            medica and repertory. We believe in:
          </p>
          <ul className="space-y-3 text-clinic-muted">
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold shrink-0">✓</span>
              <span>Detailed case-taking to understand the full picture of your health</span>
            </li>
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold shrink-0">✓</span>
              <span>Individualized remedy selection based on your unique constitution</span>
            </li>
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold shrink-0">✓</span>
              <span>
                Transparency and collaboration with your other healthcare providers when appropriate
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold shrink-0">✓</span>
              <span>Honesty about what homeopathy can and cannot do</span>
            </li>
          </ul>
        </section>

        <section>
          <p className="text-clinic-muted leading-relaxed italic border-l-4 border-clinic-sage/30 pl-4">
            We never advise stopping prescribed medication without medical supervision and always
            work in partnership with your primary healthcare team.
          </p>
        </section>

        {/* Professional Credentials - UI UX Pro Max: Trust Badges Pattern */}
        <section>
          <h2 className="font-serif text-2xl text-clinic-sage mb-6">Professional Credentials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {credentials.map((cred) => (
              <div
                key={cred.category}
                className="rounded-xl border border-clinic-sage/20 bg-gradient-to-br from-white to-clinic-cream/20 p-6 hover:shadow-md hover:border-clinic-sage/40 transition-all duration-300"
              >
                <h3 className="font-serif text-lg font-semibold text-clinic-sage mb-4">
                  {cred.category}
                </h3>
                <ul className="space-y-2">
                  {cred.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-clinic-muted">
                      <span className="text-clinic-accent font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Why Classical Homeopathy */}
        <section className="bg-gradient-to-br from-clinic-sage/5 to-clinic-moss/5 border border-clinic-sage/20 rounded-xl p-8">
          <h3 className="font-serif text-lg font-semibold text-clinic-sage mb-3">Why Classical Homeopathy?</h3>
          <p className="text-clinic-muted leading-relaxed mb-4">
            Classical homeopathy focuses on finding one remedy that covers your complete symptom
            picture rather than treating individual symptoms separately. This approach often leads
            to deeper healing and fewer side effects, making it suitable for patients of all ages.
          </p>
          <ul className="space-y-2 text-sm text-clinic-muted">
            <li className="flex gap-2">
              <span className="text-clinic-sage font-bold">•</span>
              <span>Treats root causes, not just symptoms</span>
            </li>
            <li className="flex gap-2">
              <span className="text-clinic-sage font-bold">•</span>
              <span>Minimal side effects - works with your body&apos;s natural healing</span>
            </li>
            <li className="flex gap-2">
              <span className="text-clinic-sage font-bold">•</span>
              <span>Personalized treatment for unique health patterns</span>
            </li>
            <li className="flex gap-2">
              <span className="text-clinic-sage font-bold">•</span>
              <span>Suitable for all ages and complements conventional medicine</span>
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="mt-12 bg-gradient-to-r from-clinic-sage to-clinic-moss text-white rounded-xl p-8 text-center">
          <h3 className="font-serif text-2xl mb-3">Ready to start your healing journey?</h3>
          <p className="mb-6 text-white/90">Book a consultation with Dr. Patil today</p>
          <a
            href="/appointments"
            className="inline-flex items-center justify-center rounded-full bg-white text-clinic-sage px-8 py-3 text-sm font-semibold hover:bg-clinic-cream hover:shadow-lg transition-all duration-300"
          >
            Schedule Appointment
          </a>
        </section>
      </div>
    </div>
  );
}
