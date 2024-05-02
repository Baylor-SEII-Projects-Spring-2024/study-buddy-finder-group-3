import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Chat.module.css";
import Message from "./Message";
import axios from "axios";
import { API_URL } from "@/utils/config";

const Messages = ({ user, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const intervalRef = useRef(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/chat/getChat?senderId=${user.id}&receiverId=${selectedUser.id}`);
      setMessages(response.data); // Replace existing messages with new ones
      setLoading(false);
      scrollToBottom(); // Scroll to bottom after setting new messages
    } catch (error) {
      console.error("Error fetching messages:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear messages when selectedUser changes
    setMessages([]);
  }, [selectedUser]);

  useEffect(() => {
    if (user && selectedUser && user.id && selectedUser.id) {
      fetchMessages();
      intervalRef.current = setInterval(fetchMessages, 2000);
      return () => clearInterval(intervalRef.current);
    }
  }, [user?.id, selectedUser?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.Messages}>
      {loading && <p></p>}
      {messages.map((msg) => (
        user && <Message key={msg.id} isOwner={msg.user.id !== user.id} content={msg.content} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
