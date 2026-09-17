# Kad Kahwin Digital: Umar & Nafisya (Walimatulurus)

Laman web kad jemputan perkahwinan digital interaktif untuk **Walimatulurus Umar & Nafisya** di Petak Padin, Kepala Batas, Pulau Pinang. 

Dibina berasaskan **Next.js & Swiper Parallax** dan dikonfigurasikan sebagai **Laman Statik GitHub Pages** dengan penerbitan automatik melalui GitHub Actions.

---

## 🌸 Ciri-Ciri Utama (Key Features)

1. **Logo Monogram Kaligrafi Tersuai**:
   - Monogram sambung eksklusif *U & N* pada Halaman Utama yang telus dan menyatu dengan corak kertas botani.
2. **Pengalaman Gelangsar Parallax Penuh (Full-Screen Swiper Engine)**:
   - 6 Slaid interaktif merangkumi Pintu Gerbang, Kalam Suci, Kira Detik & Lokasi Waze/Maps, Atur Cara Majlis, Pengesahan RSVP, dan Buku Ucapan & Salam Kaut Digital.
3. **Pengehosan Statik GitHub Pages (100% Static Export)**:
   - Dieksport secara statik (`output: 'export'`) tanpa memerlukan pelayan Node.js.
   - Sedia dihoskan di `https://<username>.github.io/weddingcard/`.
4. **Pengurusan RSVP & Webhook Google Sheets**:
   - Borang RSVP menyimpan data pada pelayar tempatan (`localStorage`) dan memajukan rekod terus ke Google Sheets Webhook.
   - Dilengkapi fungsi eksport CSV dan paparan statistik bagi memudahkan pihak penganjur.
5. **Pemain Lagu Latar Latar Romantik**:
   - Lagu *"Great Expectation"* berserta kawalan interaktif terapung.

---

## 🌐 Cara Mengaktifkan GitHub Pages (Deployment)

1. Pergi ke repositori anda di GitHub: `https://github.com/umarfarid97/weddingcard`
2. Klik tab **Settings** di bahagian atas.
3. Pada menu sebelah kiri, klik **Pages**.
4. Di bawah seksyen **Build and deployment**:
   - Untuk pilihan **Source**, pilih: **`GitHub Actions`**.
5. Sebaik sahaja anda menolak (*push*) sebarang komit ke cawangan `main`, alur kerja GitHub Actions `.github/workflows/deploy.yml` akan membina dan menerbitkan laman web secara automatik ke:
   👉 **`https://umarfarid97.github.io/weddingcard/`**

---

## 💻 Pembangunan Tempatan (Local Development)

```bash
# 1. Pasang kebergantungan (dependencies)
npm install

# 2. Jalankan mod pembangunan tempatan (development)
npm run dev

# 3. Bina eksport statik (static build)
npm run build
```
Fail statik yang lengkap sedia untuk dihoskan akan dijana ke dalam folder `out/`.
