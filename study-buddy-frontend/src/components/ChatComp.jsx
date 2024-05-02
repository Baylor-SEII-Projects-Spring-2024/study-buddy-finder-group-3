import React, { useEffect, useState } from "react"
import styles from "@/styles/Chat.module.css"
import Messages from "@/components/Messages"
import ChatInput from "@/components/ChatInput"
import axios from "axios"
import { API_URL } from "@/utils/config"

const ChatComp = ({ user, selectedUser }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${selectedUser.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (selectedUser) {
      fetchUserData();
    } else {
      console.error("No selected user");
    }
  }, [selectedUser]);

  return (
    <div className={styles.ChatComp}>
      <div className={styles.chatInfo}>
        {userData ? (
          <span>{selectedUser.username}</span>
        ) : (
          <span>Select a User to Chat With</span>
        )}
      </div>
      <Messages user={user} selectedUser={selectedUser} />
      <ChatInput user={user} selectedUser={selectedUser} />
    </div>
  );
};

export default ChatComp;
