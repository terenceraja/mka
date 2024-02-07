// TABLE VOS PORTEFEUILLE PAGE PTF
export const columnsPtfSM = [
  {
    title: "DEPOSITAIRES",
    field: "RaisonSociale_lmt",
    responsive: 0,
    minWidth: 100,
  },
  {
    title: "NUMERO",
    field: "NumeroPtfDep_lmt",
    responsive: 0,
    minWidth: 80,
  },
  {
    title: "MARKET VALUE",
    field: "MktValAaiDevCLIAuc_lcn",
    responsive: 0,
    minWidth: 50,
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
    headerHozAlign: "right",
    hozAlign: "right",
  },
];

export const columnsPtfMD = [
  {
    title: "DEPOSITAIRES",
    field: "RaisonSociale_lmt",
    responsive: 0,
    minWidth: 100,
  },
  {
    title: "NUMERO",
    field: "NumeroPtfDep_lmt",
    responsive: 0,
    minWidth: 80,
  },
  {
    title: "PROFILE",
    field: "NomLocalProfil_lmt",
    responsive: 1,
    minWidth: 50,
  },
  {
    title: "MARKET VALUE",
    field: "MktValAaiDevCLIAuc_lcn",
    responsive: 0,
    minWidth: 50,
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
    headerHozAlign: "right",
    hozAlign: "right",
  },
];

export const columnsPtfLG = [
  {
    title: "DEPOSITAIRES",
    field: "RaisonSociale_lmt",
    responsive: 0,
    minWidth: 100,
  },
  {
    title: "NUMERO",
    field: "NumeroPtfDep_lmt",
    responsive: 0,
    minWidth: 80,
  },
  {
    title: "PROFILE",
    field: "NomLocalProfil_lmt",
    responsive: 1,
    minWidth: 50,
  },
  {
    title: "MARKET VALUE",
    field: "MktValAaiDevCLIAuc_lcn",
    responsive: 0,
    minWidth: 50,
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
    headerHozAlign: "right",
    hozAlign: "right",
  },
];
