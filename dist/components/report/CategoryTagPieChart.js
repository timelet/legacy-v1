import React from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {useIntl} from "../../../_snowpack/pkg/react-intl.js";
import EChartsIntegration from "../EChartsIntegration.js";
const CategoryTagPieChartContainer = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
`;
export default function CategoryTagPieChart({entries}) {
  const intl = useIntl();
  const categoryDurationSeries = [
    ...entries.reduce((map, curr) => {
      if (curr.endedAt) {
        const name = curr.category;
        const value = curr.endedAt - curr.startedAt;
        const prev = map.get(name);
        if (prev) {
          prev.value += value;
        } else {
          map.set(name, {name, value});
        }
      }
      return map;
    }, new Map()).values()
  ];
  const tagDurationSeries = [
    ...entries.reduce((map, curr) => {
      if (curr.endedAt) {
        const name = curr.tag || intl.formatMessage({id: "label.noSelection", defaultMessage: "No selection"});
        const value = curr.endedAt - curr.startedAt;
        const prev = map.get(name);
        if (prev) {
          prev.value += value;
        } else {
          map.set(name, {name, value});
        }
      }
      return map;
    }, new Map()).values()
  ];
  const commonSeriesOptions = {
    type: "pie",
    radius: "50%",
    label: {
      formatter: ({name, value, percent}) => {
        let duration = intl.formatMessage({id: "label.undefined", defaultMessage: "Undefined", description: "An undefined value"});
        if (typeof value === "number") {
          duration = intl.formatMessage({id: "format.duration", defaultMessage: "{minutes}min {seconds}s"}, {minutes: Math.floor(value / 1e3 / 60), seconds: Math.floor(value / 1e3 % 60)});
        }
        return `${name}
${duration}
${percent ?? 0}%`;
      }
    }
  };
  const options = {
    series: [
      {
        ...commonSeriesOptions,
        name: "Category",
        center: ["25%", "50%"],
        data: categoryDurationSeries
      },
      {
        ...commonSeriesOptions,
        name: "Tag",
        center: ["75%", "50%"],
        data: tagDurationSeries
      }
    ]
  };
  return /* @__PURE__ */ React.createElement(CategoryTagPieChartContainer, null, /* @__PURE__ */ React.createElement(EChartsIntegration, {
    option: options
  }));
}
