import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const formData = {
      email: email,
      password: password,
    };
    try {
      await fetch(BACKEND_URL + "Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((r) => setToken(r.Token));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (email && !email.includes("@")) {
      document.getElementById("email").classList.add("bad-input");
      document.getElementById("email").classList.remove("good-input");
      document.getElementById("login-btn").disabled = true;
    } else if (email.includes("@")) {
      document.getElementById("email").classList.remove("bad-input");
      document.getElementById("email").classList.add("good-input");
      document.getElementById("login-btn").disabled = false;
    }
    if (password.length > 0 && password.length < 6) {
      document.getElementById("password").classList.add("bad-input");
      document.getElementById("password").classList.remove("good-input");
      document.getElementById("login-btn").disabled = true;
    } else if (password.length >= 6) {
      document.getElementById("password").classList.remove("bad-input");
      document.getElementById("password").classList.add("good-input");
      document.getElementById("login-btn").disabled = false;
    }
  }, [email, password]);

  return (
    <div>
      <h1 className="title">Log in</h1>
      <form method="post" className="login-form">
        <label htmlFor="email" className="text">
          Email:
        </label>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password" className="text">
          Password:
        </label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button
        id="login-btn"
        type="submit"
        className="btn"
        onClick={() => login()}
      >
        Submit
      </button>
    </div>
  );
}

export default Login;
