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

    // Forward to Google Sheets Webhook (Google Apps Script) if configured
    const googleSheetWebhook =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbwCOR0MNNs-A1i_QLHpYhSD-98Zm4Dy2sj0G5qpo9z42xXqoG86qhgoBlMYCjqYRP_j/exec";

    if (googleSheetWebhook) {
      try {
        await fetch(googleSheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
          body: JSON.stringify({
            timestamp: new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" }),
            name: String(name).trim(),
            phone: String(phone).trim(),
            status: Boolean(attending) ? "Hadir" : "Tidak Hadir",
            attending: Boolean(attending),
            pax: attending ? Math.max(1, Math.min(10, Number(pax) || 1)) : 0,
            message: message ? String(message).trim() : "-",
          }),
        });
      } catch (sheetErr) {
        console.error("Failed to forward RSVP to Google Sheets:", sheetErr);
      }
    }

    return NextResponse.json({ success: true, data: newRsvp });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save RSVP" },
      { status: 500 }
    );
  }
}
