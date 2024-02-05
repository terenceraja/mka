import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNav";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const Layout = () => {
  return (
    <>
      <Header />
      <Box component={"main"} sx={styles.mainContent}>
        <Outlet />
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Layout;

/**@type {import("@mui/material".SxProps)} */
const styles = {
  mainContent: {
    bgcolor: "background.main",
    height: "calc(100% - 112px)", // MINUS NAV & HEADER
  },
};
