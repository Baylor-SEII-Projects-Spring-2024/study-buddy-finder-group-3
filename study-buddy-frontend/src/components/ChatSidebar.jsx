import React, { useEffect, useState } from "react"
import styles from "@/styles/Chat.module.css"
import ChatNavbar from "@/components/ChatNavbar"
import Chats from "@/components/Chats"
import axios from "axios"
import { API_URL } from "@/utils/config"

const ChatSidebar = ({ user, onUserSelect, SelectedUser }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${API_URL}/friends/${user.id}/all`);
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
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
      <Chats user={user} friends={friends} onUserSelect={onUserSelect} selectedUser={SelectedUser} />
    </div>
  );
};

export default ChatSidebar;
