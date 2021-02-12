import {Routes, Route} from "../../../_snowpack/pkg/react-router-dom.js";
import React from "../../../_snowpack/pkg/react.js";
import Entries from "../../views/Entries.js";
import Categories from "../../views/Categories.js";
import Settings from "../../views/Settings.js";
import Tags from "../../views/Tags.js";
export const RoutePaths = {
  DASHBOARD: "/",
  CATEGORIES: "/categories",
  TAGS: "/tags",
  SETTINGS: "/settings"
};
export default function Router() {
  return /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: RoutePaths.DASHBOARD,
    element: /* @__PURE__ */ React.createElement(Entries, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: RoutePaths.CATEGORIES,
    element: /* @__PURE__ */ React.createElement(Categories, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: RoutePaths.TAGS,
    element: /* @__PURE__ */ React.createElement(Tags, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: RoutePaths.SETTINGS,
    element: /* @__PURE__ */ React.createElement(Settings, null)
  }));
}
