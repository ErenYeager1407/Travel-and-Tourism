import { useState } from "react";
import { registerUser } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, name);
      alert("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-black text-2xl font-bold mb-4">Create Account</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-3 rounded text-black"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show password</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded mt-2 hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
