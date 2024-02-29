import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./config/theme";
import SideNav from "./components/SideNav";
import AppRoutes from "./router/AppRoutes";
import { useEffect } from "react";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
