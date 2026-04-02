"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slot {
  id: string;
  time: string;
  isBooked: boolean;
}

interface AvailabilityData {
  id: string;
  date: string;
  isWorking: boolean;
  slots: Slot[];
}

interface CalendarPickerProps {
  onDateTimeSelect: (date: string, time: string, slotId: string) => void;
  minDaysAhead?: number;
  maxDaysAhead?: number;
}

export function CalendarPicker({
  onDateTimeSelect,
  minDaysAhead = 1,
  maxDaysAhead = 90,
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availabilities, setAvailabilities] = useState<AvailabilityData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailabilities();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchAvailabilities() {
    try {
      setLoading(true);
      setError(null);

      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() + minDaysAhead);
      
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + maxDaysAhead);

      const startStr = startDate.toISOString().split("T")[0];
      const endStr = endDate.toISOString().split("T")[0];

      const response = await fetch(
        `/api/slots/available?startDate=${startStr}&endDate=${endStr}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
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

  function getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function getFirstDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function handleDateSelect(day: number) {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateStr = selected.toISOString().split("T")[0];
    setSelectedDate(dateStr);
    setSelectedTime(null);
    setSelectedSlotId(null);
  }

  function handleTimeSelect(slotId: string, time: string) {
    setSelectedTime(time);
    setSelectedSlotId(slotId);

    if (selectedDate) {
      onDateTimeSelect(selectedDate, time, slotId);
    }
  }

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days: (number | null)[] = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const today = new Date();
  const minBookDate = new Date(today);
  minBookDate.setDate(minBookDate.getDate() + minDaysAhead);

  const slots = selectedDate
    ? availabilities.find((a) => a.date === selectedDate)?.slots || []
    : [];

  const availableSlots = slots.filter((s) => !s.isBooked);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Appointment</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
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
                const hasAvailability = availabilities.some((a) => a.date === dateStr && a.isWorking);
                const isSelectable = date >= minBookDate && hasAvailability;
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => isSelectable && handleDateSelect(day)}
                    disabled={!isSelectable}
                    className={`
                      aspect-square rounded-lg font-medium text-sm
                      ${isSelected
                        ? "bg-blue-600 text-white"
                        : hasAvailability
                        ? "bg-blue-50 text-blue-900 hover:bg-blue-100 cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }
                      ${!isSelectable && !hasAvailability ? "opacity-50" : ""}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div>
          {selectedDate ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Times
                <span className="text-sm font-normal text-gray-500 block mt-1">
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("default", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </h3>

              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading times...</div>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot.id, slot.time)}
                      className={`
                        py-2 px-3 rounded-md text-sm font-medium transition-colors
                        ${selectedTime === slot.time
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                        }
                      `}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No available times for this date</div>
              )}

              {selectedTime && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-900 font-medium">
                    Selected: {selectedDate} at {selectedTime}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Select a date to see available times</div>
          )}
        </div>
      </div>
    </div>
  );
}
