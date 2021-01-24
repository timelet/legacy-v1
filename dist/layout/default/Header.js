import React from "../../../_snowpack/pkg/react.js";
import {AppBar, IconButton, Toolbar, Typography} from "../../../_snowpack/pkg/@material-ui/core.js";
import MenuIcon from "../../../_snowpack/pkg/@material-ui/icons/Menu.js";
import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {FormattedMessage} from "../../../_snowpack/pkg/react-intl.js";
const Title = styled(Typography)`
  margin-left: 0.5rem;
  flex-grow: 1;
`;
export default function Header() {
  return /* @__PURE__ */ React.createElement(AppBar, {
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
  }))));
}
