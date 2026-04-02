"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  Appointment,
  ContactMessage,
  ErrorReport,
  PatientRecord,
} from "@prisma/client";
import { createPatientRecord } from "@/app/admin/actions";

type Props = {
  loggedIn: boolean;
  appointments?: Appointment[];
  messages?: ContactMessage[];
  patients?: PatientRecord[];
  errorReports?: ErrorReport[];
};

export function AdminClient({
  loggedIn,
  appointments = [],
  messages = [],
  patients = [],
  errorReports = [],
}: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientMsg, setPatientMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setLoginError(data.error || "Login failed.");
        return;
      }
      setPassword("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function updateAppointmentStatus(id: string, status: string) {
    const res = await fetch(`/api/admin/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) router.refresh();
  }

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="font-serif text-3xl text-clinic-sage text-center">Admin login</h1>
        <p className="text-sm text-clinic-muted text-center mt-2">
          Enter the admin password to manage appointments, messages, and error reports.
        </p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-clinic-ink">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-clinic-sage/40"
              autoComplete="current-password"
              required
            />
          </label>
          {loginError && (
            <p className="text-sm text-red-600" role="alert">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-clinic-sage text-white py-2.5 text-sm font-medium hover:bg-clinic-moss disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-clinic-sage">Dashboard</h1>
          <p className="text-sm text-clinic-muted mt-1">
            Appointments, messages, website error reports, and patient records
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="self-start rounded-full border border-stone-300 px-4 py-2 text-sm hover:bg-stone-100"
        >
          Log out
        </button>
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-xl text-clinic-sage border-b border-stone-200 pb-2">
          Appointment requests
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-clinic-cream/80 text-left text-xs uppercase tracking-wide text-clinic-muted">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Preferred</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-clinic-muted">
                    No appointments yet.
                  </td>
                </tr>
              )}
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-stone-50/80">
                  <td className="px-4 py-3 whitespace-nowrap text-clinic-muted">
                    {new Date(a.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-clinic-ink">{a.fullName}</div>
                    {a.reason && (
                      <div className="text-xs text-clinic-muted mt-0.5 max-w-xs truncate" title={a.reason}>
                        {a.reason}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-clinic-muted">
                    <div>{a.email}</div>
                    <div>{a.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(a.preferredDate).toLocaleDateString()} · {a.preferredTime}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) => updateAppointmentStatus(a.id, e.target.value)}
                      className="rounded-lg border border-stone-300 px-2 py-1 text-xs bg-white"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-xl text-clinic-sage border-b border-stone-200 pb-2">
          Contact messages
        </h2>
        <ul className="mt-4 space-y-3">
          {messages.length === 0 && (
            <li className="text-clinic-muted text-sm">No messages yet.</li>
          )}
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-xl border p-4 ${m.read ? "border-stone-200 bg-white" : "border-clinic-accent/40 bg-amber-50/30"}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium">{m.subject}</span>
                <span className="text-xs text-clinic-muted">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-clinic-muted mt-1">
                {m.name} · {m.email}
                {m.phone && ` · ${m.phone}`}
              </p>
              <p className="text-sm mt-2 whitespace-pre-wrap">{m.message}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-xl text-clinic-sage border-b border-stone-200 pb-2">
          Website error reports
        </h2>
        <ul className="mt-4 space-y-3">
          {errorReports.length === 0 && (
            <li className="text-clinic-muted text-sm">No error reports yet.</li>
          )}
          {errorReports.map((r) => (
            <li
              key={r.id}
              className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium">{r.subject}</span>
                <span className="text-xs text-clinic-muted">
                  {new Date(r.createdAt).toLocaleString()}
                  {r.emailSent ? (
                    <span className="ml-2 text-green-700">Emailed</span>
                  ) : (
                    <span className="ml-2 text-amber-700">Email pending / not sent</span>
                  )}
                </span>
              </div>
              <p className="text-sm text-clinic-muted mt-1">
                {[r.name, r.email].filter(Boolean).join(" · ") || "Anonymous"}
                {r.pageUrl && (
                  <>
                    <br />
                    <span className="text-xs break-all">{r.pageUrl}</span>
                  </>
                )}
              </p>
              <p className="text-sm mt-2 whitespace-pre-wrap">{r.message}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-xl text-clinic-sage border-b border-stone-200 pb-2">
          Patient records
        </h2>
        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              setPatientMsg("");
              const formData = new FormData(form);
              const result = await createPatientRecord(formData);
              if (result?.error) setPatientMsg(result.error);
              else {
                setPatientMsg("Record saved.");
                form.reset();
                router.refresh();
              }
            }}
            className="rounded-xl border border-stone-200 bg-clinic-cream/50 p-5 space-y-3"
          >
            <p className="text-sm font-medium text-clinic-sage">Add record</p>
            <label className="block text-sm">
              Full name
              <input
                name="fullName"
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              Phone
              <input
                name="phone"
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              Email (optional)
              <input name="email" type="email" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Notes (optional)
              <textarea
                name="notes"
                rows={3}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            {patientMsg && <p className="text-sm text-clinic-muted">{patientMsg}</p>}
            <button
              type="submit"
              className="rounded-full bg-clinic-sage text-white px-5 py-2 text-sm font-medium hover:bg-clinic-moss"
            >
              Save record
            </button>
          </form>

          <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-clinic-cream/80 text-left text-xs uppercase text-clinic-muted">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {patients.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-3 py-6 text-center text-clinic-muted">
                      No patient records yet.
                    </td>
                  </tr>
                )}
                {patients.map((p) => (
                  <tr key={p.id}>
                    <td className="px-3 py-2 font-medium">{p.fullName}</td>
                    <td className="px-3 py-2 text-clinic-muted">{p.phone}</td>
                    <td className="px-3 py-2 text-clinic-muted text-xs max-w-[200px] truncate" title={p.notes || ""}>
                      {p.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
