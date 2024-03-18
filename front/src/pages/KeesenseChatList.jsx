import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ClientCard from "../components/ClientCard";

//HTTPL
import { getAllChatIdColl } from "../utils/http";
const KeesenseChatList = () => {
  const [allChatList, setAllChatLIst] = useState([]);
  const [error, setError] = useState("");

  const { IdColl } = useParams();
  console.log(IdColl);
  useEffect(() => {
    const fetchAllChatForColl = async () => {
      try {
        const response = await getAllChatIdColl(IdColl); //TEMPORARY IDCOLL, MUST BE INJECTED BY PARAMS
        console.log(response);
        setAllChatLIst(response.data);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      }
    };
    fetchAllChatForColl();
  }, []);

  const theme = useTheme();

  // RENDER CHAT LIST FOR COLL
  const chatList = allChatList.map((obj, key) => {
    return <ClientCard key={key} Client={obj.zchat.IdCtraCli} />;
  });

  return (
    <Box sx={styles.mainContent}>
      <Box sx={styles.header}>
        <Typography color={"white"} variant="title">
          CHAT LIST
        </Typography>
      </Box>
      <Box sx={styles.listContainer}>{chatList}</Box>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  mainContent: {
    bgcolor: "red",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  listContainer: {
    bgcolor: "background.main",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
  },
  header: {
    bgcolor: "primary.main",
    width: "100%",
    height: "55px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    py: 1,
    px: 2,
  },
};

export default KeesenseChatList;
