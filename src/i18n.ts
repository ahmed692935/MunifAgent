import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation files
import en from "./Language/en.json";
import de from "./Language/de.json";

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Connect i18n with React
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: "de", // Default language
    interpolation: { escapeValue: false },
    returnObjects: true, // Enables array/object return globally
    detection: {
      // Optional (customizes how language is detected)
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
