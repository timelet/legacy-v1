import {Table, TableBody, TableCell, TableHead, TableRow} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {FormattedMessage, FormattedDate, FormattedTime} from "../../../_snowpack/pkg/react-intl.js";
import InteractiveDuration from "../InteractiveDuration.js";
export default function EntryTable({entries}) {
  return /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHead, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.category",
    defaultMessage: "Category"
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.tag",
    defaultMessage: "Tag"
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.description",
    defaultMessage: "Description"
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.startedAt",
    defaultMessage: "Started at"
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.endedAt",
    defaultMessage: "Ended at"
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.duration",
    defaultMessage: "Duration"
  })))), /* @__PURE__ */ React.createElement(TableBody, null, entries.map((e) => /* @__PURE__ */ React.createElement(TableRow, {
    key: e.entryId
  }, /* @__PURE__ */ React.createElement(TableCell, null, e.category), /* @__PURE__ */ React.createElement(TableCell, null, e.tag), /* @__PURE__ */ React.createElement(TableCell, null, e.description), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedDate, {
    value: e.startedAt
  }), " ", /* @__PURE__ */ React.createElement(FormattedTime, {
    value: e.startedAt
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(FormattedDate, {
    value: e.endedAt
  }), " ", /* @__PURE__ */ React.createElement(FormattedTime, {
    value: e.endedAt
  })), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(InteractiveDuration, {
    from: e.startedAt,
    to: e.endedAt
  }))))));
}
