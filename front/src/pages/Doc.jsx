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
  console.log("sentlist", sentDocs);

  console.log("demandlist", onDemandDocs);

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
        console.log("no authaze");
        handleOpenModal();
        return;
      }

      const docs = responseDocs.data;
      setOnDemandDocs(docs);

      console.log("onDemand", responseDocs.data);
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
          console.log("no auth");
          handleOpenModal();
          return;
        }

        const docs = responseDocs.data;
        setSentDocs(docs);

        console.log("Sent", responseDocs.data);
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
            <Card title="DOCUMENTS A ENVOYER">
              <Box sx={styles.listContainer3}>
                {onDemandDocs.length > 0
                  ? onDemandlist
                  : "Pas de documents à envoyer"}
              </Box>
            </Card>
          </TabPanel>

          <TabPanel sx={{ padding: "0px" }} value="2">
            <Card title="DOCUMENTS ENVOYES">
              <Box sx={styles.listContainer3}>
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
  },
  tabContent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    p: 0,
  },

  formContainer: {
    display: "flex",
  },

  listContainer2: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    height: "400px",
    borderRadius: "4px",
    borderColor: "highlight.main",
    p: 2,
    overflowY: "auto",
  },
  listContainer3: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxHeight: "100%",
    overflowY: "auto",

    p: 1,
  },
};

export default Doc;
