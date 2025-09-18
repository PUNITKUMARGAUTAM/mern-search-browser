import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Register from "./Register";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Punit Browser</h1>

      {!user ? (
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
            }}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Login
          </button>

          <button
            onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Register
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span>{user.name || user?.email || "User"}</span>
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}

      {/* Simple modal popups */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <button
              className="float-right text-gray-600"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <button
              className="float-right text-gray-600"
              onClick={() => setShowRegister(false)}
            >
              ✕
            </button>
            <Register />
          </div>
        </div>
      )}
    </nav>
  );
}




// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold">Punit Browser</h1>
//       {user ? (
//         <div className="flex items-center gap-4">
//           <span>{user.name || user?.email || "User"}</span>
//           <button
//             onClick={logout}
//             className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
//           >
//             Logout
//           </button>
//         </div>
//       ) : null}
//     </nav>
//   );
// }
