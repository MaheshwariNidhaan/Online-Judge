// import { Outlet, Navigate } from "react-router-dom";

// const ProtectedRoutes = () => {
//   let auth = { token: false };
//   return auth.token ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoutes;

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
