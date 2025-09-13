import { useState } from "react";
import { searchQuery, getSuggestions } from "../api";
import { useAuth } from "../context/AuthContext";

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q = null) => {
    const finalQ = q ?? query;
    if (!finalQ) return;
    try {
      setLoading(true);
      const res = await searchQuery(finalQ, token);
      setResults(res.data.results);
      setSuggestions([]);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggest = async (q) => {
    setQuery(q);
    if (!q || q.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await getSuggestions(q, token);
      setSuggestions(res.data || []);
    } catch (err) {
      console.error("suggest error", err);
      setSuggestions([]);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <div className="flex">
        <input
          value={query}
          onChange={(e) => handleSuggest(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-l-md focus:outline-none"
          placeholder="Search something..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={() => handleSearch()}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="bg-white border mt-1 rounded shadow">
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => {
                setQuery(s);
                handleSearch(s);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
