import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import HistoryList from "./components/HistoryList";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);

  return (
    <div>
      <Navbar /> {/* login/register controls ab Navbar me honge */}
      {user && (
        <>
          <SearchBar setResults={setResults} />
          <SearchResults results={results} />
          <HistoryList />
        </>
      )}
    </div>
  );
}



// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import SearchBar from "./components/SearchBar";
// import SearchResults from "./components/SearchResults";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import HistoryList from "./components/HistoryList";
// import { useAuth } from "./context/AuthContext";

// export default function App() {
//   const { user } = useAuth();
//   const [results, setResults] = useState([]);

//   return (
//     <div>
//       <Navbar />
//       {!user ? (
//         <div className="flex justify-center gap-6 mt-10">
//           <Login />
//           <Register />
//         </div>
//       ) : (
//         <>
//           <SearchBar setResults={setResults} />
//           <SearchResults results={results} />
//           <HistoryList />
//         </>
//       )}
//     </div>
//   );
// }
