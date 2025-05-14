import { Gemini20FlashProvider } from "./gemini-2.0-flash";
import { O1PreviewProvider } from "./o1-preview";
import {
  Gemini25ProExp0325OpenWebUIProvider,
  Gemini25ProExp0325GoogleProvider,
} from "./gemini-2.5-pro-exp-03-25";
import { GPT4OProvider } from "./gpt-4o";
import { Gemini25ProPreview0506GoogleProvider } from "./gemini-2.5-pro-preview-05-06";
import { Gemini25FlashPreview0417GoogleProvider } from "./gemini-2.5-flash-preview-04-17";
export const providerMap = {
  "gemini-2.0-flash-google": Gemini20FlashProvider,
  "o1-preview-open-web-ui": O1PreviewProvider,
  "gemini-2.5-pro-exp-03-25-open-web-ui": Gemini25ProExp0325OpenWebUIProvider,
  "gemini-2.5-pro-exp-03-25-google": Gemini25ProExp0325GoogleProvider,
  "gemini-2.5-pro-preview-05-06-google": Gemini25ProPreview0506GoogleProvider,
  "gpt-4o-open-web-ui": GPT4OProvider,
  "gemini-2.5-flash-preview-04-17-google":
    Gemini25FlashPreview0417GoogleProvider,
} as const;
