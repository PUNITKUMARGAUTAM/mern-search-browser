import { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) return alert("All fields required");
    try {
      setLoading(true);
      await registerUser({ name, email, password });
      alert("Registered! Now login.");
      setName(""); setEmail(""); setPassword("");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Register failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-white shadow p-6 rounded">
      <h2 className="text-xl mb-4 font-bold">Register</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full border px-3 py-2 mb-3 rounded"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border px-3 py-2 mb-3 rounded"
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full border px-3 py-2 mb-3 rounded"
      />
      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
