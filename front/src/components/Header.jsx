import React from "react";
import { AppBar, Toolbar, Box, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "./icons/LogoutIcon";
import ReturnIcon from "./icons/ReturnIcon";

import { useTheme } from "@mui/material/styles";

import Modal from "./Modal";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const theme = useTheme();

  const setModalStateRef = useRef(null); // Create a ref to store setSnackState function
  // Function to trigger state change in Snack component
  const triggerModalStateChange = (newState) => {
    if (setModalStateRef.current) {
      setModalStateRef.current(newState); // Update Snack component state using the stored function
    }
  };

  // console.log(setModalStateRef.current);
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    triggerModalStateChange({
      ...setModalStateRef.current,
      open: true,
      message: `Cette action mettra fin à votre session. Êtes-vous certain de vouloir 
      vous déconnecter?`,
      auth: true,
      confirmation: "SE DECONNECTER",
    });
  };

  const handleConfirmation = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  const handleReturn = () => {
    navigate(-1);
  };

  // RETURN BUTTON LOGIC
  const showReturn = () => {
    if (
      path !== "/layout/ptf" &&
      path !== "/layout/doc" &&
      path !== "/layout/quest" &&
      path !== "/layout/news/posts" &&
      path !== "/layout/chat"
    ) {
      return true;
    }
    return false;
  };

  console.log("return", showReturn());

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <Box
            onClick={() => navigate("/layout/ptf")}
            component="img"
            width={30}
            src="/src/assets/img/kslogo.png"
          />
          {showReturn() ? (
            <ReturnIcon onClick={handleReturn} fill="white" />
          ) : (
            <></>
          )}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        <LogoutIcon fill="white" onClick={handleOpenModal} />
      </Toolbar>

      <Modal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
    </AppBar>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  appBar: {
    display: "flex",
    justifyContent: "center",
    bgcolor: "primary.main",
    height: "56px",
  },
};

export default Header;
