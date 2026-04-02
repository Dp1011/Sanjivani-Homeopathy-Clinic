import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-session";
import { AdminClient } from "@/components/AdminClient";

export default async function AdminPage() {
  const sessionSecret = process.env.SESSION_SECRET;
  const token = (await cookies()).get("admin_session")?.value;
  const loggedIn = Boolean(
    sessionSecret && verifyAdminToken(token, sessionSecret)
  );

  if (!loggedIn) {
    return <AdminClient loggedIn={false} />;
  }

  const [appointments, messages, patients, errorReports] = await Promise.all([
    prisma.appointment.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.patientRecord.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.errorReport.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <AdminClient
      loggedIn
      appointments={appointments}
      messages={messages}
      patients={patients}
      errorReports={errorReports}
    />
  );
}
