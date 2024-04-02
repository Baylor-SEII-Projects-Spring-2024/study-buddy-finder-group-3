import React from "react"
import styles from "@/styles/Chat.module.css";

const ChatSearch = () => {
  return (
    <div className={styles.ChatSearch}>
      <div className={styles.SearchForm}>
        <input type={"text"} placeholder={"Search for users"}/>
      </div>
      <div className={styles.UserChat}>
        <img className={styles.img} src={"https://media.licdn.com/dms/image/C5603AQG8bOUNQ71x2g/profile-displayphoto-shrink_800_800/0/1663037444325?e=2147483647&v=beta&t=EJqn0ia-yXNT9GvaVLPsIRQnXZNmpScV3lg0xGiIoEg"}/>
        <div className={styles.UserChatInfo}>
          <span>Spencer</span>
        </div>
      </div>
    </div>
  )
}
export default ChatSearch
