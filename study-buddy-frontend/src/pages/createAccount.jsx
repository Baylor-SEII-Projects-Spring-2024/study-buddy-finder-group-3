import React from "react"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CreateAccount from "@/components/CreateAccount";
import { useRouter } from "next/router"


function createAccount() {
  const router = useRouter()
   const handleCancel = () => {
    router.push('/')
  }
  
  return (
      <>
        <CreateAccount open={true} onClose={handleCancel} /> {}
      </>
  );
}

export default createAccount