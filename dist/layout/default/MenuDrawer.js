import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

import {Divider, IconButton, ListItemIcon, MenuItem, MenuList, SwipeableDrawer, Toolbar} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import MenuIcon from "../../../_snowpack/pkg/@material-ui/icons/Menu.js";
import CloseIcon from "../../../_snowpack/pkg/@material-ui/icons/Close.js";
import CategoryIcon from "../../../_snowpack/pkg/@material-ui/icons/Category.js";
import SettingsIcon from "../../../_snowpack/pkg/@material-ui/icons/Settings.js";
import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {FormattedMessage} from "../../../_snowpack/pkg/react-intl.js";
import {Link, useLocation} from "../../../_snowpack/pkg/react-router-dom.js";
import {RoutePaths} from "./Router.js";
const DrawerContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;
`;
const StyledMenuList = styled(MenuList)`
  flex-grow: 1;
`;
export default function MenuDrawer({title}) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    setOpen(false);
  }, [location]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IconButton, {
    edge: "start",
    color: "inherit",
    "aria-label": "menu",
    onClick: toggleDrawer
  }, /* @__PURE__ */ React.createElement(MenuIcon, null)), /* @__PURE__ */ React.createElement(SwipeableDrawer, {
    open,
    onClose: toggleDrawer,
    onOpen: toggleDrawer
  }, /* @__PURE__ */ React.createElement(DrawerContainer, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(IconButton, {
    edge: "start",
    color: "inherit",
    "aria-label": "close menu",
    onClick: toggleDrawer
  }, /* @__PURE__ */ React.createElement(CloseIcon, null)), title), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(StyledMenuList, null, /* @__PURE__ */ React.createElement(MenuItem, {
    component: Link,
    to: RoutePaths.CATEGORIES
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(CategoryIcon, null)), /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.categories",
    defaultMessage: "Categories",
    description: "Label for entry categories"
  })), /* @__PURE__ */ React.createElement(MenuItem, {
    component: Link,
    to: RoutePaths.SETTINGS
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(SettingsIcon, null)), /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.settings",
    defaultMessage: "Settings",
    description: "Label for system settings"
  }))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "version",
    defaultMessage: "Version {version}",
    values: {version: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_PACKAGE_VERSION},
    description: "Display the the current version"
  })))));
}
