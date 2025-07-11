'use client'

import { db, auth } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

type Tour = {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  description: string;
  slug: string;
};

export default function TourDetailPage() {
  const { slug } = useParams();
  const [tour, setTour] = useState<Tour | null>(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'tours'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tour[];
        const found = data.find((t) => t.slug === slug);
        setTour(found || null);
      } catch (error) {
        console.error('Error fetching tour:', error);
        toast.error('Failed to load tour');
      }
    };

    if (slug) fetchTour();
  }, [slug]);

  const handleBooking = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast.error('Please login to book');
      return;
    }

    if (!tour || !tour.id || !tour.name || !tour.price) {
      toast.error('Tour data is incomplete');
      return;
    }

    try {
      console.log('Booking Data:', {
        userId: user.uid,
        tourId: tour.id,
        tourName: tour.name,
        price: tour.price,
      });

      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        tourId: tour.id,
        tourName: tour.name,
        price: tour.price,
        createdAt: new Date(),
      });

      toast.success('Tour booked');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Booking failed');
    }
  };

  if (!tour) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Image
        src={tour.image}
        alt={tour.name}
        width={800}
        height={400}
        className="rounded-lg object-cover w-full"
      />
      <h1 className="text-3xl font-bold mt-6">{tour.name}</h1>
      <p className="text-gray-500">{tour.location}</p>
      <p className="text-green-700 font-bold text-lg mt-2">₹{tour.price}</p>
      <p className="mt-4 text-gray-700">{tour.description}</p>
      <button
        onClick={handleBooking}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        Book This Tour
      </button>
    </div>
  );
}
