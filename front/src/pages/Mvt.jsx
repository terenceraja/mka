import React from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

// TABULATOR COLUMNS & OPTIONS
import { optionsTable } from "../data/Tabulator/Options";
import {
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

  const navigate = useNavigate();

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

        // AUTHENTIFICATION
        console.log("response", responseMvt);
        if (!responseMvt.auth) {
          console.log("no auth");
          handleOpenModal();
        }

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
      <Modal
        setModalStateRef={setModalStateRef}
        onConfirmation={handleConfirmation}
      />
      <Card title="MOUVEMENTS" subTitle={lignInfos.Libelle_lmt}>
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
