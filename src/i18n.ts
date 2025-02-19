import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';

const savedLanguage = localStorage.getItem('language') || 'Lists.Language.es';

i18n
  .use(Backend) 
  .use(initReactI18next)  
  .init({
    lng: savedLanguage,
    fallbackLng: 'es', 
    debug: false,  
    interpolation: {
      escapeValue: false,  
    },
    backend: {
      loadPath: "http://127.0.0.1:3000/mongo/translations?language={{lng}}", 
    },
    react: {
      useSuspense: true, 
    },
  });

export default i18n;
