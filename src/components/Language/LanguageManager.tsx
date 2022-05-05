import messages_fr from "../../translations/fr.json";
import messages_en from "../../translations/en.json";
import React from "react";
import { createIntl, createIntlCache } from "react-intl";

export enum Languages {
  French = "fr",
  English = "en",
}

const messages = new Map();
messages.set(Languages.French, messages_fr);
messages.set(Languages.English, messages_en);

interface Ilangue {
  language: Languages;
  message: any;
}

export default class LanguageManager extends React.Component<null, Ilangue> {
  constructor(props: any) {
    super(props);

    let lang =
      navigator.language.split(/[-_]/)[0] == "fr"
        ? Languages.French
        : Languages.English;

    this.state = {
      language: lang,
      message: messages.get(lang),
    };

    const cache = createIntlCache();

    createIntl(
      {
        locale: this.state.language,
        messages: this.state.message,
      },
      cache
    );
  }

  getLanguage() {
    return this.state.language;
  }
  getMessage() {
    return this.state.message;
  }

  switchLanguage(lang: Languages) {
    this.setState(
      {
        language: lang,
        message: messages.get(lang),
      },
      () => {
        console.log("LanguageManager callback : " + this.state.language);
      }
    );
    console.log(lang);
    console.log(this.state.language);
  }
}
