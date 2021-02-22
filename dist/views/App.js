import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import "../../_snowpack/pkg/date-fns.js";
import {IntlProvider} from "../../_snowpack/pkg/react-intl.js";
import {StylesProvider, ThemeProvider} from "../../_snowpack/pkg/@material-ui/core.js";
import {MuiPickersUtilsProvider} from "../../_snowpack/pkg/@material-ui/pickers.js";
import DateFnsUtils from "../../_snowpack/pkg/@date-io/date-fns.js";
import {BrowserRouter} from "../../_snowpack/pkg/react-router-dom.js";
import {getUserLocale} from "../../_snowpack/pkg/get-user-locale.js";
import {DatabaseProvider} from "../contexts/DatabaseContext.js";
import {initializeDatabase} from "../database.js";
import enMessages from "../i18n/en.json.proxy.js";
import deMessages from "../i18n/de.json.proxy.js";
import DefaultLayout from "../layout/default/DefaultLayout.js";
import {theme} from "../style.js";
import Router from "../layout/default/Router.js";
import ServiceWorkerIntegration from "../components/ServiceWorkerIntegration.js";
import "../polyfills.js";
import {createSubscriptionEffect} from "../utils/rxdb.js";
import {SETTINGS_DOCUMENT_ID} from "../domain/documents/settingsDocument.js";
import {defaultUserInterfaceLanguage, userInterfaceLanguages} from "../domain/models/languageModel.js";
import {matchLanguage} from "../utils/i18n.js";
const messages = {
  de: deMessages,
  en: enMessages
};
export default function App() {
  const [database, setDatabase] = useState();
  const [userInterfaceLanguage, setUserInterfaceLanguage] = useState(matchLanguage(getUserLocale(), userInterfaceLanguages));
  const getLanguage = React.useCallback(() => createSubscriptionEffect(async () => {
    const settings = await database?.getLocal(SETTINGS_DOCUMENT_ID);
    return database?.profiles.findOne({selector: {profileId: settings?.profile}}).$.subscribe((doc) => {
      if (doc?.userInterfaceLanguage) {
        setUserInterfaceLanguage(doc.userInterfaceLanguage);
      } else {
        setUserInterfaceLanguage(matchLanguage(getUserLocale(), userInterfaceLanguages));
      }
    });
  }), [database]);
  useEffect(() => {
    async function initialize() {
      const initializedDatabase = await initializeDatabase();
      setDatabase(initializedDatabase);
    }
    initialize();
  }, []);
  useEffect(() => getLanguage(), [getLanguage]);
  return /* @__PURE__ */ React.createElement(DatabaseProvider, {
    database
  }, /* @__PURE__ */ React.createElement(IntlProvider, {
    locale: userInterfaceLanguage,
    messages: messages[userInterfaceLanguage],
    defaultLocale: defaultUserInterfaceLanguage
  }, /* @__PURE__ */ React.createElement(StylesProvider, {
    injectFirst: true
  }, /* @__PURE__ */ React.createElement(ThemeProvider, {
    theme
  }, /* @__PURE__ */ React.createElement(MuiPickersUtilsProvider, {
    utils: DateFnsUtils
  }, /* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(ServiceWorkerIntegration, null), /* @__PURE__ */ React.createElement(DefaultLayout, null, /* @__PURE__ */ React.createElement(Router, null))))))));
}
