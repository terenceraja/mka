import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ClientCard = ({ Client, IdChat }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Card clicked", IdChat);
    navigate(`/keesense/chat/${IdChat}`);
  };
  return (
    <Box sx={styles.card} onClick={handleClick}>
      <Stack direction={"column"} spacing={1}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="title">{Client}</Typography>
          <Typography variant="subTitle">last date</Typography>
        </Stack>

        <Typography variant="subTitle">lastmessage</Typography>
      </Stack>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  card: {
    bgcolor: "white",
    width: "100%",
    height: "75px",
    p: 2,
    borderBottom: "1px solid rgba(169, 169, 169, 0.3)",
    "&:hover": {
      bgcolor: "#f0f0f0", // Example: change background color on hover
      cursor: "pointer", // Example: change cursor to pointer on hover
    },
  },
};

export default ClientCard;
