import React, { useState } from "react";

import colors from "../../utils/collabColors";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import { Button, Typography } from "@mui/material";
import {
  Box,
  Stack,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Divider,
} from "@mui/material";

import CustomModal from "../../components/CustomModal";

import { useTheme } from "@mui/material/styles";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import AddIcon from "../../components/icons/AddIcon";
import ChartCardConfig from "../../components/ChatCardConfig";
import Card from "../../components/Card";

// HTTP
import { getAllChat } from "../../utils/http";

function CollConfig() {
  const [isFetching, setIsFetching] = useState(false);
  const [collab, setCollab] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  // FORM
  const [form, setForm] = useState({
    name: "",
    surname: "",
    color: "",
    IdColl: "",
  });

  const navigate = useNavigate();
  const theme = useTheme();

  // INPUT/SELECT ONCHANGE
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
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

  // FETCH ALL CHAT
  const fetchChatList = async () => {
    try {
      //COLLABS
      const responseChatList = await getAllChat();

      // // AUTHENTIFICATION
      console.log("response", responseChatList);
      // if (!responseCollab.auth) {
      //   handleOpenModal();
      //   return;
      // }

      // setCollab(collabs);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };
  useEffect(() => {
    fetchChatList(); // Call the renamed local function
  }, []);
  //

  // REMOVE CLICK
  const handleRemove = async (IdColl) => {
    console.log("remove collab");
    try {
      const response = await deleteColl({ IdColl });

      // AUTHENTIFICATION
      console.log("responsedelete", response);
      if (!response.auth) {
        handleOpenModal();
        return;
      }
      setTimeout(() => {
        setCollab(response.data);
      }, 1500);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // ADD MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setForm((prev) => ({
      ...prev,
      name: "",
      surname: "",
      color: "",
      IdColl: "",
    }));
    setError("");
    setOpen(false);
  };

  //HANDLE CONFIRM COLL
  const handleConfirmColl = async (e) => {
    e.preventDefault();
    const response = await postForm();
    console.log("responseconfirm", response);
    if (response.error) {
      setError(response.message);
      setForm((prev) => ({ ...prev, IdColl: "" }));
      return;
    } else {
      setCollab(response.data);
    }
    handleClose();
  };

  //LIST OF COLORS
  const colorList = colors.map((obj, key) => {
    return (
      <MenuItem key={key} value={obj.color}>
        <Typography
          borderRadius={"4px"}
          p={0.5}
          bgcolor={obj.color}
          marginTop={"2px"}
          variant="title"
        >
          {obj.name}
        </Typography>
      </MenuItem>
    );
  });

  return (
    <Box sx={styles.content} id="content">
      <CustomModal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Card title="CONFIGURATION CHAT">
        <Box>
          <Button
            endIcon={<AddIcon fill={theme.palette.orange.main} />}
            onClick={handleOpen}
          >
            <Typography marginTop={"2px"} variant="link">
              Créer une conversation
            </Typography>
          </Button>

          <Box
            sx={styles.docsContainer}
            bgcolor={theme.palette.background.main}
          >
            <ChartCardConfig />
          </Box>

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
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={styles.formContainer}
              onSubmit={(e) => handleConfirmColl(e)}
              id="form"
            >
              <Typography variant="title">
                EN CONVERSATION AVEC ID CLIENT XXX
              </Typography>
              <Divider
                sx={{
                  marginBottom: 1,
                }}
              />
              <Stack direction={"column"} spacing={3}>
                <Stack direction={"column"} spacing={2}>
                  <TextField
                    onClick={() => {
                      setError("");
                    }}
                    name="IdColl"
                    onChange={(e) => handleChange(e)}
                    label="IdColl"
                    type="number"
                    variant="standard"
                    value={form.IdColl}
                  />

                  {(!form.name ||
                    !form.surname ||
                    !form.color ||
                    !form.IdColl) && (
                    <Typography
                      variant="link"
                      color={theme.palette.orange.main}
                    >
                      Veuillez remplir tous les champs
                    </Typography>
                  )}
                </Stack>

                <Button
                  type="submit"
                  disabled={
                    form.name && form.surname && form.color && form.IdColl
                      ? false
                      : true
                  }
                  sx={{
                    width: "auto",
                    alignSelf: "end",
                    p: 0,
                    color: theme.palette.orange.main,
                  }}
                >
                  Confirmer
                </Button>
              </Stack>
              {error && (
                <Alert
                  icon={<ErrorOutlineIcon fontSize="inherit" />}
                  severity="success"
                  color="error"
                >
                  {error}
                </Alert>
              )}
            </Box>
          </Modal>
        </Box>
      </Card>
    </Box>
  );
}

/**@type {import("@mui/material".SxProps)} */
const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
  },
  docsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minHeight: "calc(100vh - 270px)",
    maxHeight: "calc(100vh - 245px)",
    overflowY: "auto",
    p: 1,
    borderRadius: 1,
  },
  formContainer: {
    bgcolor: "white",
    paddingY: 2,
    paddingX: 5,
    m: 1,
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
  },
};

export default CollConfig;
