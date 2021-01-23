import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {DatabaseProvider} from "../contexts/DatabaseContext.js";
import {initializeDatabase} from "../database.js";
import {Entries} from "./Entries.js";
export default function App({}) {
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
  }, /* @__PURE__ */ React.createElement(Entries, null));
}
