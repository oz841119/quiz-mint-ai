import type { IStorageService } from "./types";

export class IndexedDBStorageService implements IStorageService {
  private dbName = "quizMintAIStorage";
  private storeName = "keyValueStore";
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor() {
    try {
      this.initDB();
    } catch (err) {
      console.error("Error initializing IndexedDB:", err);
    }
  }

  private initDB(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        if (typeof window === "undefined" || !window.indexedDB) {
          reject(new Error("IndexedDB is not available in this environment"));
          return;
        }

        const request = indexedDB.open(this.dbName, 1);

        request.onerror = (event) => {
          console.error("IndexedDB error:", request.error);
          reject(request.error);
        };

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName);
          }
        };

        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          resolve(db);
        };
      });
    }
    return this.dbPromise;
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const db = await this.initDB();
      return new Promise<T | null>((resolve, reject) => {
        const transaction = db.transaction(this.storeName, "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);

        request.onerror = () => {
          console.error(
            `Error retrieving item with key ${key} from IndexedDB:`,
            request.error,
          );
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result || null);
        };
      });
    } catch (e) {
      console.error(`Error retrieving item with key ${key} from IndexedDB:`, e);
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const db = await this.initDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.put(value, key);

        request.onerror = () => {
          console.error(
            `Error storing item with key ${key} in IndexedDB:`,
            request.error,
          );
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    } catch (e) {
      console.error(`Error storing item with key ${key} in IndexedDB:`, e);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      const db = await this.initDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(key);

        request.onerror = () => {
          console.error(
            `Error removing item with key ${key} from IndexedDB:`,
            request.error,
          );
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    } catch (e) {
      console.error(`Error removing item with key ${key} from IndexedDB:`, e);
    }
  }

  async clear(): Promise<void> {
    try {
      const db = await this.initDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.clear();

        request.onerror = () => {
          console.error("Error clearing IndexedDB storage:", request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    } catch (e) {
      console.error("Error clearing IndexedDB storage:", e);
    }
  }
}
