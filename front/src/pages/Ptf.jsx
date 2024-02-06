import React from "react";
import Card from "../components/Card";

// MUI
import { Box } from "@mui/material";
import Table from "../components/Table";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: 1,
  border: "1px solid red", // Add a red border to make it visible for debugging
});

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

// TABLE COLUMNS
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

const Ptf = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [dataPtf, setdataPtf] = useState([]);
  const [dataOpe, setdataOpe] = useState([]);
  const [columnsOpe, setColumnsOpe] = useState([]);
  const [columnsPtf, setColumnsPtf] = useState([]);
  const [dataClasses, setDataClasses] = useState({});
  const [dataDevises, setDataDevises] = useState({});
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const IdCtraCli = useSelector((state) => state.keys.value.IdCtraCli);

  console.log(selectedFile);

  // RESPONSIVE TABLE
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
  ///

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // TABLE ROWCLICK
  const rowClick = (activePtf) => {
    dispatch(addActivePtfToStore(activePtf));
    navigate("/layout/detPtf");
  };

  // FILE SELECTION
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // // Function to handle file upload
  // const handleUpload = () => {
  //   // Perform upload logic here
  //   if (selectedFile) {
  //     console.log("Uploading file:", selectedFile);
  //     // You can perform the file upload logic here, e.g., send the file to the server
  //   } else {
  //     console.log("No file selected.");
  //   }
  // };

  return (
    <Box sx={styles.content}>
      <Card title="PORTEFEUILLES">
        <Table columns={columnsPtf} data={dataPtf} parentClick={rowClick} />
        <CardActions>
          <Button size="small" sx={styles.consBtn}>
            Consolidation
          </Button>
        </CardActions>
      </Card>
      <Card title="OPERATIONS">
        <Table columns={columnsOpe} data={dataOpe} />
      </Card>

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        // onClick={handleUpload}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
      </Button>
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
    bgcolor: "primary.main",
    color: "white",
    fontSize: "10px",
    "&:hover": {
      bgcolor: "complementary.main",
    },
  },
};

export default Ptf;
