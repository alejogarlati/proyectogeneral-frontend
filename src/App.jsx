import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { Login } from "./pages/Login/Login.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}
