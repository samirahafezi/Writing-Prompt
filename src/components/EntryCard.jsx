export default function EntryCard({ entry, onDelete }) {
  const date = new Date(entry.savedAt);
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: '2-digit', minute: '2-digit',
  });

  function handleDelete(e) {
    e.preventDefault();
    if (window.confirm('Delete this entry?')) {
      onDelete(entry.id);
    }
  }

  return (
    <details className="entry-card">
      <summary className="entry-summary">
        <div className="entry-meta">
          <span className="entry-date">{dateStr} · {timeStr}</span>
          <button className="delete-btn" onClick={handleDelete} title="Delete entry">
            ×
          </button>
        </div>
        <p className="entry-prompt">{entry.prompt}</p>
        <p className="entry-preview">{entry.content.slice(0, 120)}{entry.content.length > 120 ? '…' : ''}</p>
      </summary>
      <div className="entry-full">
        {entry.content.split('\n').map((line, i) => (
          <p key={i}>{line || <br />}</p>
        ))}
      </div>
    </details>
  );
}
