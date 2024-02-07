import React from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { Box } from "@mui/material";

import {
  optionsTable,
  columnsMvtSM,
  columnsMvtMD,
  columnsMvtLG,
} from "../data/Tabulator/Mouvement";

// UTILS FUNCTIONS
import { formatISO } from "../utils/functions";

// REDUCER
import { useSelector } from "react-redux";

//HTTP REQUESTS
import { fetchMvt } from "../utils/http";

const Mvt = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [dataMvt, setDataMvt] = useState([]);
  const [columnsMvt, setColumnsMvt] = useState([]);
  const [optionsMvt, setOptionsMvt] = useState({});
  const [error, setError] = useState("");

  // STORE
  const lignInfos = useSelector((state) => state.keys.value.activeLign);
  console.log("lignInfos", lignInfos);

  // RESPONSIVE TABLE
  const isSmartphone = useMediaQuery({
    query: "(max-width: 479px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 480px) and (max-width: 1023px)",
  });

  useEffect(() => {
    if (isSmartphone) {
      setColumnsMvt(columnsMvtSM);
    } else if (isTablet) {
      setColumnsMvt(columnsMvtMD);
    } else {
      setColumnsMvt(columnsMvtLG);
    }
    setOptionsMvt(optionsTable);
  }, [isSmartphone, isTablet]);

  // GET FETCHING EXAMPLE
  useEffect(() => {
    const fetchDataFromServer = async () => {
      setIsFetching(true);

      try {
        const responseMvt = await fetchMvt(lignInfos);
        console.log("response", responseMvt);

        const updateData = formatISO(
          responseMvt.data,
          "CptaDateOPE_lsd",
          "CptaDateValeur_lsd"
        );
        console.log("update", updateData);
        setDataMvt(updateData);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchDataFromServer(); // Call the renamed local function
  }, []);
  //
  return (
    <Box sx={styles.content}>
      <Card title={lignInfos.Libelle_lmt}>
        <Table columns={columnsMvt} data={dataMvt} options={optionsMvt} />
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

export default Mvt;
