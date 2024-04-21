import React from "react";
import styles from "@/styles/Chat.module.css";

const Message = ({ isOwner, content }) => {
  return (
    <div className={`${styles.message} ${isOwner ? styles.owner : styles.nonOwner}`}>
      <div className={styles.messageContent}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Message;
