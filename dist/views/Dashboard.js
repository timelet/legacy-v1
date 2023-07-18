import styled from "../../_snowpack/pkg/@emotion/styled.js";
import React from "../../_snowpack/pkg/react.js";
import ContentElement from "../layout/default/ContentElement.js";
import Entries from "./Entries.js";
const DashboardContentElement = styled(ContentElement)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 40vw;
`;
export default function Dashboard() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DashboardContentElement, null, /* @__PURE__ */ React.createElement(Entries, null)));
}
