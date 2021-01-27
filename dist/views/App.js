import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import "../../_snowpack/pkg/date-fns.js";
import {IntlProvider} from "../../_snowpack/pkg/react-intl.js";
import {StylesProvider, ThemeProvider} from "../../_snowpack/pkg/@material-ui/core.js";
import {MuiPickersUtilsProvider} from "../../_snowpack/pkg/@material-ui/pickers.js";
import DateFnsUtils from "../../_snowpack/pkg/@date-io/date-fns.js";
import {BrowserRouter} from "../../_snowpack/pkg/react-router-dom.js";
import {DatabaseProvider} from "../contexts/DatabaseContext.js";
import {initializeDatabase} from "../database.js";
import enMessages from "../i18n/en.json.proxy.js";
import DefaultLayout from "../layout/default/DefaultLayout.js";
import {theme} from "../style.js";
import Router from "../layout/default/Router.js";
export default function App() {
  const [database, setDatabase] = useState();
  useEffect(() => {
    async function initialize() {
      const initializedDatabase = await initializeDatabase();
      setDatabase(initializedDatabase);
    }
    initialize();
  }, []);
  return /* @__PURE__ */ React.createElement(DatabaseProvider, {
    database
  }, /* @__PURE__ */ React.createElement(IntlProvider, {
    locale: "en",
    messages: enMessages
  }, /* @__PURE__ */ React.createElement(StylesProvider, {
    injectFirst: true
  }, /* @__PURE__ */ React.createElement(ThemeProvider, {
    theme
  }, /* @__PURE__ */ React.createElement(MuiPickersUtilsProvider, {
    utils: DateFnsUtils
  }, /* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(DefaultLayout, null, /* @__PURE__ */ React.createElement(Router, null))))))));
}
