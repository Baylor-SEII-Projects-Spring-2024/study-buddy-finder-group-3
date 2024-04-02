import React from "react"
import styles from "@/styles/Chat.module.css";
import Message from "./Message"
const Messages = () => {
  return (
    <div className={styles.Messages}>
      <Message isOwner={true}/>
      <Message isOwner={false}/>
      <Message/>
      <Message/>
      <Message/>
    </div>
  )
}
export default Messages
