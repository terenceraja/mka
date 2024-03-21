import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ClientCard from "../components/ClientCard";

//HTTPL
import { getAllChatIdColl } from "../utils/http";
const KeesenseChatList = () => {
  const [
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
    lastMsg,
    setLastMsg,
    lastDate,
    setLastDate,
  ] = useOutletContext();
  const [error, setError] = useState("");
  console.log("last", lastDate);
  const { IdColl } = useParams();
  useEffect(() => {
    const fetchAllChatForColl = async () => {
      try {
        const response = await getAllChatIdColl(IdColl); //TEMPORARY IDCOLL, MUST BE INJECTED BY PARAMS
        console.log(`response allchatlist for collab ${IdColl}`, response);

        setAllChatLIst(response.data);

        setUser(parseInt(IdColl));

        //ROOMS ARRAY WHERE COLLAB IS IN
        const allChatList = response.data;
        const roomsArray = allChatList.map((chat) => {
          return chat.IdChat;
        });
        setChatId(roomsArray);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      }
    };
    fetchAllChatForColl();
  }, []);

  const theme = useTheme();

  // RENDER CHAT LIST FOR COLL
  const chatList = allChatList.map((obj, key) => {
    const msgArray = obj.zchat.zchatmsgs;
    const lastPosition = msgArray.length - 1;
    const LastMsg = msgArray[lastPosition].Message;
    const LastDate = msgArray[lastPosition].TimeStampCreation;

    return (
      <ClientCard
        key={key}
        Client={obj.zchat.IdCtraCli}
        IdColl={IdColl}
        IdChat={obj.IdChat}
        LastMsg={LastMsg}
        LastDate={LastDate}
      />
    );
  });

  return (
    <Box sx={styles.mainContent}>
      <Box sx={styles.header}>
        <Typography color={"white"} variant="title">
          CHAT LIST
        </Typography>
      </Box>
      <Box sx={styles.listContainer}>
        {chatList.length > 0 ? chatList : "nochat"}
      </Box>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  mainContent: {
    bgcolor: "red",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  listContainer: {
    bgcolor: "background.main",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
  },
  header: {
    bgcolor: "primary.main",
    width: "100%",
    height: "55px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    py: 1,
    px: 2,
  },
};

export default KeesenseChatList;
