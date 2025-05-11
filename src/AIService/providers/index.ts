import { providerMap } from "./config";

const isExistProvider = (model: string): model is keyof typeof providerMap => {
	return model in providerMap;
};

export const getProvider = (model: keyof typeof providerMap) => {
	if (isExistProvider(model)) {
		return providerMap[model];
	}
	throw new Error(`Provider ${model} not found`);
};
