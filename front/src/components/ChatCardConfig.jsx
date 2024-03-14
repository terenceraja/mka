import React from "react";
import { useState, useRef } from "react";
import CustomModal from "./CustomModal";
import { useNavigate } from "react-router-dom";
import Snack from "../components/Snack";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";

import UploadIcon from "./icons/UploadIcon";

import { useTheme } from "@mui/material/styles";

//UTILS
import { fileChecker } from "../utils/fileChecker";

// HTTP
import { postFile } from "../utils/http";

const ChartCardConfig = ({ date, title, desc, file, remove }) => {
  const theme = useTheme();
  const [isSent, setIsSent] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // console.log("selected file", selectedFile);

  const navigate = useNavigate();

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
      message: `Session expiré ou token indisponible, vous allez être redirigé à la page de connexion`,
      confirmation: "SE RECONNECTER",
      auth: false,
    });
  };
  const handleConfirmation = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // POST FILE
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

      setSelectedFile(null);
      setIsSent((prev) => !prev);

      setTimeout(function () {
        remove(IdFile);
        setIsSent((prev) => !prev);
      }, 3000); // Executes after 1000 milliseconds (1 second)
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // SUBMIT CLICK
  const handleUpload = () => {
    upload(selectedFile);
  };

  return (
    <>
      <CustomModal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Box sx={styles.fileCard}>
        <Stack spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="fileCard2"> ID Client :</Typography>
            <Typography variant="fileCard2"> groupe : X pers.</Typography>
          </Stack>
          <Typography minWidth={50} variant="fileCard2">
            Collaborateurs :
          </Typography>
        </Stack>

        <Divider />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            sx={{
              width: "auto",
              p: 0,
              color: theme.palette.orange.main,
            }}
            onClick={() => handleOpenModal()}
          >
            CONFIGURER
          </Button>
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
        </Stack>
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

export default ChartCardConfig;
