import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        if (user) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
