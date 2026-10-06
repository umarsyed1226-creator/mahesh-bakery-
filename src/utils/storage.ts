/**
 * Safe local storage utility with memory-based fallback.
 * Solves cross-origin SecurityError exceptions in highly restricted sandboxed iframes.
 */

const memoryStorage = new Map<string, string>();

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`LocalStorage read blocked for key "${key}". Using in-memory fallback.`, e);
    }
    return memoryStorage.get(key) || null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`LocalStorage write blocked for key "${key}". Using in-memory fallback.`, e);
    }
    memoryStorage.set(key, value);
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn(`LocalStorage removal blocked for key "${key}".`, e);
    }
    memoryStorage.delete(key);
  },

  key: (index: number): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.key(index);
      }
    } catch (e) {
      console.warn(`LocalStorage key access blocked for index "${index}".`, e);
    }
    return Array.from(memoryStorage.keys())[index] || null;
  },

  getLength: (): number => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.length;
      }
    } catch (e) {
      console.warn('LocalStorage length access blocked.', e);
    }
    return memoryStorage.size;
  }
};
