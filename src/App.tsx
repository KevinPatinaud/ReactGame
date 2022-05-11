import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Demineur from "./components/Demineur";
import Header from "./components/Header/Header";
import LanguageManager, {
  Languages,
} from "./components/Language/LanguageManager";
import { IntlProvider, createIntlCache, createIntl } from "react-intl";

function App() {
  const [ignored, forceUpdate] = useReducer((x: number) => x + 1, 0);
  let [language] = useState(new LanguageManager());

  return (
    <IntlProvider
      locale={language.getLanguage()}
      messages={language.getMessage()}
    >
      <div className="App">
        <Header
          switchLanguage={(lang: Languages) => {
            language.switchLanguage(lang);
            forceUpdate();
          }}
        />

        <Demineur width={10} nmbBomb={5} />
      </div>
    </IntlProvider>
  );
}

export default App;
