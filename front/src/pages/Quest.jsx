import * as React from "react";
import { Box } from "@mui/material";

export default function BasicTable() {
  return (
    <Box sx={styles.content} id="content">
      Quest
    </Box>
  );
}

/**@type {import("@mui/material".SxProps)} */
const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 112px)",
    // gap: "10px",
  },
};
