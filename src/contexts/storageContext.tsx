import { IndexedDBStorageService } from "@/lib/storage";
import type { IStorageService } from "@/lib/storage";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

const createDefaultStorageService = (): IStorageService => {
  return new IndexedDBStorageService();
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

// Hook for using storage
export const useStorage = (): IStorageService => {
  return useContext(StorageContext);
};
