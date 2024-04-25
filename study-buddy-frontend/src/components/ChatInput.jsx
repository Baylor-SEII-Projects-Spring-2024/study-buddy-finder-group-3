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
        user: user, // Assuming user is an object containing necessary user data
        receiver: selectedUser, // Assuming selectedUser is an object containing necessary user data
        content: inputValue.trim()
      });

      console.log("Message sent successfully:", response.data);

      // Clear the input field after sending the message
      setInputValue("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // setErrorMessage("Failed to send message. Please try again later.");
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
      {/*{errorMessage && <div className={styles.ErrorMessage}>{errorMessage}</div>}*/}
    </div>
  );
};

export default ChatInput;
