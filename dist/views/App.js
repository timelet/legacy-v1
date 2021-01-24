import {AppBar, IconButton, Toolbar, Typography} from "../../_snowpack/pkg/@material-ui/core.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import MenuIcon from "../../_snowpack/pkg/@material-ui/icons/Menu.js";
import styled from "../../_snowpack/pkg/@emotion/styled.js";
import {FormattedMessage, IntlProvider} from "../../_snowpack/pkg/react-intl.js";
import {DatabaseProvider} from "../contexts/DatabaseContext.js";
import {initializeDatabase} from "../database.js";
import Entries from "./Entries.js";
import enMessages from "../i18n/en.json.proxy.js";
const Title = styled(Typography)`
  margin-left: 1rem;
  flex-grow: 1;
`;
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
  }, /* @__PURE__ */ React.createElement(AppBar, {
    position: "static"
  }, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(IconButton, {
    edge: "start",
    color: "inherit",
    "aria-label": "menu"
  }, /* @__PURE__ */ React.createElement(MenuIcon, null)), /* @__PURE__ */ React.createElement(Title, {
    variant: "h6"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "app.title",
    defaultMessage: "Timelet",
    description: "Application name"
  })))), /* @__PURE__ */ React.createElement(Entries, null)));
}
