import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
import ContentContainer from "../layout/default/ContentContainer.js";
import ContentElement from "../layout/default/ContentElement.js";
import ContentTitle from "../layout/default/ContentTitle.js";
export default function Categories() {
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(ContentTitle, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.categories",
    defaultMessage: "Categories"
  })), /* @__PURE__ */ React.createElement(ContentElement, null, "Categories"));
}
