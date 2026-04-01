import { useState } from 'react';

export default function WriteView({ prompt, onNewPrompt, onSave }) {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function handleNewPrompt() {
    onNewPrompt(text, () => {
      setText('');
      setSaved(false);
    });
  }

  function handleSave() {
    if (!text.trim()) return;
    try {
      onSave(prompt, text);
      setSaved(true);
      setError('');
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="write-view">
      <div className="prompt-area">
        <p className="prompt-text">{prompt}</p>
        <button className="new-prompt-btn" onClick={handleNewPrompt} title="Get a new prompt">
          New prompt
        </button>
      </div>

      <textarea
        className="writing-area"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Start writing..."
        spellCheck
      />

      <div className="write-actions">
        {error && <span className="error-msg">{error}</span>}
        <button
          className={`save-btn${saved ? ' saved' : ''}`}
          onClick={handleSave}
          disabled={!text.trim()}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}
