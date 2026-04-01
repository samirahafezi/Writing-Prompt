const STORAGE_KEY = 'writing_entries';

export function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function saveEntry(entry) {
  const entries = loadEntries();
  const updated = [entry, ...entries];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      throw new Error('Storage full. Please delete some old entries.');
    }
    throw e;
  }
  return updated;
}

export function deleteEntry(id) {
  const entries = loadEntries();
  const updated = entries.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
