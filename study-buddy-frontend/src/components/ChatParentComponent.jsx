import styles from "@/styles/Chat.module.css"
import ChatComp from "@/components/ChatComp"
import ChatSidebar from "@/components/ChatSidebar"
import React, { useState } from "react"

const ChatParentComponent = ({ user }) => {
  const [chatData, setChatData] = useState(null);

  const handleUserSelect = (selectedUser) => {
    console.log("Selected User in ChatParentComponent:", selectedUser);
    setChatData(selectedUser);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
        <ChatComp className={styles.ChatComp} user={user} selectedUser={chatData} />
        <ChatSidebar className={styles.ChatSidebar} user={user} onUserSelect={handleUserSelect} SelectedUser={chatData} />
      </div>
    </div>
  );
};

export default ChatParentComponent;
