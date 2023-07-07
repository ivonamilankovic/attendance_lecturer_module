import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [token, setToken] = useState("");
  if (token) {
    return <Home />;
  }
  return <Login setToken={setToken} />;
}

export default App;
