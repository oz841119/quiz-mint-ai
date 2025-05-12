import { Gemini20FlashProvider } from "./gemini20flash";
import { O1PreviewProvider } from "./o1-preview";
import { Gemini25ProExp0325Provider } from "./gemini-2.5-pro-exp-03-25";
import { GPT4OProvider } from "./gpt-4o";
export const providerMap = {
	"gemini-2.0-flash": Gemini20FlashProvider,
	"o1-preview": O1PreviewProvider,
	"gemini-2.5-pro-exp-03-25": Gemini25ProExp0325Provider,
	"gpt-4o": GPT4OProvider,
} as const;
