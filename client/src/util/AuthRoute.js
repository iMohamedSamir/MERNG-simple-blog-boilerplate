import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.auth.currentUser);
  user && user.isAdmin ? console.log("Admin") : console.log("Not Admin");
  return (
    <Route
      {...rest}
      render={(props) =>
        user && !user.isAdmin ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
