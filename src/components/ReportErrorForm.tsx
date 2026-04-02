"use client";

import { useState } from "react";

export function ReportErrorForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/report-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: fd.get("subject"),
          message: fd.get("message"),
          pageUrl: window.location.href,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      setFeedback(data.message || "Report submitted.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again or phone the clinic.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="font-medium text-clinic-ink">Your name (optional)</span>
          <input
            name="name"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-sage/35"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-clinic-ink">Your email (optional)</span>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-sage/35"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-clinic-ink">Short summary *</span>
        <input
          name="subject"
          required
          placeholder="e.g. Button not working on mobile"
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-sage/35"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-clinic-ink">What happened? *</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Describe the problem, what you clicked, and what you expected."
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-sage/35"
        />
      </label>
      {feedback && (
        <p
          className={`text-sm ${status === "success" ? "text-green-700" : "text-red-600"}`}
          role="status"
        >
          {feedback}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-clinic-sage text-white px-8 py-3 text-sm font-semibold hover:bg-clinic-moss disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit report"}
      </button>
    </form>
  );
}
