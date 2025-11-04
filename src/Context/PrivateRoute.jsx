import React, { use } from "react";
import { AuthContext } from "./AuthContexts";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  console.log(location)

  if (loading) {
    return <Loading></Loading>;
  }

  if (user ) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/register"></Navigate>;
};

export default PrivateRoute;
