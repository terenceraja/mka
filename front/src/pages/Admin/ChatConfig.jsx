import React, { useState } from "react";

import colors from "../../utils/collabColors";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Modal,
  Alert,
  Box,
  Stack,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import CustomModal from "../../components/CustomModal";
import AddIcon from "../../components/icons/AddIcon";
import ChartCardConfig from "../../components/ChatCardConfig";
import Card from "../../components/Card";

// HTTP
import { getAllChat, createChat } from "../../utils/http";

function CollConfig() {
  const [chatListState, setChatListState] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  // FORM
  const [form, setForm] = useState({
    IdCtraCli: "",
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

      setChatListState(responseChatList.data);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };
  useEffect(() => {
    fetchChatList(); // Call the renamed local function
  }, []);
  //

  // ADD MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setForm((prev) => ({
      ...prev,

      IdCtraCli: "",
    }));
    setError("");
    setOpen(false);
  };

  //HANDLE CONFIRM CREATE CHAT
  const handleConfirmCreate = async (e) => {
    e.preventDefault();

    const response = await createChat({ IdCtraCli: form.IdCtraCli });
    console.log("responseconfirm", response);
    if (response.error) {
      setError(response.message);
      setForm((prev) => ({ ...prev, IdColl: "" }));
      return;
    } else {
      setChatListState(response.data);
    }
    handleClose();
  };

  // HANDLE DELECHAT
  const handleDeleteChat = (IdChat) => {
    const filteredChatListState = chatListState.filter(
      (item) => item.IdChat !== IdChat
    );

    setTimeout(() => {
      setChatListState(filteredChatListState);
    }, 1200);

    console.log("deleted", filteredChatListState);
  };

  // RENDER CHATLIST
  const chatList = chatListState.map((obj, key) => {
    console.log(obj.zchatcoll);
    return (
      <ChartCardConfig
        key={key}
        idClient={obj.IdCtraCli}
        collabsProp={obj.zchatcolls}
        IdChat={obj.IdChat}
        Remove={handleDeleteChat}
      />
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
            disableRipple={true}
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
            {chatList.length > 0 ? (
              chatList
            ) : (
              <Typography variant="subTitle">
                Aucunes conversations existantes
              </Typography>
            )}
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
              onSubmit={(e) => handleConfirmCreate(e)}
              id="form"
            >
              <Typography variant="title">CREATION CHAT POUR CLIENT</Typography>
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
                    name="IdCtraCli"
                    onChange={(e) => handleChange(e)}
                    label="ID Client"
                    type="number"
                    variant="standard"
                    value={form.IdCtraCli}
                  />

                  {!form.IdCtraCli && (
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
                  disabled={form.IdCtraCli ? false : true}
                  sx={{
                    width: "auto",
                    alignSelf: "end",
                    p: 0,
                    color: theme.palette.orange.main,
                  }}
                >
                  CREER
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
