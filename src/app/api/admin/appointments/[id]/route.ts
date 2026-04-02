import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/admin-session";
import { parseRequestJson } from "@/lib/read-json-body";

const STATUS_SET = new Set(["PENDING", "CONFIRMED", "CANCELLED"]);

async function assertAdmin() {
  const sessionSecret = process.env.SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!sessionSecret || !verifyAdminToken(token, sessionSecret)) {
    return null;
  }
  return true;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ok = await assertAdmin();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const parsed = await parseRequestJson<{ status?: string }>(request);
  if (!parsed.ok) return parsed.response;

  const status = parsed.body.status;
  if (!status || !STATUS_SET.has(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
