import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useState } from "react";

import ClientCard from "../components/ClientCard";

const KeesenseChatList = () => {
  const [error, setError] = useState("");

  const theme = useTheme();
  const chatList = [
    <ClientCard key={1} />,
    <ClientCard key={2} />,
    <ClientCard key={3} />,
    <ClientCard key={4} />,
    <ClientCard key={5} />,
    <ClientCard key={6} />,
    <ClientCard key={7} />,
    <ClientCard key={8} />,
    <ClientCard key={9} />,
    <ClientCard key={10} />,
  ];

  return (
    <Box sx={styles.mainContent}>
      <Box sx={styles.header}>
        <Typography color={"white"} variant="title">
          CHAT LIST
        </Typography>
      </Box>
      <Box sx={styles.listContainer}>{chatList}</Box>
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
  listContainer: {
    bgcolor: "background.main",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
  },
  header: {
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

export default KeesenseChatList;
