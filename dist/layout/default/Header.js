import React from "../../../_snowpack/pkg/react.js";
import {AppBar, Link, Toolbar, Typography} from "../../../_snowpack/pkg/@material-ui/core.js";
import {Link as RouterLink} from "../../../_snowpack/pkg/react-router-dom.js";
import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {FormattedMessage} from "../../../_snowpack/pkg/react-intl.js";
import MenuDrawer from "./MenuDrawer.js";
import {RoutePaths} from "./Router.js";
const Title = styled(Typography)`
  margin-left: 0.5rem;
  flex-grow: 1;
`;
const CustomToolbar = styled(Toolbar)`
  & > h6 > a {
    color: inherit;
  }
`;
export default function Header() {
  const titleElement = /* @__PURE__ */ React.createElement(Title, {
    variant: "h6"
  }, /* @__PURE__ */ React.createElement(Link, {
    component: RouterLink,
    to: RoutePaths.DASHBOARD
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "app.title",
    defaultMessage: "Timelet",
    description: "Application name"
  })));
  return /* @__PURE__ */ React.createElement(AppBar, {
    position: "static"
  }, /* @__PURE__ */ React.createElement(CustomToolbar, null, /* @__PURE__ */ React.createElement(MenuDrawer, {
    title: titleElement
  }), titleElement));
}
