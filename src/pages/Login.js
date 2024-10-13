import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const local = localStorage.getItem("users");
    if (local) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    if (password.trim() === "" || username.trim() === "") {
      alert("Please Enter a data");
      return;
    }
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!data.error) {
      localStorage.setItem(
        "users",
        JSON.stringify({ name: data.user.username, id: data.user._id })
      );
      localStorage.setItem("token", JSON.stringify(data.auth));
      navigate("/");
    } else {
      alert("Username or Password are invalid");
    }
  }

  return (
    <section>
      <h1 className="heading">Login</h1>
      <form className="form-lr" onSubmit={handleLogin}>
        <label>Username : </label>
        <br />
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password : </label>
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit" className="btn-lr">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
