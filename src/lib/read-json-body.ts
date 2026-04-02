import { NextResponse } from "next/server";

/**
 * Safe JSON parse for API routes — avoids 500s on malformed bodies.
 */
export async function parseRequestJson<T>(
  request: Request
): Promise<
  { ok: true; body: T } | { ok: false; response: NextResponse }
> {
  try {
    const body = (await request.json()) as T;
    return { ok: true, body };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }),
    };
  }
}
