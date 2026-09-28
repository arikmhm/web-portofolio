# Arik MHM — konsep website layanan

HTML, CSS, dan JavaScript mandiri, tanpa proses build.

## Buka preview

Buka `index.html` langsung di browser, atau jalankan dari folder ini:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Lalu buka http://127.0.0.1:4173. Pada server Next.js proyek ini, halaman tersedia di `/studio/index.html`.

## Edit

- `index.html`: konten, layanan, dan alamat email kontak.
- `styles.css`: warna, tipografi, dan layout responsive.
- `script.js`: menu mobile, salin email, tahun footer, dan kontrol animasi workflow.

Font DM Sans dan IBM Plex Mono dimuat dari Google Fonts; font sistem menjadi fallback saat offline. Tombol kontak membuka aplikasi email. Tombol salin email tersedia jika browser mendukung Clipboard API.

Visual workflow adalah simulasi dengan SVG dan animasi CSS. Gunakan tombol Jeda/Putar untuk mengontrolnya. Animasi berhenti saat diagram keluar dari layar, tab tidak aktif, atau pengguna mengaktifkan pengurangan gerak. Pada mobile, diagram berubah menjadi alur vertikal.

Section Studi Konsep memuat catatan kebutuhan, mockup antrean permintaan dengan filter status, dan contoh ekstraksi informasi. Semua data bersifat ilustratif; filter bekerja lokal di browser.
