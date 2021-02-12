import {Typography} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
import ContentContainer from "../layout/default/ContentContainer.js";
import ContentElement from "../layout/default/ContentElement.js";
export default function Tags() {
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h2"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "title.tags",
    defaultMessage: "Tags"
  })), /* @__PURE__ */ React.createElement(ContentElement, null, "Tags"));
}
