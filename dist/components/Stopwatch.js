import {formatDistanceToNowStrict} from "../../_snowpack/pkg/date-fns.js";
import React from "../../_snowpack/pkg/react.js";
import {useInterval} from "../../_snowpack/pkg/react-use.js";
export default function Stopwatch({from}) {
  const fromDate = new Date(from);
  const formatDuration = (_fromDate) => `${formatDistanceToNowStrict(_fromDate, {unit: "minute"})}`;
  const [duration, setDuration] = React.useState(formatDuration(fromDate));
  useInterval(() => {
    setDuration(formatDuration(fromDate));
  }, 1e3);
  return /* @__PURE__ */ React.createElement("span", null, duration);
}
