import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
export default function Login() {
  function HandleSubmit(event) {
    const [email, setEmail] = useState([]);
    const [hashed_password, setHashedPassword] = useState([]);
    event.preventDefault();

    // console.log("User Email : " + this.state.email)

    const url = "http://localhost:7071/api/login";

    const data = {
      email: this.state.email,
      hashed_password: this.state.hashed_password,
    };
    console.log("User: " + data);
    fetch(url, {
      method: "POST",

      //body: JSON.stringify(data), // data can be `string` or {object}!

      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data);
        setHashedPassword(this.state.hashed_password);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <Link to="/">Gå tilbage</Link>
      <form onSubmit={HandleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
