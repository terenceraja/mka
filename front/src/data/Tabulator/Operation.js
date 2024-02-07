//TABLE OPERATIONS PAGE PTF
export const columnsOpeLG = [
  {
    title: "DATE",
    field: "DateCptaOPE_lsd",
    responsive: 0,
    resizable: false,
    minWidth: 100,
    sorter: "date",
  },
  {
    title: "OPERATION",
    field: "NomLocalTypOp_lmt",
    responsive: 1,
    resizable: true,
    minWidth: 200,
  },
  {
    title: "ASSET",
    field: "Libelle_lmt",
    responsive: 2,
    resizable: true,
    minWidth: 200,
  },
  {
    title: "ISIN",
    field: "CodeIsin_lst",
    responsive: 3,
    resizable: false,
    minWidth: 150,
  },
  {
    title: "DEVISE",
    field: "ISOCode_lmt",
    responsive: 4,
    resizable: false,
    minWidth: 80,
  },
  {
    title: "PRIX",
    field: "CotOPEASSETDevASSET_lsn",
    responsive: 5,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
    resizable: false,
    minWidth: 120,
  },
  {
    title: "QUANTITE",
    field: "CptaMontantQte_lcn",
    responsive: 6,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
      precision: 4,
    },
    resizable: false,
    minWidth: 120,
  },
  {
    title: "MONTANT",
    field: "CapitalDevLIGN_lsn",
    responsive: 7,
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
    resizable: false,
    minWidth: 120,
    headerHozAlign: "right",
    hozAlign: "right",
  },
];

export const columnsOpeMD = [
  {
    title: "DATE",
    field: "DateCptaOPE_lsd",
    responsive: 0,
    resizable: false,
    minWidth: 100,
    sorter: "date",
  },
  {
    title: "OPERATION",
    field: "NomLocalTypOp_lmt",
    responsive: 1,
    resizable: true,
    minWidth: 200,
  },
  {
    title: "ASSET",
    field: "Libelle_lmt",
    responsive: 2,
    resizable: true,
    minWidth: 150,
  },
  {
    title: "ISIN",
    field: "CodeIsin_lst",
    responsive: 3,
    resizable: false,
    minWidth: 150,
  },
  {
    title: "QUANTITE",
    field: "CptaMontantQte_lcn",
    responsive: 6,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
      precision: 4,
    },
    resizable: false,
    minWidth: 120,
  },
];

export const columnsOpeSM = [
  {
    title: "DATE",
    field: "DateCptaOPE_lsd",
    responsive: 0,
    resizable: false,
    minWidth: 100,
    sorter: "date",
  },
  {
    title: "OPERATION",
    field: "NomLocalTypOp_lmt",
    responsive: 1,
    resizable: true,
    minWidth: 200,
  },
  {
    title: "ASSET",
    field: "Libelle_lmt",
    responsive: 2,
    resizable: true,
    minWidth: 200,
  },
];

// TABLE VOS PORTEFEUILLE PAGE PTF
export const columnsPtf = [
  {
    title: "DEPOSITAIRES",
    field: "RaisonSociale_lmt",
    responsive: 0,
    resizable: true,
    minWidth: 100,
  },
  {
    title: "NUMERO",
    field: "NumeroPtfDep_lmt",
    responsive: 0,
    resizable: true,
    minWidth: 150,
  },
  {
    title: "PROFILE",
    field: "NomLocalProfil_lmt",
    responsive: 1,
    resizable: true,
    minWidth: 150,
  },
  {
    title: "MARKET VALUE",
    field: "MktValAaiDevCLIAuc_lcn",
    responsive: 0,
    minWidth: 150,
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
    resizable: true,
    headerHozAlign: "right",
    hozAlign: "right",
  },
];
//
