import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// MUI
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import Crop75Icon from "@mui/icons-material/Crop75";

// CHARTJS
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { optionsBar } from "../data/ChartJS/ChartData";

const ChartBar = ({ data }) => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // PRINT LABELS
    if (data.labels && data.labels.length > 0) {
      const label = data.labels.map((element, key) => (
        <Stack key={key} alignItems="center" direction="row" spacing={1}>
          <Crop75Icon
            fontSize="medium"
            style={{ color: data.datasets[0].borderColor[key] }}
          />
          <Typography
            variant="navLink"
            color={data.datasets[0].borderColor[key]}
          >
            {element} : {Math.ceil(data.datasets[0].data[key] * 100) / 100}%
          </Typography>
        </Stack>
      ));
      setLabels(label);
    }
  }, [data.labels]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.chartContainer}>
        <Bar data={data} options={optionsBar} height={300} />
      </Box>
      <Box sx={styles.labelContainer}>{labels}</Box>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  container: {
    display: "flex",
    width: "100%",
    gap: "5px",
  },
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
  },
  labelContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "start",
    width: "40%",
    gap: "2px",
  },
};

export default ChartBar;
