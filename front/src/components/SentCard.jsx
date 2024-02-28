import React, { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InfoIcon from "./icons/InfoIcon";
import { useTheme } from "@mui/material/styles";

const SentCard = ({ sentDate, demandDate, title, desc, file, remove }) => {
  const theme = useTheme();
  const [status, setStatus] = useState({ label: "", color: "" });
  const [anchorEl, setAnchorEl] = useState(null);

  console.log(file);

  // SETTING STATUS
  useEffect(() => {
    if (file.Status === "pending") {
      setStatus((prev) => {
        return { ...prev, label: "En cours", color: "#ADD8E6" };
      });
    } else if (file.Status === "accepted") {
      setStatus((prev) => {
        return { ...prev, label: "Accepté", color: "#90EE90" };
      });
    } else if (file.Status === "rejected") {
      setStatus((prev) => {
        return { ...prev, label: "Rejeté", color: "#FFA07A" };
      });
    }
  }, []);

  // POPOVER
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Box sx={styles.fileCard}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          id="TOPSECTION"
        >
          <Stack>
            <Typography minWidth={50} variant="fileCard2">
              Document:
            </Typography>
            <Typography
              height={"20px"}
              borderRadius={"2px"}
              textAlign={"center"}
              minWidth={50}
              variant="fileCard2"
            >
              {title}
            </Typography>
          </Stack>

          <Stack alignItems={"center"}>
            <Typography minWidth={50} variant="fileCard2">
              Description:
            </Typography>
            <InfoIcon fill="#008080" onClick={handleClick} />
          </Stack>
          <Stack>
            <Typography variant="fileCard2">Demandé:</Typography>
            <Typography height={"20px"} variant="fileCard2">
              {demandDate}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="fileCard2">Envoyé:</Typography>
            <Typography height={"20px"} variant="fileCard2">
              {sentDate}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack alignItems={"center"} direction={"row"} spacing={1}>
          <Typography variant="fileCard2">Status:</Typography>
          <Typography
            bgcolor={status.color}
            height={"20px"}
            variant="fileCard2"
            borderRadius={"2px"}
            px={1}
          >
            {status.label}
          </Typography>
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
    bgcolor: "white",
    borderRadius: "4px",
    boxSizing: "border-box",
    gap: "8px",
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

export default SentCard;
