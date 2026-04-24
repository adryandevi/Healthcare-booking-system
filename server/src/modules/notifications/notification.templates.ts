export const TEMPLATES = {
  APPOINTMENT_BOOKED: (name: string, date: string, time: string) =>
    `Hi ${name}, your appointment for ${date} at ${time} has been submitted. Awaiting confirmation.`,

  APPOINTMENT_CONFIRMED: (name: string, date: string, time: string) =>
    `Hi ${name}, your appointment on ${date} at ${time} has been confirmed.`,

  APPOINTMENT_CANCELLED: (name: string, reason?: string) =>
    `Hi ${name}, your appointment has been cancelled.${reason ? ` Reason: ${reason}` : ""}`,

  APPOINTMENT_REMINDER: (name: string, date: string, time: string) =>
    `Hi ${name}, reminder: you have an appointment on ${date} at ${time}.`,
} as const;