import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import { mongoLanguage } from "./utils/ip";

const savedLanguge = localStorage.getItem('language')!;

i18n
  .use(Backend) 
  .use(initReactI18next)  
  .init({
    lng: savedLanguge,
    fallbackLng: 'es',
    debug: false,  
    interpolation: {
      escapeValue: false,  
    },
    backend: {
      loadPath: `${mongoLanguage}{{lng}}`, 
    },
    react: {
      useSuspense: true, 
    },
  })
  .then(() => {
    i18n.changeLanguage(savedLanguge.split(".").pop());
  });

export default i18n;
