import {Button} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {FormattedMessage, useIntl} from "../../../_snowpack/pkg/react-intl.js";
import {format} from "../../../_snowpack/pkg/date-fns.js";
import saveFile from "../../../_snowpack/pkg/save-as-file.js";
export default function ExportEntries({entries}) {
  const intl = useIntl();
  const handleCSVExport = () => {
    const dump = entries.map((e) => `${e.category},${e.tag || ""},${e.description || ""},${new Date(e.startedAt).toISOString()},${e.endedAt ? new Date(e.endedAt).toISOString() : ""},${e.endedAt ? e.endedAt - e.startedAt : ""}`).join("\n");
    const filename = `${intl.formatMessage({id: "app.title", defaultMessage: "Timelet"})}-${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`.toLowerCase();
    const type = "text/plain;charset=utf-8";
    const file = new Blob([dump], {type});
    saveFile(file, filename);
  };
  return /* @__PURE__ */ React.createElement(Button, {
    color: "primary",
    onClick: handleCSVExport
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.exportAsCSV",
    defaultMessage: "Export as CSV"
  }));
}
