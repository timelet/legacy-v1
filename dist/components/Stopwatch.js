import {differenceInSeconds} from "../../_snowpack/pkg/date-fns.js";
import React from "../../_snowpack/pkg/react.js";
import {useInterval} from "../../_snowpack/pkg/react-use.js";
import Duration from "./Duration.js";
export default function Stopwatch({from}) {
  const fromDateTime = new Date(from);
  const formatDuration = (_fromDateTime) => differenceInSeconds(new Date(), _fromDateTime);
  const [duration, setDuration] = React.useState(formatDuration(fromDateTime));
  useInterval(() => {
    setDuration(formatDuration(fromDateTime));
  }, 1e3);
  return /* @__PURE__ */ React.createElement(Duration, {
    seconds: duration
  });
}
