import {Table, TableBody, TableCell, TableHead, TableRow} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../../_snowpack/pkg/react-intl.js";
import Duration from "../Duration.js";
export default function SummaryTable({entries}) {
  const totalDuration = entries.reduce((prev, curr) => {
    if (curr.endedAt) {
      return prev + curr.endedAt - curr.startedAt;
    }
    return prev;
  }, 0);
  return /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHead, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.key",
    defaultMessage: "Key"
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.value",
    defaultMessage: "Value"
  })))), /* @__PURE__ */ React.createElement(TableBody, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.totalTimeSpent",
    defaultMessage: "Total time spent"
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Duration, {
    seconds: Math.floor(totalDuration / 1e3)
  }))), /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.amountOfEntries",
    defaultMessage: "Amount of entries"
  })), /* @__PURE__ */ React.createElement(TableCell, null, entries.length))));
}
