import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LanguageManager, {
  Languages,
} from "./components/Language/LanguageManager";
import { IntlProvider, createIntlCache, createIntl } from "react-intl";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";

const Menu = React.lazy(() => import("./components/Menu"));
const Mastermind = React.lazy(() => import("./components/Mastermind"));
const Demineur = React.lazy(() => import("./components/Demineur"));

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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="mastermind" element={<Mastermind />} />
            <Route
              path="demineur"
              element={<Demineur width={10} nmbBomb={5} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </IntlProvider>
  );
}

export default App;
