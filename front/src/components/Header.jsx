import React from "react";
import { AppBar, IconButton, Toolbar, Box, Grow } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton onClick={() => console.log("openSideBAr")}>
          <MenuIcon />
        </IconButton>
        <Box component="img" width={30} src="/src/assets/kslogo.png" />
        <Box sx={{ flexGrow: 1 }} />
        <LogoutIcon />
      </Toolbar>
    </AppBar>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  appBar: {
    bgcolor: "primary.main",
  },
};

export default Header;
