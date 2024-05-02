import React from "react"
import styles from "@/styles/Chat.module.css"

const ChatSearch = () => {
  return (
    <div className={styles.ChatSearch}>
      <div className={styles.SearchForm}>
        <input type={"text"} placeholder={"Search for users"}/>
      </div>
    </div>
  )
}
export default ChatSearch
