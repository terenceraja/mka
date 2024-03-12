import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Button } from "@mui/material";
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
      <Stack direction="column" spacing={0.5} id="TOPSECTION">
        <Typography variant="title">{title}</Typography>
        <Typography variant="subTitle">{subtitle}</Typography>
        <Typography variant="fileCard2">
          Publication : {formatISODate(date)}
        </Typography>
      </Stack>
      <Divider />
      <Link
        to={`../../../newsPost/${fileName}`}
        download={fileName}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <Button
          sx={{
            width: "auto",
            p: 0,
            color: theme.palette.orange.main,
          }}
        >
          TELECHARGER
        </Button>
      </Link>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  fileCard: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    bgcolor: "white",
    borderRadius: "4px",
    boxSizing: "border-box",
    gap: "10px",
    p: 1,
    px: 2,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  },
};

export default NewsCard;
