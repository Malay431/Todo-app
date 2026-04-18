import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProtectedRoutes from "../components/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
