// Tiny wrapper around the browser's localStorage so demo state (joined events,
// chat history) survives page refreshes. Fails silently if storage is unavailable.

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore (e.g. private mode / quota) */
  }
}

// Keys used across the app
export const JOINED_KEY = 'hof:joinedEvents';
export const CHATS_KEY = 'hof:chats';
