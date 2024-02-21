import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3000"); // Create the socket connection outside the component
const ChatComponent = () => {
  const [messageInput, setMessageInput] = useState("");

  return (
    <div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button>Send</button>
    </div>
  );
};

export default ChatComponent;
