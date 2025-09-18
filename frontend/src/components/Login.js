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
    <div className="max-w-sm w-full mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full mb-4 border border-gray-300 px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full mb-6 border border-gray-300 px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}



// import { useState } from "react";
// import { loginUser } from "../api";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) return alert("Please enter email and password");
//     try {
//       setLoading(true);
//       const res = await loginUser({ email, password });
//       // res.data should contain user fields + token (per your backend)
//       login(res.data, res.data.token);
//     } catch (err) {
//       console.error(err);
//       const msg = err?.response?.data || "Login failed";
//       alert(typeof msg === "string" ? msg : JSON.stringify(msg));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto mt-8 bg-white shadow p-6 rounded">
//       <h2 className="text-xl mb-4 font-bold">Login</h2>
//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         className="w-full border px-3 py-2 mb-3 rounded"
//       />
//       <input
//         value={password}
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         className="w-full border px-3 py-2 mb-3 rounded"
//       />
//       <button
//         onClick={handleLogin}
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </div>
//   );
// }
