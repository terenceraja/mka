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
      main: "#FFFF",
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
    title: {
      fontSize: "14px",
      color: theme.palette.primary.main,
      fontWeight: 800,
      marginBottom: "5px",
    },
    subTitle: {
      fontSize: "12px",
      color: theme.palette.highlight.main,
      fontWeight: 800,
      marginBottom: "5px",
    },
    navLink: {
      fontSize: "12px",
      color: "#06171F",
      fontWeight: 800,
    },
  },
});

export default theme;
