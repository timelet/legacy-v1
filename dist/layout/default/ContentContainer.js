import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Container, Typography, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
const StyledContentContainer = withTheme(styled(Container)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `);
export default function ContentContainer({children, title}) {
  return /* @__PURE__ */ React.createElement(StyledContentContainer, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h2"
  }, title), children);
}
