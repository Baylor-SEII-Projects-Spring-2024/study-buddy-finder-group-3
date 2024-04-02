import React, {useState} from "react"
import styles from "@/styles/Chat.module.css";

const ChatInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      // Construct the message object
      const message = {
        content: inputValue,
        // Add any other necessary properties like sender, timestamp, etc.
      };

      // Clear the input field after sending the message
      setInputValue("");

      // Send the message to the server or handle it as required
      console.log("Sending message:", message);
    }
  };

  return (
    <div className={styles.Input}>
      <input type={"text"} placeholder={"Type something..."}
      value={inputValue} onChange={handleInputChange}/>
      <div className={styles.Send}>
        <img src={""} alt={""} />
        <input type={"file"} style={{display:"none"}} id={"file"}/>
        <label htmlFor={"file"}>
          <img src={""} alt={""} />
        </label>
        <button onClick={sendMessage}>Send</button> {/* Bind onClick event to sendMessage function */}
      </div>
    </div>
  )
}
export default ChatInput
