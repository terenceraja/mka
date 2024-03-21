import { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  Stack,
  Alert,
  IconButton,
  TextField,
  Box,
  Popover,
  Typography,
} from "@mui/material";
import SendIcon from "../components/icons/SendIcon";
import { useTheme } from "@mui/material/styles";
import MessageCard from "../components/MessageCard";
import QuestIcon from "../components/icons/QuestIcon";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// HTTP
import { sendMessage, getChat } from "../utils/http";

const ChatComponent = () => {
  console.log("IM MOUNTING");
  const { IdCtraCli } = useParams();

  const theme = useTheme();
  const [
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
  ] = useOutletContext();

  console.log(user);
  const [error, setError] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const messagesEndRef = useRef(null); // Reference to the chat container

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messageData]);

  // FETCH ALL MESSAGES FOR IDCTRACLI
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const responseChat = await getChat(IdCtraCli);
        console.log(`response all msg for ${IdCtraCli}`, responseChat.data);
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

  // RENDER MESSAGES
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

  console.log("collabe", collabs);
  // RENDER MEMBERS TAGS
  const memberList = collabs.map((obj, key) => {
    return (
      <Typography
        borderRadius={1}
        p={0.5}
        bgcolor={obj.zcoll.Color}
        variant="title"
      >
        {obj.zcoll.Name} {obj.zcoll.Surname}
      </Typography>
    );
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage) {
      console.log("YOLOYOYOYO", chatId);
      const response = await sendMessage({
        IdChat: chatId,
        IdSender: user,
        Message: inputMessage,
        SenderType: "Client",
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

  // HANDLE POPOVER
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={styles.content} id="content">
      <Box sx={styles.chatContainer} id="chatContainer">
        {messageList}
        <div ref={messagesEndRef} />
      </Box>

      {error ? (
        <Alert
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          severity="success"
          color="info"
        >
          {error}
        </Alert>
      ) : (
        <Stack
          bgcolor={theme.palette.background.main}
          direction={"row"}
          alignItems={"center"}
          px={2}
          spacing={2}
        >
          <>
            <QuestIcon
              fill={theme.palette.orange.main}
              onClick={handlePopoverClick}
            />

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Stack sx={{ p: 1 }} direction={"column"} spacing={1}>
                <Typography
                  borderRadius={1}
                  p={0.5}
                  sx={{ border: `solid 1px lightgrey` }}
                  variant="title"
                >
                  Client {IdCtraCli}
                </Typography>

                {memberList}
              </Stack>
            </Popover>
          </>

          <Box
            component="form"
            autoComplete="off"
            onSubmit={(e) => handleSendMessage(e)}
            id="form"
            height={"100%"}
            py={2}
            flex={1}
            bgcolor={theme.palette.background.main}
          >
            <Stack sx={styles.formContainer}>
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
        </Stack>
      )}
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
  formContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "white",
    borderRadius: 2,
    px: 2,
    height: "100%",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
    bgcolor: "white",
  },
};

export default ChatComponent;
