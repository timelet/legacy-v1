import {Button} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {FormattedMessage, useIntl} from "../../../_snowpack/pkg/react-intl.js";
import ConfirmDialog from "../ConfirmDialog.js";
export default function StorageManagement({exportDump, importDump, deleteAllLocalData}) {
  const intl = useIntl();
  const handleImportDump = (e) => {
    if (e.target.files && e.target.files.length >= 0) {
      e.target.files[0].text().then((value) => importDump(value));
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    color: "primary",
    onClick: exportDump
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.exportDump",
    defaultMessage: "Export dump"
  })), /* @__PURE__ */ React.createElement(Button, {
    color: "primary",
    component: "label"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.importDump",
    defaultMessage: "Import dump"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    hidden: true,
    onChange: handleImportDump,
    accept: ".json"
  })), /* @__PURE__ */ React.createElement(ConfirmDialog, {
    title: intl.formatMessage({id: "label.confirmation", defaultMessage: "Confirmation"}),
    description: intl.formatMessage({
      id: "dialog.confirmDeleteAllLocalData",
      defaultMessage: "You are about to delete all local data. Confirm to delete all local data."
    }),
    onConfirm: deleteAllLocalData
  }, /* @__PURE__ */ React.createElement(Button, {
    color: "primary"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.deleteAllLocalData",
    defaultMessage: "Delete all local data"
  }))));
}
