import React from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import ChartBar from "../components/ChartBar";
import Modal from "../components/Modal";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { formatSpacingAndDecimalNumbers } from "../utils/functions";

// TABULATOR COLUMNS & OPTIONS
import {
  columnsLignPtfSM,
  columnsLignPtfSMMD,
  columnsLignPtfMD,
  columnsLignPtfLG,
} from "../data/Tabulator/Ligne";

// ULTILS FUNCTIONS
import {
  formatISO,
  PCTValCalc,
  PCTCalc,
  getUniqueLanguesWithSum,
  YTDTimes100,
} from "../utils/functions";

//REDUCERS
import { addActiveLignToStore } from "../reducers/primaryKeys";

// HTTP REQUEST
import { fetchLign } from "../utils/http";

const DetPtf = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [dataLignPtf, setDataLignPtf] = useState([]);
  const [columnsLignPtf, setColumnsLignPtf] = useState([]);
  const [dataBar, setDataBar] = useState({});
  const [error, setError] = useState("");

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //MODAL
  const setModalStateRef = useRef(null); // Create a ref to store setSnackState function
  // Function to trigger state change in Snack component
  const triggerModalStateChange = (newState) => {
    if (setModalStateRef.current) {
      setModalStateRef.current(newState); // Update Snack component state using the stored function
    }
  };
  const handleOpenModal = () => {
    triggerModalStateChange({
      ...setModalStateRef.current,
      open: true,
      message: `Session expiré ou token indisponible, vous allez être redirigé à la page de connexion`,
      confirmation: "SE RECONNECTER",
      auth: false,
    });
  };
  const handleConfirmation = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  // RESPONSIVE TABLE
  const isSmartphone = useMediaQuery({
    query: "(max-width: 479px)",
  });
  const isBetween = useMediaQuery({
    query: "(min-width: 480px) and (max-width: 767px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  useEffect(() => {
    if (isSmartphone) {
      setColumnsLignPtf(columnsLignPtfSM);
    } else if (isBetween) {
      setColumnsLignPtf(columnsLignPtfSMMD);
    } else if (isTablet) {
      setColumnsLignPtf(columnsLignPtfMD);
    } else {
      setColumnsLignPtf(columnsLignPtfLG);
    }
  }, [isSmartphone, isBetween, isTablet]);

  // BAR CHART DATASETS
  const dataBarChart = {
    labels: dataBar.uniqueLangues,

    datasets: [
      {
        data: dataBar.adjustedSumByLangue,
        backgroundColor: [
          "rgba(75, 192, 192, 0.4)",
          "rgba(65, 105, 225, 0.4)",
          "rgba(255, 192, 203, 0.4)",
          "rgba(255, 165, 0, 0.4)",
          "rgba(255, 99, 71, 0.4)",
          "rgba(128, 0, 128, 0.4)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(65, 105, 225, 0.8)",
          "rgba(255, 192, 203, 0.8)",
          "rgba(255, 165, 0, 0.8)",
          "rgba(255, 99, 71, 0.4)",
          "rgba(128, 0, 128, 0.4)",
        ],
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  // GET ACTIVE PTF FROM STORE
  const ptfInfos = useSelector((state) => state.keys.value.activePtf);
  console.log("total MV", ptfInfos.MktValAaiDevCLIAuc_lcn);
  console.log("ptfInfos", ptfInfos);
  const {
    IdCtraPtf,
    NumeroPtfDep_lmt,
    RaisonSociale_lmt,
    MktValAaiDevCLIAuc_lcn,
  } = ptfInfos;
  console.log("id", IdCtraPtf);

  // GET FETCHING EXAMPLE
  useEffect(() => {
    const fetchDataFromServer = async () => {
      setIsFetching(true);

      try {
        const responseLignPtf = await fetchLign({ IdCtraPtf });

        // AUTHENTIFICATION
        console.log("response", responseLignPtf);
        if (!responseLignPtf.auth) {
          console.log("no auth");
          handleOpenModal();
        }

        //CALCULATE +/- VALUE
        const dataWithPCTVal = PCTValCalc(responseLignPtf.data);
        // console.log("PCTVAL", dataWithPCTVal);
        //

        //CALCULATE %
        const dataWithPCT = PCTCalc(dataWithPCTVal, MktValAaiDevCLIAuc_lcn);
        // console.log("%", dataWithPCTVal);
        //

        //DATE FORMAT
        const dataDateFormat = formatISO(dataWithPCT, "DateMaturite_lsd");
        // console.log("date format", dataDateFormat);
        //

        //YTD * 100 CALC
        const finalData = YTDTimes100(dataDateFormat);
        // console.log("YTD, final", finalData);
        //

        //GET LABELS
        const labels = getUniqueLanguesWithSum(
          dataDateFormat,
          MktValAaiDevCLIAuc_lcn
        );
        setDataBar(labels);
        //

        setDataLignPtf(finalData);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchDataFromServer(); // Call the renamed local function
  }, []);
  //

  // ROW CLICK TABULATOR
  const rowClick = (row) => {
    console.log(row.getData());
    const IdAsset = row.getData().IdAsset;
    const Libelle_lmt = row.getData().Libelle_lmt;
    const activeLign = {
      IdCtraPtf: IdCtraPtf,
      IdAsset: IdAsset,
      Libelle_lmt: Libelle_lmt,
    };
    dispatch(addActiveLignToStore(activeLign));
    navigate("/layout/mvt");
  };
  return (
    <Box sx={styles.content}>
      <Modal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Card title="CLASSES D'ACTIF">
        <ChartBar data={dataBarChart} />
      </Card>
      <Card
        title={`MARKET VALUE: ${formatSpacingAndDecimalNumbers(
          MktValAaiDevCLIAuc_lcn,
          2
        )} EUR`}
        subTitle={`${RaisonSociale_lmt} | ${NumeroPtfDep_lmt} `}
      >
        <Table
          columns={columnsLignPtf}
          data={dataLignPtf}
          parentClick={rowClick}
        />
      </Card>

      <Card title="CONTACT :">
        <Box
          sx={styles.footer}
          id="footer"
          bgcolor={theme.palette.primary.main}
        >
          <Typography variant="navLink">tel: 00.00.00.00.00</Typography>
          <Typography variant="navLink">e-mail: user@gmail.com</Typography>
          <Typography variant="navLink">Powered by KeeSystem</Typography>
        </Box>
      </Card>
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100px",
    p: 2,
    borderRadius: 1,
    gap: "5px",
  },
};

export default DetPtf;
