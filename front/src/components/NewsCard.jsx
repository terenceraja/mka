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

import { formatISODate } from "../utils/functions";

// HTTP
import { downloadNews } from "../utils/http";

const NewsCard = ({ title, subtitle, date, fileName, filePath }) => {
  const theme = useTheme();

  const handleDownload = async () => {
    console.log("DOWNLOAD !!!")
    try {
      const path = { path: filePath };
      const response = await downloadNews(path);
      // Create a blob from the response
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}`; // Set desired file name
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Box
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
      <Button
        onClick={() => handleDownload()}
        sx={{
          width: "auto",
          p: 0,
          color: theme.palette.orange.main,
        }}
      >
        TELECHARGER
      </Button>
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
