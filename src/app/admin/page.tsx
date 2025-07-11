'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import AdminGuard from '@/components/AdminGuard';

export default function AdminPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', price: '', location: '', image: '', slug: '', description: '' });

  useEffect(() => {
    fetchTours()
  },[])

  const fetchTours = async() => {
    const snapshot = await getDocs(collection(db, 'tours'))
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setTours(list)
  }

  const handleSubmit = async () => {
    try{
      await addDoc(collection(db, 'tours'), {
        ...form,
        price: parseFloat(form.price)
      });
      toast.success('Tour Added')
      fetchTours()
    }catch(err){
      toast.error("Error adding tour")
      console.error('Error:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tours', id));
      toast.success('Deleted');
      fetchTours();
    } catch {
      toast.error('Error deleting');
    }
  };

  return(
    <AdminGuard>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Tours</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {['name', 'location', 'slug', 'image', 'description', 'price'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder={`Enter ${field}`}
              value={form[field as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
        </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mb-8">
          Add Tour
        </button>

        <h2 className="text-xl font-semibold mb-2">All Tours</h2>
        <ul className="space-y-3">
          {tours.map((tour) => (
            <li key={tour.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{tour.name}</p>
                <p className="text-sm text-gray-500">{tour.location} – ₹{tour.price}</p>
              </div>
              <button onClick={() => handleDelete(tour.id)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </AdminGuard>
  )
}