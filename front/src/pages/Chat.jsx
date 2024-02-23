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
  console.log("color", theme.palette.orange);
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

        // Scroll to the bottom of the chat container
        // scrollToBottom();
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      }
    };

    fetchChat(); // Call the renamed local function
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
      >
        <Stack direction={"row"} spacing={1}>
          <TextField
            onChange={(e) => setInputMessage(e.target.value)}
            label="Message..."
            variant="standard"
            fullWidth
            value={inputMessage}
          />

          <IconButton type="submit" sx={{ paddingBottom: "0px" }}>
            <SendIcon fill={"#ef8026"} />
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
    gap: "10px",
    height: "100%",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "500px",
    maxHeight: "450px",
    overflowY: "auto",
    bgcolor: "white",
    p: 1,
    gap: "25px",
  },
};

export default ChatComponent;
