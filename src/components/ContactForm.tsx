"use client";

import { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validateForm(fd: FormData): FormErrors {
    const newErrors: FormErrors = {};
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const subject = fd.get("subject") as string;
    const messageText = fd.get("message") as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = "Please enter a valid name";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!subject || subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!messageText || messageText.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const newErrors = validateForm(fd);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("error");
      setMessage("Please fix the errors below");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          subject: fd.get("subject"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(
        data.message || "Thank you for your message! We'll respond within two business days."
      );
      form.reset();
      setErrors({});
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="font-medium text-clinic-ink">
            Name <span className="text-red-500" aria-label="required">*</span>
          </span>
          <input
            name="name"
            type="text"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-red-300 focus:ring-red-200"
                : "border-stone-300 focus:ring-clinic-sage/35"
            }`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </label>
        <label className="block text-sm">
          <span className="font-medium text-clinic-ink">
            Email <span className="text-red-500" aria-label="required">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? "border-red-300 focus:ring-red-200"
                : "border-stone-300 focus:ring-clinic-sage/35"
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-clinic-ink">Phone (optional)</span>
        <input
          name="phone"
          type="tel"
          placeholder="10-digit number"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.phone
              ? "border-red-300 focus:ring-red-200"
              : "border-stone-300 focus:ring-clinic-sage/35"
          }`}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600">
            {errors.phone}
          </p>
        )}
      </label>
      <label className="block text-sm">
        <span className="font-medium text-clinic-ink">
          Subject <span className="text-red-500" aria-label="required">*</span>
        </span>
        <input
          name="subject"
          type="text"
          required
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.subject
              ? "border-red-300 focus:ring-red-200"
              : "border-stone-300 focus:ring-clinic-sage/35"
          }`}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-600">
            {errors.subject}
          </p>
        )}
      </label>
      <label className="block text-sm">
        <span className="font-medium text-clinic-ink">
          Message <span className="text-red-500" aria-label="required">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.message
              ? "border-red-300 focus:ring-red-200"
              : "border-stone-300 focus:ring-clinic-sage/35"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </label>
      {message && (
        <p
          className={`text-sm p-3 rounded-lg ${
            status === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-clinic-sage text-white px-8 py-3 text-sm font-semibold hover:bg-clinic-moss disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        aria-busy={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
