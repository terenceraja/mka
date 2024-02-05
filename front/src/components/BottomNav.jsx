import React from "react";
import home from "../assets/home.svg";
import doc from "../assets/doc.svg";
import quest from "../assets/quest.svg";
import news from "../assets/news.svg";
import chat from "../assets/chat.svg";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        sx={styles.navBar}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          sx={{ minWidth: "50px", color: "red" }}
          label="Accueil"
          value="Accueil"
          icon={<img width={25} src={home} alt="home" />}
        />
        <BottomNavigationAction
          style={{
            icon: {
              color: value === "Documents" ? "#fdbd32" : "#7ccced",
            },
            label: {
              color: value === "Documents" ? "#fdbd32" : "#7ccced",
            },
          }}
          label="Documents"
          value="Documents"
          icon={<img width={25} src={doc} alt="doc" />}
        />
        <BottomNavigationAction
          sx={{ minWidth: "50px", color: "white" }}
          label="Questions"
          value="Questions"
          icon={<img width={25} src={quest} alt="quest" />}
        />
        <BottomNavigationAction
          sx={{ minWidth: "50px", color: "white" }}
          label="News"
          value="News"
          icon={<img width={25} src={news} alt="news" />}
        />
        <BottomNavigationAction
          sx={{ minWidth: "50px", color: "white" }}
          label="Chat"
          value="Chat"
          icon={<img width={25} src={chat} alt="chat" />}
        />
      </BottomNavigation>
    </Paper>
  );
}

/**@type {import("@mui/material".SxProps)} */
const styles = {
  navBar: {
    bgcolor: "primary.main",
    width: "100%",
  },
};
