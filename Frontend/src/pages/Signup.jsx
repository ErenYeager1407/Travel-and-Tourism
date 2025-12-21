import { useState } from "react";
import { registerUser, registerAdmin } from "../lib/api";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAdmin) {
        await registerAdmin(email, password, name);
      } else {
        await registerUser(email, password, name);
      }
      toast.success("Account created successfully! Please log in.");
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

        <div className="mb-4">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                className="sr-only"
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${isAdmin ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isAdmin ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <span>Sign up as Admin</span>
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
