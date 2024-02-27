import React, { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InfoIcon from "./icons/InfoIcon";
import { useTheme } from "@mui/material/styles";
import ViewFileIcon from "./ViewFileIcon";

const NewsCard = ({ title, subtitle, date }) => {
  const theme = useTheme();

  const handleClick = () => {
    console.log("click");
  };

  return (
    <Box onClick={handleClick} sx={styles.fileCard}>
      <Stack>
        <Typography variant="fileCard2">{title}</Typography>
        <Typography variant="fileCard2">{subtitle}</Typography>
        <Typography variant="fileCard2">{date}</Typography>
      </Stack>
      <ViewFileIcon fill={theme.palette.orange.main} />
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  fileCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: "white",
    boxSizing: "border-box",
    p: 1.5,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
    width: "100%",
  },
};

export default NewsCard;
