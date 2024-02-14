import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";

import DownloadIcon from "./icons/DownloadIcon";
import InfoIcon from "./icons/InfoIcon";
import WarningIcon from "./icons/WarningIcon";

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

const FileCard2 = ({ date, title, desc }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // FILE SELECTION
  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    console.log(newFiles);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
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
            spacing={2}
          >
            <Typography variant="fileCard2">Aucun fichier choisi...</Typography>
            <Button
              sx={{
                minWidth: "20px",

                height: "20px",
                padding: "0px",
              }}
              component="label"
              role={undefined}
              startIcon={<DownloadIcon component="label" fill={"red"} />}
            >
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleFileSelect}
              />
            </Button>
          </Stack>

          <Typography variant="fileCard2">ENVOYER</Typography>
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
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
