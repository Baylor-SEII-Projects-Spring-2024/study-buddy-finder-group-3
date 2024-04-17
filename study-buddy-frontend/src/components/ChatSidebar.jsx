import React from "react";
import ChatNavbar from "@/components/ChatNavbar";
import ChatSearch from "@/components/ChatSearch";
import Chats from "@/components/Chats";
import styles from "@/styles/Chat.module.css";

const ChatSidebar = ({ user }) => {
  return (
    <div className={styles.ChatSidebar}>
      {/* Pass the user prop to ChatNavbar */}
      <ChatNavbar user={user} />
      {/* Pass the user prop to ChatSearch */}
      <ChatSearch user={user} />
      {/* Pass the user prop to Chats */}
      <Chats user={user} />
    </div>
  );
};

export default ChatSidebar;
