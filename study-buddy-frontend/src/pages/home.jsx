import React, { useEffect } from "react"
import Header from "@/components/Header.jsx"
import Sidebar from "@/components/Sidebar.jsx"
import { useSelector } from 'react-redux';
import { selectToken } from '@/utils/authSlice.js';
import { useRouter } from "next/router"

function home() {
  const router = useRouter();
  const token = useSelector(selectToken);
  console.log('token in home', token)

  useEffect(() => {
    if (!token) {
      console.log('no token, routing to landing')
      router.push('/');
    }
  }, [token, router]);

  return (
    <>
      <Header />
      <Sidebar />

    </>
  )
}

export default home
