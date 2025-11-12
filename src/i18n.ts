import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import en from './locals/en.json';
import de from './locals/de.json';

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next) // pass i18n instance to react
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: 'en', // default language
    interpolation: { escapeValue: false },
  });

export default i18n;
