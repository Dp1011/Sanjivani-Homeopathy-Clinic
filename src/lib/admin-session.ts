import { createHmac, timingSafeEqual } from "crypto";

const MESSAGE = "homeopathy-clinic-admin-session-v1";

export function createAdminToken(sessionSecret: string): string {
  return createHmac("sha256", sessionSecret).update(MESSAGE).digest("hex");
}

export function verifyAdminToken(
  token: string | undefined,
  sessionSecret: string
): boolean {
  if (!token || !sessionSecret) return false;
  const expected = createHmac("sha256", sessionSecret).update(MESSAGE).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(token, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}
