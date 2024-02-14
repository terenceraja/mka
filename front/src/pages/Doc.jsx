import React from "react";
import Button from "@mui/material/Button";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Modal from "../components/Modal";

// MUI
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import FileCard from "../components/FileCard";
import FileCard2 from "../components/FileCard2";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";

// HTTP
import { postFile, fetchOnDemandDocs } from "../utils/http";
import Snack from "../components/Snack";

//UTILS
import { formatISODate } from "../utils/functions";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Doc = () => {
  const [tabValue, setTabValue] = useState("1");
  const [onDemandDocs, setOnDemandDocs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  console.log(selectedFiles);

  // GET CLI ID FROM STORE
  const IdCtraCli = useSelector((state) => state.keys.value.IdCtraCli);

  // SNACK & MODAL USEREF
  const setSnackStateRef = useRef(null); // Create a ref to store setSnackState function
  // Function to trigger state change in Snack component
  const triggerSnack = (newState) => {
    if (setSnackStateRef.current) {
      setSnackStateRef.current(newState);
    }
  };

  const setModalStateRef = useRef(null);
  const triggerModal = (newState) => {
    if (setModalStateRef.current) {
      setModalStateRef.current(newState);
    }
  };
  //

  // FETCH ONDEMAND DOC
  useEffect(() => {
    const fetchDocsFromServer = async () => {
      try {
        //PORTFOLIOS
        const responseDocs = await fetchOnDemandDocs({ IdCtraCli });
        const docs = responseDocs.data;
        const doclist = docs.map((obj, key) => {
          return (
            <FileCard2
              key={key}
              date={formatISODate(obj.TimeStampCreation)}
              title={obj.Title}
              desc={obj.Description}
            />
          );
        });
        setOnDemandDocs(doclist);

        console.log("onDemand", responseDocs.data);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      }
    };

    fetchDocsFromServer(); // Call the renamed local function
  }, []);
  //

  // POST FILE
  const upload = async (fileToPost) => {
    try {
      const response = await postFile(fileToPost);
      console.log(response);
      setSelectedFiles([]);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // FILE SELECTION
  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    console.log(newFiles);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    event.target.value = ""; // Reset the input field
  };

  // SUBMIT CLICK
  const handleUpload = () => {
    upload(selectedFiles);
    console.log("file upload");
  };

  // REMOVE FILE
  const handleRemove = (clikedFile) => {
    const filteredArray = selectedFiles.filter(
      (file) => file.name !== clikedFile
    );
    setSelectedFiles([...filteredArray]);
  };
  // PRINT FILE LIST
  const fileList = selectedFiles.map((file, key) => {
    return <FileCard key={key} file={file} remove={handleRemove} />;
  });

  const handleModal = () => {
    if (selectedFiles.length > 0) {
      triggerModal({
        open: true,
        message: "êtes-vous sûre d'envoyer ces fichiers?",
        confirmation: "ENVOYER",
        isLoading: false,
      });
    } else {
      triggerSnack({
        open: true,
        message: "veuillez sélectionner un fichier",
        severity: "info",
      });
    }
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Snack setSnackStateRef={setSnackStateRef} />
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
                  ? onDemandDocs
                  : "Pas de documents à envoyer"}
              </Box>
            </Card>

            <Card title="ENVOIE DOCUMENTS">
              <Box sx={styles.listContainer1}>{fileList}</Box>
              <Box component="form" sx={styles.formContainer} id="form">
                <Modal
                  setModalStateRef={setModalStateRef}
                  onConfirmation={handleUpload}
                />
                <Stack
                  direction="row"
                  marginY={2}
                  spacing={1}
                  width={"100%"}
                  justifyContent={"flex-end"}
                >
                  <Fab size="small" component="label" color="primary">
                    <AddIcon />
                    <VisuallyHiddenInput
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                    />
                  </Fab>
                  <Button onClick={handleModal} variant="">
                    SUBMIT
                  </Button>
                </Stack>
              </Box>
            </Card>
          </TabPanel>

          <TabPanel sx={{ padding: "0px" }} value="2">
            <Card title="DOCUMENTS ENVOYES">
              <Box sx={styles.listContainer2}>{fileList}</Box>
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
    gap: "10px",
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

  listContainer1: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    height: "200px",
    borderRadius: "4px",
    border: "1px dashed",
    borderColor: "highlight.main",
    p: 2,
    overflowY: "auto",
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
    height: "auto",

    p: 1,
  },
};

export default Doc;
