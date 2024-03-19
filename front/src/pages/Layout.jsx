import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNav";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

//HTTP
import { getChatId } from "../utils/http";

const Layout = () => {
  // GET CLI ID FROM STORE
  const IdCtraCli = useSelector((state) => state.keys.value.IdCtraCli);

  // const [chatId, setChatId] = useState(null);
  const [user, setUser] = useState(null);
  const [collabs, setCollabs] = useState([]);
  console.log("COLLABS ARRAY", collabs);
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
    const getChatIdForIdCtraCli = async () => {
      const response = await getChatId(IdCtraCli);
      console.log(response);
      // setChatId(response.data.IdChat);

      // ID USER
      const userId = response.data.IdCtraCli;
      setUser(userId);

      //COLLABS ARRAY IN GROUP CHAT
      const collabsArray = response.data.zchatcolls;
      const collabsInject = collabsArray.map((collab) => {
        return collab.IdColl;
      });
      setCollabs(collabsInject);
    };
    getChatIdForIdCtraCli();
  }, []);

  // GET CHAT ID
  useEffect(() => {
    const newSocket = io.connect("http://localhost:3000"); // Create the socket connection outside the component
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);

  // ON CONNECTION
  useEffect(() => {
    const newSocket = io.connect("http://localhost:3000"); // Create the socket connection outside the component
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);

  // ADD ONLINE USERS IN ARRAY
  useEffect(() => {
    if (socket === null) return;
    const userData = { IdUser: user, userType: "client" };
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

    console.log("USERS TO SEND TO", collabs); /////////////CONTINUE HERE
    socket.emit("sendMessage", {
      messageToSend,
      recipientUser: collabs, ////// MAKE DYNAMIC
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
    <>
      <Header />
      <Box component={"main"} sx={styles.mainContent}>
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

    height: "calc(100vh - 112px)", // MINUS NAV & HEADER
    // padding: "10px 0px 0px 0px",
    overflow: "auto",
    maxWidth: "100vw",
  },
};
