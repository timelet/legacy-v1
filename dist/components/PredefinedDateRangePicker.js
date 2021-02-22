import styled from "../../_snowpack/pkg/@emotion/styled.js";
import {FormControl, InputLabel, MenuItem, Select, withTheme} from "../../_snowpack/pkg/@material-ui/core.js";
import {KeyboardDatePicker} from "../../_snowpack/pkg/@material-ui/pickers.js";
import {endOfMonth, endOfWeek, startOfMonth, startOfWeek, subDays, subMonths} from "../../_snowpack/pkg/date-fns.js";
import React from "../../_snowpack/pkg/react.js";
import {FormattedMessage, useIntl} from "../../_snowpack/pkg/react-intl.js";
const Container = withTheme(styled.div`
    display: flex;

    & > *:not(:last-child) {
      margin-right: ${({theme}) => theme.spacing(2)}px;
    }
  `);
const predefinedRanges = ["thisWeek", "lastWeek", "thisMonth", "lastMonth"];
export default function PredefinedDateRangePicker({onSelect}) {
  const intl = useIntl();
  const [predefinedDateRange, setPredefinedDateRange] = React.useState();
  const [range, setRange] = React.useState({from: null, to: null});
  const getPredefinedRange = (predefined) => {
    switch (predefined) {
      case "thisWeek":
        return {from: startOfWeek(new Date()), to: endOfWeek(new Date())};
      case "lastWeek":
        return {from: startOfWeek(subDays(new Date(), 7)), to: endOfWeek(subDays(new Date(), 7))};
      case "thisMonth":
        return {from: startOfMonth(new Date()), to: endOfMonth(new Date())};
      case "lastMonth":
        return {from: startOfMonth(subMonths(new Date(), 7)), to: endOfMonth(subMonths(new Date(), 7))};
      default:
        return {from: null, to: null};
    }
  };
  const handleOnSelect = (selectedRange) => {
    if (selectedRange.from && selectedRange.to) {
      onSelect(selectedRange.from.getTime(), selectedRange.to.getTime());
    }
  };
  const handlePredefinedTimeRange = (e) => {
    const newPredefinedDateRange = e.target.value;
    const newRange = getPredefinedRange(newPredefinedDateRange);
    setPredefinedDateRange(newPredefinedDateRange);
    setRange(newRange);
    handleOnSelect(newRange);
  };
  const handleRangeChange = (name) => (date) => {
    const newRange = {...range, [name]: date};
    setRange(newRange);
    setPredefinedDateRange(void 0);
    handleOnSelect(newRange);
  };
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(FormControl, {
    fullWidth: true
  }, /* @__PURE__ */ React.createElement(InputLabel, null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.predefinedTimeRanges",
    defaultMessage: "Predefined time ranges"
  })), /* @__PURE__ */ React.createElement(Select, {
    onChange: handlePredefinedTimeRange,
    value: predefinedDateRange ?? ""
  }, /* @__PURE__ */ React.createElement(MenuItem, {
    value: ""
  }, /* @__PURE__ */ React.createElement("em", null, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: "label.noSelection",
    defaultMessage: "No selection"
  }))), predefinedRanges.map((recentTime) => /* @__PURE__ */ React.createElement(MenuItem, {
    value: recentTime,
    key: recentTime
  }, /* @__PURE__ */ React.createElement(FormattedMessage, {
    id: `label.${recentTime}`
  }))))), /* @__PURE__ */ React.createElement(KeyboardDatePicker, {
    name: "from",
    value: range.from,
    onChange: handleRangeChange("from"),
    format: intl.formatMessage({
      id: "format.date",
      defaultMessage: "yyyy/MM/dd",
      description: "Format which represents date"
    }),
    label: intl.formatMessage({
      id: "label.from",
      defaultMessage: "From"
    })
  }), /* @__PURE__ */ React.createElement(KeyboardDatePicker, {
    name: "to",
    value: range.to,
    onChange: handleRangeChange("to"),
    format: intl.formatMessage({
      id: "format.date",
      defaultMessage: "yyyy/MM/dd",
      description: "Format which represents date"
    }),
    label: intl.formatMessage({
      id: "label.to",
      defaultMessage: "To"
    }),
    showTodayButton: true
  }));
}
