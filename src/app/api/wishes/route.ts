import { NextResponse } from "next/server";
import { getWishes, saveWish } from "@/lib/storage";

export async function GET() {
  try {
    const wishes = getWishes();
    return NextResponse.json({ success: true, data: wishes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: "Name and message are required" },
        { status: 400 }
      );
    }

    const newWish = saveWish(String(name).trim(), String(message).trim());
    return NextResponse.json({ success: true, data: newWish });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save wish" },
      { status: 500 }
    );
  }
}
