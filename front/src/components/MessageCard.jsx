import React from "react";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
// UTILS
import { formatDate, formatTime } from "../utils/functions";

const MessageCard = ({ IdSender, Message, sendTimeStamp }) => {
  return (
    <Stack sx={styles.messageCard} direction={"column"}>
      <Typography variant="messageLabel" marginLeft={"5px"}>
        {sendTimeStamp && formatDate(sendTimeStamp)}
      </Typography>
      <Stack
        display={"flex"}
        sx={styles.messageTag}
        style={{ backgroundColor: IdSender === 1364 ? "red" : "white" }}
        direction={"column"}
      >
        <Typography sx={{ width: "auto", overflowWrap: "break-word" }}>
          {Message}
        </Typography>
      </Stack>
      <Typography variant="messageLabel" textAlign={"end"} marginRight={"5px"}>
        {sendTimeStamp && formatTime(sendTimeStamp)}
      </Typography>
    </Stack>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  messageTag: {
    height: "auto",
    width: "auto",
    borderRadius: "10px",
    boxSizing: "border-box",
    padding: 1,

    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
  },
  messageCard: {
    maxWidth: "70%",
  },
};
export default MessageCard;
