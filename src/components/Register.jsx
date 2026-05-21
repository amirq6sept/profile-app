import { useState } from "react";

function Register() {
  // Creating our memory slots (State)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // New state for our error message
  const [error, setError] = useState("");

  // 1. Add 'async' right here!
  async function handleRegister(event) {
    event.preventDefault();
    
     // 1. Check if name, email, or password are empty
    if (name === "" || email === "" || password === "") {
      setError("Please fill in all required fields.");
      return; 
    }

    // 2. Check if the password is long enough
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");

    // 3. Check if the phone number is valid (basic validation)
    if (phone && !/^\+?[0-9]{10,15}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    // 4. If we pass all checks, clear errors and succeed!
    setError("");
    console.log("Success! Data:", name, email, phone, password);

    // 5. If we pass all checks, clear errors
    setError("");
    
    // 6. Bundle our data together into a JavaScript "Object"  
    const newUser = {
      fullName: name,
      emailAddress: email,
      phoneNumber: phone,
      userPassword: password
    };

    // --- NEW BACKEND CONNECTION CODE ---
    
    // 2. We use 'fetch' to call the Waiter, and 'await' to pause until he returns
    const response = await fetch("https://profile-backend-api-sir7.onrender.com/api/register", {
      method: "POST", // We are sending data
      headers: {
        "Content-Type": "application/json" // Telling the Waiter it's a JSON order
      },
      body: JSON.stringify(newUser) // Handing him the order card
    });

    // 3. Translate the Waiter's reply back from JSON
    const data = await response.json();
    
    // 4. Show the message that came directly from the backend!
    alert(data.message); 

    // --- END BACKEND CONNECTION CODE ---
    
    // 8. Tell the user it worked and clear the form!
    alert("Account created successfully!");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  }

  return (
    // The main background wrapper
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register for an Account</h2>
        
        {error !== "" && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center font-semibold text-sm">
            {error}
          </p>
        )}

        {/* space-y-4 automatically adds vertical spacing between all inputs */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* We do this structure for every input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Amir Qayyum"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="amirqayyum@example.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+60-123-456-7890"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Secret password"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition mt-4"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;