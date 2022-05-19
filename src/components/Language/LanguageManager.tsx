import messages_fr from "../../translations/fr.json";
import messages_en from "../../translations/en.json";
import { createIntl, createIntlCache } from "react-intl";

export enum Languages {
  French = "fr",
  English = "en",
}

const messages = new Map();
messages.set(Languages.French, messages_fr);
messages.set(Languages.English, messages_en);

const defaultLanguage =
  navigator.language.split(/[-_]/)[0] === "fr"
    ? Languages.French
    : Languages.English;

export default class LanguageManager {
  language = defaultLanguage;
  message = messages.get(defaultLanguage);

  constructor() {
    this.switchLanguage = this.switchLanguage.bind(this);

    const cache = createIntlCache();

    createIntl(
      {
        locale: this.language,
        messages: this.message,
      },
      cache
    );
  }

  getLanguage() {
    return this.language;
  }
  getMessage() {
    return this.message;
  }

  switchLanguage(lang: Languages) {
    this.language = lang;
    this.message = messages.get(lang);
  }
}
