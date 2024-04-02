import React from "react"
import styles from "@/styles/Chat.module.css";
import Message from "./Message"
const Messages = () => {
  return (
    <div className={styles.Messages}>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
    </div>
  )
}
export default Messages
