import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Recipes from "./Recipes";
import Home from "./Home";
import About from "./About";
import MyRecipes from "./MyRecipes";



function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
      </Routes>
    </div>
  );
}

export default App;