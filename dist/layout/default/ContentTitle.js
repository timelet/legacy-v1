import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Typography, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
const Title = withTheme(styled(Typography)`
    font-size: 1.6rem;
    margin-bottom: ${({theme}) => theme.spacing(2)}px;
  `);
export default function ContentTitle({children}) {
  return /* @__PURE__ */ React.createElement(Title, {
    variant: "h2"
  }, children);
}
