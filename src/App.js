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
function App() {
  const [isAuthorized, setIsAuthotized] = useState(true);

  const onLoginHandler = (e) => {
    e.preventDefault();
    setIsAuthotized(true);
    history.push("/dashboard");
  };
  console.log(isAuthorized);
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
            user={isAuthorized}
            exact
            path="/dashboard"
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
