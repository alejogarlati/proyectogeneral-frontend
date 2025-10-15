import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome.jsx";
import { Login } from "./pages/Login/Login.jsx";

export default function App() {
  return (
    <Routes>
      <Route path=""
      element={<Welcome />}
      />
      <Route path="login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}
