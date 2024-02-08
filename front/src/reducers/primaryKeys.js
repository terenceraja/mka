import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    IdCtraCli: null,
    IdCrtaPTF: [],
    IdLigne: null,
    activePtf: {},
    activeLign: {},
    TotalMV: null,
  },
};

export const keysSlice = createSlice({
  name: "keys",

  initialState,
  reducers: {
    addIdCtraCliToStore: (state, action) => {
      state.value.IdCtraCli = action.payload;
    },
    addIdCtraPtfToStore: (state, action) => {
      console.log(action.payload);
      state.value.IdCrtaPTF = [...action.payload];
    },

    addIdLigneToStore: (state, action) => {
      state.value.IdLigne = action.payload;
    },

    addActivePtfToStore: (state, action) => {
      state.value.activePtf = action.payload;
    },
    addActiveLignToStore: (state, action) => {
      state.value.activeLign = action.payload;
    },
    addTotalMVToStore: (state, action) => {
      state.value.TotalMV = action.payload;
    },
    clearStore: (state, action) => {
      return {
        ...state,
        value: {
          IdCtraCli: null,
          IdCrtaPTF: [],
          IdLigne: null,
          activePtf: {},
          activeLign: {},
          TotalMV: null,
        },
      };
    },
  },
});

export const {
  addIdCtraPtfToStore,
  addIdLigneToStore,
  addIdCtraCliToStore,
  addActivePtfToStore,
  addActiveLignToStore,
  addTotalMVToStore,
  clearStore,
} = keysSlice.actions;
export default keysSlice.reducer;
