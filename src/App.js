import "./App.css";
import React, { useEffect, useState, useMemo } from "react";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRouter";
import history from "./history";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { authState } from "./state/atom";

// funktion til brugren authState for login
function App() {
  const [_authState, setIsAuth] = useRecoilState(authState);

  // ved login bliver auth true
  const onLoginHandler = (e) => {
    e.preventDefault();
    setIsAuth((prev) => {
      return { ...prev, isAuth: true };
    });
    history.push("/dashboard"); // sender brugeren til dashboard
  };
  console.log(_authState);
  const isAuth = localStorage.getItem("isAuth");
  const parsedIsAuth = isAuth === "true" ? true : false;

  // her er hvad der bliver vist på siden
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <div>Home</div>
            <Link to="/login">Klik her for at logge ind</Link>
            <Link to="/signup">Klik her for at sign up</Link>

            <button onClick={onLoginHandler}>Login</button>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>

          <ProtectedRoute
            component={Dashboard}
            user={parsedIsAuth}
            exact
            path="/dashboard"
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
