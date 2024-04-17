import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/utils/authSlice";
import axios from "axios";
import { API_URL } from "@/utils/config";
import styles from "@/styles/Chat.module.css";

const ChatInput = ({ currentUser }) => {
  const [inputValue, setInputValue] = useState("");
  const user = useSelector(selectUser)
  const [userId, setUserid] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async () => {
    if (inputValue.trim() !== "") {
      try {
        const response = await axios.post(`${API_URL}/chat/send`, {
          content: inputValue,
          user_id: currentUser.id, // Assuming currentUser has an id property
          receiver: currentUser.id /* Logic to determine receiver user */, // You need to determine the receiver user
        });

        // Handle successful response if needed
        console.log("Message sent successfully:", response.data);

        // Clear the input field after sending the message
        setInputValue("");
      } catch (error) {
        // Handle errors from the server
        console.error("Error sending message:", error);
      }
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
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInput;
