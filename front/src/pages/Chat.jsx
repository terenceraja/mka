import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ChatComponent = () => {
  const [
    messageToSend,
    setMessageToSend,
    sendTimeStamp,
    setSendTimeStamp,
    recievedMessage,
    setRecievedMessage,
  ] = useOutletContext();

  const [inputMessage, setInputMessage] = useState("");
  console.log(inputMessage);

  const handleSendMessage = () => {
    setMessageToSend(inputMessage);
    setSendTimeStamp(Date.now());
  };
  return (
    <div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={() => handleSendMessage()}>Send</button>
      <span>{recievedMessage}</span>
    </div>
  );
};

export default ChatComponent;
