import React from "../../_snowpack/pkg/react.js";
import * as echarts from "../../_snowpack/pkg/echarts/core.js";
import EChartsReact from "../../_snowpack/pkg/echarts-for-react.js";
import {
  PieChart
} from "../../_snowpack/pkg/echarts/charts.js";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from "../../_snowpack/pkg/echarts/components.js";
import {
  CanvasRenderer
} from "../../_snowpack/pkg/echarts/renderers.js";
echarts.use([TitleComponent, TooltipComponent, GridComponent, PieChart, CanvasRenderer]);
echarts.registerTheme("timelet", {});
export default function EChartsIntegration(props) {
  return /* @__PURE__ */ React.createElement(EChartsReact, {
    echarts,
    style: {height: "100%", width: "100%"},
    theme: "timelet",
    lazyUpdate: true,
    ...props
  });
}
