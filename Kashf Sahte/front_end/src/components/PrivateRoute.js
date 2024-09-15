import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, authenticated, ...rest }) => {
  if (!authenticated) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the specified element
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
