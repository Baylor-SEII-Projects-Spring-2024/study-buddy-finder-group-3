import { useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { setUser, logout } from "@/utils/authSlice"
import { API_URL } from "./config"
import { setToken } from "@/utils/authSlice"

const ValidateToken = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Retrieve token from cookies
        const cookies = document.cookie.split(";")
        console.log("cookies", cookies)
        let token = null
        cookies.forEach((cookie) => {
          const [name, value] = cookie.split("=")
          if (name.trim() === "token") {
            token = value
          }
        })

        if (token) {
          console.log("grabbed token from cookie", token)
          const response = await axios.get(`${API_URL}/auth/validateToken`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log("server token response", response)
          dispatch(setUser(response.data))
          dispatch(setToken(token))
        } else {
          console.log("Token not found in cookie")
          dispatch(logout())
        }
      } catch (error) {
        console.log("Token validation failed:", error)
        dispatch(logout())
      }
    }

    validateToken()
  }, [dispatch])

  return null
}

export default ValidateToken
