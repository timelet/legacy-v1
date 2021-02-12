import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {IconButton, TextField, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import {useIntl} from "../../../_snowpack/pkg/react-intl.js";
import {Add as AddIcon} from "../../../_snowpack/pkg/@material-ui/icons.js";
const StyledForm = withTheme(styled.form`
    display: flex;
    justify-content: space-around;

    & > *:not(:last-child) {
      flex-grow: 1;
      margin-right: ${({theme}) => theme.spacing(2)}px;
    }
  `);
export default function CategoryInlineForm({create}) {
  const intl = useIntl();
  const {reset, register, handleSubmit} = useForm();
  const onSubmit = (data) => {
    create(data);
    reset();
  };
  return /* @__PURE__ */ React.createElement(StyledForm, {
    onSubmit: handleSubmit(onSubmit)
  }, /* @__PURE__ */ React.createElement(TextField, {
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
  }), /* @__PURE__ */ React.createElement(IconButton, {
    type: "submit"
  }, /* @__PURE__ */ React.createElement(AddIcon, null)));
}
