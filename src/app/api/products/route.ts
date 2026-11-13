import { NextRequest, NextResponse } from "next/server";
import { CANDLE_PRODUCTS } from "@/lib/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get("featured") === "true";
    const wax = searchParams.get("wax");

    let products = CANDLE_PRODUCTS;

    if (featuredOnly) {
      products = products.filter((p) => p.featured);
    }

    if (wax) {
      products = products.filter((p) =>
        p.waxType.toLowerCase().includes(wax.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      total: products.length,
      data: products,
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
