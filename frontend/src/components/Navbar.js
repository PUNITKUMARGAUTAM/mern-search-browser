import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MERN Browser</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.name || user?.email || "User"}</span>
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
}
