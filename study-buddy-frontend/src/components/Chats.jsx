import React from "react";
import styles from "@/styles/Chat.module.css";

const Chats = ({ friends, onUserSelect, selectedUser }) => {
  const handleUserClick = (selectedUser) => {
    // Call the onUserSelect callback with the selected user data
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
              {/*<img className={styles.img} src={friend} alt={friend.username} />*/}
              <div className={styles.UserChatInfo}>
                <span>{friend.username}</span>
                {/*<p>{friend.statusMessage}</p>*/}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
