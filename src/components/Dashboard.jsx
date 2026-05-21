import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userName] = useState(localStorage.getItem("currentUser") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]); 

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full text-center">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-4">
          Welcome, {userName}!
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          This is your private, protected dashboard area.
        </p>
        
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;