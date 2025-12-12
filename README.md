# UrEyes

![UrEyes](https://lh3.googleusercontent.com/rd-d/ALs6j_EvVO8MYyvhTG0QPYybh2E_2zRetBPuV93tAqzEAtr22aenM2JCLrrq0Dc1fzsh644tFoGqMbDkNR0F8qOg6v0LM3g7CUdqfrtFMV5lM7AabuIucaZhtQmSeuwjsKeoR5eff0DjjaljTDZZLD93BqizkovfCtvjMb2jAGu3GgGGL8UYYDRaTnsyAvsO5Ub3FOQR5cmExGRhiEyd_IDbUCEYVOQ-_Y6mmlqgs0RF-sGBeo4XeCk08a78FcK7MS60PI-Yz09iMh1pjMeW0eoSGwdPPkIF0jQBNOtvRtGW07ZlNjV0ktUDrvmmPfChdo5o4MNf2BqUYQGoQ-gW-sps2-9af60rjxkx__dpIBXFYJY_lN_flHHNjbgj9owhOrKiVNzH-Zr4-1cgWtA8UJxo9r_MDX5SL6IKySDGfsxDQc7IrKfSkWZv-MnK4Jo6BhTufMjNEhCIxXdLNOEIuIY_U2TQPaEwl_KA_MDaI2jW5NFQVRCxEYm7Wng_u0WtcHf0N_8xLziEtzge7S-AyiCpu3V5PJ2EQkKwG5Z_ES57k0JDuqihzsoouA7tXNGHKbMQo1UvU6uVcLSLLb8y6DsgZwSL8FrnV-7T_DxgQpqegbY_OgZw34CU6p6LOKBO-wD2i2g_Aadz51BqGQdYDmGcpFCC5VMsIFWnhhOjCFVBnDzm7Tph6sMdyz_3fDvYzmeIWmteWy_vWuWGexYeXSYQhST2MejutRbJsuwbVYE3etJtUaJkKW3oW6RCENB1o0nGnGX1skfqX9J0-5lGeTdq7M6rUNqWHRd-ZZez5oeZVz2RnvU0aBxoburQfaAm0fpNg4-cyh5Gkg_m8jnYvL69zA6PMzHH-iSZRY1lraEZmdb5IwhN3Hj2gSQIyqQWZVZOkirfZakR0Zvn9ah97lNJLBbutHs_ThERpIrw5SgQA9nUC12hEbqa-LkPGqLYNNsndBGPVDVV7C_Mwm7HwLyXdVLgSNFIPj0qWh4D7rMwIbQgsRi9j-3GnzNEpBXIVH4R6dwlqERAEcEkmGu9k29Self4VXH9cvE7ujh5U3ZSME96y_M=w1920-h969?auditContext=prefetch)

> **Platform Pencarian & Manajemen Daftar Film Pribadi**

**UrEyes** adalah aplikasi web modern yang dirancang untuk pecinta film. Dibangun dengan performa dan interaktivitas sebagai prioritas, aplikasi ini memungkinkan pengguna untuk menjelajahi film populer, mencari judul favorit, serta mengelola daftar tontonan (Playlist) dan film yang disukai (Likes) secara personal.

Ditenagai oleh **Astro v5**, **React**, dan **MongoDB**.

---

## ✨ Fitur Utama

- **⚡ Performa Tinggi:** Dibangun di atas Astro dengan _Server-Side Rendering_ (SSR) untuk kecepatan maksimal.
- **🔐 Autentikasi Aman:** Sistem Registrasi dan Login pengguna dengan manajemen sesi yang aman.
- **📂 Manajemen Akun:** Ubah username, password, hingga fitur _Zone of Danger_ (Hapus Akun Permanen).
- **❤️ Interaktivitas Pengguna:**
  - **Suka (Like):** Tandai film favorit Anda.
  - **Playlist:** Simpan film ke dalam daftar tontonan pribadi.
- **🔍 Pencarian Cepat:** Temukan film yang Anda cari dengan fitur pencarian yang responsif.
- **🎨 UI Modern:** Antarmuka responsif dan estetis menggunakan Tailwind CSS v4.

---

## 🛠️ Teknologi (Tech Stack)

Project ini dibangun menggunakan teknologi terkini:

| Kategori           | Teknologi                                | Versi   |
| :----------------- | :--------------------------------------- | :------ |
| **Core Framework** | [Astro](https://astro.build/)            | v5.16.1 |
| **UI Library**     | [React](https://react.dev/)              | v19.2.0 |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/) | v4.1.17 |
| **Database**       | [MongoDB](https://www.mongodb.com/)      | v7.0.0  |
| **Runtime**        | Node.js                                  | v24.xx  |

---

## 🚀 Instalasi & Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan projek ini di komputer lokal Anda.

### 1. Prasyarat

Pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (Versi LTS disarankan)
- Akun/Cluster [MongoDB Atlas](https://www.mongodb.com/atlas) atau MongoDB lokal.

### 2. Clone Repository

```bash
git clone [https://github.com/amentobing/ureyes.git](https://github.com/amentobing/ureyes.git)
cd ureyes
```

### 3. Instal Dependensi

```bash
npm install
```

### 4. Konfigurasi Environment Variables

Buat file .env di root folder projek, lalu tambahkan Connection String MongoDB Anda. Pastikan nama variabelnya sesuai dengan konfigurasi di src/lib/mongodb.js:

```env
mongoUri=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

### 5. Jalankan Server Development

```bash
npm run dev
```

Buka browser dan kunjungi http://localhost:4321.

## 📂 Struktur Projek

Berikut adalah gambaran singkat struktur folder UrEyes:

```text
/
├── public/ # Aset statis (gambar, font, dll)
├── src/
│ ├── components/ # Komponen UI (React & Astro)
│ │ ├── core/ # Komponen inti (Navbar, Head, Search)
│ │ └── ... # Komponen kartu film & aksi
│ ├── layouts/ # Layout halaman (jika ada)
│ ├── lib/ # Utilitas (Koneksi MongoDB)
│ ├── pages/ # Routing halaman & API Endpoints
│ │ ├── api/ # API Routes (JSON responses)
│ │ ├── films/ # Halaman detail film dinamis
│ │ ├── index.astro # Halaman Utama
│ │ └── ... # Halaman Auth & Profil
│ └── styles/ # Global CSS & Tailwind configuration
├── astro.config.mjs # Konfigurasi Astro
├── package.json # Dependensi projek
└── README.md # Dokumentasi ini
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda memiliki ide untuk fitur baru atau perbaikan bug:

```text
1. Fork repository ini.
2. Buat branch fitur baru (git checkout -b fitur-keren).
3. Commit perubahan Anda (git commit -m 'Menambahkan fitur keren').
4. Push ke branch tersebut (git push origin fitur-keren).
5. Buat Pull Request.
```

##

Dibuat dengan ❤️ oleh Mamen untuk Tugas Praktikum Pemrograman Web.
