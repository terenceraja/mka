import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  Divider,
  Modal,
  InputLabel,
} from "@mui/material";

import Snack from "../../components/Snack";
import CustomModal from "../../components/CustomModal";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useRef, useEffect } from "react";

import AddIcon from "../../components/icons/AddIcon";
import Card from "../../components/Card";
import NewsCardAdmin from "../../components/NewsCardAdmin";
import UploadIcon from "../../components/icons/UploadIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";

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
import { postNews, getNews, deleteNews } from "../../utils/http";

//UTILS
import { fileCheckerNews } from "../../utils/fileCheckerNews";
import { formatISODate } from "../../utils/functions";

function NewsConfig() {
  const [isFetching, setIsFetching] = useState(false);
  const [news, setNews] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // FORM
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
  });

  console.log(form);
  const navigate = useNavigate();
  const theme = useTheme();

  // FETCH ALL NEWS
  const fetchNews = async () => {
    try {
      //COLLABS
      const responseNews = await getNews();

      // AUTHENTIFICATION
      console.log("response", responseNews);
      if (!responseNews.auth) {
        handleOpenModal();
        return;
      }

      const news = responseNews.data;
      setNews(news);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };
  useEffect(() => {
    fetchNews(); // Call the renamed local function
  }, []);
  //

  // REMOVE FILE
  const handleRemove = () => {
    setSelectedFile(null);
  };

  // FILE SELECTION
  const handleFileSelect = (event) => {
    const checkResponse = fileCheckerNews(event);
    console.log(checkResponse);
    const { state, message, file } = checkResponse;
    if (state) {
      setSelectedFile(file);
    } else if (!state && message === "type") {
      triggerSnack({
        open: true,
        message: "Veuillez sélectionner un fichier au format PDF",
        severity: "error",
      });
    } else if (!state && message === "size") {
      triggerSnack({
        open: true,
        message:
          "Veuillez sélectionner un fichier d'une taille maximale de 10MB.",
        severity: "error",
      });
    }
    event.target.value = ""; // Reset the input field
  };

  // INPUT/SELECT ONCHANGE
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

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

  // REMOVE NEWS CARD
  const handleRemoveNews = async (IdNews) => {
    console.log("remove news");
    try {
      const response = await deleteNews({ IdNews });

      // AUTHENTIFICATION
      console.log("response000", response);
      if (!response.auth) {
        handleOpenModal();
        return;
      }
      setTimeout(() => {
        setNews(response.data);
      }, 1500);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // COLLAB LIST RENDER
  const newsList = news.map((obj, key) => {
    return (
      <NewsCardAdmin
        key={key}
        IdNews={obj.IdNews}
        Title={obj.Title}
        Subtitle={obj.Subtitle}
        Date={formatISODate(obj.TimeStampCreation)}
        remove={handleRemoveNews}
      />
    );
  });

  // ADD MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setForm((prev) => ({ ...prev, name: "", surname: "" }));
    setSelectedFile(null);
    setOpen(false);
  };

  //HANDLE CONFIRM POST NEWS
  const handleConfirmNews = async (e) => {
    e.preventDefault();
    const response = await postNews(form, selectedFile);
    console.log("response000", response);
    setNews((prev) => [...prev, response.data]);
    handleClose();
  };

  return (
    <>
      <Snack setSnackStateRef={setSnackStateRef} />
      <CustomModal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Box sx={styles.content} id="content">
        <Card title="CONFIGURATION NEWS">
          <Box>
            <Button
              endIcon={<AddIcon fill={theme.palette.orange.main} />}
              onClick={handleOpen}
            >
              <Typography marginTop={"2px"} variant="link">
                Ajouter news
              </Typography>
            </Button>

            <Box
              sx={styles.docsContainer}
              bgcolor={theme.palette.background.main}
            >
              {newsList}
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
                onSubmit={(e) => handleConfirmNews(e)}
                id="form"
              >
                <Stack>
                  <Typography variant="title">DEFINITION NEWS</Typography>
                </Stack>

                <Divider
                  sx={{
                    marginTop: 2,
                    marginBottom: 1,
                  }}
                />
                <Stack direction={"column"} spacing={3}>
                  <Stack direction={"column"} spacing={2}>
                    <TextField
                      name="title"
                      onChange={(e) => handleChange(e)}
                      id="Login"
                      label="Titre"
                      variant="standard"
                      fullWidth
                      size="small"
                    />
                    <TextField
                      name="subtitle"
                      onChange={(e) => handleChange(e)}
                      id="Password"
                      label="Sous-titre"
                      variant="standard"
                      fullWidth
                      size="small"
                    />

                    <Stack direction={"column"} spacing={0.5}>
                      <InputLabel id="color">Upload un fichier</InputLabel>
                      <Typography variant="subTitle">
                        Fichier : pdf | Taille max : 10MB
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Button
                          sx={{
                            minWidth: "20px",

                            height: "20px",
                            padding: "0px",
                          }}
                          component="label"
                          role={undefined}
                          startIcon={
                            <UploadIcon
                              component="label"
                              fill={theme.palette.orange.main}
                            />
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
                              sx={{ textDecoration: "underline" }}
                              variant="fileCard2"
                            >
                              {selectedFile.name}
                            </Typography>
                            <DeleteIcon
                              fill={theme.palette.primary.main}
                              onClick={handleRemove}
                            />
                          </>
                        ) : (
                          <Typography variant="fileCard2">
                            Aucun fichier choisi...
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>

                  {(!form.title || !form.subtitle || !selectedFile) && (
                    <Typography
                      variant="link"
                      color={theme.palette.orange.main}
                    >
                      Veuillez remplir tous les champs
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    disabled={
                      form.title && form.subtitle && selectedFile ? false : true
                    }
                    sx={{
                      width: "100px",
                      alignSelf: "end",

                      color: theme.palette.orange.main,
                    }}
                  >
                    PUBLIER
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Box>
        </Card>
      </Box>
    </>
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

export default NewsConfig;
