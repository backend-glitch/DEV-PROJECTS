export default function JournalCard({ entry }) {
  return (
    <div className="border border-ui-600 rounded-xl p-4">
      <h3 className="font-semibold">
        {entry.date}
      </h3>

      <p className="mt-2">
        {entry.content}
      </p>

      <div className="flex gap-2 mt-3">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}