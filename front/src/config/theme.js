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
    orange: {
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
      color: theme.palette.orange.main,
    },
    title: {
      fontSize: "14px",
      color: theme.palette.primary.main,
      fontWeight: 800,
    },
    subTitle: {
      fontSize: "12px",
      color: theme.palette.highlight.main,
      fontWeight: 800,
    },
    messageLabel: {
      fontSize: "12px",
      color: theme.palette.highlight.main,
      fontWeight: 800,
    },
    message: {
      fontSize: "14px",
      color: theme.palette.darkBlue.main,
      fontWeight: 800,
    },
    fileCard: {
      fontSize: "10px",
      color: "white",
      fontWeight: 800,
    },
    fileCard2: {
      fontSize: "12px",
      color: theme.palette.darkBlue.main,
      fontWeight: 800,
    },
    navLink: {
      fontSize: "12px",
      color: "#06171F",
      fontWeight: 800,
    },
  },
});

export default theme;
