import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Locked field
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 1. READ: Fetch current data when page loads
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
      return;
    }

    async function fetchProfileData() {
      try {
        const token = localStorage.getItem("userToken");
        const response = await fetch("https://profile-backend-api-sir7.onrender.com/api/profile", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();

        if (data.status === "Success") {
          setName(data.profile.fullName);
          setEmail(data.profile.emailAddress);
          setPhone(data.profile.phoneNumber || "");
        } else {
          localStorage.clear();
          navigate("/login");
        }
      } catch  {
        setError("Could not connect to the backend server.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfileData();
  }, [navigate]);

  // 2. UPDATE: Send new data to backend when form is submitted
  async function handleSaveChanges(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (name === "") {
      setError("Name field cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      
      // Fire the PUT request to update the database
      const response = await fetch("https://profile-backend-api-sir7.onrender.com/api/profile", {
        method: "PUT", // <-- Calling our new PUT route!
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: name,
          phoneNumber: phone
        })
      });

      const data = await response.json();

      if (data.status === "Success") {
        setSuccessMessage(data.message);
        // Update current cached username for Navbar display
        localStorage.setItem("currentUser", name);
      } else {
        setError(data.message);
      }
    } catch  {
      setError("Failed to save changes. Server error.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading secure profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Your Profile</h2>
        
        {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center font-semibold text-sm">{error}</p>}
        {successMessage && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center font-semibold text-sm">{successMessage}</p>}

        <form onSubmit={handleSaveChanges} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-500 font-bold text-xs uppercase mb-1">Email Address (Locked)</label>
            <input 
              type="email" 
              value={email} 
              disabled // Stops users from altering their account key
              className="border border-gray-200 bg-gray-100 text-gray-400 rounded p-2 cursor-not-allowed outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-bold text-xs uppercase mb-1">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-700 font-bold text-xs uppercase mb-1">Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition mt-6"
          >
            Save Profile Updates
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;