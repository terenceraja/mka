import React from "react";
import { useState, useRef } from "react";
import Modal from "./CustomModal";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

const CollCard = ({ IdColl, Name, Surname, Color, remove }) => {
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
          spacing={2}
          alignItems="center"
          //   justifyContent={"center"}
          id="TOPSECTION"
        >
          <Typography variant="fileCard2">IdColl: {IdColl}</Typography>

          <Typography minWidth={50} variant="fileCard2">
            Nom: {Surname}
          </Typography>

          <Typography minWidth={50} variant="fileCard2">
            Prénom: {Name}
          </Typography>
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
          Retirer
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
