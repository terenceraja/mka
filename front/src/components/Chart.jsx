import React from "react";
import { Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";

const Chart = ({ data, options }) => {
  const [labels, setLabels] = useState([]);
  console.log("state", labels);

  useEffect(() => {
    if (data.labels && data.labels.length > 0) {
      const label = data.labels.map((element, key) => (
        <Stack alignItems="center" direction="row" spacing={1}>
          <CircleIcon
            fontSize="medium"
            style={{ color: data.datasets[0].borderColor[key] }}
          />
          <Typography
            key={key}
            variant="navLink"
            component="div"
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
        <Doughnut
          data={data}
          options={options}
          height={200}
          style={{ backgroundColor: "white", borderRadius: "5px" }}
        />
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

export default Chart;
