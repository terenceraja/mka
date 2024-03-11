import React, { useState } from "react";

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
import { getCollabs } from "../../utils/http";

function CollConfig() {
  const [color, setColor] = useState("");
  const [collab, setCollab] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  // FORM
  const [form, setForm] = useState({
    name: "",
    surname: "",
    color: "",
  });

  console.log(form);

  // INPUT/SELECT ONCHANGE
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

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
      message: `Session expiré ou token indisponible, vous allez être redirigé à la page de connexion`,
      confirmation: "SE RECONNECTER",
      auth: false,
    });
  };

  // FETCH ONDEMAND DOC
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

  // COLLAB LIST RENDER
  const CollabList = collab.map((obj, key) => {
    return (
      <CollCard
        key={key}
        id={obj.IdColl}
        name={obj.Name}
        surname={obj.Surname}
        // remove={handleRemove}
      />
    );
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setForm((prev) => ({ ...prev, name: "", surname: "", color: "" }));
    setOpen(false);
  };

  //HANDLE LOGIN CLICK
  const handleConfirmCollab = async (e) => {
    e.preventDefault();
    console.log("collab confirmed");
    handleClose();
  };

  return (
    <Box sx={styles.content} id="content">
      <Card title="COLLABORATEUR">
        <Box>
          <Button
            endIcon={<AddIcon fill={theme.palette.orange.main} />}
            onClick={handleOpen}
          >
            <Typography marginTop={"2px"} variant="link">
              Ajouter
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
              onSubmit={(e) => handleConfirmCollab(e)}
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
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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
