import React from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box } from "@mui/material";

import SentCard from "../components/SentCard";
import DemandCard from "../components/DemandCard";

// HTTP
import { fetchOnDemandDocs, fetchSentDocs } from "../utils/http";
import Snack from "../components/Snack";

//UTILS
import { formatISODate } from "../utils/functions";

const Doc = () => {
  const [tabValue, setTabValue] = useState("1");
  const [onDemandDocs, setOnDemandDocs] = useState([]);
  const [sentDocs, setSentDocs] = useState([]);
  const [error, setError] = useState("");
  // console.log("sentlist", sentDocs);
  // console.log("demandlist", onDemandDocs);

  const navigate = useNavigate();

  // GET CLI ID FROM STORE
  const IdCtraCli = useSelector((state) => state.keys.value.IdCtraCli);

  // SNACK
  const setSnackStateRef = useRef(null); // Create a ref to store setSnackState function
  // Function to trigger state change in Snack component
  const triggerSnack = (newState) => {
    if (setSnackStateRef.current) {
      setSnackStateRef.current(newState);
    }
  };
  //

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

  // REMOVE FILE
  const handleRemove = (SentFile) => {
    console.log("id", SentFile);
    console.log("array", onDemandDocs);
    const filteredArray = onDemandDocs.filter(
      (file) => file.IdFile !== SentFile
    );

    console.log("filter", filteredArray);
    triggerSnack({
      open: true,
      message: "Votre fichier à été envoyé",
      severity: "success",
    });
    setOnDemandDocs(filteredArray);
  };

  // FETCH ONDEMAND DOC
  const fetchDocsDemand = async () => {
    try {
      //PORTFOLIOS
      const responseDocs = await fetchOnDemandDocs({ IdCtraCli });

      // AUTHENTIFICATION
      console.log("response", responseDocs);
      if (!responseDocs.auth) {
        handleOpenModal();
        return;
      }

      const docs = responseDocs.data;
      setOnDemandDocs(docs);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };
  useEffect(() => {
    fetchDocsDemand(); // Call the renamed local function
  }, []);
  //

  // FETCH SENT DOC
  useEffect(() => {
    const fetchDocsSent = async () => {
      try {
        //PORTFOLIOS
        const responseDocs = await fetchSentDocs({ IdCtraCli });

        // AUTHENTIFICATION
        console.log("response", responseDocs);
        if (!responseDocs.auth) {
          handleOpenModal();
          return;
        }

        const docs = responseDocs.data;
        setSentDocs(docs);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      }
    };

    fetchDocsSent(); // Call the renamed local function
  }, [onDemandDocs]);
  //

  // OnDemand DOC LIST RENDER

  const onDemandlist = onDemandDocs.map((obj, key) => {
    return (
      <DemandCard
        key={key}
        date={formatISODate(obj.TimeStampCreation)}
        title={obj.Title}
        desc={obj.Description}
        file={obj}
        remove={handleRemove}
      />
    );
  });

  // Sent DOC LIST RENDER
  const sentList = sentDocs.map((obj, key) => {
    return (
      <SentCard
        key={key}
        demandDate={formatISODate(obj.TimeStampCreation)}
        sentDate={formatISODate(obj.TimeStampUpload)}
        title={obj.Title}
        desc={obj.Description}
        file={obj}
      />
    );
  });

  // TAB SELECTION
  const handleChange = (event, newValue) => {
    if (newValue === "1") {
      fetchDocsDemand();
    }
    setTabValue(newValue);
  };

  return (
    <>
      <Snack setSnackStateRef={setSnackStateRef} />
      <Modal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Box sx={styles.content} id="content">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Upload" value="1" />
              <Tab label="Uploaded" value="2" />
            </TabList>
          </Box>
          <TabPanel sx={styles.tabContent} value="1">
            <Card
              title="DOCUMENTS A ENVOYER"
              subTitle="Fichier : pdf, png, jpeg | Taille max : 10MB"
            >
              <Box sx={styles.docsContainer} id="docsContainer">
                {onDemandDocs.length > 0
                  ? onDemandlist
                  : "Pas de documents à envoyer"}
              </Box>
            </Card>
          </TabPanel>

          <TabPanel sx={styles.tabContent} value="2">
            <Card title="DOCUMENTS ENVOYES">
              <Box sx={styles.docsContainer}>
                {sentDocs.length > 0 ? sentList : "Aucun documents envoyés"}
              </Box>
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100vh - 112px)",
  },
  tabContent: {
    display: "flex",
    flexDirection: "column",
    p: 0,
    height: "100%", // Ensure the TabPanel takes up all available space
  },

  formContainer: {
    display: "flex",
  },

  docsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxHeight: "calc(100vh - 250px)",

    overflowY: "auto",
    p: 1,
  },
};

export default Doc;
