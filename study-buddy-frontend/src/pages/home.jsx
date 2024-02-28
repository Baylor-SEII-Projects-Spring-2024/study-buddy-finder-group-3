import React, { useEffect } from "react"
import Header from "@/components/Header.jsx"
import Sidebar from "@/components/Sidebar.jsx"
import { useSelector } from 'react-redux';
import { selectToken } from '@/utils/authSlice.js';
import { useRouter } from "next/router"

function home() {
  const router = useRouter();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  return (
    <>
      <Header />
      <Sidebar />
      welcome home 

    </>
  )
}

export default home
