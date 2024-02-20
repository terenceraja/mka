import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";

import LogoutIcon from "./icons/LogoutIcon";

import Modal from "./Modal";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Header = () => {
  const setModalStateRef = useRef(null); // Create a ref to store setSnackState function
  // Function to trigger state change in Snack component
  const triggerModalStateChange = (newState) => {
    if (setModalStateRef.current) {
      setModalStateRef.current(newState); // Update Snack component state using the stored function
    }
  };

  console.log(setModalStateRef.current);

  const dispatch = useDispatch();
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

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <Box component="img" width={30} src="/src/assets/kslogo.png" />
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
