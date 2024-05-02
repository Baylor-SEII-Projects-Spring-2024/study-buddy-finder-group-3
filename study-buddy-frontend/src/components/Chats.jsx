import React, { useEffect, useState } from "react"
import styles from "@/styles/Chat.module.css";
import axios from "axios"
import { API_URL } from "@/utils/config"


const Chats = ({ friends, onUserSelect, selectedUser }) => {


  const handleUserClick = (selectedUser) => {
    onUserSelect(selectedUser);
  };



  return (
    <div className={styles.Chats}>
      <h2>Your Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li
            key={friend.id}
            onClick={() => handleUserClick(friend)}
            className={selectedUser && friend.id === selectedUser.id ? styles.SelectedUser : ""}
          >
            <div className={styles.UserChat}>
              <div className={styles.UserChatInfo}>
                <span>{friend.username}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
