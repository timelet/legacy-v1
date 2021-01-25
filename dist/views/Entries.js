import styled from "../../_snowpack/pkg/@emotion/styled.js";
import {Container, Paper, withTheme} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import EntryDisplay from "../components/entries/EntryDisplay.js";
import EntryForm from "../components/entries/EntryForm.js";
const EntryContainer = withTheme(styled(Container)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `);
const EntryFormContainer = withTheme(styled(Paper)`
    padding: ${({theme}) => theme.spacing(2)}px;
    margin-bottom: ${({theme}) => theme.spacing(2)}px;
  `);
const EntryDisplayContainer = withTheme(styled(Paper)`
    padding: ${({theme}) => theme.spacing(2)}px;
    flex-grow: 1;
  `);
export default function Entries() {
  return /* @__PURE__ */ React.createElement(EntryContainer, null, /* @__PURE__ */ React.createElement(EntryFormContainer, null, /* @__PURE__ */ React.createElement(EntryForm, null)), /* @__PURE__ */ React.createElement(EntryDisplayContainer, null, /* @__PURE__ */ React.createElement(EntryDisplay, null)));
}
