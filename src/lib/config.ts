export const config = {
  clinic: {
    name: process.env.CLINIC_NAME || "Sanjivani Homeopathic Clinic",
    doctorName: process.env.CLINIC_DOCTOR_NAME || "Dr. Yogesh M Patil (MD Homeopathy)",
    phone: process.env.CLINIC_PHONE || "+919420441549",
    address: {
      street: process.env.CLINIC_ADDRESS_STREET || "Station Road",
      city: process.env.CLINIC_ADDRESS_CITY || "Nandurbar",
      state: process.env.CLINIC_ADDRESS_STATE || "Maharashtra",
    },
    hours: {
      monFri: process.env.CLINIC_HOURS_MON_FRI || "09:00 - 18:00",
      saturday: process.env.CLINIC_HOURS_SAT || "10:00 - 14:00",
      sunday: "Closed",
    },
  },
  appointments: {
    bookingDaysAhead: parseInt(process.env.APPOINTMENT_BOOKING_DAYS_AHEAD || "7"),
    maxBookingDays: parseInt(process.env.APPOINTMENT_MAX_BOOKING_DAYS || "90"),
  },
  services: {
    initialConsultation: {
      name: "Initial consultation",
      duration: process.env.SERVICE_INITIAL_CONSULTATION_DURATION || "75–90 minutes",
      price: process.env.SERVICE_INITIAL_CONSULTATION_PRICE || "₹500",
      detail:
        "Full case history, review of main complaints, and first prescription with clear instructions.",
    },
    followup: {
      name: "Follow-up visit",
      duration: process.env.SERVICE_FOLLOWUP_DURATION || "30–45 minutes",
      price: process.env.SERVICE_FOLLOWUP_PRICE || "₹300",
      detail:
        "Assessment of remedy response, potency or remedy changes, and planning next steps.",
    },
    acute: {
      name: "Acute care",
      duration: process.env.SERVICE_ACUTE_DURATION || "15–30 minutes",
      price: process.env.SERVICE_ACUTE_PRICE || "₹200",
      detail:
        "Short appointments for recent onset complaints when appropriate (e.g. minor injuries, colds).",
    },
    familyChildren: {
      name: "Family & children",
      duration: process.env.SERVICE_FAMILY_CHILDREN_DURATION,
      price: process.env.SERVICE_FAMILY_CHILDREN_PRICE || "₹300",
      detail:
        "Gentle support for developmental stages, sleep, digestion, and recurrent infections—always with guardian consent.",
    },
  },
};

export function getServicesList() {
  return [
    config.services.initialConsultation,
    config.services.followup,
    config.services.acute,
    config.services.familyChildren,
  ];
}

export function getFormattedAddress() {
  const { street, city, state } = config.clinic.address;
  return `${street}, ${city}, ${state}`;
}
