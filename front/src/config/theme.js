import { createTheme } from "@mui/material";
import { green, grey, indigo } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: indigo[50],
    },
    secondary: {
      main: indigo[50],
    },
    neutral: {
      light: grey[50],
    },
    green: {
      main: green[800],
    },
  },
});

theme = createTheme(theme, {
  typography: {
    link: {
      fontSize: "12px",
    },
    cartTitle: {
      fontSize: "15px",
    },
  },
});

export default theme;
