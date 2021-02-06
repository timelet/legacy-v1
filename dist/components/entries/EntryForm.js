import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, TextField, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import {Edit as EditIcon} from "../../../_snowpack/pkg/@material-ui/icons.js";
import {KeyboardDateTimePicker} from "../../../_snowpack/pkg/@material-ui/pickers.js";
import React from "../../../_snowpack/pkg/react.js";
import {useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormattedMessage, useIntl} from "../../../_snowpack/pkg/react-intl.js";
const CustomDialogContent = withTheme(styled(DialogContent)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & > *:not(:last-child) {
      flex-grow: 1;
      margin-bottom: ${({theme}) => theme.spacing(2)}px;
    }
  `);
export default function EntryForm({entry, update}) {
  const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const [startedAt, setStartedAt] = React.useState(new Date(entry.startedAt));
  const [endedAt, setEndedAt] = React.useState(entry.endedAt ? new Date(entry.endedAt) : null);
  const {reset, register, handleSubmit} = useForm({defaultValues: entry});
  const toggleDialog = () => setOpen(!open);
  React.useEffect(() => {
    reset(entry);
    setStartedAt(new Date(entry.startedAt));
    setEndedAt(entry.endedAt ? new Date(entry.endedAt) : null);
  }, [entry]);
  const onSubmit = (data) => {
    const updatedEntry = {
      entryId: entry.entryId,
      description: data.description,
      startedAt: new Date(data.startedAt).toISOString(),
      endedAt: data.endedAt ? new Date(data.endedAt).toISOString() : void 0
    };
    update(updatedEntry);
    toggleDialog();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IconButton, {
    onClick: toggleDialog
  }, /* @__PURE__ */ React.createElement(EditIcon, null)), /* @__PURE__ */ React.createElement(Dialog, {
    open,
    onClose: toggleDialog
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /* @__PURE__ */ React.createElement(DialogTitle, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "heading.editEntry",
    defaultMessage: "Edit entry",
    description: "Heading of the entry edit form dialog"
  })), /* @__PURE__ */ React.createElement(CustomDialogContent, null, /* @__PURE__ */ React.createElement(TextField, {
    name: "description",
    inputRef: register,
    label: intl.formatMessage({
      id: "label.description",
      defaultMessage: "Description"
    }),
    multiline: true,
    required: true
  }), /* @__PURE__ */ React.createElement(KeyboardDateTimePicker, {
    name: "startedAt",
    inputRef: register,
    onChange: (date) => setStartedAt(date),
    value: startedAt,
    ampm: false,
    format: intl.formatMessage({
      id: "format.datetime",
      defaultMessage: "yyyy/MM/dd HH:mm",
      description: "Format which represents date time"
    }),
    label: intl.formatMessage({
      id: "label.startedAt",
      defaultMessage: "Started at"
    }),
    required: true
  }), /* @__PURE__ */ React.createElement(KeyboardDateTimePicker, {
    name: "endedAt",
    inputRef: register,
    clearable: true,
    onChange: (date) => setEndedAt(date),
    value: endedAt,
    ampm: false,
    format: intl.formatMessage({
      id: "format.datetime",
      defaultMessage: "yyyy/MM/dd HH:mm",
      description: "Format which represents date time"
    }),
    label: intl.formatMessage({
      id: "label.endedAt",
      defaultMessage: "Ended at"
    })
  })), /* @__PURE__ */ React.createElement(DialogActions, null, /* @__PURE__ */ React.createElement(Button, {
    color: "secondary",
    onClick: toggleDialog
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.cancel",
    defaultMessage: "Cancel",
    description: "Cancel an action"
  })), /* @__PURE__ */ React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.submit",
    defaultMessage: "Submit",
    description: "Submit a form"
  }))))));
}
