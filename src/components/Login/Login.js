import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { authState } from "../../state/atom";
import { useRecoilState } from "recoil";
import history from "../../history";

// bruger useState til at håndtere den information brugeren indtaster ved login
export default function Login() {
  const [email, setEmail] = useState([]);
  const [hashed_password, setHashedPassword] = useState([]);
  const [_authState, setAuthState] = useRecoilState(authState);


  const HandleSubmit = (event) => {
    event.preventDefault();

    // console.log("User Email : " + this.state.email)

    // fetcher vores post metode fra vores login endpont
    const url = "http://localhost:7071/api/login";

    const data = {
      email: email,
      hashed_password: hashed_password,
    };
    console.log("User: " + data);
    fetch(url, {
      method: "POST",

      //body: JSON.stringify(data), // data can be `string` or {object}!

      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail(data);
        setHashedPassword(this.state.hashed_password); // her har vi verificeret brugerens oplysninger
      })
      .catch((error) => {
        console.error("Error:", error);
        setAuthState({ // her tildeler vi "isAuth" til brugeren for at kunne forblive logget ind
          isAuth: true,
          id: Math.floor(Math.random() * 23),
          token: "123",
        });
        localStorage.setItem("isAuth", "true"); //gemmer det i local storage
        return history.push("/dashboard"); // sender brugeren til dashboard efter login
      })
      .then((response) => console.log("Success:", response));
  };

  // her er hvad der bliver vist på login siden
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <Link to="/">Gå tilbage</Link>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit" onClick={HandleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
