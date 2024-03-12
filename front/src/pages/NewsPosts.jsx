import React from "react";
import PdfCard from "./PdfView";
import { Box } from "@mui/material";
import Card from "../components/Card";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import NewsCard from "../components/NewsCard";
import { Outlet } from "react-router-dom";

import { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";

import Modal from "../components/Modal";

import { getNews } from "../utils/http";

const NewsPosts = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  console.log("newsState", news);

  // GET CLI ID FROM STORE
  const IdCtraCli = useSelector((state) => state.keys.value.IdCtraCli);

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
  const handleConfirmation = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  // FETCH ALL NEWS
  const fetchNewsPost = async () => {
    try {
      //NEWS
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
    fetchNewsPost(); // Call the renamed local function
  }, []);

  // RENDER NEWS LIST
  const newsList = news.map((file) => {
    return (
      <NewsCard
        key={file.IdNews}
        title={file.Title}
        subtitle={file.Subtitle}
        date={file.TimeStampCreation}
        fileName={file.FileName}
      />
    );
  });

  return (
    <Box sx={styles.content} id="content">
      <Modal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <>
        <Card title="NEWS POSTS">
          <Box
            sx={styles.docsContainer}
            bgcolor={theme.palette.background.main}
            id="docsContainer"
          >
            {newsList}
          </Box>
        </Card>

        <Card title="CONTACT :">
          <Box
            sx={styles.footer}
            id="footer"
            bgcolor={theme.palette.primary.main}
          >
            <Typography variant="navLink">tel: 00.00.00.00.00</Typography>
            <Typography variant="navLink">e-mail: user@gmail.com</Typography>
            <Typography variant="navLink">Powered by KeeSystem</Typography>
          </Box>
        </Card>
      </>
      <Outlet />
    </Box>
  );
};

export default NewsPosts;

/**@type {import("@mui/material".SxProps)} */
const styles = {
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  docsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minHeight: "calc(100vh - 180px)",
    maxHeight: "calc(100vh - 245px)",
    overflowY: "auto",
    p: 1,
    borderRadius: 1,
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100px",
    p: 2,
    borderRadius: 1,
    gap: "5px",
  },
};
