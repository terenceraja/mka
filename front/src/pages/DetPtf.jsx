import React from "react";
import CardBox from "../components/Card";
import Table from "../components/Table";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Box } from "@mui/material";

import {
  columnsLignPtfSM,
  columnsLignPtfMD,
  columnsLignPtfLG,
} from "../data/TabulatorData/Ligne";

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
  console.log(dataBar);

  const isMobile = useMediaQuery({
    query: "(max-width: 425px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    if (isMobile) {
      setColumnsLignPtf(columnsLignPtfSM);
    } else if (isTablet) {
      setColumnsLignPtf(columnsLignPtfMD);
    } else {
      setColumnsLignPtf(columnsLignPtfLG);
    }
  }, [isMobile, isTablet]); // Update columns whenever the screen size changes

  const ptfInfos = useSelector((state) => state.keys.value.activePtf);
  console.log("totMV", ptfInfos.MktValAaiDevCLIAuc_lcn);

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
        console.log(responseLignPtf);
        //CALCULATE +/- VALUE
        const dataWithPCTVal = PCTValCalc(responseLignPtf.data);
        console.log("new", dataWithPCTVal);
        //

        //CALCULATE %
        const dataWithPCT = PCTCalc(dataWithPCTVal, MktValAaiDevCLIAuc_lcn);
        console.log("new", dataWithPCTVal);
        //

        //DATE FORMAT
        const dataDateFormat = formatISO(dataWithPCT, "DateMaturite_lsd");
        console.log("date format", dataDateFormat);
        //

        //YTD * 100 CALC
        const finalData = YTDTimes100(dataDateFormat);
        console.log("aze", finalData);
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
  const rowClick = (rowData) => {
    console.log(rowData.getData());
    const IdAsset = rowData.getData().IdAsset;
    const activeLign = { IdCtraPtf: IdCtraPtf, IdAsset: IdAsset };
    dispatch(addActiveLignToStore(activeLign));
    navigate("/Mvt");
  };
  return (
    <Box sx={styles.content}>
      <CardBox title={`Market Value: ${MktValAaiDevCLIAuc_lcn}`}>
        <Table
          columns={columnsLignPtf}
          data={dataLignPtf}
          parentClick={rowClick}
        />
      </CardBox>
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
