import React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";

// HTTP
import { postFile } from "../utils/http";

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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  console.log(selectedFiles);

  // POST FILE
  const upload = async (fileToPost) => {
    try {
      const response = await postFile(fileToPost);
      console.log(response);
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // FILE SELECTION
  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // // Function to handle file upload
  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFiles) {
      upload(selectedFiles);
    } else {
      console.log("No file selected.");
    }
  };

  // PRINT FILE LIST
  const fileList = selectedFiles.map((file, key) => {
    return (
      <Box key={key} sx={styles.fileCard}>
        <Typography variant="fileCard">{file.name}</Typography>
        <RemoveCircleOutlineIcon sx={styles.icon} />
      </Box>
    );
  });

  return (
    <>
      <Box sx={styles.listContainer}>{fileList}</Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={styles.formContainer}
        onSubmit={(e) => handleUpload(e)}
        id="form"
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            multiple
            onChange={handleFileSelect}
          />
        </Button>
        <Button type="submit" fullWidth variant="contained">
          SUBMIT FILE
        </Button>
      </Box>
    </>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loginBtn: {
    marginTop: "20px",
    bgcolor: "complementary.main",
    height: "45px",
  },
  fileCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    width: "95%",
    bgcolor: "white",
    height: "40px",
    marginX: "auto",
    borderRadius: "4px",
    boxSizing: "border-box",
    p: 1,
    px: 2,
  },
  icon: {
    color: "complementary.main",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
};

export default Doc;
