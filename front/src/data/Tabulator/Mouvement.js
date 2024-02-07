// OPTIONS
export const optionsTable = {
  movableColumns: true,
  layout: "fitColumns",
  responsiveLayout: "collapse",
  paginationButtonCount: 3,
  pagination: true,
  paginationSize: 10,
  placeholder: "No Data Available",
};

// TABLE MOUVEMENTS SM
export const columnsMvtSM = [
  {
    title: "OPERATION",
    field: "CptaDateOPE_lsd",
    sorter: "date",
  },
  { title: "LIBELLE DU MOUVEMENT", field: "Libelle_lst", minWidth: 150 },
  {
    title: "DEBIT",
    field: "CptaMontantQteDebit_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "CREDIT",
    field: "CptaMontantQteCredit_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
];

// TABLE MOUVEMENTS MD

export const columnsMvtMD = [
  {
    title: "OPERATION",
    field: "CptaDateOPE_lsd",
    sorter: "date",
  },
  {
    title: "VALEUR",
    field: "CptaDateValeur_lsd",
    sorter: "date",
  },
  { title: "LIBELLE DU MOUVEMENT", field: "Libelle_lst" },
  {
    title: "PRIX",
    field: "CotOPEASSETDevASSET_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },

  {
    title: "DEBIT",
    field: "CptaMontantQteDebit_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "CREDIT",
    field: "CptaMontantQteCredit_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
];

// TABLE MOUVEMENTS LG

export const columnsMvtLG = [
  {
    title: "OPERATION",
    field: "CptaDateOPE_lsd",
    sorter: "date",
  },

  {
    title: "VALEUR",
    field: "CptaDateValeur_lsd",
    sorter: "date",
  },
  { title: "LIBELLE DU MOUVEMENT", field: "Libelle_lst" },
  { title: "E", field: "FlagExtourne_lcn" },
  {
    title: "PRIX",
    field: "CotOPEASSETDevASSET_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "COURS",
    field: "CotOPEDevASSETDevPTF_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "DEBIT",
    field: "CptaMontantQteDebit_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "CREDIT",
    field: "CptaMontantQteCredit_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "CUMUL",
    field: "MktCOTDevLIGN_lsn",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
];
