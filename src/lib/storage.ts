import fs from "fs";
import path from "path";

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

const DB_DIR = path.join(process.cwd(), "src", "data", "db");
const RSVP_FILE = path.join(DB_DIR, "rsvps.json");
const WISHES_FILE = path.join(DB_DIR, "wishes.json");

function ensureDbDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

export function getRSVPs(): RSVPRecord[] {
  ensureDbDir();
  if (!fs.existsSync(RSVP_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(RSVP_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveRSVP(record: Omit<RSVPRecord, "id" | "createdAt">): RSVPRecord {
  const list = getRSVPs();
  const newRecord: RSVPRecord = {
    ...record,
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  list.unshift(newRecord);
  ensureDbDir();
  fs.writeFileSync(RSVP_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newRecord;
}

const DEFAULT_WISHES: WishRecord[] = [
  {
    id: "wish_1",
    name: "Farhan & Keluarga",
    message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair. Selamat melayari bahtera perkahwinan Umar & Nafisya!",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "wish_2",
    name: "Dr. Zulkifli",
    message: "Tahniah Umar & Nafisya! Semoga mahligai yang dibina sentiasa dilimpahi sakinah, mawaddah wa rahmah hingga ke syurga.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "wish_3",
    name: "Nabila & Rakan Sekerja",
    message: "Tahniah Nafisya & Umar! Sama cantik sama padan bagai pinang dibelah dua. Can't wait to celebrate your special day!",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export function getWishes(): WishRecord[] {
  ensureDbDir();
  if (!fs.existsSync(WISHES_FILE)) {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(DEFAULT_WISHES, null, 2), "utf-8");
    return DEFAULT_WISHES;
  }
  try {
    const data = fs.readFileSync(WISHES_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_WISHES;
  } catch {
    return DEFAULT_WISHES;
  }
}

export function saveWish(name: string, message: string): WishRecord {
  const list = getWishes();
  const newWish: WishRecord = {
    id: `wish_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    message,
    createdAt: new Date().toISOString(),
  };
  list.unshift(newWish);
  ensureDbDir();
  fs.writeFileSync(WISHES_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newWish;
}
