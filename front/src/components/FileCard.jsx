import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const FileCard = ({ file, remove }) => {
  console.log(file);
  const handleRemove = () => {
    // console.log(file.name);
    remove(file.name);
  };

  return (
    <Box sx={styles.fileCard}>
      <Typography variant="fileCard">{file.name}</Typography>
      <RemoveCircleOutlineIcon
        onClick={() => handleRemove()}
        sx={styles.icon}
      />
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  fileCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    bgcolor: "highlight.main",
    height: "40px",
    marginX: "auto",
    borderRadius: "4px",
    boxSizing: "border-box",
    p: 1,
    px: 2,
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
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

export default FileCard;
