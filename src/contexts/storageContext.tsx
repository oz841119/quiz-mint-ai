import type { IStorageService } from "@/lib/storage";
import { IndexedDBStorageService } from "@/lib/storage";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

const createDefaultStorageService = (): IStorageService => {
  if (typeof window !== "undefined") {
    return new IndexedDBStorageService();
  }
  return {
    getItem: async () => null,
    setItem: async () => {},
    removeItem: async () => {},
    clear: async () => {},
  };
};

const StorageContext = createContext<IStorageService>(
  createDefaultStorageService(),
);

export const StorageProvider = ({
  children,
  storageService,
}: {
  children: ReactNode;
  storageService?: IStorageService;
}) => {
  const storage = storageService || createDefaultStorageService();

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
};
export const useStorage = (): IStorageService => {
  return useContext(StorageContext);
};
