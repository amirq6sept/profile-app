import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 1. Add 'async' to allow pausing for the Waiter
  async function handleLogin(event) {
    event.preventDefault();

    // 2. Call the Waiter to send the login request to the Kitchen
    const response = await fetch("https://profile-backend-api-sir7.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // Send exactly what the backend expects: email and password
      body: JSON.stringify({ email: email, password: password }) 
    });

    // 3. Read the Waiter's reply
    const data = await response.json();

    // 4. Check if the login was successful based on the backend's status
    if (data.status === "Success") {
      setError("");
      alert(data.message);

      // We still use localStorage for the Security Guard flag!
      localStorage.setItem("isLoggedIn", "true");
      
      // Notice we use the exact name sent BACK from the server!
      localStorage.setItem("currentUser", data.name);

      // NEW LINE: Cache the secure VIP wristband in the browser's safe!
      localStorage.setItem("userToken", data.token);

      navigate("/dashboard");
    } else {
      // If the backend sent an Error status (401), show their exact error message
      setError(data.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        
        {error !== "" && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center font-semibold text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;