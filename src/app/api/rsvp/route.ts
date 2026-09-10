import { NextResponse } from "next/server";
import { getRSVPs, saveRSVP, saveWish } from "@/lib/storage";

export async function GET() {
  try {
    const rsvps = getRSVPs();
    const stats = {
      totalResponses: rsvps.length,
      attendingCount: rsvps.filter((r) => r.attending).length,
      declinedCount: rsvps.filter((r) => !r.attending).length,
      totalAttendingPax: rsvps
        .filter((r) => r.attending)
        .reduce((sum, r) => sum + (Number(r.pax) || 1), 0),
    };

    return NextResponse.json({ success: true, data: rsvps, stats });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch RSVPs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, attending, pax, dietary, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const newRsvp = saveRSVP({
      name: String(name).trim(),
      phone: String(phone).trim(),
      attending: Boolean(attending),
      pax: attending ? Math.max(1, Math.min(10, Number(pax) || 1)) : 0,
      dietary: dietary ? String(dietary).trim() : undefined,
      message: message ? String(message).trim() : undefined,
    });

    // If guest also wrote a message/wish, add it to the guestbook automatically
    if (message && String(message).trim().length > 0) {
      saveWish(String(name).trim(), String(message).trim());
    }

    return NextResponse.json({ success: true, data: newRsvp });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save RSVP" },
      { status: 500 }
    );
  }
}
