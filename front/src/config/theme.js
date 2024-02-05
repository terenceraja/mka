import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1A3A48",
    },
    secondary: {
      main: "#06171f",
    },
    highlight: {
      main: "#445D68",
    },
    background: {
      main: "#f2f4f3",
    },
    complementary: {
      main: "#ef8026",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    link: {
      fontSize: "12px",
    },
    logoSubtitle: {
      fontSize: "18px",
      margin: 0,
      color: theme.palette.complementary.main,
    },
  },
});

export default theme;
