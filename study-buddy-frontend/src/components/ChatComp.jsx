import React, { useState, useEffect } from "react";
import styles from "@/styles/Chat.module.css";
import Messages from "@/components/Messages";
import ChatInput from "@/components/ChatInput";
import axios from "axios"; // Import Axios for making HTTP requests
import { API_URL } from "@/utils/config"; // Assuming you have an API_URL constant

const ChatComp = ({ user, selectedUser }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Use the selected user's ID to fetch their data
        const response = await axios.get(`${API_URL}/users/${selectedUser.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error state or retry logic here
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
        {/*<div className={styles.chatIcons}>*/}
        {/*  /!*{selectedUser.profilePicture}*!/*/}
        {/*</div>*/}
      </div>
      <Messages user={user} selectedUser={selectedUser} />
      <ChatInput user={user} selectedUser={selectedUser} />
    </div>
  );
};

export default ChatComp;
