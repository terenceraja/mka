import React from "react";
import { Box } from "@mui/material";
import Form from "../components/Form";
import logo from "../assets/img/myKeeApp.png";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

const Log = () => {
  return (
    <Box component={"main"} sx={styles.mainContent}>
      <Box sx={styles.log_card}>
        <Box component={"section"} sx={styles.logo_section}>
          <img src={logo} width={"90%"} alt="logo" id="logo" />
          <Typography variant="logoSubtitle">Welcome to myKeeApp</Typography>
        </Box>
        <Form />
      </Box>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  mainContent: {
    display: "flex",
    bgcolor: "background.main",
    height: "100%", // MINUS NAV & HEADER
    justifyContent: "center",
    alignItems: "center",
  },
  log_card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "white",
    width: "100%",
    height: "70%",
    p: 5,
    gap: 5,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    boxSizing: "border-box",
  },

  logo_section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
};

export default Log;
