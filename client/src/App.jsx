import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedRecipe from "./pages/SavedRecipe";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/saved-recipe" element={<SavedRecipe />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe/>} />
      </Routes>
    </>
  );
}

export default App;
