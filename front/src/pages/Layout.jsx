import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNav";
import { Box } from "@mui/material";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//HTTP
import { getChatId } from "../utils/http";

const Layout = () => {
  // GET CLI ID FROM STORE
  const IdCtraCli = useSelector((state) => state.keys.value.IdCtraCli);

  const [chatId, setChatId] = useState(null);
  const [user, setUser] = useState(null);
  console.log("COLLABS ARRAY", user);
  const [collabs, setCollabs] = useState([]);

  const [messageToSend, setMessageToSend] = useState("");
  const [sendTimeStamp, setSendTimeStamp] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState("the message");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageData, setMessageData] = useState([]);
  // console.log("onlineUsers", onlineUsers);
  console.log("CLIENT MESSAGE SENT", messageToSend);
  console.log("CLIENT RECIEVE MESSAGE", recievedMessage);
  console.log(user);

  // SET ONLINE USER AND IDCHAT
  useEffect(() => {
    const getChatIdForIdCtraCli = async () => {
      const response = await getChatId(IdCtraCli);
      console.log("SET ONLINE USER", response);

      // ID USER
      const userId = response.data.IdCtraCli;
      setUser(userId);

      //COLLABS ARRAY IN GROUP CHAT
      const collabsArray = response.data.zchatcolls;
      const collabsInject = collabsArray.map((collab) => {
        return collab.IdColl;
      });
      setCollabs(collabsArray);

      // //IDCHAT
      const IdChat = response.data.IdChat;
      setChatId(IdChat);
    };
    getChatIdForIdCtraCli();
  }, [messageData]);

  // ON CONNECTION
  useEffect(() => {
    const newSocket = io.connect("https://mykeeapp.keesystem.com:4000"); // Create the socket connection outside the component
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);

  // ADD ONLINE USERS IN ARRAY
  useEffect(() => {
    if (!socket || !chatId) return; // Ensure socket and chatId are defined
    const userData = {
      IdUser: user,
      userType: "client",
      room: [chatId],
    };
    socket.emit("addNewUser", userData);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, chatId]);

  // JOIN ROOM
  useEffect(() => {
    if (!socket || !chatId) return; // Ensure socket and chatId are defined
    socket.emit("joinRoom", [chatId]);
  }, [socket, chatId]); // Listen for changes in socket and chatId

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
      setMessageData((prev) => [...prev, res]);
    });

    return () => socket.off("getMessage");
  }, [socket]);

  return (
    <>
      <Header />
      <Box component={"main"} sx={styles.mainContent}>
        <Outlet
          context={[
            collabs,

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
            chatId,
            setChatId,
          ]}
        />
        {/* <Footer /> */}
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Layout;

/**@type {import("@mui/material".SxProps)} */
const styles = {
  mainContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // bgcolor: "background.main",

    height: "calc(100% - 112px)", // MINUS NAV & HEADER
    // padding: "10px 0px 0px 0px",
    overflow: "auto",
    maxWidth: "100vw",
  },
};
