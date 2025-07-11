'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return(
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Tour Booking</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link href="/my-bookings">My Bookings</Link>
            {user?.email === 'amirbaig070@gmail.com' && (
              <Link href="/admin">Admin</Link>
            )}
            <button
              onClick={() => signOut(auth)}
              className="text-red-600 ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>  
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  )
}