import { redirect } from "react-router-dom";

// HTTP
import { auth } from "../utils/http";

export const checkAuthLoader = async () => {
  const response = await auth();
  console.log(response);
  if (!response.auth) {
    return redirect("/");
  }
  return null;
};
