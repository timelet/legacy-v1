import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, TextField, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import {Edit as EditIcon} from "../../../_snowpack/pkg/@material-ui/icons.js";
import {Autocomplete} from "../../../_snowpack/pkg/@material-ui/lab.js";
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
export default function EntryForm({entry, categories, tags, update}) {
  const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const [startedAt, setStartedAt] = React.useState(new Date(entry.startedAt));
  const [endedAt, setEndedAt] = React.useState(entry.endedAt ? new Date(entry.endedAt) : null);
  const [category, setCategory] = React.useState(categories.find((c) => c.name === entry.category));
  const [tag, setTag] = React.useState(tags.find((t) => t.name === entry.tag));
  const {reset, register, handleSubmit} = useForm({defaultValues: entry});
  const dateTimeFormat = intl.formatMessage({
    id: "format.datetime",
    defaultMessage: "yyyy/MM/dd HH:mm",
    description: "Format which represents date time"
  });
  const toggleDialog = () => setOpen(!open);
  React.useEffect(() => {
    reset(entry);
    setStartedAt(new Date(entry.startedAt));
    setEndedAt(entry.endedAt ? new Date(entry.endedAt) : null);
  }, [reset, entry]);
  const onSubmit = (data) => {
    const updatedEntry = {
      entryId: entry.entryId,
      category: category?.name || data.category,
      tag: tag?.name || data.tag,
      description: data.description,
      startedAt: startedAt.getTime(),
      endedAt: endedAt?.getTime() ?? void 0
    };
    update(updatedEntry);
    toggleDialog();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IconButton, {
    onClick: toggleDialog
  }, /* @__PURE__ */ React.createElement(EditIcon, null)), /* @__PURE__ */ React.createElement(Dialog, {
    open,
    onClose: toggleDialog,
    fullWidth: true
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /* @__PURE__ */ React.createElement(DialogTitle, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "heading.editEntry",
    defaultMessage: "Edit entry",
    description: "Heading of the entry edit form dialog"
  })), /* @__PURE__ */ React.createElement(CustomDialogContent, null, /* @__PURE__ */ React.createElement(Autocomplete, {
    autoComplete: true,
    options: [...categories],
    getOptionLabel: (option) => option.name,
    defaultValue: category,
    onChange: (_, value) => {
      if (value) {
        setCategory(value);
      }
    },
    value: category,
    renderInput: (params) => /* @__PURE__ */ React.createElement(TextField, {
      ...params,
      name: "category",
      inputRef: register,
      label: intl.formatMessage({
        id: "label.category",
        defaultMessage: "Category"
      }),
      required: true
    })
  }), /* @__PURE__ */ React.createElement(Autocomplete, {
    autoComplete: true,
    options: [...tags],
    getOptionLabel: (option) => option.name,
    defaultValue: tag,
    onChange: (_, value) => {
      if (value) {
        setTag(value);
      }
    },
    value: tag,
    renderInput: (params) => /* @__PURE__ */ React.createElement(TextField, {
      ...params,
      name: "tag",
      inputRef: register,
      label: intl.formatMessage({
        id: "label.tag",
        defaultMessage: "Tag"
      })
    })
  }), /* @__PURE__ */ React.createElement(TextField, {
    name: "description",
    inputRef: register,
    label: intl.formatMessage({
      id: "label.description",
      defaultMessage: "Description"
    }),
    multiline: true
  }), /* @__PURE__ */ React.createElement(KeyboardDateTimePicker, {
    name: "startedAt",
    onChange: (date) => date ? setStartedAt(date) : null,
    value: startedAt,
    ampm: false,
    format: dateTimeFormat,
    label: intl.formatMessage({
      id: "label.startedAt",
      defaultMessage: "Started at"
    }),
    required: true
  }), /* @__PURE__ */ React.createElement(KeyboardDateTimePicker, {
    name: "endedAt",
    clearable: true,
    onChange: (date) => setEndedAt(date),
    value: endedAt,
    ampm: false,
    format: dateTimeFormat,
    label: intl.formatMessage({
      id: "label.endedAt",
      defaultMessage: "Ended at"
    })
  })), /* @__PURE__ */ React.createElement(DialogActions, null, /* @__PURE__ */ React.createElement(Button, {
    color: "secondary",
    onClick: toggleDialog
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.cancel",
    defaultMessage: "Cancel"
  })), /* @__PURE__ */ React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.submit",
    defaultMessage: "Submit"
  }))))));
}
