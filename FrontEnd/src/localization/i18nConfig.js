import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import fr from "./languages/frAuto.json";

import { getLocales } from "expo-localization";

const deviceLanguage = getLocales()[0].languageCode;

const resources = {
    en: {
        translation: {
            "hi": "Hi"
        }
    },
    fr: {
        translation: {
            "hi": "Bonjour"
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en},
            fr: { translation: fr}
        },
        lng: deviceLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react escapes by default
        }
        // debug: true,
});

export default i18n;