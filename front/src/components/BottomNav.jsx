import React, { useEffect } from "react";
import { useState } from "react";
import home from "../assets/home.svg";
import doc from "../assets/doc.svg";
import quest from "../assets/quest.svg";
import news from "../assets/news.svg";
import chat from "../assets/chat.svg";

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
          icon={<img src={home} width={25} className="icon" alt="home" />}
          component={NavLink}
          to="/layout/ptf"
        />
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="Documents"
          value="/layout/doc"
          icon={<img src={doc} width={25} className="icon" alt="doc" />}
          component={NavLink}
          to="/layout/doc"
        />
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="Questions"
          value="/layout/quest"
          icon={<img src={quest} width={25} className="icon" alt="quest" />}
          component={NavLink}
          to="/layout/quest"
        />
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="News"
          value="/layout/news"
          icon={<img src={news} width={25} className="icon" alt="news" />}
          component={NavLink}
          to="/layout/news"
        />
        <BottomNavigationAction
          sx={styles.buttonAction}
          label="Chat"
          value="/layout/chat"
          icon={<img src={chat} width={25} className="icon" alt="chat" />}
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
