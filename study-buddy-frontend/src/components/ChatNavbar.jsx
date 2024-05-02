import React from "react"
import styles from "@/styles/Chat.module.css"
import { Link } from "@mui/material"
import { router } from "next/client"

const navigateToProfile = () => {
  router.push("/profile")
}

const ChatNavbar = () => {
  return (
    <div className={styles.ChatNavbar}>
      <span className={styles.logo}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Messages</span>
      <div className={styles.user}>
        <Link href="/profile">
          <a className={`${styles.button} ${styles.rounded}`} style={{ fontSize: "15px", padding: "5px 10px" }}>
            Profile
          </a>
        </Link>
      </div>
    </div>
  )
}
export default ChatNavbar
