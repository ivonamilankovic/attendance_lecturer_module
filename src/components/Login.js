import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { BACKEND_URL, KEY_USER_TOKEN } from "../constants";
import Header from "./Header";
import Loading from "./Loading";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [invalidCred, setInvalidCred] = useState(false);

  async function login() {
    setLoading(true);
    const formData = {
      email: email,
      password: password,
    };
    fetch(BACKEND_URL + "Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r.Token) {
          setToken(r.Token);
          localStorage.setItem(KEY_USER_TOKEN, r.Token);
        } else {
          setInvalidCred(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (email && !email.includes("@")) {
      document.getElementById("email").classList.add("bad-input");
      document.getElementById("email").classList.remove("good-input");
      document.getElementById("login-btn").disabled = true;
      document.getElementById("error-msg").innerHTML =
        "Email format must be valid.";
      document.getElementById("error-msg").style.display = "block";
    } else if (email.includes("@")) {
      document.getElementById("email").classList.remove("bad-input");
      document.getElementById("email").classList.add("good-input");
      document.getElementById("login-btn").disabled = false;
      document.getElementById("error-msg").style.display = "none";
    }
    if (password.length > 0 && password.length < 6) {
      document.getElementById("password").classList.add("bad-input");
      document.getElementById("password").classList.remove("good-input");
      document.getElementById("login-btn").disabled = true;
      document.getElementById("error-msg").innerHTML =
        "Password must have at least 6 characters.";
      document.getElementById("error-msg").style.display = "block";
    } else if (password.length >= 6) {
      document.getElementById("password").classList.remove("bad-input");
      document.getElementById("password").classList.add("good-input");
      document.getElementById("login-btn").disabled = false;
      document.getElementById("error-msg").style.display = "none";
    }
  }, [email, password]);

  if (loading) {
    return <Loading />;
  }
  if (token || localStorage.getItem(KEY_USER_TOKEN) !== "") {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Header />
      <div>
        <h1 className="title">Log in</h1>
        <form method="post" className="form">
          <div
            id="error-msg"
            style={{ display: invalidCred ? "block" : "none" }}
          >
            {invalidCred && "Invalid credentials."}
          </div>
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
            className={invalidCred ? "bad-input" : ""}
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
            className={invalidCred ? "bad-input" : ""}
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
    </>
  );
}

export default Login;
