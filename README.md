# 🛒 Toko Klontong - Backend API

A simple e-commerce backend built for a general store (toko klontong) to sell products online.  
This project is built using **NestJS, Prisma, PostgreSQL, and TypeScript**.

---

## 🚀 Tech Stack

- **NestJS** - Node.js framework for scalable server-side apps
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **TypeScript** - Typed JS
- **JWT Auth** - JSON Web Token-based authentication
- **Faker** - Dummy data seeder

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/toko-klontong-be.git
cd toko-klontong-be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env` dan isi dengan:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/tokoklontong"
JWT_SECRET="tokoklontong-secret"
JWT_EXPIRES_IN="1d"
```

### 4. Setup Database & Run Seeder

```bash
npx prisma migrate dev --name init
npm run seed
```

### 5. Run the Server

```bash
npm run start:dev
```

Server will run at 👉 `http://localhost:3000`

---

## 👤 Testing Credentials

Gunakan akun ini untuk login:

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

---

## 📡 API Endpoints (Ringkasan)

### Auth
- `POST /auth/register` – Register user
- `POST /auth/login` – Login dan dapatkan token
- `GET /auth/me` – Info user (JWT protected)

### Product
- `GET /products` – List produk (search, pagination)
- `GET /products/:id` – Detail produk
- `POST /products` – Tambah produk (**JWT required**)
- `PUT /products/:id` – Update produk (**JWT required**)
- `DELETE /products/:id` – Hapus produk (**JWT required**)

---

## 🧪 Seeder

Seeder akan mengisi:
- ✅ 1 admin user (`admin@gmail.com`)
- ✅ 100 dummy produk dari `faker.js`

---

## 🧼 Notes

- Semua response menggunakan format **JSON**
- Token JWT dikirim melalui **Authorization header**:
  ```
  Authorization: Bearer <token>
  ```
- UI/frontend dapat langsung mengonsumsi API ini

---

## 👨‍💻 Author

Built with passionate by Muhammad Naufal ✨