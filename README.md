# 🌱 Backend KCA — Life Management API

Backend RESTful API untuk aplikasi manajemen pola hidup terpadu yang dirancang bagi anak muda, mahasiswa perantauan, hingga pasangan baru yang sedang menata kemandirian. Aplikasi ini mengintegrasikan dua pilar utama:

- **Manajemen Aktivitas (Routine Tracker):** Membantu pengguna tetap produktif dan terstruktur dengan fitur penjadwalan aktivitas harian—mulai dari perencanaan agenda untuk hari esok hingga pencatatan rutinitas dari pagi hingga malam.

- **Manajemen Keuangan (Financial Planner):** Membantu pengelolaan arus kas yang sehat melalui pencatatan pemasukan dan pengeluaran manual, yang sangat krusial bagi mereka yang baru memulai hidup mandiri atau membangun rumah tangga.

Tersedia di platform Website maupun Mobile, API ini dirancang untuk memastikan pola hidup pengguna tetap sehat, produktif, dan stabil secara finansial.

Dibangun dengan **Node.js**, **Express.js**, dan **Sequelize ORM** dengan database **MySQL**.

---

## 🎯 Tentang Aplikasi

> **"Hidup mandiri itu susah, tapi bisa diatur!"**

Saat pertama kali kuliah jauh dari rumah, banyak anak muda yang kesulitan mengatur uang, waktu, dan gaya hidup. **Backend KCA** hadir sebagai solusi backend untuk aplikasi yang membantu mereka:

- 💸 **Catat Keuangan Secara Manual** — Setiap pemasukan (uang dari orang tua, beasiswa, kerja sampingan) dan pengeluaran (kos, makan, transportasi, dll.) bisa dicatat dengan detail: kategori, jumlah, tanggal, dan catatan.
- 🏃 **Kelola Aktivitas Harian** — Buat daftar aktivitas (olahraga, belajar, dll.) dengan kategori *kesehatan* atau *produktif*, lalu pantau statusnya dari Pending → On Progress → Done.
- 📊 **Dashboard Ringkasan** — Lihat gambaran besar kondisi keuangan dan aktivitas dalam satu tampilan.
- 👤 **Profil Pengguna** — Lengkapi profil dengan foto dan bio untuk pengalaman yang lebih personal.

**Target Pengguna:** Mahasiswa baru, anak muda usia 17–22 tahun yang hidup merantau dan butuh kontrol atas keuangan serta pola hidup mereka.

**Platform:** 🌐 Website & 📱 Mobile (Android/iOS)

---

## 🛠️ Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| Node.js | - | Runtime JavaScript |
| Express.js | ^5.2.1 | Web framework |
| Sequelize | ^6.37.7 | ORM untuk database |
| MySQL2 | ^3.18.2 | Driver database MySQL |
| JWT (jsonwebtoken) | ^9.0.3 | Autentikasi token |
| Bcrypt | ^6.0.0 | Hashing password |
| Multer | ^2.1.0 | Upload file/gambar |
| Express Validator | ^7.3.1 | Validasi request body |
| Cors | ^2.8.6 | Cross-Origin Resource Sharing |
| Dotenv | ^17.3.1 | Manajemen environment variable |
| Nodemon | ^3.1.14 | Auto-restart development server |

---

## 📁 Struktur Proyek

```
Backend-KCA/
├── src/
│   ├── app.js                  # Entry point aplikasi
│   ├── config/
│   │   └── database.js         # Konfigurasi koneksi database
│   ├── db/
│   │   ├── migrations/         # File migrasi database
│   │   ├── models/             # Model Sequelize
│   │   └── seeders/            # Data seeder
│   ├── http/
│   │   ├── user/               # Modul User (auth & profil)
│   │   │   ├── controller.js
│   │   │   ├── router.js
│   │   │   └── service.js
│   │   ├── finance/            # Modul Finance (keuangan)
│   │   │   ├── controller.js
│   │   │   ├── router.js
│   │   │   └── service.js
│   │   ├── activities/         # Modul Activities (aktivitas)
│   │   │   ├── controller.js
│   │   │   ├── router.js
│   │   │   └── service.js
│   │   └── dashboard/          # Modul Dashboard (ringkasan)
│   │       ├── controller.js
│   │       ├── route.js
│   │       └── service.js
│   ├── middlewares/
│   │   ├── midlewareJwt/       # Middleware verifikasi JWT
│   │   ├── middlewareUser/     # Validasi data user
│   │   ├── middlewareFinance/  # Validasi data keuangan
│   │   ├── middlewareactivities/ # Validasi data aktivitas
│   │   ├── middlewareHabits/   # Middleware habits
│   │   ├── middlewareHabitLogs/# Middleware habit logs
│   │   └── multer.js           # Konfigurasi upload file
│   ├── payloads/               # Payload/DTO definitions
│   └── uploads/                # Folder penyimpanan file upload
├── .env                        # Environment variable (tidak di-commit)
├── .env.example                # Contoh environment variable
├── .sequelizerc                # Konfigurasi Sequelize CLI
├── package.json
└── README.md
```

---

## ⚙️ Instalasi & Konfigurasi

### 1. Clone Repository

```bash
git clone <url-repository>
cd Backend-KCA
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Salin file `.env.example` menjadi `.env` lalu isi sesuai konfigurasi database kamu:

```bash
cp .env.example .env
```

Isi variabel berikut di file `.env`:

```env
DB_USERNAME=root
DB_PASS=password_kamu
DB_NAME=nama_database
DB_HOST=127.0.0.1
DB_DIALECT=mysql
```

### 4. Jalankan Migrasi Database

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 5. (Opsional) Jalankan Seeder

```bash
npx sequelize-cli db:seed:all
```

### 6. Jalankan Server

```bash
# Development (dengan nodemon)
npm run dev
```

Server akan berjalan di **http://localhost:3000**

---

## 🗄️ Skema Database

### Tabel `user`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | INTEGER (PK, AI) | Primary key |
| username | STRING(50) UNIQUE | Username unik |
| email | STRING(100) UNIQUE | Email unik |
| password | STRING | Password ter-hash (bcrypt) |
| profile | STRING | Foto profil (opsional) |
| description | TEXT | Deskripsi/bio pengguna |
| cover | STRING | Foto cover profil |
| createdAt | DATE | Waktu dibuat |
| updatedAt | DATE | Waktu diperbarui |

### Tabel `finance`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | INTEGER (PK, AI) | Primary key |
| user_id | INTEGER (FK) | Referensi ke tabel user |
| type | ENUM | `pemasukan` / `pengeluaran` |
| category | STRING(100) | Kategori transaksi |
| amount | DECIMAL | Jumlah uang |
| date | DATE | Tanggal transaksi |
| note | TEXT | Catatan tambahan |
| createdAt | DATE | Waktu dibuat |
| updatedAt | DATE | Waktu diperbarui |

### Tabel `activities`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | INTEGER (PK, AI) | Primary key |
| user_id | INTEGER (FK) | Referensi ke tabel user |
| title | STRING(100) | Judul aktivitas |
| description | STRING | Deskripsi aktivitas |
| status | ENUM | `1` = Pending, `2` = On Progress, `3` = Done |
| categories | ENUM | `kesehatan` / `produktif` |
| createdAt | DATE | Waktu dibuat |
| updatedAt | DATE | Waktu diperbarui |

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/api`

> 🔒 Endpoint yang memerlukan autentikasi harus menyertakan header:
> `Authorization: Bearer <token>`

---

### 👤 User & Autentikasi

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Registrasi pengguna baru |
| `POST` | `/api/auth/login` | ❌ | Login & dapatkan JWT token |
| `GET` | `/api/user` | ❌ | Ambil data semua user |
| `PATCH` | `/api/update/user` | ✅ | Update profil user (support upload foto) |
| `PATCH` | `/api/update/password` | ✅ | Update password pengguna |

#### Contoh Request Register
```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Contoh Response Login
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 💰 Finance (Keuangan)

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| `GET` | `/api/finance/` | ✅ | Ambil semua data keuangan milik user |
| `POST` | `/api/finance/create` | ✅ | Tambah transaksi baru |
| `PATCH` | `/api/finance/update/:id` | ✅ | Update transaksi berdasarkan ID |
| `DELETE` | `/api/finance/delete/:id` | ✅ | Hapus transaksi berdasarkan ID |

#### Contoh Request Create Finance
```json
POST /api/finance/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "pemasukan",
  "category": "Gaji",
  "amount": 5000000,
  "date": "2026-07-14",
  "note": "Gaji bulan Juli"
}
```

---

### 🏃 Activities (Aktivitas)

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| `GET` | `/api/activities/` | ✅ | Ambil semua aktivitas milik user |
| `POST` | `/api/activities/create` | ✅ | Buat aktivitas baru |
| `PATCH` | `/api/activities/update/:id` | ✅ | Update aktivitas berdasarkan ID |
| `DELETE` | `/api/activities/delete/:id` | ✅ | Hapus aktivitas berdasarkan ID |

#### Contoh Request Create Activity
```json
POST /api/activities/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Olahraga pagi",
  "description": "Jogging 30 menit",
  "categories": "kesehatan"
}
```

**Status Aktivitas:**
- `1` → Pending (belum dimulai)
- `2` → On Progress (sedang berjalan)
- `3` → Done (selesai)

---

### 📊 Dashboard

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| `GET` | `/api/dashboard/` | ✅ | Ambil ringkasan data (finance & activities) |

---

## 🔐 Autentikasi JWT

Setelah login berhasil, server akan mengembalikan JWT token. Gunakan token tersebut di setiap request yang membutuhkan autentikasi dengan menyertakannya di header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📤 Upload File

Endpoint update profil user mendukung upload gambar untuk foto profil dan foto cover. File dikirim menggunakan `multipart/form-data`.

File yang berhasil diupload disimpan di folder `src/uploads/` dan dapat diakses melalui:

```
GET http://localhost:3000/uploads/<nama-file>
```

---

## 🧪 Scripts

```bash
# Jalankan server development (hot-reload)
npm run dev

# Migrasi database
npx sequelize-cli db:migrate

# Rollback migrasi
npx sequelize-cli db:migrate:undo

# Jalankan seeder
npx sequelize-cli db:seed:all

# Rollback seeder
npx sequelize-cli db:seed:undo:all
```

---

## 📝 Catatan Penting

- Pastikan **MySQL** sudah berjalan sebelum menjalankan server.
- Timezone server diset ke **Asia/Jakarta** (WIB) secara otomatis.
- File `.env` **tidak boleh** di-commit ke repository (sudah ada di `.gitignore`).
- Port default server adalah **3000**.

---

## 👨‍💻 Dibuat Untuk

Proyek ini dibuat sebagai bagian dari ujian backend **Backend-KCA** — sebuah solusi nyata untuk membantu generasi muda yang baru memasuki dunia perkuliahan agar dapat hidup mandiri dengan lebih teratur, baik dari sisi **finansial** maupun **gaya hidup sehari-hari**.

---

<p align="center">
  <b>🌱 Mulai hidup mandiri dengan lebih teratur bersama Backend KCA</b><br/>
  <i>Tersedia di 🌐 Website & 📱 Mobile</i>
</p>