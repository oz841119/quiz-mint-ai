import { Gemini20FlashProvider } from "./gemini20flash";
import { O1PreviewProvider } from "./o1-preview";

export const providerMap = {
	"gemini-2.0-flash": Gemini20FlashProvider,
	"o1-preview": O1PreviewProvider,
} as const;
