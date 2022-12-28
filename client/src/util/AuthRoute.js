import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

function AuthRoute({Component}) {
  const user = useSelector((state) => state.auth.currentUser);
  // return user && user.isAdmin ? Component : <Navigate to="/login" />;
  return Component;
}

export default AuthRoute;
