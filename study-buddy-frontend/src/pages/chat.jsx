import React from 'react';
import ChatSidebar from "@/components/ChatSidebar";
import ChatComp from "@/components/ChatComp";
import styles from "@/styles/Chat.module.css";

const chat = () => {
  return(
    <div className={styles.chat}>
      <div className={styles.container}>
        <ChatSidebar className={styles.ChatSidebar} />
        <ChatComp className={styles.ChatComp} />
      </div>
    </div>
  );
};

export default chat;
