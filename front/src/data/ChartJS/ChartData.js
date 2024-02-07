//DOUGHNUT CHART OPTIONS

export const optionsPie = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

// //BAR CHART OPTIONS
export const optionsBar = {
  maintainAspectRatio: false, // Don't maintain w/h ratio
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    y: {
      grid: {
        display: false, // Disable grid lines on the y-axis
      },
    },
  },
  plugins: {
    tooltip: {},
    legend: {
      display: false,
    },
    datalabels: {
      formatter: (val) => {
        return `${Math.ceil(val * 100) / 100}` + " %";
      },
      anchor: "center", // Adjust the anchor point for the data labels
      align: "center",
      color: "black",
      font: {
        size: 12,
      },
    },
  },
};

export const labels = [
  "Equities",
  "Fonds alternatifs",
  "Liquidités",
  ["Obligations &", "fonds obligataires"],
];
