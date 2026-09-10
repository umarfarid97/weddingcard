export interface ItineraryItem {
  time: string;
  title: string;
  description?: string;
}

export interface ContactPerson {
  name: string;
  relation: string;
  phone: string; // e.g. "60123456789"
}

export interface BankDetail {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  qrValue?: string; // e.g. DuitNow string or account number
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface WeddingConfig {
  meta: {
    title: string;
    description: string;
    themeColor: string;
  };
  bismillahText: string;
  invitationIntro: string;
  groom: {
    name: string;
    fullName: string;
    fatherName: string;
    motherName: string;
    photoUrl: string;
    bio?: string;
  };
  bride: {
    name: string;
    fullName: string;
    fatherName: string;
    motherName: string;
    photoUrl: string;
    bio?: string;
  };
  event: {
    date: string; // ISO string for countdown: "2026-11-28T11:00:00+08:00"
    dateFormatted: string; // "Sabtu, 28 November 2026"
    islamicDate?: string; // "18 Jamadilawal 1448H"
    timeFormatted: string; // "11:00 AM - 4:00 PM"
    venueName: string;
    hallName?: string;
    address: string;
    city: string;
    state: string;
    googleMapsUrl: string;
    wazeUrl: string;
    calendarSummary: string;
    calendarDescription: string;
  };
  doa: {
    arabic: string;
    translation: string;
    source: string;
  };
  itinerary: ItineraryItem[];
  contacts: ContactPerson[];
  gift: BankDetail;
  gallery: GalleryPhoto[];
  audio: {
    title: string;
    artist: string;
    url: string;
  };
}

export const weddingData: WeddingConfig = {
  meta: {
    title: "Walimatulurus | Umar & Nafisya",
    description: "Undangan Majlis Perkahwinan Umar & Nafisya. Bersama meraikan detik bahagia kami.",
    themeColor: "#c5a059",
  },
  bismillahText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  invitationIntro:
    "Dengan penuh kesyukuran ke hadrat Ilahi, kami sekeluarga berbesar hati menjemput Dato' / Datin / Tuan / Puan / Encik / Cik seisi keluarga ke Majlis Walimatulurus anakanda kami tercinta",
  groom: {
    name: "Umar",
    fullName: "Muhammad Umar bin Ahmad Zaki",
    fatherName: "Ahmad Zaki bin Sulaiman",
    motherName: "Salmah binti Othman",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Anakanda kepada En. Ahmad Zaki & Pn. Salmah",
  },
  bride: {
    name: "Nafisya",
    fullName: "Nur Nafisya binti Mohd Radzi",
    fatherName: "Mohd Radzi bin Ibrahim",
    motherName: "Rohana binti Abdullah",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Anakanda kepada En. Mohd Radzi & Pn. Rohana",
  },
  event: {
    date: "2027-01-02T11:00:00+08:00",
    dateFormatted: "Sabtu, 2 Januari 2027",
    islamicDate: "23 Rejab 1448H",
    timeFormatted: "11:00 AM - 4:00 PM",
    venueName: "Petak Padin",
    hallName: "Dewan Terbuka Petak Padin",
    address: "Petak Padin Cottage, Jalan Pongsu Seribu, 13200 Kepala Batas, Pulau Pinang",
    city: "Kepala Batas",
    state: "Pulau Pinang",
    googleMapsUrl: "https://maps.google.com/?q=Petak+Padin+Cottage+Kepala+Batas",
    wazeUrl: "https://waze.com/ul?q=Petak%20Padin%20Cottage%20Kepala%20Batas",
    calendarSummary: "Walimatulurus Umar & Nafisya",
    calendarDescription: "Majlis Perkahwinan Muhammad Umar & Nur Nafisya bertempat di Petak Padin, Kepala Batas.",
  },
  doa: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translation:
      "\"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.\"",
    source: "Surah Ar-Rum : Ayat 21",
  },
  itinerary: [
    {
      time: "11:00 AM",
      title: "Ketibaan Para Jemputan",
      description: "Ketibaan para tetamu & santapan ringan",
    },
    {
      time: "11:45 AM",
      title: "Upacara Akad Nikah",
      description: "Majlis Ijab & Qabul di pelamin utama",
    },
    {
      time: "12:30 PM",
      title: "Perarakan Masuk Pengantin",
      description: "Perarakan masuk mempelai diiringi alunan selawat",
    },
    {
      time: "12:45 PM",
      title: "Bacaan Doa & Makan Beradab",
      description: "Santapan pengantin bersama keluarga tercinta",
    },
    {
      time: "01:30 PM",
      title: "Upacara Memotong Kek & Sesi Bergambar",
      description: "Sesi ramah mesra dan bergambar bersama tetamu",
    },
    {
      time: "04:00 PM",
      title: "Majlis Bersurai",
      description: "Sekalung penghargaan & ucapan terima kasih",
    },
  ],
  contacts: [
    {
      name: "En. Ahmad Zaki",
      relation: "Bapa Pengantin Lelaki",
      phone: "60123456789",
    },
    {
      name: "En. Mohd Radzi",
      relation: "Bapa Pengantin Perempuan",
      phone: "60198765432",
    },
    {
      name: "Amirul",
      relation: "Penyelaras Majlis / Pengapit",
      phone: "60111223344",
    },
  ],
  gift: {
    bankName: "Maybank",
    accountHolder: "Muhammad Umar",
    accountNumber: "164012345678",
    qrValue: "164012345678",
  },
  gallery: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      caption: "Detik cinta & janji seumur hidup",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      caption: "Langkah bersama melakar masa depan",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80",
      caption: "Kasih yang dipateri penuh keikhlasan",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      caption: "Cinta yang bersemi dalam redha Ilahi",
    },
  ],
  audio: {
    title: "Great Expectation",
    artist: "Sienna Spiro",
    url: "/audio/great_expectation.mp3",
  },
};
