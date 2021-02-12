import {Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button} from "../../_snowpack/pkg/@material-ui/core.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage} from "../../_snowpack/pkg/react-intl.js";
export default function ConfirmDialog({title, description, onConfirm, children}) {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const catchBubblingEvents = (event) => {
    event.preventDefault();
    toggleOpen();
  };
  const handleCancel = () => {
    toggleOpen();
  };
  const handleConfirm = () => {
    toggleOpen();
    onConfirm();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    onClick: catchBubblingEvents,
    onKeyPress: catchBubblingEvents,
    role: "presentation"
  }, children), /* @__PURE__ */ React.createElement(Dialog, {
    open,
    onClose: toggleOpen
  }, /* @__PURE__ */ React.createElement(DialogTitle, null, title), /* @__PURE__ */ React.createElement(DialogContent, null, /* @__PURE__ */ React.createElement(DialogContentText, null, description)), /* @__PURE__ */ React.createElement(DialogActions, null, /* @__PURE__ */ React.createElement(Button, {
    color: "secondary",
    onClick: handleCancel
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.cancel",
    defaultMessage: "Cancel"
  })), /* @__PURE__ */ React.createElement(Button, {
    color: "primary",
    onClick: handleConfirm
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.confirm",
    defaultMessage: "Confirm"
  })))));
}
