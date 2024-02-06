import { createTheme } from "@mui/material";
/**@type {import("@mui/material".SxProps)} */

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
    card: {
      main: "#ACB6C6",
    },
    darkBlue: {
      main: "#06171F",
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
      color: theme.palette.complementary.main,
    },
    labelTitle: {
      fontSize: "14px",
      color: "white",
      fontWeight: 800,
    },
    navLink: {
      fontSize: "12px",
      color: "white",
    },
  },
});

export default theme;
