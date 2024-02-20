import React, { useEffect } from "react"
import ProfileDisplay from "@/components/ProfileDisplay"
import { useSelector } from 'react-redux';
import { selectToken } from '@/utils/authSlice.js';

function profiles() {
  const token = useSelector(selectToken);
  console.log('token in profiles', token)

  return (
    <>
      <h1>Profiles</h1>
      <ProfileDisplay/>
    </>
  )
}

export default profiles
