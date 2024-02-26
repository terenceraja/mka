import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
const Footer = () => {
  return (
    <Box sx={styles.footer} id="footer">
      <Typography variant="labelTitle">CONTACT</Typography>
      <Typography variant="navLink">tel: 00.00.00.00.00</Typography>
      <Typography variant="navLink">e-mail: user@gmail.com</Typography>
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
    // marginTop: "20px",
  },
};

export default Footer;
