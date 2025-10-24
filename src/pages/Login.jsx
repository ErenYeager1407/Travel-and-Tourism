import { useState } from "react";
import { loginUser, getCurrentUser } from "../lib/appwrite";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      const user = await getCurrentUser();
      setAuthUser(user);
      navigate("/"); // redirect to home
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
        <h2 className="text-black text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded mt-2 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
