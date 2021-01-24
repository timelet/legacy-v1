import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Container} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import Header from "./Header.js";
const LayoutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
`;
const NativeMain = styled.main`
  flex-grow: 1;
`;
export default function DefaultLayout({children}) {
  return /* @__PURE__ */ React.createElement(LayoutContainer, {
    maxWidth: false
  }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement(Header, null)), /* @__PURE__ */ React.createElement(NativeMain, null, children), /* @__PURE__ */ React.createElement("footer", null));
}