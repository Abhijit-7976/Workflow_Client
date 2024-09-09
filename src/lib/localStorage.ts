class LocalStorageUtil {
  static save<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (e) {
      console.error(`Error saving ${key} to localStorage`, e);
    }
  }

  static load<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (e) {
      console.error(`Error loading ${key} from localStorage`, e);
      return null;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing ${key} from localStorage`, e);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Error clearing localStorage", e);
    }
  }
}

export default LocalStorageUtil;
