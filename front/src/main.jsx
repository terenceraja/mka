import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// IMPORT REDUX & REDUX PERSIST
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// CONFIG REDUCER & STORE
import keys from "./reducers/primaryKeys.js";
const reducers = combineReducers({ keys });
const persistConfig = { key: "applicationName", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
