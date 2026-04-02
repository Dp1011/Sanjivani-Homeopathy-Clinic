"use client";

import { useState } from "react";
import { config } from "@/lib/config";
import { CalendarPicker } from "./CalendarPicker";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  slotId?: string;
}

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

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

    if (!fullName || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid name (at least 2 characters)";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone || !/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!selectedDate || !selectedTime || !selectedSlotId) {
      newErrors.preferredDate = "Please select a date and time using the calendar";
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
      const res = await fetch("/api/slots/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: selectedSlotId,
          fullName: fd.get("fullName"),
          email: fd.get("email"),
          phone: fd.get("phone"),
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
        `Your appointment has been confirmed! Confirmation number: ${data.confirmationNumber}`
      );
      form.reset();
      setErrors({});
      setSelectedSlotId(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setShowCalendar(false);
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  function handleDateTimeSelect(date: string, time: string, slotId: string) {
    setSelectedDate(date);
    setSelectedTime(time);
    setSelectedSlotId(slotId);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl" noValidate>
      {!showCalendar ? (
        <>
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <button
              type="button"
              onClick={() => setShowCalendar(true)}
              className="w-full rounded-lg bg-clinic-sage text-white px-4 py-3 text-sm font-semibold hover:bg-clinic-moss transition-colors"
            >
              Select Your Appointment Date & Time
            </button>
            {selectedDate && selectedTime && (
              <p className="mt-3 text-sm text-blue-900">
                Selected: <span className="font-semibold">{selectedDate} at {selectedTime}</span>
              </p>
            )}
            {errors.preferredDate && (
              <p className="mt-2 text-sm text-red-600">{errors.preferredDate}</p>
            )}
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
            disabled={status === "loading" || !selectedSlotId}
            className="rounded-full bg-clinic-sage text-white px-8 py-3 text-sm font-semibold hover:bg-clinic-moss disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            aria-busy={status === "loading"}
          >
            {status === "loading" ? "Confirming…" : "Confirm appointment"}
          </button>
        </>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setShowCalendar(false)}
            className="mb-4 text-sm text-blue-600 hover:text-blue-800"
          >
            ← Back to form
          </button>
          <CalendarPicker
            onDateTimeSelect={handleDateTimeSelect}
            minDaysAhead={config.appointments.bookingDaysAhead}
            maxDaysAhead={config.appointments.maxBookingDays}
          />
          {selectedDate && selectedTime && (
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowCalendar(false)}
                className="flex-1 rounded-lg bg-clinic-sage text-white px-4 py-3 text-sm font-semibold hover:bg-clinic-moss transition-colors"
              >
                Continue with {selectedDate} at {selectedTime}
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
