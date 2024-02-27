import React from "react";
import PdfCard from "../components/pdfCard";
import { Box } from "@mui/material";

const News = () => {
  return (
    <Box sx={styles.content} id="content">
      <PdfCard />
    </Box>
  );
};

export default News;

/**@type {import("@mui/material".SxProps)} */
const styles = {
  content: {
    height: "100%",
    display: "flex",
  },
};
