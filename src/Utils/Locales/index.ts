import { Platform, NativeModules } from 'react-native'
import I18n from 'i18n-js';
import en from './en-US';
import pt from './pt-BR';

const enUS = 'en_US';
const ptBr = 'pt_BR';

type language = 'en_US' | 'pt_BR' | 'en' | 'pt_US';
const normalizeTranslate = {
  'en_US': enUS,
  'pt_BR': ptBr,
  'en': enUS,
  'pt_US': ptBr,
}

const getLanguageByDevice = (): language => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier
}

I18n.translations = {
  'en_US': en,
  'pt_BR': pt,
}

const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(translateNormalize);
  iHaveThisLanguage
    ? I18n.locale = translateNormalize
    : I18n.defaultLocale = enUS
}

setLanguageToI18n();

export const translate = (key: any) => I18n.t(key);