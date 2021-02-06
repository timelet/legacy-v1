import React, {createContext, useContext} from "../../../_snowpack/pkg/react.js";
const DatabaseContext = createContext(void 0);
export function useDatabase() {
  return useContext(DatabaseContext);
}
export function DatabaseProvider({children, database}) {
  return /* @__PURE__ */ React.createElement(DatabaseContext.Provider, {
    value: database
  }, children);
}
