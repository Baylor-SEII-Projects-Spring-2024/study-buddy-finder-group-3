import React, { useState, useEffect } from "react";
import styles from "@/styles/Chat.module.css";
import Messages from "@/components/Messages";
import ChatInput from "@/components/ChatInput";
import axios from "axios"; // Import Axios for making HTTP requests
import { API_URL } from "@/utils/config"; // Assuming you have an API_URL constant

const ChatComp = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${user.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error state or retry logic here
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div className={styles.ChatComp}>
      <div className={styles.chatInfo}>
        {userData ? (
          <span>{userData.username}</span>
        ) : (
          <span>Loading user data...</span>
        )}
        <div className={styles.chatIcons}>
          {/* Display user icons or images */}
        </div>
      </div>
      <Messages />
      <ChatInput />
    </div>
  );
};

export default ChatComp;
