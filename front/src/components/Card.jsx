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
      <Stack direction="column" marginTop={1} marginBottom={2}>
        <Typography variant="title">{title}</Typography>
        <Typography variant="subTitle">{subTitle}</Typography>
      </Stack>

      {children}
      <Divider
        sx={{
          borderColor: theme.palette.orange,
          marginTop: 2,
          marginBottom: 1,
        }}
      />
    </Box>
  );
}

/**@type {import("@mui/material".SxProps)} */
const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    px: 2,
    bgcolor: "card.main",
    boxShadow: "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px",
    flexGrow: 1,
  },

  labelTitle: {
    bgcolor: "primary.main",
    borderRadius: "4px",
    boxSizing: "border-box",
    paddingLeft: "5px",
    paddingTop: "2px",
  },
};
