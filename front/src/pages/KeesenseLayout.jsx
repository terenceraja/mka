import React from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KeesenseLayout = () => {
  const { IdColl } = useParams();

  const [allChatList, setAllChatLIst] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [user, setUser] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [sendTimeStamp, setSendTimeStamp] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState("the message");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageData, setMessageData] = useState([]);
  // console.log("onlineUsers", onlineUsers);
  console.log("hey", messageToSend);
  console.log("recieved message", recievedMessage);
  console.log("ALLCHATLISTFORCOLLAB", chatId);
  console.log("lol0", user);

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
    socket.emit("joinRoom", 7);
  }, [socket, chatId]); // Listen for changes in socket and chatId

  // ADDONLINE USERS IN ARRAY
  useEffect(() => {
    if (!socket || !chatId) return; // Ensure socket and chatId are defined
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
      room: chatId,
    });
  }, [messageToSend, sendTimeStamp]);

  // // RECIEVE MESSAGING
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      console.log("recieving", res);
      setMessageData((prev) => [...prev, res]);
    });

    return () => socket.off("getMessage");
  }, [socket]);

  return (
    <Outlet
      context={[
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
    // bgcolor: "background.main",

    height: "calc(100vh - 112px)", // MINUS NAV & HEADER
    // padding: "10px 0px 0px 0px",
    overflow: "auto",
    maxWidth: "100vw",
  },
};
