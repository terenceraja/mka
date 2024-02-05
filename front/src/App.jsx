import "./App.css";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./config/theme";
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNav";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box>
          <Box component={"main"}></Box>
        </Box>
        <BottomNavigation />
      </ThemeProvider>
    </>
  );
}

export default App;
