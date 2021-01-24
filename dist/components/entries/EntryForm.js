import {IconButton, TextField} from "../../../_snowpack/pkg/@material-ui/core.js";
import {PlayCircleFilled} from "../../../_snowpack/pkg/@material-ui/icons.js";
import {KeyboardDateTimePicker} from "../../../_snowpack/pkg/@material-ui/pickers.js";
import React from "../../../_snowpack/pkg/react.js";
import {useIntl} from "../../../_snowpack/pkg/react-intl.js";
export default function EntryForm() {
  const intl = useIntl();
  const [startedAt, setStartedAt] = React.useState(new Date());
  const [endedAt, setEndedAt] = React.useState(null);
  return /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement(TextField, {
    label: intl.formatMessage({id: "label.description", defaultMessage: "Description", description: "Label for a multiline description"}),
    multiline: true
  }), /* @__PURE__ */ React.createElement(KeyboardDateTimePicker, {
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
      defaultMessage: "Started at",
      description: "Label which indicates the starting date and time of an activity"
    })
  }), /* @__PURE__ */ React.createElement(KeyboardDateTimePicker, {
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
      defaultMessage: "Ended at",
      description: "Label which indicates the ending date and time of an activity"
    })
  }), /* @__PURE__ */ React.createElement(IconButton, {
    type: "submit"
  }, /* @__PURE__ */ React.createElement(PlayCircleFilled, null)));
}
