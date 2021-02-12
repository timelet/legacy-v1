import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {IconButton, TextField, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import {PlayArrow as PlayIcon} from "../../../_snowpack/pkg/@material-ui/icons.js";
import {KeyboardDateTimePicker} from "../../../_snowpack/pkg/@material-ui/pickers.js";
import {Autocomplete} from "../../../_snowpack/pkg/@material-ui/lab.js";
import React from "../../../_snowpack/pkg/react.js";
import {useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import {useIntl} from "../../../_snowpack/pkg/react-intl.js";
const StyledForm = withTheme(styled.form`
    display: grid;
    grid-template-areas:
      'category description submit'
      'startedAt endedAt submit';
    grid-template-columns: 1fr 1fr 60px;

    & > *:last-child {
      grid-area: submit;
      display: flex;
      align-items: center;
    }

    & > *:not(:last-child) {
      flex-grow: 1;
      margin-right: ${({theme}) => theme.spacing(2)}px;
    }
  `);
export default function EntryInlineForm({categories, create}) {
  const intl = useIntl();
  const [startedAt, setStartedAt] = React.useState(null);
  const [endedAt, setEndedAt] = React.useState(null);
  const [formId, setFormId] = React.useState(0);
  const {register, handleSubmit} = useForm();
  const onSubmit = (data) => {
    const entry = {
      category: data.category,
      description: data.description,
      startedAt: startedAt?.toISOString() ?? new Date().toISOString(),
      endedAt: endedAt?.toISOString() ?? void 0
    };
    create(entry);
    setFormId(formId + 1);
  };
  return /* @__PURE__ */ React.createElement(StyledForm, {
    onSubmit: handleSubmit(onSubmit),
    key: formId
  }, /* @__PURE__ */ React.createElement(Autocomplete, {
    autoComplete: true,
    options: [...categories],
    getOptionLabel: (option) => option.name,
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
  }), /* @__PURE__ */ React.createElement(TextField, {
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
    })
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
  }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(IconButton, {
    type: "submit"
  }, /* @__PURE__ */ React.createElement(PlayIcon, null))));
}
