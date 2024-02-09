import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

//MODAL LOGOUT
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

// REDUCER
import { clearStore } from "../reducers/primaryKeys";

const Modal = ({ setModalStateRef }) => {
  const [modalState, setModalState] = useState({
    open: false,
    message: "",
    confirmation: "",
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Store setSnackState function in the ref
    setModalStateRef.current = setModalState;
  }, [setModalStateRef]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModalState({ ...modalState, open: false });
  };

  const handleLogout = () => {
    setIsLoggingOut((prev) => !prev);
    dispatch(clearStore());
    setTimeout(() => {
      setIsLoggingOut((prev) => !prev);
      setModalState({ ...modalState, open: false });
      navigate("/");
    }, 1200);
  };

  return (
    <Dialog open={modalState.open} onClose={handleCloseModal}>
      <DialogTitle id="alert-dialog-title">{"CONFIRMATION"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalState.message}
        </DialogContentText>
        {isLoggingOut && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="warning" />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Anuller</Button>
        <Button color="warning" onClick={handleLogout}>
          {modalState.confirmation}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
