import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

import {Divider, IconButton, ListItemIcon, MenuItem, MenuList, SwipeableDrawer, Toolbar} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  LocalOffer as TagsIcon,
  PlaylistPlay as EntryIcon,
  Poll as ReportIcon,
  GitHub as GitHubIcon,
  Language as WebsiteIcon
} from "../../../_snowpack/pkg/@material-ui/icons.js";
import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {FormattedMessage} from "../../../_snowpack/pkg/react-intl.js";
import {Link, useLocation} from "../../../_snowpack/pkg/react-router-dom.js";
import {RoutePaths} from "./Router.js";
const DrawerContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;

  a {
    line-height: 2;
  }
`;
const StyledMenuList = styled(MenuList)`
  flex-grow: 1;
`;
const BottomToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
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
  }, /* @__PURE__ */ React.createElement(CloseIcon, null)), title), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(StyledMenuList, null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuItem, {
    component: Link,
    to: RoutePaths.ENTRIES
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(EntryIcon, null)), /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.entries",
    defaultMessage: "Entries"
  }))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuItem, {
    component: Link,
    to: RoutePaths.REPORT
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(ReportIcon, null)), /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.report",
    defaultMessage: "Report"
  }))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuItem, {
    component: Link,
    to: RoutePaths.CATEGORIES
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(CategoryIcon, null)), /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.categories",
    defaultMessage: "Categories",
    description: "Label for entry categories"
  }))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuItem, {
    component: Link,
    to: RoutePaths.TAGS
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(TagsIcon, null)), /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.tags",
    defaultMessage: "Tags",
    description: "Label for tags"
  }))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(MenuItem, {
    component: Link,
    to: RoutePaths.SETTINGS
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(SettingsIcon, null)), /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.settings",
    defaultMessage: "Settings",
    description: "Label for system settings"
  })))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(BottomToolbar, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "version",
    defaultMessage: "Version {version}",
    values: {version: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_PACKAGE_VERSION},
    description: "Display the the current version"
  }), /* @__PURE__ */ React.createElement(IconButton, {
    href: "https://timelet.org",
    target: "blank"
  }, /* @__PURE__ */ React.createElement(WebsiteIcon, null)), /* @__PURE__ */ React.createElement(IconButton, {
    href: "https://github.com/timelet/timelet",
    target: "blank"
  }, /* @__PURE__ */ React.createElement(GitHubIcon, null))))));
}
