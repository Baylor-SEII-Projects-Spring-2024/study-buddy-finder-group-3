import React from "react"
import styles from "@/styles/Chat.module.css";

const ChatInput = () => {
  return (
    <div className={styles.Input}>
      <input type={"text"} placeholder={"Type something..."}/>
      <div className={styles.Send}>
        <img src={""} alt={""} />
        <input type={"file"} style={{display:"none"}} id={"file"}/>
        <label htmlFor={"file"}>
          <img src={""} alt={""} />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}
export default ChatInput
