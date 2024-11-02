import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyle from "./Login.module.css";
import axios from "axios";

const Login = () => {
  let users = null;
  const [loggedin, setloggedin] = useState(false);
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
  }, [loggedin]);
  const navigate = useNavigate();
  const username = useRef("");
  const password = useRef("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  // const users = [
  //   { username: "User", password: "Password" },
  //   { username: "Praneeth", password: "Password" },
  //   { username: "Admin", password: "Admin" },
  // ];
  console.log(username.current.value, " --- ", password.current.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setloggedin(true);
    console.log(username.current.value, " --- ", password.current.value);
    console.log(users);
    const account = users.data.find(
      (user) => user.username === username.current.value
    );
    localStorage.setItem("authenticated", true);
    if (account && account.password === password.current.value) {
      setauthenticated(true);
      localStorage.setItem("authenticated", true);
      navigate(
        "./dashboard",
        { state: { id: 1, name: username.current.value } },
        { replace: true }
      );
    } else {
      setloggedin(true);
    }
  };
  const Invalidcredentials = () => {
    return <div className={loginStyle.invalid}>Invalid Credentials</div>;
  };
  return (
    <div className={loginStyle.inputform}>
      <p>One Stop Store</p>
      <form onSubmit={handleSubmit}>
        <input
          className={loginStyle.btn}
          type="text"
          name="Username"
          ref={username}
          placeholder="Username"
        />
        <input
          className={loginStyle.btn}
          type="password"
          name="Password"
          ref={password}
          placeholder="Password"
        />
        {loggedin && <Invalidcredentials />}
        <input className={loginStyle.btn} type="submit" value="Submit" />
      </form>
      <div>
        <a onClick={() => navigate("./newuser", { replace: true })}>
          New User? Register
        </a>
      </div>
    </div>
  );
};

export default Login;
