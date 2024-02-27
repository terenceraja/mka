import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// MUI
import { Box } from "@mui/material";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// CHARTJS
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { optionsPie } from "../data/ChartJS/ChartData";

const ChartPie = ({ data }) => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // PRINT LABELS
    if (data.labels && data.labels.length > 0) {
      const label = data.labels.map((element, key) => (
        <Stack key={key} alignItems="center" direction="row" spacing={1}>
          <TripOriginIcon
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
        <Doughnut data={data} options={optionsPie} height={200} />
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

export default ChartPie;
