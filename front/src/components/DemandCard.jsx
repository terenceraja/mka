import React from "react";
import { useState, useRef } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import DeleteIcon from "./icons/DeleteIcon";
import DownloadIcon from "./icons/DownloadIcon";
import InfoIcon from "./icons/InfoIcon";
import { useTheme } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 0,
});

// HTTP
import { postFile } from "../utils/http";

const DemandCard = ({ date, title, desc, file, remove }) => {
  const theme = useTheme();
  const [isSent, setIsSent] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("selected file", selectedFile);

  const navigate = useNavigate();

  // SNACK
  const setSnackStateRef = useRef(null); // Create a ref to store setSnackState function
  // Function to trigger state change in Snack component
  const triggerSnack = (newState) => {
    if (setSnackStateRef.current) {
      setSnackStateRef.current(newState);
    }
  };

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

  // FILE SELECTION
  const handleFileSelect = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setSelectedFile(newFile);
    }
    event.target.value = ""; // Reset the input field
  };

  // REMOVE FILE
  const handleRemove = () => {
    setSelectedFile(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // POST FILE
  const upload = async (fileToPost) => {
    const IdFile = file.IdFile;
    try {
      const response = await postFile(fileToPost, IdFile);

      // AUTHENTIFICATION
      console.log("response", response);
      if (!response.auth) {
        console.log("no authaze");
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
      <Modal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Box sx={styles.fileCard}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          id="TOPSECTION"
        >
          <Stack>
            <Typography variant="fileCard2">Demandé:</Typography>
            <Typography height={"20px"} variant="fileCard2">
              {date}
            </Typography>
          </Stack>

          <Stack>
            <Typography minWidth={50} variant="fileCard2">
              Document:
            </Typography>
            <Typography
              height={"20px"}
              borderRadius={"2px"}
              textAlign={"center"}
              minWidth={50}
              variant="fileCard2"
            >
              {title}
            </Typography>
          </Stack>

          <Stack alignItems={"center"}>
            <Typography minWidth={50} variant="fileCard2">
              Descrpition:
            </Typography>
            <InfoIcon fill="#008080" onClick={handleClick} />
          </Stack>

          <Stack alignItems={"center"}>
            <Typography variant="fileCard2">Status:</Typography>

            <Stack alignItems={"center"}>
              <Stack alignItems={"center"} direction={"row"}>
                {isSent ? (
                  <Typography
                    bgcolor={"#90EE90"}
                    height={"20px"}
                    variant="fileCard2"
                    px={1}
                  >
                    Envoyé
                  </Typography>
                ) : (
                  <Typography
                    bgcolor={"#FFD700"}
                    height={"20px"}
                    variant="fileCard2"
                    borderRadius={"2px"}
                    px={1}
                  >
                    En demande
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          id="BOT SECTION"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Button
              sx={{
                minWidth: "20px",

                height: "20px",
                padding: "0px",
              }}
              component="label"
              role={undefined}
              startIcon={
                <DownloadIcon component="label" fill={theme.palette.orange} />
              }
            >
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleFileSelect}
              />
            </Button>
            {selectedFile ? (
              <>
                <Typography
                  width={100}
                  sx={{ textDecoration: "underline" }}
                  variant="fileCard2"
                >
                  {selectedFile.name}
                </Typography>
                <DeleteIcon fill="red" onClick={handleRemove} />
              </>
            ) : (
              <Typography variant="fileCard2">
                Aucun fichier choisi...
              </Typography>
            )}
          </Stack>

          <Button
            disabled={selectedFile ? false : true}
            sx={{ color: selectedFile ? theme.palette.orange : "" }}
            onClick={() => handleUpload()}
          >
            Soummettre
          </Button>
        </Stack>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 1, fontSize: "12px" }}>{desc}</Typography>
      </Popover>
    </>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  fileCard: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    bgcolor: "background.main",
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

export default DemandCard;
