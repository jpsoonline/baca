# Rekap OS - PWA + GitHub Pages + Firebase (Firestore)

## Isi paket
| File | Fungsi | Ke GitHub? |
|---|---|---|
| `index.html` | **Dibuat sendiri**: hasil bungkus `rekap_os_app_v2.html` dengan `alat_lisensi.html`, lalu ganti nama jadi `index.html` | Ya |
| `manifest.json`, `sw.js`, `icon-*.png` | PWA (bisa di-install, jalan offline) | Ya |
| `firebase-config.js` | Konfigurasi Firebase (isi sendiri) | Ya |
| `admin.html` | Halaman admin untuk mendaftarkan/mencabut lisensi akun | Ya |
| `.nojekyll` | Agar GitHub Pages tidak memproses file | Ya |
| `firestore.rules` | Security Rules (ditempel di Firebase Console) | Tidak perlu |
| `rekap_os_app_v2.html`, `alat_lisensi.html`, `master_key_lisensi.json` | File asli/rahasia | **JANGAN diunggah** |

## A. Siapkan Firebase (sekali)
1. https://console.firebase.google.com > **Add project** (paket gratis Spark cukup).
2. **Build > Authentication > Get started > Sign-in method > Google > Enable**.
3. **Authentication > Settings > Authorized domains > Add domain**: `USERNAME.github.io` (ganti USERNAME dengan akun GitHub Anda).
4. **Build > Firestore Database > Create database** (mode production, lokasi `asia-southeast2` Jakarta).
5. Tab **Rules**: tempel isi `firestore.rules`, **ganti `ADMIN_EMAIL_DISINI@gmail.com` dengan email Google admin (huruf kecil)**, lalu **Publish**.
6. **Project settings (ikon roda) > General > Your apps > Web (`</>`)** > daftarkan app > salin objek `firebaseConfig` ke `firebase-config.js`.
7. (Disarankan) Google Cloud Console > APIs & Services > Credentials > API key proyek ini > *Website restrictions* > tambahkan `https://USERNAME.github.io/*`.

## B. Bungkus aplikasi
1. Buka `alat_lisensi.html`, **Muat kunci master** yang sama seperti biasa, lalu **Bungkus aplikasi** > pilih `rekap_os_app_v2.html`.
2. Ganti nama hasilnya (`..._berlisensi.html`) menjadi **`index.html`**.

## C. GitHub Pages
1. Buat repo baru (mis. `rekap-os`), **Public** (Pages gratis hanya untuk repo publik).
2. Unggah (Add file > Upload files): `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `firebase-config.js`, `admin.html`, `.nojekyll`.
3. **Settings > Pages > Deploy from a branch > main / (root) > Save**. Alamat: `https://USERNAME.github.io/rekap-os/`.

## D. Daftarkan pengguna (admin)
1. Buka `https://USERNAME.github.io/rekap-os/admin.html`, masuk dengan Google admin.
2. Isi email pengguna, status `active`, tanggal berlaku (opsional), **Simpan**. Untuk mencabut: tombol **Cabut**.

## E. Pemakaian
1. Pengguna buka alamat aplikasi di Chrome/Edge. **Layar aktivasi** (Kode Perangkat > Kode Lisensi dari `alat_lisensi.html`) muncul sekali per perangkat.
2. Setelah aktif: **Masuk dengan Google**. Jika akun terdaftar dan aktif, aplikasi terbuka.
3. Klik ikon install di address bar (atau menu > Install Rekap OS) agar berjalan seperti aplikasi.
4. Pengaturan (Holiday, Aturan File, nama perusahaan, logo) otomatis tersinkron antar perangkat. Tab **Pengaturan > Akun & Sinkronisasi** punya Sinkron sekarang, Keluar akun, Ekspor/Impor pengaturan.

## F. Memperbarui aplikasi
Bungkus ulang `rekap_os_app_v2.html` > ganti nama jadi `index.html` > unggah menimpa file lama di GitHub. Pengguna cukup membuka/memuat ulang aplikasi (service worker mengambil versi terbaru saat online).

## Hal penting
- **Alamat baru = perangkat baru bagi sistem lisensi.** Kode Perangkat dibuat per alamat web. Kode lisensi lama (untuk `file://`) **tidak cocok**; buat kode lisensi baru untuk tiap perangkat (kunci master tetap sama).
- **Memindahkan pengaturan lama:** buka versi baru dari lokasi file lama (alamat `file:///...` yang sama dengan sebelumnya), tab Pengaturan > Ekspor pengaturan; lalu di PWA > Impor pengaturan.
- Folder sumber/tujuan (izin akses folder) dan teks lokasi disimpan **per perangkat**, tidak disinkronkan. Pilih folder sekali di tiap perangkat.
- **Masa tenggang offline 7 hari:** setelah verifikasi online terakhir, aplikasi tetap bisa dipakai offline sampai 7 hari. Lisensi yang dicabut/kedaluwarsa berlaku saat verifikasi online berikutnya.
- Kunci di `firebase-config.js` memang publik. Yang melindungi data adalah login + Security Rules. Pengecekan lisensi di sisi browser adalah penghalang tingkat menengah (bukan perlindungan mutlak); pengecekan sungguhan di server memerlukan Cloud Functions (paket Blaze).
- Hanya pengaturan yang disimpan di Firestore. Data hasil rekap dan file PDF tidak pernah diunggah.
