import { NextRequest, NextResponse } from "next/server";
import { ContactInquirySchema } from "@/lib/schemas";
import fs from "fs/promises";
import path from "path";

interface StoredInquiry {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

let memoryInquiries: StoredInquiry[] = [];

async function getStoragePath(): Promise<string> {
  const primaryDir = path.join(process.cwd(), "data");
  try {
    await fs.mkdir(primaryDir, { recursive: true });
    return path.join(primaryDir, "inquiries.json");
  } catch {
    const tmpDir = path.join("/tmp", "aomira_data");
    await fs.mkdir(tmpDir, { recursive: true });
    return path.join(tmpDir, "inquiries.json");
  }
}

async function persistInquiry(inquiry: StoredInquiry) {
  memoryInquiries.push(inquiry);
  try {
    const filePath = await getStoragePath();
    let current: StoredInquiry[] = [];
    try {
      const content = await fs.readFile(filePath, "utf-8");
      current = JSON.parse(content);
    } catch {
      current = [];
    }
    current.push(inquiry);
    await fs.writeFile(filePath, JSON.stringify(current, null, 2), "utf-8");
  } catch (err) {
    console.error("Inquiry persistence warning:", err);
  }
}

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

    const record: StoredInquiry = {
      id: inquiryId,
      fullName,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    };

    await persistInquiry(record);

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
  try {
    const filePath = await getStoragePath();
    const content = await fs.readFile(filePath, "utf-8");
    const stored = JSON.parse(content);
    return NextResponse.json({
      success: true,
      totalInquiries: stored.length,
      recentInquiries: stored.slice(-5),
    });
  } catch {
    return NextResponse.json({
      success: true,
      totalInquiries: memoryInquiries.length,
      recentInquiries: memoryInquiries.slice(-5),
    });
  }
}
