import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MenuIcon from "./icons/MenuIcon";
import { Box } from "@mui/material";
import LogoutIcon from "./icons/LogoutIcon";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function MenuButton({ onClick }) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <MenuIcon fill={"white"} onClick={handleClick} />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          selected={false}
          disableRipple
          sx={{
            backgroundColor: "transparent !important", // Apply important to transparent
            "&:hover": {
              backgroundColor: `${theme.palette.background.main} !important`, // Change background color on hover
            },
          }}
          onClick={handleLogout}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography variant="title">Se deconnecter</Typography>
            <LogoutIcon fill={theme.palette.orange.main} />
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
}
