import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Button, TextField, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {Controller, useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormattedMessage, useIntl} from "../../../_snowpack/pkg/react-intl.js";
const StyledForm = withTheme(styled.form`
    display: flex;
    flex-direction: column;

    & > *:not(div:first-of-type) {
      margin-top: ${({theme}) => theme.spacing(2)}px;
    }
  `);
export default function ReplicationForm({url, saveUrl}) {
  const intl = useIntl();
  const getDefaultValuesFromURL = (inputUrl) => {
    const {origin, username, password, pathname} = new URL(inputUrl);
    return {
      origin,
      username,
      password,
      database: pathname.replaceAll("/", "")
    };
  };
  const defaultValues = React.useMemo(() => url ? getDefaultValuesFromURL(url) : {
    origin: "",
    database: "",
    username: "",
    password: ""
  }, [url]);
  const {handleSubmit, formState, reset, control} = useForm({defaultValues});
  const onSubmit = (data) => {
    const newUrl = new URL(data.origin);
    newUrl.username = data.username;
    newUrl.password = data.password;
    newUrl.pathname = `/${data.database}`;
    saveUrl(newUrl.toString());
  };
  React.useEffect(() => reset(defaultValues), [url, defaultValues, reset]);
  return /* @__PURE__ */ React.createElement(StyledForm, {
    onSubmit: handleSubmit(onSubmit)
  }, /* @__PURE__ */ React.createElement(Controller, {
    as: TextField,
    control,
    id: "replication-form-origin",
    name: "origin",
    label: intl.formatMessage({id: "label.hostname", defaultMessage: "Hostname"}),
    fullWidth: true,
    required: true
  }), /* @__PURE__ */ React.createElement(Controller, {
    as: TextField,
    control,
    id: "replication-form-database",
    name: "database",
    label: intl.formatMessage({id: "label.database", defaultMessage: "Database"}),
    fullWidth: true,
    required: true
  }), /* @__PURE__ */ React.createElement(Controller, {
    as: TextField,
    control,
    id: "replication-form-username",
    name: "username",
    label: intl.formatMessage({id: "label.username", defaultMessage: "Username"}),
    fullWidth: true,
    required: true
  }), /* @__PURE__ */ React.createElement(Controller, {
    as: TextField,
    control,
    id: "replication-form-password",
    name: "password",
    type: "password",
    label: intl.formatMessage({id: "label.password", defaultMessage: "Password"}),
    fullWidth: true,
    required: true
  }), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    color: "primary",
    disabled: !formState.isDirty
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.submit",
    defaultMessage: "Submit"
  })));
}
