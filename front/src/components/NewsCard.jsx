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
import { Link } from "react-router-dom";
import DownloadIcon from "./icons/DownloadIcon";
import { formatISODate } from "../utils/functions";

const NewsCard = ({ title, subtitle, date, fileName }) => {
  const theme = useTheme();

  const handleClick = () => {
    console.log("click");
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        ...styles.fileCard,
        borderLeft: `5px solid ${theme.palette.orange.main}`,
      }}
    >
      <Stack spacing={1}>
        <Typography variant="title">{title}</Typography>
        <Typography variant="subTitle">{subtitle}</Typography>
        <Typography variant="fileCard2">{formatISODate(date)}</Typography>
      </Stack>
      <Link
        to={`../../../newsPost/${fileName}`}
        download={fileName}
        target="_blank"
        rel="noreferrer"
        style={{ maxHeight: "30px", maxWidth: "30px" }}
      >
        <DownloadIcon fill={theme.palette.orange.main} />
      </Link>
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
    px: 1.5,
    py: 1,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
    width: "100%",
  },
};

export default NewsCard;
