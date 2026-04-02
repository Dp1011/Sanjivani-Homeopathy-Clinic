import { NextResponse } from "next/server";
import { createAdminToken } from "@/lib/admin-session";
import { parseRequestJson } from "@/lib/read-json-body";
import { isRateLimited, resetAttempts } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!password || !sessionSecret) {
    return NextResponse.json(
      { error: "Server is not configured for admin login." },
      { status: 503 }
    );
  }

  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  
  if (isRateLimited(clientIp, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  const parsed = await parseRequestJson<{ password?: string }>(request);
  if (!parsed.ok) return parsed.response;

  const { password: submitted } = parsed.body;

  if (submitted !== password) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  resetAttempts(clientIp);

  const token = createAdminToken(sessionSecret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
