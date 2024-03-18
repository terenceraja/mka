import React from "react";
import { useState, useRef } from "react";
import CustomModal from "./CustomModal";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  Modal,
  TextField,
  InputLabel,
  Popover,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "./icons/DeleteIcon";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import CollabIcon from "./icons/CollabIcon";
import Snack from "./Snack";

import CollCard from "./CollCard";
import AddIcon from "./icons/AddIcon";
// HTTP
import {
  getCollabs,
  addCollabInChat,
  deleteCollabFromChat,
  deleteChat,
} from "../utils/http";

const ChartCardConfig = ({ IdChat, idClient, collabsProp, Remove }) => {
  const theme = useTheme();

  const [collabs, setCollabs] = useState(collabsProp);
  console.log(collabs);
  const [allCollabs, setAllCollabs] = useState([]);
  const [error, setError] = useState("");
  const [openListItem, setOpenListItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
      message: `Êtes-vous sûre de vouloir supprimer la conversation ?`,
      confirmation: "SUPPRIMER",
      auth: true,
    });
  };

  // CUSTOM  MODAL CREATE CONV
  const handleConfirmation = async () => {
    const response = await deleteChat(IdChat);
    Remove(IdChat);
    console.log(response);
  };

  // ADD MODAL 1 (CLICK ON INCLURE)
  const handleOpen = () => {
    fetchCollab();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // FETCH ALL COLLAB FOR LIST TO JOIN
  const fetchCollab = async () => {
    try {
      //COLLABS
      const responseCollab = await getCollabs();

      // AUTHENTIFICATION
      console.log("response", responseCollab);
      if (!responseCollab.auth) {
        handleOpenModal();
        return;
      }

      const allCollabs = responseCollab.data;
      // Filter out collabs from allCollabs array that are already present in collabs array
      const filteredAllCollabs = allCollabs.filter(
        (collab) => !collabs.some((c) => c.IdColl === collab.IdColl)
      );
      console.log("filter", filteredAllCollabs);
      setAllCollabs(filteredAllCollabs);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };
  //

  // JOIN COLLAB FUNCTION

  const joinCollab = async (IdColl) => {
    try {
      const response = await addCollabInChat({ IdChat, IdColl });
      return response;
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // HANDLE JOIN COLALB CLICK
  const handleJoin = async (IdColl) => {
    const response = await joinCollab(IdColl); // Await the joinCollab function call
    const addedCollab = response.addedCollab;

    const filteredAllCollab = allCollabs.filter(
      (obj) => obj.IdColl !== addedCollab.IdColl
    );
    setAllCollabs(filteredAllCollab);
    const { Name, Surname, Color } = addedCollab;
    triggerSnack({
      open: true,
      message: `${Name + " " + Surname} a été ajouter dans la conversation`,
      severity: "info",
    });
    setCollabs((prev) => [
      ...prev,
      { IdColl: IdColl, zcoll: { Color, Name, Surname } },
    ]);
  };

  //HANDLE REMOVE COLLAB FROM CHAT CLICK
  const handleRemoveCollab = async (IdColl) => {
    try {
      const response = await deleteCollabFromChat({ IdColl, IdChat });
      console.log("delete", response);
      setCollabs(response.data);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // ALL COLLAB LIST RENDER
  const allCollabList = allCollabs.map((obj, key) => {
    return (
      <CollCard
        key={key}
        IdColl={obj.IdColl}
        Name={obj.Name}
        Surname={obj.Surname}
        Color={obj.Color}
        Add={true}
        JoinClick={handleJoin}
        // remove={handleRemove}
      />
    );
  });

  //  COLLAB LIST INCLUDED RENDER
  const collabsList = collabs.map((obj, key) => {
    return (
      <Stack
        key={key}
        sx={{
          bgcolor: theme.palette.background.main,
          p: 0.5,
          borderRadius: "4px",
        }}
        direction={"row"}
        justifyContent={"space-between"}
        spacing={2}
      >
        <Typography variant="subTitle">IdColl : {obj.IdColl}</Typography>
        <Typography variant="subTitle">{obj.zcoll.Name}</Typography>
        <Typography variant="subTitle">{obj.zcoll.Surname}</Typography>
        <DeleteIcon
          fill={theme.palette.orange.main}
          size={"15"}
          onClick={() => handleRemoveCollab(obj.IdColl)}
        />
      </Stack>
    );
  });

  // LIST ITEM
  const handleClickListItem = () => {
    setOpenListItem(!openListItem);
  };

  return (
    <>
      <Snack setSnackStateRef={setSnackStateRef} />
      <CustomModal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Box sx={styles.fileCard}>
        <Stack spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="fileCard2"> ID Client : {idClient}</Typography>
            <Typography variant="fileCard2">
              Total : {collabs.length + 1} pers.
            </Typography>
          </Stack>

          <List sx={{ p: 0, width: "max-content" }}>
            <ListItemButton
              sx={{ p: 0, width: "auto" }}
              disableTouchRipple={true}
              onClick={handleClickListItem}
            >
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography variant="fileCard2">
                  {collabs.length} Collaborateurs
                </Typography>
                {openListItem && collabs.length !== 0 ? (
                  <ExpandLess
                    sx={{ color: theme.palette.orange.main, fontSize: 20 }}
                  />
                ) : (
                  <ExpandMore
                    sx={{ color: theme.palette.orange.main, fontSize: 20 }}
                  />
                )}
              </Stack>
            </ListItemButton>
            <Collapse in={openListItem} unmountOnExit>
              <Stack direction={"column"} spacing={1}>
                {collabsList}
              </Stack>
            </Collapse>
          </List>
        </Stack>

        <Divider />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            endIcon={
              <CollabIcon
                fill={theme.palette.orange.main}
                size="15"
                stroke="3"
              />
            }
            sx={{
              width: "auto",
              p: 0,
              color: theme.palette.orange.main,
            }}
            onClick={() => handleOpen()}
          >
            AJOUTER
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

        {/***************************  MODAL CONFIGURE ***************************/}
        <Modal
          open={open}
          onClose={handleClose}
          // Center the modal vertically and horizontally
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <>
            <Box sx={styles.formContainer}>
              <Typography variant="title">LISTE DES COLLABORATEURS</Typography>
              <Divider
                sx={{
                  marginBottom: 1,
                }}
              />

              <Stack direction={"column"} spacing={3}>
                <Box
                  sx={styles.docsContainer}
                  bgcolor={theme.palette.background.main}
                >
                  {allCollabList.length > 0 ? (
                    allCollabList
                  ) : (
                    <Typography variant="link">
                      Aucuns collaborateurs disponibles
                    </Typography>
                  )}
                </Box>

                <Button
                  onClick={handleClose}
                  sx={{
                    width: "auto",
                    alignSelf: "end",
                    p: 0,
                    color: theme.palette.orange.main,
                  }}
                >
                  RETOUR
                </Button>
              </Stack>
            </Box>
          </>
        </Modal>
        {/***************************  MODAL CONFIGURE ***************************/}
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

  formContainer: {
    bgcolor: "white",
    paddingY: 2,
    paddingX: 3,
    m: 1,
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
  },

  docsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minHeight: "500px",
    maxHeight: "500px",
    overflowY: "auto",
    p: 1,
    borderRadius: 1,
  },
};

export default ChartCardConfig;
