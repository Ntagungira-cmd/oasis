import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/visitors.json?key=${process.env.NEXT_PUBLIC_MOCKAROO_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch visitors data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
