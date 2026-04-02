import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseRequestJson } from "@/lib/read-json-body";

export async function POST(request: Request) {
  try {
    const parsed = await parseRequestJson<Record<string, string | undefined>>(
      request
    );
    if (!parsed.ok) return parsed.response;

    const { name, email, phone, subject, message } = parsed.body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json({ message: "Thank you. We will reply soon." });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not send message. Please try again." },
      { status: 500 }
    );
  }
}
