import type { Metadata } from "next";
import { ReportErrorForm } from "@/components/ReportErrorForm";

export const metadata: Metadata = {
  title: "Report errors",
  description:
    "Report a problem with the Sanjivani Homeopathic Clinic website. Your message is sent to the clinic.",
};

export default function ReportErrorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-clinic-sage">Report errors</h1>
      <p className="mt-4 text-clinic-muted leading-relaxed">
        Something not working on this website? Tell us what you saw. Reports are emailed to the
        doctor when email is configured on the server, and always stored so we can follow up.
      </p>
      <p className="mt-2 text-sm text-clinic-muted">
        For medical questions or appointments, please use{" "}
        <a href="/contact" className="text-clinic-sage underline hover:no-underline">
          Contact
        </a>{" "}
        or{" "}
        <a href="/appointments" className="text-clinic-sage underline hover:no-underline">
          Book a visit
        </a>
        .
      </p>
      <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
        <ReportErrorForm />
      </div>
    </div>
  );
}
