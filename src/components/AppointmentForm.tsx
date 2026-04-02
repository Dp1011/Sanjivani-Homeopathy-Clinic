"use client";

import { useState } from "react";
import { config } from "@/lib/config";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function getMinDate() {
    const date = new Date();
    date.setDate(date.getDate() + config.appointments.bookingDaysAhead);
    return date.toISOString().split("T")[0];
  }

  function getMaxDate() {
    const date = new Date();
    date.setDate(date.getDate() + config.appointments.maxBookingDays);
    return date.toISOString().split("T")[0];
  }

  function validateForm(fd: FormData): FormErrors {
    const newErrors: FormErrors = {};
    const fullName = fd.get("fullName") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const preferredDate = fd.get("preferredDate") as string;
    const preferredTime = fd.get("preferredTime") as string;

    if (!fullName || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid name (at least 2 characters)";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone || !/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!preferredDate) {
      newErrors.preferredDate = "Please select a date";
    } else {
      const selected = new Date(preferredDate);
      const minDate = new Date(getMinDate());
      const maxDate = new Date(getMaxDate());

      if (selected < minDate) {
        newErrors.preferredDate = `Please select a date at least ${config.appointments.bookingDaysAhead} days ahead`;
      } else if (selected > maxDate) {
        newErrors.preferredDate = `Please select a date within ${config.appointments.maxBookingDays} days`;
      }
    }

    if (!preferredTime) {
      newErrors.preferredTime = "Please select a time slot";
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
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fd.get("fullName"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          preferredDate: fd.get("preferredDate"),
          preferredTime: fd.get("preferredTime"),
          reason: fd.get("reason"),
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
        data.message ||
          "Your appointment request has been sent! We'll confirm within 24 hours."
      );
      form.reset();
      setErrors({});
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-xl" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="font-medium text-clinic-ink">
            Full name <span className="text-red-500" aria-label="required">*</span>
          </span>
          <input
            name="fullName"
            type="text"
            required
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.fullName
                ? "border-red-300 focus:ring-red-200"
                : "border-stone-300 focus:ring-clinic-sage/35"
            }`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1 text-sm text-red-600">
              {errors.fullName}
            </p>
          )}
        </label>
        <label className="block text-sm">
          <span className="font-medium text-clinic-ink">
            Phone <span className="text-red-500" aria-label="required">*</span>
          </span>
          <input
            name="phone"
            type="tel"
            required
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
      </div>

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

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="font-medium text-clinic-ink">
            Preferred date <span className="text-red-500" aria-label="required">*</span>
          </span>
          <input
            name="preferredDate"
            type="date"
            required
            min={getMinDate()}
            max={getMaxDate()}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
            className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.preferredDate
                ? "border-red-300 focus:ring-red-200"
                : "border-stone-300 focus:ring-clinic-sage/35"
            }`}
          />
          {errors.preferredDate && (
            <p id="preferredDate-error" className="mt-1 text-sm text-red-600">
              {errors.preferredDate}
            </p>
          )}
        </label>
        <label className="block text-sm">
          <span className="font-medium text-clinic-ink">
            Preferred time <span className="text-red-500" aria-label="required">*</span>
          </span>
          <select
            name="preferredTime"
            required
            aria-invalid={!!errors.preferredTime}
            aria-describedby={errors.preferredTime ? "preferredTime-error" : undefined}
            className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all bg-white ${
              errors.preferredTime
                ? "border-red-300 focus:ring-red-200"
                : "border-stone-300 focus:ring-clinic-sage/35"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select a slot
            </option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p id="preferredTime-error" className="mt-1 text-sm text-red-600">
              {errors.preferredTime}
            </p>
          )}
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-clinic-ink">Reason for visit (optional)</span>
        <textarea
          name="reason"
          rows={4}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-sage/35 transition-all"
          placeholder="Brief description of your main concern"
        />
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
        {status === "loading" ? "Sending…" : "Request appointment"}
      </button>
    </form>
  );
}
