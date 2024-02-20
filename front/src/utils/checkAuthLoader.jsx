import React from "react";
import { redirect } from "react-router-dom";

export const checkAuthLoader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("no toke page");
    return redirect("/");
  }
  // Return null if the user is authenticated and no action is needed
  return null;
};
