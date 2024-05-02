import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/config";
import styles from "@/styles/Chat.module.css";

const ChatInput = ({ user, selectedUser }) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async () => {
    if (!selectedUser) {
      // setErrorMessage("Please select a user to send a message.");
      return;
    }

    if (inputValue.trim() === "") {
      // setErrorMessage("Message content cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/chat/send`, {
        user: user,
        receiver: selectedUser,
        content: inputValue.trim()
      });

      console.log("Message sent successfully:", response.data);

      setInputValue("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={styles.Input}>
      <input
        type={"text"}
        placeholder={"Type something..."}
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className={styles.Send}>
        <button onClick={sendMessage} style={{ borderRadius: "10px" }}>Send</button>
      </div>
    </div>
  );
};

export default ChatInput;
