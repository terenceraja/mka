import React from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KeesenseLayout = () => {
  const { IdColl } = useParams();

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
  console.log(user);

  // SET ONLINE USER AND IDCHAT
  useEffect(() => {
    setUser(parseInt(IdColl));
  }, []);

  // ON CONNECTION
  useEffect(() => {
    const newSocket = io.connect("http://localhost:3000"); // Create the socket connection outside the component
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);

  // ADDONLINE USERS IN ARRAY
  useEffect(() => {
    if (socket === null) return;
    const userData = { IdUser: user, userType: "collaborator" };
    socket.emit("addNewUser", userData);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // SEND MESSAGING
  useEffect(() => {
    if (socket === null) return;
    let a = user === 1364 ? 13 : 1364;
    console.log("USER TO SEND TO", a);
    socket.emit("sendMessage", {
      messageToSend,
      recipientUser: user === 1364 ? 13 : 1364, ////// MAKE DYNAMIC
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
        messageToSend,
        setMessageToSend,
        sendTimeStamp,
        setSendTimeStamp,
        recievedMessage,
        setRecievedMessage,
        messageData,
        setMessageData,
        user,
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
