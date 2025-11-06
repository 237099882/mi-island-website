// app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ ok: true, products });
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, imageUrl } = body;

    if (!title || typeof price !== "number") {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();
    const product = await Product.create({ title, description, price, imageUrl });
    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
