'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminGuard({children}:{children: React.ReactNode}){
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if(!user || user.email !== 'amirbaig070@gmail.com'){
      router.push("/")
    } else{
      setLoading(false)
    }
  })
  return () => unsubscribe()
  },[]);

  if(loading){
    return <div className='p-6 text-center'>Checking access....</div>
  }

  return<>{children}</>
}