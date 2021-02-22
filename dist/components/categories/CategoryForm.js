import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, TextField, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import {Edit as EditIcon} from "../../../_snowpack/pkg/@material-ui/icons.js";
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
export default function CategoryForm({category, update}) {
  const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const {reset, register, handleSubmit} = useForm({defaultValues: category});
  const toggleDialog = () => setOpen(!open);
  React.useEffect(() => {
    reset(category);
  }, [reset, category]);
  const onSubmit = (data) => {
    update(category, data);
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
    id: "heading.editCategory",
    defaultMessage: "Edit category",
    description: "Heading of the category edit form dialog"
  })), /* @__PURE__ */ React.createElement(CustomDialogContent, null, /* @__PURE__ */ React.createElement(TextField, {
    name: "name",
    inputRef: register,
    label: intl.formatMessage({
      id: "label.name",
      defaultMessage: "Name"
    }),
    required: true
  }), /* @__PURE__ */ React.createElement(TextField, {
    name: "description",
    inputRef: register,
    label: intl.formatMessage({
      id: "label.description",
      defaultMessage: "Description"
    }),
    multiline: true
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
