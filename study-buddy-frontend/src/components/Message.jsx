import React from "react"
import styles from "@/styles/Chat.module.css";
const Message = ({ isOwner }) => {
  return (
    <div className={`${styles.message} ${isOwner ? styles.owner : styles.nonOwner}`}>
      <div className={styles.messageInfo}>
        <img
          src="/StudyBuddyLogo.png"
          alt="Profile Picture"
        />
        {/*<span>just now</span>*/}
      </div>
      <div className={styles.messageContent}>
        <p>hello</p>
        {/*{<img*/}
        {/*  src="/StudyBuddyLogo Background Removed.png"*/}
        {/*  alt="Logo"*/}
        {/*/>}*/}
      </div>
    </div>
  )
}
export default Message
