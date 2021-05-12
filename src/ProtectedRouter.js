import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

// funktion til en beskyttet route for brugeren
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
                pathname: "/", // hvis brugeren er fin bliver man sendt tilbage
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
