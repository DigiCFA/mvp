import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import fr from "./languages/frAuto.json";

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
        lng: 'en',
        interpolation: {
            escapeValue: false
        }
        // debug: true,
});

export default i18n;