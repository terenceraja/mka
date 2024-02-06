import React from "react";
import CardBox from "../components/CardBox";
import { Box } from "@mui/material";
import Table from "../components/Table";

// REACT
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// UTILS FUNCTIONS
import {
  formatISO,
  getUniqueLanguesWithSum,
  getUniqueDevWithSum,
} from "../utils/functions";

//REDUCERS
import {
  addIdCtraPtfToStore,
  addActivePtfToStore,
  addTotalMVToStore,
} from "../reducers/primaryKeys";

// HTTP REQUEST
import { fetchPtf, fetchOpe, fetchLign } from "../utils/http";

import {
  columnsOpeLG,
  columnsOpeMD,
  columnsOpeSM,
} from "../data/TabulatorData/Operation";

import {
  columnsPtfSM,
  columnsPtfMD,
  columnsPtfLG,
} from "../data/TabulatorData/Portefeuille";

import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const Ptf = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [dataPtf, setdataPtf] = useState([]);
  const [dataOpe, setdataOpe] = useState([]);
  const [columnsOpe, setColumnsOpe] = useState([]);
  const [columnsPtf, setColumnsPtf] = useState([]);
  const [dataClasses, setDataClasses] = useState({});
  const [dataDevises, setDataDevises] = useState({});
  const [error, setError] = useState("");
  const IdCtraCli = useSelector((state) => state.keys.value.IdCtraCli);
  console.log("responsive", columnsOpe);

  const isMobile = useMediaQuery({
    query: "(max-width: 425px)", // Define mobile breakpoint
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 768px)", // Define tablet breakpoint
  });

  useEffect(() => {
    if (isMobile) {
      setColumnsOpe(columnsOpeSM); // Set columns for mobile
      setColumnsPtf(columnsPtfSM); // Set columns for mobile
    } else if (isTablet) {
      setColumnsOpe(columnsOpeMD); // Set columns for tablet
      setColumnsPtf(columnsPtfMD); // Set columns for mobile
    } else {
      setColumnsOpe(columnsOpeLG); // Set columns for large screens
      setColumnsPtf(columnsPtfLG); // Set columns for mobile
    }
  }, [isMobile, isTablet]); // Update columns whenever the screen size changes

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // PREV
  // GET FETCHING EXAMPLE
  useEffect(() => {
    const fetchDataFromServer = async () => {
      setIsFetching(true);

      try {
        //PORTFOLIOS
        const responsePtf = await fetchPtf({ IdCtraCli });
        const IdCtraPtf = responsePtf.data.map((obj) => {
          return obj.IdCtraPtf;
        });
        console.log(responsePtf);
        dispatch(addIdCtraPtfToStore(IdCtraPtf));
        dispatch(addTotalMVToStore(responsePtf.totMV));
        setdataPtf(responsePtf.data);

        console.log("Ptf IDs", IdCtraPtf);

        //OPERATIONS
        const responseOpe = await fetchOpe({ IdCtraPtf });
        console.log(responseOpe);
        const updateDataOpe = formatISO(responseOpe.data, "DateCptaOPE_lsd");
        setdataOpe(updateDataOpe);

        //LIGNES CLASSES FOR DOUGHNUT
        const responseLignPtf = await fetchLign({ IdCtraPtf });
        const labelsAndDataClasses = getUniqueLanguesWithSum(
          responseLignPtf.data,
          responsePtf.totMV
        );
        setDataClasses(labelsAndDataClasses);

        //LIGNES DEVISES FOR DOUGHNUT
        const labelsAndDataDevises = getUniqueDevWithSum(
          responseLignPtf.data,
          responsePtf.totMV
        );
        setDataDevises(labelsAndDataDevises);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchDataFromServer(); // Call the renamed local function
  }, []);
  //

  const rowClick = (activePtf) => {
    dispatch(addActivePtfToStore(activePtf));
    navigate("/layout/detPtf");
  };
  return (
    <Box sx={styles.content}>
      <CardBox title="VOS PORTEFEUILLE">
        <Table columns={columnsPtf} data={dataPtf} parentClick={rowClick} />
        <CardActions>
          <Button size="medium" sx={styles.consBtn}>
            Consolidation
          </Button>
        </CardActions>
      </CardBox>
      <CardBox title="OPERATIONS">
        <Table columns={columnsOpe} data={dataOpe} />
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
  consBtn: {
    bgcolor: "darkBlue.main",
    color: "white",
  },
};

export default Ptf;
