import { useState } from 'react';
import { getRandomPrompt } from './prompts';
import { loadEntries, saveEntry, deleteEntry } from './storage';
import NavBar from './components/NavBar';
import WriteView from './components/WriteView';
import EntriesView from './components/EntriesView';

export default function App() {
  const [activeView, setActiveView] = useState('write');
  const [currentPrompt, setCurrentPrompt] = useState(() => getRandomPrompt());
  const [entries, setEntries] = useState(() => loadEntries());

  function handleNewPrompt(currentText, onConfirmed) {
    if (currentText.trim()) {
      const confirmed = window.confirm('Discard current writing and get a new prompt?');
      if (!confirmed) return;
    }
    setCurrentPrompt(getRandomPrompt(currentPrompt));
    onConfirmed();
  }

  function handleSave(prompt, content) {
    const entry = {
      id: String(Date.now()),
      prompt,
      content,
      savedAt: new Date().toISOString(),
    };
    const updated = saveEntry(entry);
    setEntries(updated);
    return entry;
  }

  function handleDelete(id) {
    const updated = deleteEntry(id);
    setEntries(updated);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Write</h1>
        <NavBar activeView={activeView} setActiveView={setActiveView} />
      </header>
      <main className="app-main">
        {activeView === 'write' ? (
          <WriteView
            prompt={currentPrompt}
            onNewPrompt={handleNewPrompt}
            onSave={handleSave}
          />
        ) : (
          <EntriesView entries={entries} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}
