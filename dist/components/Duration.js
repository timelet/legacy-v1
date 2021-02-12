import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
export default function Duration({seconds}) {
  return /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "format.duration",
    defaultMessage: "{minutes}min {seconds}s",
    values: {minutes: Math.floor(seconds / 60), seconds: seconds % 60}
  });
}
