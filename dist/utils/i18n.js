import {defaultUserInterfaceLanguage} from "../domain/models/languageModel.js";
export const matchLanguage = (language, availableLanguages) => {
  const match = availableLanguages.find((l) => l === language.slice(0, 2));
  return match ?? defaultUserInterfaceLanguage;
};
