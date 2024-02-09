import React from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import ChartBar from "../components/ChartBar";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Box } from "@mui/material";

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

const Ptf = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [dataLignPtf, setDataLignPtf] = useState([]);
  const [columnsLignPtf, setColumnsLignPtf] = useState([]);
  const [dataBar, setDataBar] = useState({});
  const [error, setError] = useState("");

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // GET FETCHING EXAMPLE
  useEffect(() => {
    const fetchDataFromServer = async () => {
      setIsFetching(true);

      try {
        const responseLignPtf = await fetchLign({ IdCtraPtf });
        // console.log(responseLignPtf);
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
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default Ptf;
