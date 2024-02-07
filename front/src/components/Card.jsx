import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function Card({ title, children }) {
  return (
    <Box sx={styles.cardContainer}>
      <Typography variant="labelTitle" component="div">
        {title}
      </Typography>
      <Divider
        sx={{ borderColor: "complementary.main", marginBottom: "10px" }}
      />

      {children}
    </Box>
  );
}

/**@type {import("@mui/material".SxProps)} */
const styles = {
  cardContainer: {
    width: "100%",
    p: 1,
    bgcolor: "card.main",
    boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
  },

  labelTitle: {
    bgcolor: "primary.main",
    borderRadius: "4px",
    boxSizing: "border-box",
    paddingLeft: "5px",
    paddingTop: "2px",
  },
};
