import { NextRequest, NextResponse } from "next/server";
import { CANDLE_PRODUCTS } from "@/lib/products";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = CANDLE_PRODUCTS.find(
      (p) => p.id === id || p.slug === id
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Candle not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
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
