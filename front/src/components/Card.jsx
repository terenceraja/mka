import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";

export default function Card({ title, children, subTitle }) {
  const theme = useTheme();
  return (
    <Box sx={styles.cardContainer} id="card">
      <Stack direction="column">
        <Typography variant="title">{title}</Typography>
        <Typography variant="subTitle">{subTitle}</Typography>
      </Stack>
      <Divider sx={{ borderColor: theme.palette.orange, marginY: "5px" }} />

      {children}
    </Box>
  );
}

/**@type {import("@mui/material".SxProps)} */
const styles = {
  cardContainer: {
    width: "100%",
    height: "auto",
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
