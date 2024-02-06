import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
const Footer = () => {
  return (
    <Box sx={styles.footer}>
      <Typography variant="labelTitle">Contact :</Typography>
      <Typography variant="navLink">TEL : XXXXXXXXXX</Typography>
      <Typography variant="navLink">E-MAIL : XXXXXXXXXX</Typography>
      <Typography variant="navLink">Powered by KeeSystem</Typography>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100px",
    p: 2,
    borderRadius: 1,
    bgcolor: "card.main",
    gap: "5px",
    marginTop: 10,
  },
};

export default Footer;
