import React from "react";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// UTILS
import { formatDate, formatTime } from "../utils/functions";

const MessageCard = ({ IdSender, Message, sendTimeStamp, user }) => {
  const theme = useTheme();
  return (
    <Stack
      sx={styles.messageCard}
      direction={"column"}
      alignItems={IdSender === user ? "end" : "start"}
    >
      <Stack
        sx={styles.messageTag}
        style={{
          backgroundColor:
            IdSender === user ? theme.palette.orange.light : "white",
          color: theme.palette.darkBlue.main,
        }}
        direction={"column"}
      >
        <Typography variant="messageLabel">{IdSender}</Typography>

        <Typography sx={{ overflowWrap: "break-word", marginY: "5px" }}>
          {Message}
        </Typography>
        <Stack direction={"row"} justifyContent={"start"} spacing={2}>
          <Typography variant="messageLabel" marginLeft={"5px"}>
            {sendTimeStamp && formatDate(sendTimeStamp)}
          </Typography>
          <Typography
            variant="messageLabel"
            textAlign={"end"}
            marginRight={"5px"}
          >
            {sendTimeStamp && formatTime(sendTimeStamp)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  messageTag: {
    height: "auto",
    width: "max-content",
    maxWidth: "70%",
    borderRadius: "10px",
    boxSizing: "border-box",
    padding: 1,

    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
  },
  messageCard: {
    width: "100%",
  },
};
export default MessageCard;
