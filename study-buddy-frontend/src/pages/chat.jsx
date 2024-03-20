import React from 'react';
import ChatSidebar from "@/components/ChatSidebar";
import ChatComp from "@/components/ChatComp";
import styles from "@/styles/login-create.module.css";

const Chat = () => {
  return(
    <div className={styles.chat}>
      <div className={styles.container}>
        <ChatSidebar />
        <ChatComp />
      </div>
    </div>
  );
};

export default Chat;
