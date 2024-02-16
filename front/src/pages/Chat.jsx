import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const ChatComponent = () => {
  const [messages, setMessages] = useState("the message");
  const [messageInput, setMessageInput] = useState("");

  const socket = io.connect("http://localhost:3000"); // Create the socket connection outside the component

  useEffect(() => {
    // Event listener for incoming messages
    socket.on("receive_message", (data) => {
      setMessages(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, []); // Empty dependency array ensures that this effect runs only once

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
