# 🕌 Agra Tour Booking Website

A complete end-to-end **Next.js 14 + Firebase** powered **Tour Booking Platform** built for a real client from Agra, India 🇮🇳.  
This app enables users to explore, book, and manage tours with ease — and includes a powerful **Admin Panel**.

> 🔥 Deployed Live → [tourbooking.vercel.app](https://tourbooking-two.vercel.app/)

---

## ✨ Features

- 🔐 Firebase Auth (Login, Logout, Session Persistence)
- 🧭 Browse All Tours
- 🧾 Tour Details Page with Booking Option
- 📒 "My Bookings" Page for Users
- 🧑‍💼 Admin Panel:
  - ➕ Add Tours
  - ❌ Delete Tours
- ✅ Firestore CRUD Integration
- 💨 Responsive, Fast, and Fully Functional
- 🌐 SEO Optimized and Vercel Deployed

---

## ⚙️ Tech Stack

| Tech           | Role                         |
|----------------|------------------------------|
| **Next.js 14** | Fullstack React Framework    |
| **Firebase**   | Auth + Firestore + Hosting   |
| **Tailwind CSS** | Styling and Layout         |
| **Vercel**     | Deployment                   |
| **TypeScript** | Type Safety and DX           |

---

## 📁 Folder Structure (Highlights)

```bash
src/
├── app/
│   ├── (auth)/login
│   ├── (auth)/register
│   ├── my-bookings
│   ├── admin
│   ├── tours/[slug]
├── components/
│   └── AdminGuard.tsx
├── lib/
│   └── firebase.ts
