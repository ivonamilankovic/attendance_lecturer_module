import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
