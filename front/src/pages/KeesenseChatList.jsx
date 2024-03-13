import React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ClientCard from "../components/ClientCard";

const KeesenseChatList = () => {
  const theme = useTheme();
  return (
    <Box sx={styles.mainContent}>
      <Box sx={styles.header}>HEADER</Box>
      <Box sx={styles.listContainer}>
        <ClientCard />
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
  listContainer: {
    bgcolor: "background.main",
    width: "100%",
    display: "flex",
    flex: 1,
  },
  header: {
    bgcolor: "yellow",
    width: "100%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    p: 1,
  },
};

export default KeesenseChatList;
