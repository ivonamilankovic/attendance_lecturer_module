import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
//TODO router
function App() {
  const [token, setToken] = useState("");
  if (token) {
    return (
      <>
        <Header loggedIn={true} />
        <Home token={token} />
      </>
    );
  }
  return (
    <>
      <Header loggedIn={false} />
      <Login setToken={setToken} />
    </>
  );
}

export default App;
