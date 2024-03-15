import React from "react";
import { useState, useRef } from "react";
import Modal from "./CustomModal";
import { Box, Typography, Divider, Button, Stack } from "@mui/material";

import { useTheme } from "@mui/material/styles";

const CollCard = ({
  IdColl,
  Name,
  Surname,
  Color,
  remove,
  Add = false,
  JoinClick,
}) => {
  const theme = useTheme();

  const [error, setError] = useState("");

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
      message: `Êtes-vous sûre de vouloir retirer le collaborateur ?`,
      confirmation: "RETIRER",
      auth: true,
    });
  };
  const handleDeleteConfirmation = () => {
    remove(IdColl);
  };

  const handleJoindre = () => {
    console.log("join");
    JoinClick();
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
          borderLeft: `15px solid ${Color}`,
        }}
      >
        <Stack
          direction="row"
          // alignItems="center"
          justifyContent={"space-between"}
          id="TOPSECTION"
        >
          <Typography minWidth={50} variant="fileCard2">
            Nom : {Surname}
          </Typography>
          <Typography variant="fileCard2">IdColl : {IdColl}</Typography>
        </Stack>
        <Typography minWidth={50} variant="fileCard2">
          Prénom : {Name}
        </Typography>

        <Divider />

        {Add ? (
          <Button
            sx={{
              width: "auto",
              p: 0,
              color: theme.palette.orange.main,
            }}
            onClick={() => handleJoindre()}
          >
            JOINDRE
          </Button>
        ) : (
          <Button
            sx={{
              width: "auto",
              p: 0,
              color: theme.palette.orange.main,
            }}
            onClick={() => handleOpenModal()}
          >
            Retirer
          </Button>
        )}
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
  icon: {
    color: "complementary.main",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
};

export default CollCard;
