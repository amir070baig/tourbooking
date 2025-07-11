'use client'

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react"
import { db } from "@/lib/firebase";
import {collection, getDocs} from "firebase/firestore"


type Tour = {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  slug: string;
};


export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([])

  useEffect(() => {
    const fetchTours = async () => {
      const querySnapshot = await getDocs(collection(db, 'tours'));
      const tourList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tour[];
    setTours(tourList);
    };
    fetchTours()
  }, [])
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white shadow rounded-xl overflow-hidden">
            <Image src={tour.image} alt={tour.name} width={400} height={250} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{tour.name}</h2>
              <p className="text-gray-600">{tour.location}</p>
              <p className="text-green-600 font-bold">₹{tour.price}</p>
              <Link href={`/tours/${tour.slug}`} className="text-blue-500 mt-2 block">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
