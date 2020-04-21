import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
const Protected = ({ component: Comp, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("login") ? (
        <Comp {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  ></Route>
);

export default Protected;
