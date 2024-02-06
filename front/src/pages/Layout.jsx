import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNav";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
const Layout = () => {
  return (
    <>
      <Header />
      <Box component={"main"} sx={styles.mainContent}>
        <Outlet />
        <Footer />
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
    p: 1,
    overflow: "auto",
  },
};
