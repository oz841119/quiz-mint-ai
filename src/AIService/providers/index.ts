import { createOpenAIProvider } from "../utils/createOpenAIProvider";
export const getProvider = (modelName: string) => {
  return createOpenAIProvider({ modelName: modelName });
};
