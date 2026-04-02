import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseRequestJson } from "@/lib/read-json-body";

export async function POST(request: Request) {
  try {
    const parsed = await parseRequestJson<Record<string, string | undefined>>(
      request
    );
    if (!parsed.ok) return parsed.response;

    const {
      fullName,
      email,
      phone,
      preferredDate,
      preferredTime,
      reason,
    } = parsed.body;

    if (!fullName?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }
    if (!preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Preferred date and time are required." },
        { status: 400 }
      );
    }

    const date = new Date(preferredDate);
    if (Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        preferredDate: date,
        preferredTime: preferredTime.trim(),
        reason: reason?.trim() || null,
      },
    });

    return NextResponse.json({
      id: appointment.id,
      message: "Appointment request received. We will contact you shortly.",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not save appointment. Please try again." },
      { status: 500 }
    );
  }
}
