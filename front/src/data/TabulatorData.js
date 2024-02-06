//FOR ALL TABLES
export const optionsTable = {
  layout: "fitDataFill",
  responsiveLayout: "collapse",
  paginationButtonCount: 3,
  pagination: true,
  paginationSize: 10,

  placeholder: "No Data Available",
};

//

// TABLE VOS PORTEFEUILLE PAGE PTF
export const columnsPtf = [
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
//

//TABLE OPERATIONS PAGE PTF
export const columnsOpe = [
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
    // minWidth: 200,
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

// TABLE LIGNPTF PAGE DETPTF
export const columnsLignPtf = [
  { title: "ALLOCATION", field: "LangueNomLocalAlloc_lmt", responsive: 4 },
  {
    title: "QUANTITE",
    field: "SoldeCptaDateArrete_lsn",
    responsive: 0,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
      precision: 5,
    },
  },
  { title: "LIBELLE", field: "Libelle_lmt", minWidth: 200, responsive: 0 },
  { title: "ISIN", field: "CodeIsin_lst", minWidth: 130, responsive: 0 },
  { title: "DEV", field: "CurrISOCode_lxt", minWidth: 80, responsive: 5 },
  {
    title: "PMA",
    field: "PMA_lsn",
    responsive: 6,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "MKTCOT",
    field: "MktCOTDevLIGN_lsn",
    responsive: 1,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "VALUE",
    field: "Value",
    responsive: 7,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
      symbol: "%",
      symbolAfter: "%",
    },
  },
  {
    title: "YTD",
    field: "PCTPlusValKpYtoDDevLIGNDebutAnnee_lcn",
    responsive: 8,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
      symbol: "%",
      symbolAfter: "%",
    },
  },
  {
    title: "TAUX",
    field: "TauxBase_lmn",
    responsive: 9,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
      precision: 3,
      symbol: "%",
      symbolAfter: "%",
    },
  },
  {
    title: "MATURITE",
    responsive: 10,
    field: "DateMaturite_lsd",
    minWidth: 100,
    sorter: "date",
  },
  {
    title: "YIELD",
    field: "MktCotYieldDevLIGNAff_lcn",
    responsive: 11,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
      symbol: "%",
      symbolAfter: "%",
    },
  },
  {
    title: "MVIAAIEUR",
    field: "MVAaiJCptaDevPTF_lsn",
    responsive: 2,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "%",
    field: "PCT",
    responsive: 12,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
      symbol: "%",
      symbolAfter: "%",
    },
  },
  {
    title: "MVLIGNE",
    field: "MVJCptaDevLIGN_lsn",
    responsive: 13,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "MVEUR",
    field: "MVJCptaDevPTF_lsn",
    responsive: 14,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
  {
    title: "CCEUR",
    field: "CpnCourusTotDevPTF_lsn",
    responsive: 16,
    minWidth: 100,
    headerHozAlign: "right",
    hozAlign: "right",
    formatter: "money",
    formatterParams: {
      decimal: ",",
      thousand: " ",
    },
  },
];

// TABLE MOUVEMENTS PAGE MVT

export const columnsMvt = [
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
