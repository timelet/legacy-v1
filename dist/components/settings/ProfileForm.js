import React from "../../../_snowpack/pkg/react.js";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import {FormattedDisplayName, FormattedMessage} from "../../../_snowpack/pkg/react-intl.js";
import {Controller, useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {userInterfaceLanguages} from "../../domain/models/languageModel.js";
const StyledForm = withTheme(styled.form`
    display: flex;
    flex-direction: column;

    & > * {
      margin-top: ${({theme}) => theme.spacing(2)}px;
    }
  `);
export default function ProfileForm({profiles, currentProfile, saveProfile, selectProfile}) {
  const {handleSubmit, control, formState, reset} = useForm({defaultValues: currentProfile});
  const handleProfileSelect = (event) => {
    const profileId = event.target.value;
    const newProfile = profiles.find((p) => p.profileId === profileId);
    if (newProfile) {
      selectProfile(newProfile);
    }
  };
  const onSubmit = (data) => {
    const newProfile = {...data, profileId: currentProfile?.profileId};
    saveProfile(newProfile);
    reset(newProfile);
  };
  const userInterfaceLanguageSelect = /* @__PURE__ */ React.createElement(Select, null, /* @__PURE__ */ React.createElement(MenuItem, {
    value: ""
  }, /* @__PURE__ */ React.createElement("em", null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.emptyAndDependingOnBrowser",
    defaultMessage: "Empty (depending on browser language)",
    description: "An entry in a select input, which clears the input."
  }))), userInterfaceLanguages.map((l) => /* @__PURE__ */ React.createElement(MenuItem, {
    value: l,
    key: l
  }, /* @__PURE__ */ React.createElement(FormattedDisplayName, {
    type: "language",
    value: l
  }))));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormControl, {
    fullWidth: true,
    disabled: formState.isDirty
  }, /* @__PURE__ */ React.createElement(InputLabel, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.profile",
    defaultMessage: "Profile"
  })), /* @__PURE__ */ React.createElement(Select, {
    name: "profile",
    value: currentProfile?.profileId || "",
    onChange: handleProfileSelect
  }, profiles.map((p) => /* @__PURE__ */ React.createElement(MenuItem, {
    value: p.profileId,
    key: p.profileId
  }, p.profileId)))), /* @__PURE__ */ React.createElement(StyledForm, {
    onSubmit: handleSubmit(onSubmit)
  }, /* @__PURE__ */ React.createElement(FormControl, {
    fullWidth: true
  }, /* @__PURE__ */ React.createElement(InputLabel, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.language",
    defaultMessage: "Language"
  })), /* @__PURE__ */ React.createElement(Controller, {
    control,
    name: "userInterfaceLanguage",
    as: userInterfaceLanguageSelect
  }), /* @__PURE__ */ React.createElement(FormHelperText, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "help.browserLanguageWhenEmpty",
    defaultMessage: "Browser language is used, when left empty"
  }))), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    color: "primary",
    disabled: !formState.isDirty
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "action.submit",
    defaultMessage: "Submit",
    description: "Submit a form"
  }))));
}
