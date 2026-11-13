import { NextRequest, NextResponse } from "next/server";
import { ContactInquirySchema } from "@/lib/schemas";

const inquiriesStore: Array<{
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = ContactInquirySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, email, subject, message } = validation.data;
    const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}`;

    const record = {
      id: inquiryId,
      fullName,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    };

    inquiriesStore.push(record);

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received. Our master chandler will reply within 24 hours.",
        inquiryId,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    totalInquiries: inquiriesStore.length,
    recentInquiries: inquiriesStore.slice(-5),
  });
}
