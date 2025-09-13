export default function SearchResults({ results }) {
  if (!results || !results.length)
    return <p className="text-center mt-6 text-gray-500">No results yet.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      {results.map((r, i) => (
        <div key={i} className="bg-white shadow p-4 rounded">
          <a
            href={r.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-semibold hover:underline"
          >
            {r.title || "Untitled"}
          </a>
          <p className="text-gray-600 text-sm">{r.snippet || r.description || ""}</p>
        </div>
      ))}
    </div>
  );
}
