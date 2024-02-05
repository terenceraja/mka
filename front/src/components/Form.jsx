import React from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";

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
  console.log(form);

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

    if (response.IdCtraCli) {
      console.log(response);
      dispatch(addIdCtraCliToStore(response.IdCtraCli));
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
    >
      <TextField
        onChange={(e) => handleOnChange(e)}
        id="Login"
        label="Login"
        variant="standard"
        fullWidth
      />
      <TextField
        onChange={(e) => handleOnChange(e)}
        id="Password"
        label="Password"
        variant="standard"
        fullWidth
      />
      <Button type="submit" fullWidth variant="contained">
        Contained
      </Button>
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
    marginBottom: 2.5,
    width: "100%",
  },
};

export default Form;
