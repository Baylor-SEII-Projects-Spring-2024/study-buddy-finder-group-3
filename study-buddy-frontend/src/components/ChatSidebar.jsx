// ChatSidebar.jsx

import React, { useState, useEffect } from "react";
import styles from "@/styles/Chat.module.css";
import ChatNavbar from "@/components/ChatNavbar";
import ChatSearch from "@/components/ChatSearch";
import Chats from "@/components/Chats"; // Import Chats component
import axios from "axios";
import { API_URL } from "@/utils/config";

const ChatSidebar = ({ user, onUserSelect }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${API_URL}/friends/${user.id}/all`);
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
        // Handle the error state or retry logic here
      }
    };

    if (user) {
      fetchFriends();
    } else {
      console.error("No user found");
    }
  }, [user]);

  return (
    <div className={styles.ChatSidebar}>
      <ChatNavbar user={user} />
      <ChatSearch user={user} />
      {/* Pass the onUserSelect callback prop to Chats */}
      <Chats user={user} friends={friends} onUserSelect={onUserSelect} />
    </div>
  );
};

export default ChatSidebar;
