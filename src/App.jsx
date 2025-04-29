import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./NavBar/NavBar.jsx";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import Favorite from "./pages/Favorite.jsx";

function App() {
  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
