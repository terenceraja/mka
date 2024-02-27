import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import logo from "../assets/img/myKeeApp.png";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Box component={"main"} sx={styles.mainContent}>
      <Box sx={styles.log_card}>
        <img src={logo} width={"90%"} alt="logo" id="logo" />
        <Typography variant="logoSubtitle">
          Votre session a expiré. Veuillez vous reconnecter.
        </Typography>
        <Button
          sx={styles.loginBtn}
          onClick={() => handleButton()}
          fullWidth
          variant="contained"
        >
          RETOUR PAGE CONNEXION
        </Button>
      </Box>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  mainContent: {
    display: "flex",
    bgcolor: "background.main",
    height: "100%", // MINUS NAV & HEADER
    justifyContent: "center",
    alignItems: "center",
  },
  log_card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "white",
    width: "100%",
    height: "70%",
    p: 5,
    gap: 5,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    boxSizing: "border-box",
  },

  logo_section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
  loginBtn: {
    marginTop: "20px",
    bgcolor: "complementary.main",
    height: "45px",
  },
};

export default Error;
