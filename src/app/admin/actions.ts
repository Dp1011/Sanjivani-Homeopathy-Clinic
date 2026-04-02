"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-session";

async function requireAdmin() {
  const sessionSecret = process.env.SESSION_SECRET;
  const token = (await cookies()).get("admin_session")?.value;
  if (!sessionSecret || !verifyAdminToken(token, sessionSecret)) {
    throw new Error("Unauthorized");
  }
}

export async function createPatientRecord(formData: FormData) {
  await requireAdmin();
  const fullName = (formData.get("fullName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim() || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!fullName || !phone) {
    return { error: "Name and phone are required." };
  }

  await prisma.patientRecord.create({
    data: { fullName, phone, email, notes },
  });
  revalidatePath("/admin");
  return { ok: true };
}
