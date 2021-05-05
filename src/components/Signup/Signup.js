import React, { Component, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const url = "http://localhost:7071/api/createUser";

    const data = {
      name: this.state.name,
      birthday: this.state.birthday,
      email: this.state.email,
      gender: this.state.gender,
      hashed_password: this.state.hashed_password,
    };
    console.log("User: " + data);
    fetch(url, {
      method: "POST", // or ‘PUT’

      body: JSON.stringify(data), // data can be `string` or {object}!

      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };
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
// const [email, setEmail] = useState("");
// const [hashed_password, setHashed_password] = useState("");

// const [loginStatus, setLoginStatus] = useState("");

// const login = () => {
//     fetch("http://localhost:7071/api/login", {
//         method: "POST",
//         email: email,
//         hashed_password: hashed_password,
//     }).then((response) => {
//         if (response.data.message) {
//             setLoginStatus(response.data.message)
//         } else {
//             setLoginStatus(response.data[0].email)
//         }
//     })

// }

// export default class Login extends Component {
//     constructor(){
//         super();
//         this.state={ email:'' , hashed_password:''}
//         }
//     // function validateForm() {
//     //   return email.length > 0 && password.length > 0;
//     // }
//     handleChange = event =>{
//         this.setState({ [event.target.email]:event.target.value, [event.target.hashed_password]: event.target.value })
//         }

// handleSubmit = event => {
// event.preventDefault();

// // console.log("User Email : " + this.state.email)

// const url ="http://localhost:7071/api/login"

// const data = { email:this.state.email, hashed_password:this.state.hashed_password}
// console.log("User: " + data)
// fetch(url, { method: 'GET',

// //body: JSON.stringify(data), // data can be `string` or {object}!

// headers:{ "Content-Type": "application/json" } })
// .then(res => res.json())
// .catch(error => console.error('Error:', error))
// .then(response => console.log('Success:', response)); }
// render() {

//     return (
//       <form onSubmit={this.handleSubmit}>
// <input type="email" name="email" placeholder="email" onChange={this.handleChange} />
// <input type="text" name="hashed_password" placeholder="Password" onChange={this.handleChange} />

// <input type="submit" value="login" /> </form>

//     )

//   }
// }
