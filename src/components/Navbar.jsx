import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h2 className="text-xl font-bold">Amir Qayyum</h2>
      
      {/* This div groups our links together */}
      <div className="space-x-4 font-medium">
        <Link to="/" className="hover:text-blue-200 transition">Register</Link>
        <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
        <Link to="/dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
        <Link to="/profile" className="hover:text-blue-200 transition">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;