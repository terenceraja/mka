import React from "react";
import { Button, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ClientCard from "../components/ClientCard";

//HTTPL
import { getAllChatIdColl, triggerFM } from "../utils/http";
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
    allClientInfo,
    setAllClientInfo,
  ] = useOutletContext();
  const [error, setError] = useState("");
  console.log(allClientInfo);
  const { IdColl } = useParams();

  // //IMPORT NAMES FROM FM
  useEffect(() => {
    const getClientName = async () => {
      try {
        if (allChatList.length > 0) {
          const myArray = allChatList.map((obj, key) => {
            return obj.zchat.IdCtraCli;
          });
          console.log(myArray);
          const jsonString = JSON.stringify(myArray); // Serialize array to JSON string
          FileMaker.PerformScript("RecieveDataFromWebApp", jsonString);
        }
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      }
    };
    getClientName();
  }, [allChatList]);

  // useEffect hook to listen for messages from the window object
  useEffect(() => {
    // Event listener function to handle changes in the window object
    const handleWindowData = (event) => {
      if (event.detail) {
        // JSONparse data
        const data = JSON.parse(event.detail);
        setAllClientInfo(data);
      }
    };
    // Listen for the custom event dispatched in index.html
    window.addEventListener("fileMakerDataUpdated", handleWindowData);
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("fileMakerDataUpdated", handleWindowData);
    };
  }, []);

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
    let LastMsg = "";
    let LastDate = "";

    // Check if msgArray is not empty before accessing its properties
    if (msgArray.length > 0) {
      const lastPosition = msgArray.length - 1;
      LastMsg = msgArray[lastPosition].Message;
      LastDate = msgArray[lastPosition].TimeStampCreation;
    }

    return (
      <ClientCard
        key={key}
        Client={obj.zchat.IdCtraCli}
        IdColl={IdColl}
        IdChat={obj.IdChat}
        Name={
          allClientInfo && allClientInfo[key + 1]
            ? allClientInfo[key + 1].Name
            : ""
        }
        LastName={
          allClientInfo && allClientInfo[key + 1]
            ? allClientInfo[key + 1].LastName
            : ""
        }
        // LastMsg={LastMsg}
        // LastDate={LastDate}
      />
    );
  });
  return (
    <Box sx={styles.mainContent}>
      {/* <Button onClick={getClientName}></Button> */}
      <Box sx={styles.header}>
        <Typography color={"white"} variant="title">
          CHAT LIST
        </Typography>
      </Box>
      <Box sx={styles.listContainer}>
        {chatList.length > 0 ? (
          chatList
        ) : (
          <Typography p={1} variant="subTitle">
            Aucuns chats disponibles
          </Typography>
        )}
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
