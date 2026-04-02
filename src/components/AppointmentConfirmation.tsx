import { Mail, Calendar, Clock, Phone, CheckCircle } from "lucide-react";
import Link from "next/link";

interface AppointmentConfirmationProps {
  confirmationNumber: string;
  patientName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
}

export function AppointmentConfirmation({
  confirmationNumber,
  patientName,
  email,
  phone,
  appointmentDate,
  appointmentTime,
}: AppointmentConfirmationProps) {
  const appointmentDateTime = new Date(appointmentDate + "T" + appointmentTime);
  const formattedDate = appointmentDateTime.toLocaleDateString("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600">Your slot has been reserved successfully.</p>
        </div>

        {/* Confirmation Number */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-600 mb-2">Confirmation Number</p>
          <p className="text-2xl font-mono font-bold text-clinic-sage">{confirmationNumber}</p>
          <p className="text-xs text-gray-500 mt-2">Save this number for your records</p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Date & Time */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Calendar size={24} className="text-clinic-sage mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Appointment Date</p>
                <p className="text-lg font-semibold text-gray-900">{formattedDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Clock size={24} className="text-clinic-sage mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Appointment Time</p>
                <p className="text-lg font-semibold text-gray-900">{appointmentTime}</p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="bg-white rounded-lg p-6 md:col-span-2">
            <p className="text-sm text-gray-600 mb-4">Patient Information</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-gray-600 min-w-fit">Name:</span>
                <span className="font-medium text-gray-900">{patientName}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gray-400 mt-0.5" />
                <span className="font-medium text-gray-900">{email}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-gray-400 mt-0.5" />
                <span className="font-medium text-gray-900">{phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✓ A confirmation email has been sent to {email}</li>
            <li>✓ Please arrive 10 minutes early</li>
            <li>✓ Bring any relevant medical documents or reports</li>
            <li>✓ If you need to reschedule, contact us at least 24 hours in advance</li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 rounded-full bg-clinic-sage text-white px-6 py-3 text-center font-semibold hover:bg-clinic-moss transition-colors"
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 rounded-full bg-white border-2 border-clinic-sage text-clinic-sage px-6 py-3 text-center font-semibold hover:bg-clinic-sage/5 transition-colors"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}
