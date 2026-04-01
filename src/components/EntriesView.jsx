import EntryCard from './EntryCard';

export default function EntriesView({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <p>No saved pieces yet.</p>
        <p>Write something and hit Save.</p>
      </div>
    );
  }

  return (
    <div className="entries-view">
      {entries.map(entry => (
        <EntryCard key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
}
