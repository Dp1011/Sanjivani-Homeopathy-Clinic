import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isMailConfigured, sendErrorReportEmail } from "@/lib/mail";
import { parseRequestJson } from "@/lib/read-json-body";

export async function POST(request: Request) {
  try {
    const parsed = await parseRequestJson<Record<string, string | undefined>>(
      request
    );
    if (!parsed.ok) return parsed.response;

    const { name, email, subject, message, pageUrl } = parsed.body;

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Subject and description are required." },
        { status: 400 }
      );
    }

    const payload = {
      name: name?.trim() || null,
      email: email?.trim() || null,
      subject: subject.trim(),
      message: message.trim(),
      pageUrl: pageUrl?.trim() || null,
    };

    const mailReady = isMailConfigured();
    let emailSent = false;
    if (mailReady) {
      try {
        await sendErrorReportEmail(payload);
        emailSent = true;
      } catch (err) {
        console.error("Error report email failed:", err);
      }
    }

    await prisma.errorReport.create({
      data: {
        ...payload,
        emailSent,
      },
    });

    if (emailSent) {
      return NextResponse.json({
        message:
          "Thank you. Your report was emailed to the clinic and saved.",
        emailSent: true,
      });
    }

    if (mailReady) {
      return NextResponse.json({
        message:
          "Your report was saved. Email could not be sent right now; the clinic can still read it in the admin dashboard.",
        emailSent: false,
      });
    }

    return NextResponse.json({
      message:
        "Thank you. Your report was saved. Ask your host to add SMTP settings in .env to also email the doctor automatically.",
      emailSent: false,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not submit report. Please try again or call the clinic." },
      { status: 500 }
    );
  }
}
