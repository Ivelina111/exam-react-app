import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";

function Home() {
  return (
    <div className="page">
      <h1>Home Page</h1>
      <p>Welcome!</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>About Page</h1>
      <p>This application is in progress.</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;