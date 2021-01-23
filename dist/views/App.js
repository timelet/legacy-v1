import {AppBar, IconButton, Toolbar, Typography} from "../../_snowpack/pkg/@material-ui/core.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import MenuIcon from "../../_snowpack/pkg/@material-ui/icons/Menu.js";
import styled from "../../_snowpack/pkg/@emotion/styled.js";
import {DatabaseProvider} from "../contexts/DatabaseContext.js";
import {initializeDatabase} from "../database.js";
import Entries from "./Entries.js";
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
  }, /* @__PURE__ */ React.createElement(AppBar, {
    position: "static"
  }, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(IconButton, {
    edge: "start",
    color: "inherit",
    "aria-label": "menu"
  }, /* @__PURE__ */ React.createElement(MenuIcon, null)), /* @__PURE__ */ React.createElement(Title, {
    variant: "h6"
  }, "Timelet"))), /* @__PURE__ */ React.createElement(Entries, null));
}
