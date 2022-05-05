import React, { Component, FunctionComponent, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Demineur from "./components/Demineur";
import DemineurSquare from "./components/Demineur/DemineurSquare";
import Header from "./components/Header/Header";
import {
  injectIntl,
  IntlProvider,
  FormattedMessage,
  FormattedNumber,
  createIntlCache,
  createIntl,
  useIntl,
} from "react-intl";
import messages_fr from "./translations/fr.json";
import messages_en from "./translations/en.json";

const messages = {
  fr: messages_fr,
  en: messages_en,
};

function App() {
  const [language, setLanguage] = useState(navigator.language.split(/[-_]/)[0]); // language without region code
  const [message, setMessage] = useState(messages.fr);
  const [theme, setTheme] = useState("White");

  const cache = createIntlCache();

  const intl = createIntl(
    {
      locale: language,
      messages: message,
    },
    cache
  );

  return (
    <IntlProvider locale={language} messages={message}>
      <div className="App">
        <Header
          switchLangueFR={() => {
            setLanguage("fr");
            setMessage(messages.fr);
          }}
          switchLangueEN={() => {
            setLanguage("en");
            setMessage(messages.en);
          }}
        />

        <Demineur width={10} nmbBomb={7} />
      </div>
    </IntlProvider>
  );
}

export default App;
