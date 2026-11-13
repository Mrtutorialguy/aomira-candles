import { NextRequest, NextResponse } from "next/server";
import { CreateOrderSchema } from "@/lib/schemas";
import { CANDLE_PRODUCTS } from "@/lib/products";
import fs from "fs/promises";
import path from "path";

interface StoredOrder {
  id: string;
  customerName: string;
  email: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  status: string;
}

// In-memory cache + file-backed persistence
let memoryOrders: StoredOrder[] = [];

async function getStoragePath(): Promise<string> {
  const primaryDir = path.join(process.cwd(), "data");
  try {
    await fs.mkdir(primaryDir, { recursive: true });
    return path.join(primaryDir, "orders.json");
  } catch {
    const tmpDir = path.join("/tmp", "aomira_data");
    await fs.mkdir(tmpDir, { recursive: true });
    return path.join(tmpDir, "orders.json");
  }
}

async function persistOrder(order: StoredOrder) {
  memoryOrders.push(order);
  try {
    const filePath = await getStoragePath();
    let current: StoredOrder[] = [];
    try {
      const content = await fs.readFile(filePath, "utf-8");
      current = JSON.parse(content);
    } catch {
      current = [];
    }
    current.push(order);
    await fs.writeFile(filePath, JSON.stringify(current, null, 2), "utf-8");
  } catch (err) {
    // Keep in memory if filesystem write is restricted
    console.error("Order persistence warning:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = CreateOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { customerName, email, shippingAddress, items } = validation.data;

    // Resolve products and verify quantities
    const detailedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = CANDLE_PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Product with ID '${item.productId}' not found in catalog.`,
          },
          { status: 400 }
        );
      }

      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      detailedItems.push({
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: item.quantity,
        lineTotal,
      });
    }

    // Free shipping on orders over $70, otherwise flat $6
    const shipping = subtotal >= 70 ? 0 : 6;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal + shipping + tax;

    const orderId = `AOM-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      100 + Math.random() * 900
    )}`;

    const newOrder: StoredOrder = {
      id: orderId,
      customerName,
      email,
      shippingAddress,
      items: detailedItems,
      subtotal,
      shipping,
      tax,
      total,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    await persistOrder(newOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order: newOrder,
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
      ordersCount: stored.length,
      recentOrders: stored.slice(-5),
    });
  } catch {
    return NextResponse.json({
      success: true,
      ordersCount: memoryOrders.length,
      recentOrders: memoryOrders.slice(-5),
    });
  }
}
