import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login"; // Don't forget to import this!
import Dashboard from "./components/Dashboard"; // Don't forget to import this!
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;