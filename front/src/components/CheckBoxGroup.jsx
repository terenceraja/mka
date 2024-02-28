import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useState } from "react";

const CheckBoxGroup = () => {
  const [checked, setChecked] = useState({
    accepted: true,
    rejected: true,
    pending: true,
  });

  // HANDLE CHECKS
  const handleChange2 = (event) => {
    event.preventDefault();
    setChecked((prev) => ({ ...prev, accepted: event.target.checked }));
  };

  const handleChange3 = (event) => {
    setChecked((prev) => ({ ...prev, rejected: event.target.checked }));
  };
  const handleChange4 = (event) => {
    setChecked((prev) => ({ ...prev, pending: event.target.checked }));
  };

  console.log("yoyoyo", checked);
  return (
    <Box
      display={"flex"}
      direction={"row"}
      justifyContent={"center"}
      // bgcolor="grey"
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Checkbox
          checked={checked.accepted}
          onChange={(e) => handleChange2(e)}
        />
        <Typography variant="link">Acceptés</Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <Checkbox checked={checked.rejected} onChange={handleChange3} />
        <Typography variant="link">Rejetés</Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <Checkbox checked={checked.pending} onChange={handleChange4} />
        <Typography variant="link">En cours</Typography>
      </Stack>
    </Box>
  );
};

export default CheckBoxGroup;
