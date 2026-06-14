import JournalCard from "./JournalCard";

export default function JournalList({ entries }) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <JournalCard
          key={entry.id}
          entry={entry}
        />
      ))}
    </div>
  );
}