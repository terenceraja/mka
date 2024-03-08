import React from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// REACT
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

// HTTP
import { fetchId } from "../utils/http";

// REDUCER
import { addIdCtraCliToStore } from "../reducers/primaryKeys";

const Form = () => {
  // FETCH STATES
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  // FORM
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // POST FETCHING EXAMPLE
  const fetchDataFromServer = async () => {
    setIsFetching(true);

    try {
      const response = await fetchId(form);
      return response;
    } catch (error) {
      setError({ message: error.message || "custom error message" });
    }
  };

  // INPUT ONCHANGE
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //HANDLE LOGIN CLICK
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetchDataFromServer();

    if (response.admin) {
      console.log("admin acess", response);
      localStorage.setItem("token", response.token);
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
      return;
    } else {
      setTimeout(() => {
        setIsFetching(false);
        setServerMessage("ADMIN ACCESS REFUSEE");
      }, 1000);
    }

    if (response.IdCtraCli) {
      console.log(response);
      dispatch(addIdCtraCliToStore(response.IdCtraCli));
      localStorage.setItem("token", response.token);
      setTimeout(() => {
        navigate("layout/ptf");
      }, 1500);
    } else {
      setTimeout(() => {
        setIsFetching(false);
        setServerMessage(response.message);
      }, 1000);

      console.log(response);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={styles.formContainer}
      onSubmit={(e) => handleLogin(e)}
      id="form"
    >
      <TextField
        name="login"
        onChange={(e) => handleOnChange(e)}
        id="Login"
        label="Login"
        variant="standard"
        fullWidth
      />
      <TextField
        type="password"
        name="password"
        onChange={(e) => handleOnChange(e)}
        id="Password"
        label="Password"
        variant="standard"
        fullWidth
      />
      <Button type="submit" sx={styles.loginBtn} fullWidth variant="contained">
        LOGIN
      </Button>
      {isFetching ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="warning" />
        </Box>
      ) : serverMessage ? (
        <Alert
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          severity="success"
          color="error"
        >
          {serverMessage}
        </Alert>
      ) : (
        <></>
      )}
    </Box>
  );
};

/**@type {import("@mui/material".SxProps)} */
const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loginBtn: {
    marginTop: "20px",
    bgcolor: "complementary.main",
    height: "45px",
  },
};

export default Form;
