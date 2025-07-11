'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, query, where, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';


interface Booking {
  id: string,
  tourName: string,
  price: number,
};

export default function MyBookingsPage () {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(!user){
        router.push("/")
      } else{
        await fetchBookings(user.uid)
      }
      setLoading(false)
    });

    return () => unsubscribe()
  },[])

  const fetchBookings = async (uid: string) => {
    const q = query(collection(db, 'bookings'), where('userId', '==', uid));
    const snapshot = await getDocs(q)
    const list = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}) as Booking)
    setBookings(list)
  }

  const handleDelete = async (id: string) => {
    try{
      await deleteDoc(doc(db, 'bookings', id))
      setBookings(bookings.filter((b) => b.id !== id))
    }catch(error){
      console.error('Error deleting booking:', error);
    }
  }

  return(
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id} className="mb-2 border p-3 rounded flex justify-between items-center">
              <div>
                <p>{b.tourName}</p>
                <p className="text-sm text-gray-500">{b.price}</p>
              </div>
              <button onClick={() => handleDelete(b.id)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}