import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({isLogged}) => {
  if ((localStorage.getItem("Authorization")) && isLogged === "1") {
    return <Outlet />;
  } else {
    localStorage.clear()
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
