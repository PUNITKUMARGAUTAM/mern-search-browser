import { useEffect, useState } from "react";
import { getHistory } from "../api";
import { useAuth } from "../context/AuthContext";

export default function HistoryList() {
  const [history, setHistory] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await getHistory(token);
        setHistory(res.data);
      } catch (err) {
        console.error("history fetch error", err);
      }
    })();
  }, [token]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-3">Search History</h2>
      <ul className="space-y-2">
        {history.map((h) => (
          <li key={h._id} className="bg-gray-100 p-3 rounded">
            <strong>{h.query}</strong> - {new Date(h.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
