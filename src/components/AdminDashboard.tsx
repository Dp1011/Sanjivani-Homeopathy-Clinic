"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Check, X, Plus } from "lucide-react";

interface Slot {
  id: string;
  time: string;
  isBooked: boolean;
  appointmentId: string | null;
}

interface AvailabilityDay {
  id: string;
  date: string;
  dayOfWeek: number;
  isWorking: boolean;
  slots: Slot[];
}

interface AdminDashboardProps {
  authToken?: string;
}

export function AdminDashboard({ authToken }: AdminDashboardProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availabilities, setAvailabilities] = useState<AvailabilityDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(18);

  useEffect(() => {
    fetchAvailabilities();
  }, [currentMonth]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchAvailabilities() {
    try {
      setLoading(true);
      setError(null);

      const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      const startStr = firstDay.toISOString().split("T")[0];
      const endStr = lastDay.toISOString().split("T")[0];

      const response = await fetch(
        `/api/admin/availability?startDate=${startStr}&endDate=${endStr}`,
        {
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch availabilities");
      }

      const data = await response.json();
      setAvailabilities(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching availabilities:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateAvailability(date: string, isWorking: boolean) {
    try {
      setError(null);

      const response = await fetch("/api/admin/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify({
          date,
          isWorking,
          startHour: isWorking ? startHour : undefined,
          endHour: isWorking ? endHour : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update availability");
      }

      await fetchAvailabilities();
      setEditingMode(false);
      setSelectedDate(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days: (number | null)[] = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const today = new Date();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Doctor Availability Management</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
                  }
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
                  }
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="aspect-square" />;
                }

                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const dateStr = date.toISOString().split("T")[0];
                const availability = availabilities.find((a) => a.date === dateStr);
                const isSelected = selectedDate === dateStr;
                const bookingStats = availability
                  ? {
                      total: availability.slots.length,
                      booked: availability.slots.filter((s) => s.isBooked).length,
                    }
                  : { total: 0, booked: 0 };

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={`
                      aspect-square rounded-lg text-sm p-1 flex flex-col items-center justify-center
                      ${isSelected ? "ring-2 ring-blue-600" : ""}
                      ${availability?.isWorking
                        ? "bg-green-50 hover:bg-green-100"
                        : "bg-gray-100 hover:bg-gray-200"
                      }
                      ${date < today ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    `}
                    disabled={date < today}
                  >
                    <span className="font-medium text-gray-900">{day}</span>
                    {availability && availability.slots.length > 0 && (
                      <span className="text-xs text-gray-600 mt-0.5">
                        {bookingStats.booked}/{bookingStats.total}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="bg-gray-50 rounded-lg p-6">
          {selectedDate ? (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {new Date(selectedDate + "T00:00:00").toLocaleDateString("default", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </h3>

              {!editingMode ? (
                <>
                  {availabilities.find((a) => a.date === selectedDate) && (
                    <div>
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-900">Doctor is available</p>
                      </div>

                      {availabilities
                        .find((a) => a.date === selectedDate)
                        ?.slots.slice(0, 3)
                        .map((slot) => (
                          <div
                            key={slot.id}
                            className={`text-xs p-2 mb-2 rounded ${
                              slot.isBooked
                                ? "bg-red-50 text-red-700 line-through"
                                : "bg-white text-gray-700"
                            }`}
                          >
                            {slot.time}
                            {slot.isBooked && (
                              <span className="ml-1">
                                <Check size={12} className="inline" />
                              </span>
                            )}
                          </div>
                        ))}

                      <p className="text-xs text-gray-600 mt-2">
                        {availabilities.find((a) => a.date === selectedDate)?.slots.length} total slots
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setEditingMode(true)}
                    className="w-full mt-4 rounded-lg bg-clinic-sage text-white px-3 py-2 text-sm font-medium hover:bg-clinic-moss transition-colors"
                  >
                    <Plus size={16} className="inline mr-1" />
                    Edit Availability
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900 block mb-2">
                      Open Time
                    </label>
                    <select
                      value={startHour}
                      onChange={(e) => setStartHour(parseInt(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {String(i).padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900 block mb-2">
                      Close Time
                    </label>
                    <select
                      value={endHour}
                      onChange={(e) => setEndHour(parseInt(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {String(i).padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateAvailability(selectedDate, true)}
                      className="flex-1 rounded-lg bg-green-600 text-white px-3 py-2 text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      <Check size={16} className="inline mr-1" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingMode(false);
                        setSelectedDate(null);
                      }}
                      className="flex-1 rounded-lg bg-gray-300 text-gray-900 px-3 py-2 text-sm font-medium hover:bg-gray-400 transition-colors"
                    >
                      <X size={16} className="inline mr-1" />
                      Cancel
                    </button>
                  </div>

                  <button
                    onClick={() => updateAvailability(selectedDate, false)}
                    className="w-full rounded-lg bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Mark as Closed
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Calendar size={32} className="mx-auto mb-2 opacity-50" />
              <p>Select a date to manage availability</p>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-500">Loading availabilities...</div>
      )}
    </div>
  );
}
