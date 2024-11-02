import React, { useReducer, useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import newuserStyle from "./Newuser.module.css";
import axios from "axios";

export function Newuser() {
  // States for registration
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case "success":
        return {
          error: false,
          submitted: true,
          userexist: false,
          emailexist: false,
          loggedin: false,
        };
      case "usernameexist":
        return {
          error: false,
          submitted: false,
          userexist: true,
          emailexist: false,
          loggedin: false,
        };
      case "emailexist":
        return {
          error: false,
          submitted: false,
          userexist: false,
          emailexist: true,
          loggedin: false,
        };
      case "error":
        return {
          error: true,
          submitted: false,
          userexist: false,
          emailexist: false,
          loggedin: false,
        };
      case "loggedin":
        return {
          error: true,
          submitted: state.submitted,
          userexist: state.userexist,
          emailexist: state.email,
          loggedin: true,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    error: false,
    submitted: false,
    userexist: false,
    emailexist: false,
    loggedin: false,
  });
  let users = {};
  useEffect(() => {
    try {
      axios.get(`http://127.0.0.1:5000/login`).then((res) => {
        console.log("result=", res);
        users = res;
        console.log("users", users);
      });
    } catch (e) {
      console.log(e);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in submit", e);

    dispatch({ type: "loggedin" });
    e.preventDefault();
    if (
      username.current.value === "" ||
      email.current.value === "" ||
      password.current.value === ""
    ) {
      dispatch({ type: "error" });
    } else {
      const useraccount = users.data.some(
        (user) => user.username === username.current.value
      );
      if (useraccount) {
        dispatch({ type: "usernameexist" });
      }
      const emailaccount = users.data.some(
        (user) => user.email === email.current.value
      );
      if (emailaccount) {
        dispatch({ type: "emailexist" });
      }
      if (!useraccount && !emailaccount) {
        dispatch({ type: "success" });
        const data = {
          username: username.current.value,
          password: password.current.value,
          email: email.current.value,
        };
        console.log("add user    =   ", data);
        try {
          axios.post("http://127.0.0.1:5000/adduser", data).then((response) => {
            console.log(response.data);
          });
        } catch (e) {
          console.log("Item cannot be added to cart", e);
        }
      }
    }
  };

  const Successmessage = () => {
    return (
      <div
        className="success"
        style={{
          display: state.submitted ? "" : "none",
        }}
      >
        <h1> {username.current.value} successfully registered!!</h1>
      </div>
    );
  };

  const Errormessage = () => {
    return (
      <div
        className="error"
        style={{
          display: state.error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
  const Existingusername = () => {
    return (
      <div
        className="error"
        style={{
          display: state.userexist ? "" : "none",
        }}
      >
        <h1>Username alredy exist</h1>
      </div>
    );
  };
  const Existingemail = () => {
    return (
      <div
        className="error"
        style={{
          display: state.emailexist ? "" : "none",
        }}
      >
        <h1>Email alredy exist</h1>
      </div>
    );
  };

  return (
    <>
      <div className={newuserStyle.inputform}>
        <p>Welcome To One Stop Store</p>
        <form onSubmit={handleSubmit}>
          <input
            className={newuserStyle.btn}
            type="text"
            name="Username"
            ref={username}
            placeholder="Username"
          />
          <input
            className={newuserStyle.btn}
            type="email"
            name="email"
            ref={email}
            placeholder="email"
          />
          <input
            className={newuserStyle.btn}
            type="password"
            name="Password"
            ref={password}
            placeholder="Password"
          />

          <input className={newuserStyle.btn} type="submit" value="Submit" />
        </form>
        <div className={newuserStyle.invalid}>
          {state.error && <Errormessage />}
          {state.submitted && <Successmessage />}
          {state.userexist && <Existingusername />}
          {state.emailexist && <Existingemail />}
        </div>
        <div>
          <a onClick={() => navigate("/", { replace: true })}>Login Page</a>
        </div>
      </div>
    </>
  );
}
