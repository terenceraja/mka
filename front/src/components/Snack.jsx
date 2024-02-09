import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import Slide from "@mui/material/Slide";
import { useEffect } from "react";

// HTTP
import { postFile } from "../utils/http";

const Snack = ({ setSnackStateRef }) => {
  const [snackState, setSnackState] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    // Store setSnackState function in the ref
    setSnackStateRef.current = setSnackState;
  }, [setSnackStateRef]);

  const handleClose = () => {
    setSnackState({
      ...snackState,
      open: false,
    });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackState.open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert severity={snackState.severity} onClose={handleClose}>
        {snackState.message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
