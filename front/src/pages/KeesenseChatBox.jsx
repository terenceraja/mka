import { useState, useEffect, useRef } from "react";

import {
  Stack,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Popover,
} from "@mui/material";

import QuestIcon from "../components/icons/QuestIcon";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "../components/icons/SendIcon";
import { useTheme } from "@mui/material/styles";
import MessageCard from "../components/MessageCard";
import ReturnIcon from "../components/icons/ReturnIcon";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
// HTTP
import { sendMessage, getChat, getChatId } from "../utils/http";

const KeesenseChatBox = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const actions = [
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];
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

  const { IdChat } = useParams();

  // SETACTIVE ROOM
  useEffect(() => {
    setActiveChatId(parseInt(IdChat));
  }, [IdChat]);

  // Find the object in allChatList with the specified IdChat
  const targetIdCtraCli = allChatList.find(
    (chat) => chat.IdChat === parseInt(IdChat)
  );
  // Extract the IdCtraCli value from the found object
  const IdCtraCli = targetIdCtraCli ? targetIdCtraCli.zchat.IdCtraCli : null;

  const [error, setError] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null); // Reference to the chat container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messageData]);

  // SETTING MEMBER FOR MEMBER BUTTON
  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const response = await getChatId(IdCtraCli);
        console.log("response all collab memebers IdChat/IdCtraCli", response);

        setMembers(response.data.zchatcolls);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      }
    };

    fetchCollabs();
  }, []);

  // FETCH ALL MESSAGES FOR IDCTRACLI ROOM
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const responseChat = await getChat(IdCtraCli);
        console.log("response all msg from chat", responseChat.data);
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
      console.log("response message sent", response);
      // console.log("response timestamp", response.data.TimeStampCreation);
      if (response.auth) {
        setMessageData((prev) => [...prev, response.data]);
        setMessageToSend(response.data);
        setInputMessage("");
      }
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  // RENDER MEMBERS TAGS
  const memberList = members.map((obj, key) => {
    return (
      <Typography
        key={key} // Add a unique key prop here
        borderRadius={1}
        p={0.5}
        bgcolor={obj.zcoll.Color}
        variant="title"
      >
        {obj.zcoll.Name} {obj.zcoll.Surname}
      </Typography>
    );
  });

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
    <Box sx={styles.mainContent} id="content">
      <Box sx={styles.header}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          justifyContent={"space-between"}
        >
          <ReturnIcon onClick={handleReturn} fill="white" size="20" />
          <Typography color={"white"} variant="title">
            CLIENT {IdCtraCli}
          </Typography>
        </Stack>
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
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack sx={{ p: 1 }} direction={"column"} spacing={1}>
              <Typography
                borderRadius={1}
                p={0.5}
                sx={{ border: `solid 1px lightgrey` }}
                // bgcolor={obj.zcoll.Color}
                variant="title"
              >
                Client {IdCtraCli}
              </Typography>
              {memberList}
            </Stack>
          </Popover>
        </>
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
    justifyContent: "space-between",
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
