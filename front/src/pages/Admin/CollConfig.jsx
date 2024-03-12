import React, { useState } from "react";

import colors from "../../utils/collabColors";

import Modal from "@mui/material/Modal";
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
import { useTheme } from "@mui/material/styles";
import { useRef } from "react";

import { useEffect } from "react";

import AddIcon from "../../components/icons/AddIcon";
import CollCard from "../../components/CollCard";
import Card from "../../components/Card";

// HTTP
import { getCollabs, addColl, deleteColl } from "../../utils/http";

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
  });

  console.log(colors);
  console.log(form);
  const theme = useTheme();

  // POST FETCHING EXAMPLE
  const postForm = async () => {
    setIsFetching(true);
    try {
      const response = await addColl(form);
      return response;
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

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

  // FETCH ALL COLLABS
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

      const collabs = responseCollab.data;
      setCollab(collabs);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };
  useEffect(() => {
    fetchCollab(); // Call the renamed local function
  }, []);
  //

  // REMOVE CLICK
  const handleRemove = async (IdColl) => {
    console.log("remove collab");
    try {
      const response = await deleteColl({ IdColl });

      // AUTHENTIFICATION
      console.log("response000", response);
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

  // COLLAB LIST RENDER
  const CollabList = collab.map((obj, key) => {
    return (
      <CollCard
        key={key}
        IdColl={obj.IdColl}
        Name={obj.Name}
        Surname={obj.Surname}
        Color={obj.Color}
        remove={handleRemove}
      />
    );
  });

  // ADD MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setForm((prev) => ({ ...prev, name: "", surname: "", color: "" }));
    setOpen(false);
  };

  //HANDLE CONFIRM COLL
  const handleConfirmColl = async (e) => {
    e.preventDefault();
    const response = await postForm();
    console.log("response000", response);
    setCollab(response.data);
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
      <Card title="CONFIGURATION COLLABORATEUR">
        <Box>
          <Button
            endIcon={<AddIcon fill={theme.palette.orange.main} />}
            onClick={handleOpen}
          >
            <Typography marginTop={"2px"} variant="link">
              Ajouter collaborateur
            </Typography>
          </Button>

          <Box
            sx={styles.docsContainer}
            bgcolor={theme.palette.background.main}
          >
            {CollabList}
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
              <Typography variant="title">DEFINITION COLLABORATEUR</Typography>
              <Divider
                sx={{
                  marginTop: 2,
                  marginBottom: 1,
                }}
              />
              <Stack direction={"column"} spacing={3}>
                <Stack direction={"column"} spacing={2}>
                  <TextField
                    name="name"
                    onChange={(e) => handleChange(e)}
                    id="Login"
                    label="Prénom"
                    variant="standard"
                    fullWidth
                    size="small"
                  />
                  <TextField
                    name="surname"
                    onChange={(e) => handleChange(e)}
                    id="Password"
                    label="Nom"
                    variant="standard"
                    fullWidth
                    size="small"
                  />

                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="color">Code couleur</InputLabel>
                    <Select
                      name="color"
                      size="small"
                      value={form.color}
                      label="Code Couleur"
                      onChange={handleChange}
                    >
                      {colorList}
                    </Select>
                  </FormControl>
                  {(!form.name || !form.surname || !form.color) && (
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
                    form.name && form.surname && form.color ? false : true
                  }
                  sx={{
                    width: "100px",
                    alignSelf: "end",

                    color: theme.palette.orange.main,
                  }}
                >
                  Confirmer
                </Button>
              </Stack>
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
