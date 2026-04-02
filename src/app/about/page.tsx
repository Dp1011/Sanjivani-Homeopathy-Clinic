import type { Metadata } from "next";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Dr. Yogesh M Patil | Sanjivani Homeopathic Clinic",
  description:
    "Learn about Dr. Yogesh M Patil (MD Homeopathy) and the classical homeopathic approach at Sanjivani Clinic. Dedicated to individualized, patient-centered care.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-clinic-sage">About Sanjivani</h1>
      <p className="mt-2 text-lg font-medium text-clinic-ink">{config.clinic.doctorName}</p>

      <div className="mt-10 space-y-6">
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
          <p className="text-clinic-muted leading-relaxed">
            Training follows classical Hahnemannian principles alongside ongoing study in materia
            medica and repertory. We believe in:
          </p>
          <ul className="mt-4 space-y-2 text-clinic-muted">
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold shrink-0">•</span>
              <span>Detailed case-taking to understand the full picture of your health</span>
            </li>
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold shrink-0">•</span>
              <span>Individualized remedy selection based on your unique constitution</span>
            </li>
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold shrink-0">•</span>
              <span>
                Transparency and collaboration with your other healthcare providers when appropriate
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold shrink-0">•</span>
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

        <section>
          <h2 className="font-serif text-2xl text-clinic-sage mb-3">Qualifications & Experience</h2>
          <ul className="space-y-3 text-clinic-muted">
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold">✓</span>
              <span>
                <strong className="text-clinic-ink">MD Homeopathy</strong> — Full post-graduate
                qualification
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold">✓</span>
              <span>
                <strong className="text-clinic-ink">Continuing education</strong> — Regular training
                in chronic case management and advanced repertorization
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-clinic-sage font-bold">✓</span>
              <span>
                <strong className="text-clinic-ink">Professional commitment</strong> — Ongoing
                engagement with classical homeopathic literature and best practices
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-clinic-sage/5 border border-clinic-sage/20 rounded-lg p-6 mt-8">
          <h3 className="font-serif text-lg text-clinic-sage mb-2">Why Classical Homeopathy?</h3>
          <p className="text-sm text-clinic-muted leading-relaxed">
            Classical homeopathy focuses on finding one remedy that covers your complete symptom
            picture rather than treating individual symptoms separately. This approach often leads
            to deeper healing and fewer side effects, making it suitable for patients of all ages.
          </p>
        </section>
      </div>
    </div>
  );
}
