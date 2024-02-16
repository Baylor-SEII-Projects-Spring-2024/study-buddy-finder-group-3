import React, { useState, useEffect } from "react"
import axios from "axios"

function ProfileDisplay() {
  const [profile, setProfile] = useState('');
  let foo = 1;
  let userId=1;//temp var
  const fetchProfileInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/profile/${userId}`);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile info:", error);
    }
  }
  

  useEffect(() => {

    fetchProfileInfo()
  }, [foo])

  return (
    <>
    <div>
      <p>{profile.emailAddress}</p>
    </div>
    </>
  )
}

export default ProfileDisplay
