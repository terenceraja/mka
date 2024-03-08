import React from "react";
import Card from "../../components/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CollabIcon from "../../components/icons/CollabIcon";
import NewsIcon from "../../components/icons/NewsIcon";
import ChatIcon from "../../components/icons/ChatIcon";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card title="CONFIGURATION">
      {" "}
      <Stack direction="column" spacing={2}>
        <Button
          onClick={() => navigate("chatConfig")}
          style={{ justifyContent: "space-between" }}
          variant="contained"
        >
          Configurer Group Chat
          <ChatIcon fill={theme.palette.orange.main} />
        </Button>
        <Button
          onClick={() => navigate("collConfig")}
          style={{ justifyContent: "space-between" }}
          variant="contained"
        >
          Ajouter des collaborateurs
          <CollabIcon fill={theme.palette.orange.main} />
        </Button>
        <Button
          onClick={() => navigate("newsConfig")}
          style={{ justifyContent: "space-between" }}
          variant="contained"
        >
          Poster des news
          <NewsIcon fill={theme.palette.orange.main} />
        </Button>
      </Stack>{" "}
    </Card>
  );
};

export default Home;
