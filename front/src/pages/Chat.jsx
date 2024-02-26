import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from "../components/icons/SendIcon";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import MessageCard from "../components/MessageCard";

// HTTP
import { sendMessage, getChat } from "../utils/http";

const ChatComponent = () => {
  const theme = useTheme();
  console.log("color", theme.palette.orange.main);
  const [
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
  console.log("messageData", messageData);
  console.log(user);
  const [error, setError] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const messagesEndRef = useRef(null); // Reference to the chat container

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messageData]);

  // FETCH ALL MESSAGES FROM IDCHAT
  useEffect(() => {
    const fetchChat = async () => {
      try {
        //PORTFOLIOS
        const responseChat = await getChat({ IdChat: 1 });
        console.log(responseChat.data);
        // // AUTHENTIFICATION
        if (!responseChat.auth) {
          handleOpenModal();
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

  // RENDER MESSAGES
  const messageList = messageData.map((obj, key) => {
    return (
      <MessageCard
        key={key}
        IdSender={obj.IdSender}
        Message={obj.Message}
        sendTimeStamp={obj.TimeStampCreation}
        user={user}
      />
    );
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage) {
      const response = await sendMessage({
        IdChat: 1,
        IdSender: user === 1364 ? user : 13, ////// MAKE DYNAMIC,
        Message: inputMessage,
      });
      console.log("response", response);
      console.log("response timestamp", response.data.TimeStampCreation);
      if (response.auth) {
        setMessageData((prev) => [...prev, response.data]);
        setMessageToSend(response.data);
        setInputMessage("");
      }
    }
  };

  return (
    <Box sx={styles.content} id="content">
      <Box sx={styles.chatContainer} id="chatContainer">
        {messageList}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(e) => handleSendMessage(e)}
        id="form"
        height={"100%"}
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
  content: {
    display: "flex",
    flexDirection: "column",

    minHeight: "calc(100vh - 112px)",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "90%",
    maxHeight: "430px",
    overflowY: "auto",
    bgcolor: "white",
    p: 1,
    gap: "25px",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  },
};

export default ChatComponent;
