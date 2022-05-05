import { useEffect, useState } from "react";
import "./App.css";
import Demineur from "./components/Demineur";
import Header from "./components/Header/Header";
import { IntlProvider, createIntlCache, createIntl } from "react-intl";
import messages_fr from "./translations/fr.json";
import messages_en from "./translations/en.json";

export enum Languages {
  French = "fr",
  English = "en",
}

// Language
var messages = new Map();
messages.set(Languages.French, messages_fr);
messages.set(Languages.English, messages_en);

function App() {
  const [language, setLanguage] = useState(
    navigator.language.split(/[-_]/)[0] == "fr"
      ? Languages.French
      : Languages.English
  );
  const [message, setMessage] = useState(messages.get(language));

  const cache = createIntlCache();

  createIntl(
    {
      locale: language,
      messages: message,
    },
    cache
  );

  function switchLanguage(lang: Languages) {
    setLanguage(lang);
    setMessage(messages.get(lang));
  }

  return (
    <IntlProvider locale={language} messages={message}>
      <div className="App">
        <Header switchLanguage={switchLanguage} />

        <Demineur width={10} nmbBomb={5} />
      </div>
    </IntlProvider>
  );
}

export default App;
