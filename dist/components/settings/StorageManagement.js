import {Button} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../../_snowpack/pkg/react-intl.js";
export default function StorageManagement({exportDump}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    color: "primary",
    onClick: exportDump
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.exportDump",
    defaultMessage: "Export dump"
  })));
}
