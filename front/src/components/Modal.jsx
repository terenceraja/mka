import React from "react";
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

const Modal = ({ setModalStateRef, onConfirmation }) => {
  const [modalState, setModalState] = useState({
    open: false,
    message: "",
    confirmation: "",
    isLoading: false,
    auth: true,
  });

  // console.log(modalState);

  useEffect(() => {
    // Store setSnackState function in the ref
    setModalStateRef.current = setModalState;
  }, [setModalStateRef]);

  const handleCloseModal = () => {
    setModalState({ ...modalState, open: false });
  };

  const handleConfirmation = async () => {
    setModalState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      await onConfirmation();
    } catch (error) {
      console.error("Confirmation error:", error);
    }
    setTimeout(() => {
      setModalState((prevState) => ({
        ...prevState,
        isLoading: false,
        open: false,
        auth: true,
      }));
    }, 1200);
  };

  return (
    <Dialog open={modalState.open}>
      <DialogTitle id="alert-dialog-title">{"CONFIRMATION"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalState.message}
        </DialogContentText>
        {modalState.isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="warning" />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {modalState.auth && <Button onClick={handleCloseModal}>Annuler</Button>}
        <Button type="submit" color="warning" onClick={handleConfirmation}>
          {modalState.confirmation}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
