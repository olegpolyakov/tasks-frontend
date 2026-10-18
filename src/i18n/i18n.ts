import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import ruCommon from './locales/ru/common.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: enCommon
            },
            ru: {
                common: ruCommon
            }
        },

        fallbackLng: 'en',

        defaultNS: 'common',
        ns: ['common'],

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;