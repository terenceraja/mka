//DOUGHNUT CHART OPTIONS
export const optionsPie = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return "";
        },
      },
    },
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
  responsive: true,
  maintainAspectRatio: false, // Don't maintain w/h ratio
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: false, // Disable grid lines on the y-axis
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return "";
        },
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};
