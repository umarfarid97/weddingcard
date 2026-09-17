export interface RSVPRecord {
  id: string;
  name: string;
  phone: string;
  attending: boolean;
  pax: number;
  dietary?: string;
  message?: string;
  createdAt: string;
}

export interface WishRecord {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

const LOCAL_STORAGE_RSVP_KEY = "wedding_rsvps_v1";
const LOCAL_STORAGE_WISHES_KEY = "wedding_wishes_v1";

const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK ||
  "https://script.google.com/macros/s/AKfycbwCOR0MNNs-A1i_QLHpYhSD-98Zm4Dy2sj0G5qpo9z42xXqoG86qhgoBlMYCjqYRP_j/exec";

export const DEFAULT_WISHES: WishRecord[] = [
  {
    id: "wish_1",
    name: "Farhan & Keluarga",
    message:
      "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair. Selamat melayari bahtera perkahwinan Umar & Nafisya!",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "wish_2",
    name: "Dr. Zulkifli",
    message:
      "Tahniah Umar & Nafisya! Semoga mahligai yang dibina sentiasa dilimpahi sakinah, mawaddah wa rahmah hingga ke syurga.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "wish_3",
    name: "Nabila & Rakan Sekerja",
    message:
      "Tahniah Nafisya & Umar! Sama cantik sama padan bagai pinang dibelah dua. Can't wait to celebrate your special day!",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "wish_4",
    name: "Pak Ngah & Mak Ngah",
    message:
      "Selamat pengantin baru buat anakanda Umar & Nafisya. Semoga rukun damai dan dikurniakan zuriat yang soleh solehah.",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "wish_5",
    name: "Aiman & Sahabat",
    message:
      "Alhamdulillah, tahniah sahabatku Umar & Nafisya! Moga ikatan suci ini berkekalan hingga ke Jannah. Selamat melangkah ke fasa baharu!",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

/**
 * Get all RSVP records stored in the client's local storage.
 */
export function getRSVPRecords(): RSVPRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RSVP_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Compute aggregate stats for AdminModal view.
 */
export function getRSVPStats() {
  const list = getRSVPRecords();
  return {
    totalResponses: list.length,
    attendingCount: list.filter((r) => r.attending).length,
    declinedCount: list.filter((r) => !r.attending).length,
    totalAttendingPax: list
      .filter((r) => r.attending)
      .reduce((sum, r) => sum + (Number(r.pax) || 1), 0),
  };
}

/**
 * Save an RSVP submission:
 * 1. Persists locally in localStorage.
 * 2. If a message is provided, adds to guest wishes.
 * 3. Asynchronously sends to the Google Sheets Webhook.
 */
export async function submitRSVP(
  record: Omit<RSVPRecord, "id" | "createdAt">
): Promise<RSVPRecord> {
  const newRecord: RSVPRecord = {
    ...record,
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  // 1. Save to local storage
  if (typeof window !== "undefined") {
    try {
      const existing = getRSVPRecords();
      existing.unshift(newRecord);
      localStorage.setItem(LOCAL_STORAGE_RSVP_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn("Failed to write RSVP to localStorage:", e);
    }
  }

  // 2. If guest wrote a wish message, save it to the guestbook
  if (record.message && record.message.trim().length > 0) {
    submitWish(record.name, record.message.trim());
  }

  // 3. Post to Google Sheets webhook directly from the client
  if (GOOGLE_SHEET_WEBHOOK_URL) {
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // Bypasses browser CORS restrictions for Google Apps Script redirects
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("en-MY", {
            timeZone: "Asia/Kuala_Lumpur",
          }),
          name: record.name.trim(),
          phone: record.phone.trim(),
          status: record.attending ? "Hadir" : "Tidak Hadir",
          attending: Boolean(record.attending),
          pax: record.attending ? Math.max(1, Math.min(10, Number(record.pax) || 1)) : 0,
          dietary: record.dietary || "-",
          message: record.message || "-",
        }),
      });
    } catch (sheetErr) {
      console.error("Could not forward RSVP to Google Sheets Webhook:", sheetErr);
    }
  }

  return newRecord;
}

/**
 * Asynchronously fetch live wishes from the Google Sheets Webhook endpoint.
 * Supports both { success: true, wishes: [...] } and raw array format.
 */
export async function fetchGoogleSheetWishes(): Promise<WishRecord[]> {
  if (!GOOGLE_SHEET_WEBHOOK_URL) return [];
  try {
    const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) return [];
    const text = await res.text();
    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      return [];
    }

    const rawList: any[] = Array.isArray(json)
      ? json
      : Array.isArray(json?.wishes)
      ? json.wishes
      : Array.isArray(json?.data)
      ? json.data
      : [];

    if (!rawList.length) return [];

    const sheetWishes: WishRecord[] = rawList
      .filter((item) => {
        const msg = item.message || item.ucapan || item.pesanan || item[6] || item[7];
        return msg && String(msg).trim() !== "" && String(msg).trim() !== "-";
      })
      .map((item, idx) => ({
        id: `sheet_${idx}_${item.name || "tetamu"}_${item.createdAt || item.timestamp || idx}`,
        name: String(item.name || item.nama || item[1] || "Tetamu").trim(),
        message: String(item.message || item.ucapan || item.pesanan || item[6] || item[7]).trim(),
        createdAt: String(item.createdAt || item.timestamp || item[0] || new Date().toISOString()),
      }));

    if (sheetWishes.length > 0 && typeof window !== "undefined") {
      try {
        localStorage.setItem("wedding_remote_wishes_cache_v1", JSON.stringify(sheetWishes));
      } catch (e) {
        console.warn("Could not cache remote wishes:", e);
      }
    }

    return sheetWishes;
  } catch (err) {
    console.warn("Could not fetch wishes from Google Sheets (using cached/local):", err);
    return [];
  }
}

/**
 * Get wishes: combines local user submissions, cached Google Sheet wishes, and default seeded wishes.
 */
export function getWishes(remoteWishes?: WishRecord[]): WishRecord[] {
  if (typeof window === "undefined") return DEFAULT_WISHES;
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_WISHES_KEY);
    const localWishes: WishRecord[] = rawLocal ? JSON.parse(rawLocal) : [];

    let remote: WishRecord[] = remoteWishes || [];
    if (!remote.length) {
      const cached = localStorage.getItem("wedding_remote_wishes_cache_v1");
      remote = cached ? JSON.parse(cached) : [];
    }

    // Merge in priority order: local submissions first, then Google Sheet remote wishes, then default seeded wishes
    const combined: WishRecord[] = [];
    const seenSignatures = new Set<string>();

    const addWish = (w: WishRecord) => {
      const sig = `${w.name.trim().toLowerCase()}_${w.message.trim().toLowerCase()}`;
      if (!seenSignatures.has(sig)) {
        seenSignatures.add(sig);
        combined.push(w);
      }
    };

    if (Array.isArray(localWishes)) localWishes.forEach(addWish);
    if (Array.isArray(remote)) remote.forEach(addWish);
    DEFAULT_WISHES.forEach(addWish);

    return combined.length > 0 ? combined : DEFAULT_WISHES;
  } catch {
    return DEFAULT_WISHES;
  }
}

/**
 * Fetch fresh wishes from Google Sheets and return unified list.
 */
export async function fetchAndSyncWishes(): Promise<WishRecord[]> {
  const remote = await fetchGoogleSheetWishes();
  return getWishes(remote);
}

/**
 * Submit a new guest wish.
 */
export function submitWish(name: string, message: string): WishRecord {
  const newWish: WishRecord = {
    id: `wish_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_WISHES_KEY);
      const userWishes: WishRecord[] = raw ? JSON.parse(raw) : [];
      userWishes.unshift(newWish);
      localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(userWishes));
    } catch (e) {
      console.warn("Failed to write wish to localStorage:", e);
    }
  }

  return newWish;
}
