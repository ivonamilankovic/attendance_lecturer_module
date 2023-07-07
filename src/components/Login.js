import { useState } from "react";

function Login({setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const formData = {
      email: email,
      password: password,
    };
    console.log(formData);
    try {
      await fetch("https://localhost:7206/api/Login", {
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

  return (
    <div>
      <h1 className="title">Login</h1>
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
      <button type="submit" className="login-btn" onClick={() => login()}>
        Submit
      </button>
    </div>
  );
}

export default Login;
