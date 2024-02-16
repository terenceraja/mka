import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatComponent = () => {
  const [messages, setMessages] = useState("the message");
  const [messageInput, setMessageInput] = useState("");
  const socket = io.connect("http://localhost:3000"); // Replace with your server URL

  useEffect(() => {
    // Event listener for incoming messages
    socket.on("recieve_message", (data) => {
      setMessages(data);
    });
  }, [socket]);

  const sendMessage = () => {
    // Send message to server
    socket.emit("send_message", messageInput);
    setMessageInput("");
  };

  return (
    <div>
      <span>{messages}</span>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
