import "@testing-library/jest-dom";

// jsdom v29 ships a localStorage without .clear() — replace with a full in-memory mock
const makeLocalStorage = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
};

Object.defineProperty(globalThis, "localStorage", {
  value: makeLocalStorage(),
  writable: true,
});
