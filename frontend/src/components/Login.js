import { useState } from "react";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter email and password");
    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      // res.data should contain user fields + token (per your backend)
      login(res.data, res.data.token);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data || "Login failed";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 bg-white shadow p-6 rounded">
      <h2 className="text-xl mb-4 font-bold">Login</h2>
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
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
