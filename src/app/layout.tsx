import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/Navbar";



export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
