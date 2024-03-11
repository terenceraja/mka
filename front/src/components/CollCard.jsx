import React from "react";
import { useState, useRef } from "react";
import Modal from "../components/Modal";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

// HTTP

const CollCard = ({ id, name, surname, remove }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
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
      message: `Êtes-vous sûre de vouloir supprimer le collaborateur ?`,
      confirmation: "SUPPRIMER",
      auth: false,
    });
  };
  const handleConfirmation = () => {
    console.log("delete");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // REMOVE
  const upload = async (fileToPost) => {
    const IdFile = file.IdFile;
    try {
      const response = await postFile(fileToPost, IdFile);

      // AUTHENTIFICATION
      console.log("response", response);
      if (!response.auth) {
        handleOpenModal();
        return;
      }

      setTimeout(function () {
        remove(IdFile);
        setIsSent((prev) => !prev);
      }, 3000); // Executes after 1000 milliseconds (1 second)
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // REMOVE CLICK
  const handleRemove = () => {
    console.log("remove colalb");
  };

  return (
    <>
      <Modal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Box
        sx={{
          ...styles.fileCard,
          borderLeft: `10px solid ${theme.palette.orange.main}`,
        }}
      >
        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          //   justifyContent={"center"}
          id="TOPSECTION"
        >
          <Typography variant="fileCard2">ID: {id}</Typography>

          <Typography minWidth={50} variant="fileCard2">
            Nom: {surname}
          </Typography>

          <Typography minWidth={50} variant="fileCard2">
            Prénom: {name}
          </Typography>
        </Stack>
        <Divider />

        <Button
          sx={{
            width: "auto",
            p: 0,
            color: theme.palette.orange.main,
          }}
          onClick={() => handleRemove()}
        >
          Supprimer
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
