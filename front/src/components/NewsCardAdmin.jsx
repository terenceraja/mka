import React from "react";
import { useState, useRef } from "react";
import Modal from "./CustomModal";
import Snack from "../components/Snack";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

const NewsCardAdmin = ({ IdNews, Date, Title, Subtitle, remove }) => {
  const theme = useTheme();

  //MODAL
  const setModalStateRef = useRef(null); // Create a ref to store setSnackState function
  // Function to trigger state change in Snack component
  const triggerModalStateChange = (newState) => {
    if (setModalStateRef.current) {
      setModalStateRef.current(newState); // Update Snack component state using the stored function
    }
  };

  const handleOpenModal = () => {
    triggerModalStateChange({
      ...setModalStateRef.current,
      open: true,
      message: `Êtes-vous sûre de vouloir supprimer l'article ?`,
      confirmation: "SUPPRIMER",
      auth: true,
    });
  };

  const handleDeleteConfirmation = () => {
    remove(IdNews);
  };

  return (
    <>
      <Modal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleDeleteConfirmation}
      />
      <Box
        sx={{
          ...styles.fileCard,
          borderLeft: `5px solid ${theme.palette.orange.main}`,
        }}
      >
        <Stack direction="column" spacing={1} id="TOPSECTION">
          <Typography variant="fileCard2">Titre : {Title}</Typography>
          <Typography variant="fileCard2">Sous-titre : {Subtitle}</Typography>
          <Typography variant="fileCard2">Publication : {Date}</Typography>
        </Stack>
        <Divider />

        <Button
          sx={{
            width: "auto",
            p: 0,
            color: theme.palette.orange.main,
          }}
          onClick={() => handleOpenModal()}
        >
          SUPPRIMER
        </Button>
      </Box>
    </>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  fileCard: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    bgcolor: "white",
    borderRadius: "4px",
    boxSizing: "border-box",
    gap: "10px",
    p: 1,
    px: 2,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  },
};

export default NewsCardAdmin;
