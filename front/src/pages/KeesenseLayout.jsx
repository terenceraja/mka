import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

const KeesenseLayout = () => {
  const { IdColl } = useParams();
  const [allChatList, setAllChatLIst] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [user, setUser] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [sendTimeStamp, setSendTimeStamp] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState("the message");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    setUser(parseInt(IdColl));
  }, [user]);

  // ON CONNECTION
  useEffect(() => {
    const newSocket = io.connect("http://localhost:3000"); // Create the socket connection outside the component
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);

  // JOIN ROOM
  useEffect(() => {
    if (!socket || !chatId) return; // Ensure socket and chatId are defined
    socket.emit("joinRoom", chatId);
  }, [socket, chatId /*activeChatId*/]); // Listen for changes in socket and chatId

  // ADDONLINE USERS IN ARRAY
  useEffect(() => {
    if (!socket || !chatId) return;
    const userData = { IdUser: user, userType: "collaborator", room: chatId };
    socket.emit("addNewUser", userData);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, chatId]);

  // SEND MESSAGING
  useEffect(() => {
    if (socket === null) return;

    socket.emit("sendMessage", {
      messageToSend,
    });
  }, [messageToSend, sendTimeStamp]);

  // // RECIEVE MESSAGING
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      console.log("GET MESSAGE TRIGGERED !!!");
      console.log("recieving", res);
      console.log("check !!!", res.IdChat);
      console.log("active !!!", activeChatId);
      if (res.IdChat === activeChatId) {
        setMessageData((prev) => [...prev, res]);
      }
    });

    return () => socket.off("getMessage");
  }, [socket, activeChatId]);

  return (
    <Outlet
      context={[
        activeChatId,
        setActiveChatId,
        chatId,
        setChatId,
        allChatList,
        setAllChatLIst,
        messageToSend,
        setMessageToSend,
        sendTimeStamp,
        setSendTimeStamp,
        recievedMessage,
        setRecievedMessage,
        messageData,
        setMessageData,
        user,
        setUser,
      ]}
    />
  );
};

export default KeesenseLayout;

/**@type {import("@mui/material".SxProps)} */
const styles = {
  mainContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "calc(100vh - 112px)", // MINUS NAV & HEADER
    overflow: "auto",
    maxWidth: "100vw",
  },
};
