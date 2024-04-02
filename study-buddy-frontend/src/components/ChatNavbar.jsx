import React from "react"
import styles from "@/styles/Chat.module.css";

const ChatNavbar = () => {
  return (
    <div className={styles.ChatNavbar}>
      <span className={styles.logo}>Study Buddy</span>
      <div className={styles.user}>
        <img className={styles.img} src="https://media.licdn.com/dms/image/C5603AQG8bOUNQ71x2g/profile-displayphoto-shrink_800_800/0/1663037444325?e=2147483647&v=beta&t=EJqn0ia-yXNT9GvaVLPsIRQnXZNmpScV3lg0xGiIoEg" alt="" />
        <span>John</span>
        <button className={styles.button}>Logout</button>
      </div>
    </div>
  )
}
export default ChatNavbar
