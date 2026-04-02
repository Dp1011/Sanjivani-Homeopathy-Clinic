import { NextRequest, NextResponse } from "next/server";
import { bookSlot } from "@/lib/availability";

export async function POST(request: NextRequest) {
  try {
    const { slotId, fullName, email, phone, reason } = await request.json();

    if (!slotId || !fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: slotId, fullName, email, phone" },
        { status: 400 }
      );
    }

    const appointment = await bookSlot(slotId, {
      fullName,
      email,
      phone,
      reason,
    });

    return NextResponse.json({
      success: true,
      appointment,
      confirmationNumber: appointment.confirmationNumber,
      message: "Appointment confirmed successfully!",
    });
  } catch (error: any) {
    console.error("Error booking slot:", error);
    return NextResponse.json(
      { error: error.message || "Failed to book appointment" },
      { status: 400 }
    );
  }
}
