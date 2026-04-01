export default function NavBar({ activeView, setActiveView }) {
  return (
    <nav className="navbar">
      <button
        className={`nav-btn${activeView === 'write' ? ' active' : ''}`}
        onClick={() => setActiveView('write')}
      >
        Prompt
      </button>
      <button
        className={`nav-btn${activeView === 'entries' ? ' active' : ''}`}
        onClick={() => setActiveView('entries')}
      >
        Saved
      </button>
    </nav>
  );
}
