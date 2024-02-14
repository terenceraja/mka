import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import DeleteIcon from "./icons/DeleteIcon";
import DownloadIcon from "./icons/DownloadIcon";
import InfoIcon from "./icons/InfoIcon";
import WarningIcon from "./icons/WarningIcon";
import { useTheme } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 0,
});

const FileCard2 = ({ date, title, desc, file, remove }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // FILE SELECTION
  const handleFileSelect = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      console.log(newFile);
      setSelectedFile(newFile);
    }
    event.target.value = ""; // Reset the input field
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box sx={styles.fileCard}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          id="TOPSECTION"
        >
          <Typography variant="fileCard2">{date}</Typography>
          <Typography width={50} variant="fileCard2">
            {title}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
          >
            <Typography variant="fileCard2">Description</Typography>
            <InfoIcon fill="#008080" onClick={handleClick} />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
          >
            <Typography variant="fileCard2">En demande</Typography>
            <WarningIcon fill="#FFC107" />
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          id="BOT SECTION"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Button
              sx={{
                minWidth: "20px",

                height: "20px",
                padding: "0px",
              }}
              component="label"
              role={undefined}
              startIcon={
                <DownloadIcon component="label" fill={theme.palette.orange} />
              }
            >
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleFileSelect}
              />
            </Button>
            {selectedFile ? (
              <>
                <Typography
                  sx={{ textDecoration: "underline" }}
                  variant="fileCard2"
                >
                  {selectedFile.name}
                </Typography>
                <DeleteIcon fill="red" />
              </>
            ) : (
              <Typography variant="fileCard2">
                Aucun fichier choisi...
              </Typography>
            )}
          </Stack>

          <Button
            disabled={selectedFile ? false : true}
            sx={{ color: selectedFile ? theme.palette.orange : "" }}
          >
            Soummettre
          </Button>
        </Stack>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 1, fontSize: "12px" }}>{desc}</Typography>
      </Popover>
    </>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  fileCard: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    bgcolor: "background.main",
    borderRadius: "4px",
    boxSizing: "border-box",
    gap: "10px",
    p: 1,
    px: 2,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
  },
  icon: {
    color: "complementary.main",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
};

export default FileCard2;
