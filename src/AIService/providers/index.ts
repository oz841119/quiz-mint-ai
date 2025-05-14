import { providerMap } from "./config";

const isExistProvider = (
  providerName: string,
): providerName is keyof typeof providerMap => {
  return providerName in providerMap;
};

export const getProvider = (providerName: keyof typeof providerMap) => {
  if (isExistProvider(providerName)) {
    return providerMap[providerName];
  }
  throw new Error(`Provider ${providerName} not found`);
};
