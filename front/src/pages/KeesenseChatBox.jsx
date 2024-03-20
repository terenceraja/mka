import { useState, useEffect, useRef } from "react";

import { Stack, Box, Typography, TextField, IconButton } from "@mui/material";

import SendIcon from "../components/icons/SendIcon";
import { useTheme } from "@mui/material/styles";
import MessageCard from "../components/MessageCard";
import ReturnIcon from "../components/icons/ReturnIcon";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
// HTTP
import { sendMessage, getChat } from "../utils/http";

const KeesenseChatBox = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
  ] = useOutletContext();

  const { IdChat } = useParams();

  // SETACTIVE ROOM
  useEffect(() => {
    setActiveChatId(parseInt(IdChat));
  }, [IdChat]);

  console.log("test1", allChatList);
  // Find the object in allChatList with the specified IdChat
  const targetIdCtraCli = allChatList.find(
    (chat) => chat.IdChat === parseInt(IdChat)
  );
  // Extract the IdCtraCli value from the found object
  const IdCtraCli = targetIdCtraCli ? targetIdCtraCli.zchat.IdCtraCli : null;

  console.log("lol", IdCtraCli);
  const [error, setError] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  console.log(inputMessage);

  const messagesEndRef = useRef(null); // Reference to the chat container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messageData]);

  // FETCH ALL MESSAGES FOR IDCTRACLI ROOM
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const responseChat = await getChat(IdCtraCli);
        console.log("bap", responseChat.data);
        // // AUTHENTIFICATION
        // if (!responseChat.auth) {
        //   handleOpenModal();
        //   return;
        // }

        console.log(responseChat);
        if (responseChat.error) {
          setError(responseChat.message);
          return;
        }

        setMessageData(responseChat.data);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      }
    };

    fetchChat();
  }, []);
  //

  // // RENDER MESSAGES
  const messageList = messageData.map((obj, key) => {
    return (
      <MessageCard
        key={key}
        Name={obj.Collaborator ? obj.Collaborator.Name : obj.IdSender}
        Surname={obj.Collaborator ? obj.Collaborator.Surname : ""}
        Color={obj.Collaborator ? obj.Collaborator.Color : ""}
        Message={obj.Message}
        sendTimeStamp={obj.TimeStampCreation}
        user={user}
        IdSender={obj.IdSender}
      />
    );
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage) {
      const response = await sendMessage({
        IdChat: parseInt(IdChat),
        IdSender: user,
        Message: inputMessage,
        SenderType: "Collaborator",
      });
      console.log("response", response);
      console.log("response timestamp", response.data.TimeStampCreation);
      if (response.auth) {
        // setMessageData((prev) => [...prev, response.data]);
        setMessageToSend(response.data);
        setInputMessage("");
      }
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <Box sx={styles.mainContent} id="content">
      <Box sx={styles.header}>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <ReturnIcon onClick={handleReturn} fill="white" size="20" />
          <Typography color={"white"} variant="title">
            CLIENT NAME [GROUP]
          </Typography>
        </Stack>
      </Box>
      <Box sx={styles.chatContainer} id="chatContainer">
        {messageList}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(e) => handleSendMessage(e)}
        id="form"
        py={2}
        bgcolor={theme.palette.background.main}
      >
        <Stack
          marginX={1}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"white"}
          borderRadius={2}
          spacing={1}
          paddingX={2}
          height={"100%"}
          boxShadow={"rgba(0, 0, 0, 0.15) 0px 2px 8px"}
        >
          <TextField
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Message...
          "
            value={inputMessage}
            size="small"
            InputProps={{
              sx: {
                bgcolor: "white",
                "& fieldset": { border: "none" },
              },
            }}
            fullWidth
          />

          <IconButton
            type="submit"
            sx={{
              borderRadius: 2,
              height: "30px",
              width: "30px",
              bgcolor: theme.palette.primary.main,
            }}
          >
            <SendIcon fill={"white"} />
          </IconButton>
        </Stack>
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
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    overflowY: "auto",
    bgcolor: "white",
    p: 1,
    gap: "25px",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
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

export default KeesenseChatBox;
