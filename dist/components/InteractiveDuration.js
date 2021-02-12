import {differenceInSeconds} from "../../_snowpack/pkg/date-fns.js";
import React from "../../_snowpack/pkg/react.js";
import Duration from "./Duration.js";
import Stopwatch from "./Stopwatch.js";
export default function InteractiveDuration({from, to}) {
  const fromDateTime = new Date(from);
  const toDateTime = to ? new Date(to) : void 0;
  if (toDateTime) {
    return /* @__PURE__ */ React.createElement(Duration, {
      seconds: differenceInSeconds(toDateTime, fromDateTime)
    });
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Stopwatch, {
    from
  }));
}
