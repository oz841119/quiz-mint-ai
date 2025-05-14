import { Gemini20FlashProvider } from "./gemini-2.0-flash";
import { O1PreviewProvider } from "./o1-preview";
import {
	Gemini25ProExp0325OpenWebUIProvider,
	Gemini25ProExp0325GoogleProvider,
} from "./gemini-2.5-pro-exp-03-25";
import { GPT4OProvider } from "./gpt-4o";
export const providerMap = {
	"gemini-2.0-flash-google": Gemini20FlashProvider,
	"o1-preview-open-web-ui": O1PreviewProvider,
	"gemini-2.5-pro-exp-03-25-open-web-ui": Gemini25ProExp0325OpenWebUIProvider,
	"gemini-2.5-pro-exp-03-25-google": Gemini25ProExp0325GoogleProvider,
	"gpt-4o-open-web-ui": GPT4OProvider,
} as const;
