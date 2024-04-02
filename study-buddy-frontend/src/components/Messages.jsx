import React from "react"
import styles from "@/styles/Chat.module.css";
import Message from "./Message"

const Messages = () => {
  return (
    <div className={styles.Messages}>
      <Message isOwner={true}><p>This is an example</p></Message>
      <Message isOwner={false} />
      <Message isOwner={true} />
      <Message />
    </div>
  )
}
export default Messages
