import React, { Component, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// denne funktion er til at håndtere den information brugeren indtaster ved signup
export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      birthday: "",
      email: "",
      gender: "",
      hashed_password: "",
      salt: "",
    };
  }

  // funktion til at håndtere forandringer
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // funktion til at håndtere den data som brugeren har indtastet
  handleSubmit = (event) => {
    event.preventDefault();

    const url = "http://localhost:7071/api/createUser";

    // sætter den data brugeren har indtastet til staten
    const data = {
      name: this.state.name,
      birthday: this.state.birthday,
      email: this.state.email,
      gender: this.state.gender,
      hashed_password: this.state.hashed_password,
    };
    console.log("User: " + data);
    fetch(url, { // fetcher vores createUser endpoint med post metoden
      method: "POST", // or ‘PUT’

      body: JSON.stringify(data), // JSON.stringify til at lave informationen til en string 

      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };


  // her er hvad der vises på siden
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="birthday"
            placeholder="birthday"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="gender"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="hashed_password"
            placeholder="Password"
            onChange={this.handleChange}
          />

          <input type="submit" value="Add user" />
        </div>{" "}
      </form>
    );
  }
}
