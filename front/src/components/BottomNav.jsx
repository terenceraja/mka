import React, { useEffect } from "react";
import { useState } from "react";

import HomeIcon from "./icons/HomeIcon";
import DocIcon from "./icons/DocIcon";
import QuestIcon from "./icons/QuestIcon";
import NewsIcon from "./icons/NewsIcon";
import ChatIcon from "./icons/ChatIcon";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import { NavLink } from "react-router-dom";

import { useLocation } from "react-router-dom";

export default function LabelBottomNavigation() {
  const pathname = useLocation().pathname;
  const [value, setValue] = useState(pathname);

  useEffect(() => {
    if (pathname !== value) {
      setValue("");
    }
  }, [pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        sx={styles.navBar}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="Accueil"
          value="/layout/ptf"
          icon={<HomeIcon fill="white" />}
          component={NavLink}
          to="/layout/ptf"
        />
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="Documents"
          value="/layout/doc"
          icon={<DocIcon fill="white" />}
          component={NavLink}
          to="/layout/doc"
        />
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="Questions"
          value="/layout/quest"
          icon={<QuestIcon fill="white" />}
          component={NavLink}
          to="/layout/quest"
        />
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="News"
          value="/layout/news"
          icon={<NewsIcon fill="white" />}
          component={NavLink}
          to="/layout/news"
        />
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="Chat"
          value="/layout/chat"
          icon={<ChatIcon fill="white" />}
          component={NavLink}
          to="/layout/chat"
        />
      </BottomNavigation>
    </Paper>
  );
}

const styles = {
  navBar: {
    bgcolor: "primary.main",
    width: "100%",
  },
  buttonAction: {
    minWidth: "50px",
  },
};
