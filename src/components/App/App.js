import React, { useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import login from '../Login/Login'


// første vi gør er at give brugeren et token.
// gør brug af useState funktionen
function App() {
    const [token, setToken] = useState();

    if(!token) {
        return <login setToken={setToken} />;
    }


// vi opretter en browserroute til at navigere brugeren i vores program
  return (
    <div className="wrapper">
    <h1>Application</h1>
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard"> 
          <Dashboard />
        </Route>
        <Route path="/preferences">
          <Preferences />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;