import React from "react";
import { AppBar, IconButton, Toolbar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//REDUCERS
import { clearStore } from "../reducers/primaryKeys";

//MODAL LOGOUT
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut((prev) => !prev);
    dispatch(clearStore());
    setTimeout(() => {
      setIsLoggingOut((prev) => !prev);
      setOpen(false);
      navigate("/");
    }, 1200);
  };
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        {/* <IconButton onClick={() => {}}>
          <MenuIcon />
        </IconButton> */}
        <Box component="img" width={30} src="/src/assets/kslogo.png" />
        <Box sx={{ flexGrow: 1 }} />
        <LogoutIcon onClick={() => handleOpenModal()} />
      </Toolbar>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle id="alert-dialog-title">{"CONFIRMATION"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cette action mettra fin à votre session. Êtes-vous certain de
            vouloir vous déconnecter ?
          </DialogContentText>
          {isLoggingOut && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress color="warning" />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Anuller</Button>
          <Button color="warning" onClick={handleLogout}>
            Se Deconnecter
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  appBar: {
    bgcolor: "primary.main",
  },
};

export default Header;
