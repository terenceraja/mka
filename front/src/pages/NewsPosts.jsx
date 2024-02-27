import React from "react";
import PdfCard from "./PdfView";
import { Box } from "@mui/material";
import Card from "../components/Card";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import NewsCard from "../components/NewsCard";
import { Outlet } from "react-router-dom";

const NewsPosts = () => {
  const theme = useTheme();
  return (
    <Box sx={styles.content} id="content">
      <>
        <Card title="NEWS POSTS">
          <Box
            sx={styles.docsContainer}
            bgcolor={theme.palette.background.main}
            id="docsContainer"
          >
            <NewsCard
              title={"TITRE"}
              subtitle={"SOUSTITRE"}
              date={"27/02/24"}
            />
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
