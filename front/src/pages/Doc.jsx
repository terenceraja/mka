import React from "react";
import Button from "@mui/material/Button";
import Card from "../components/Card";
import { useState } from "react";
import { useRef } from "react";

// MUI
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import FileCard from "../components/FileCard";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";

// HTTP
import { postFile } from "../utils/http";
import Snack from "../components/Snack";

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
  const setSnackStateRef = useRef(null); // Create a ref to store setSnackState function
  // Function to trigger state change in Snack component
  const triggerSnackStateChange = (newState) => {
    if (setSnackStateRef.current) {
      setSnackStateRef.current(newState); // Update Snack component state using the stored function
    }
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  console.log(selectedFiles);

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
    console.log("pipi", newFiles);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    event.target.value = ""; // Reset the input field
  };

  // SUBMIT CLICK
  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      upload(selectedFiles);
    } else {
      triggerSnackStateChange({
        open: true,
        message: "veuillez sélectionner un fichier",
        severity: "info",
      });
    }
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

  return (
    <Box sx={styles.content} id="content">
      <Snack setSnackStateRef={setSnackStateRef} />
      <Card title="PARTAGE DOCUMENTS">
        <Box sx={styles.listContainer}>{fileList}</Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={styles.formContainer}
          onSubmit={(e) => handleUpload(e)}
          id="form"
        >
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
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  formContainer: {
    display: "flex",
  },

  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    height: "500px",
    borderRadius: "4px",
    border: "1px dashed",
    borderColor: "highlight.main",
    p: 2,
    overflowY: "auto",
  },
};

export default Doc;
