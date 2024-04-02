import React from "react"
import ChatNavbar from "@/components/ChatNavbar"
import ChatSearch from "@/components/ChatSearch"
import Chats from "@/components/Chats"
import styles from "@/styles/Chat.module.css";

const ChatSidebar = () => {
  return (
    <div className={styles.ChatSidebar}>
      <ChatNavbar />
      <ChatSearch />
      <Chats />
    </div>
  )
}
export default ChatSidebar
