import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Paper, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
const ContentElement = withTheme(styled(Paper)`
    padding: ${({theme}) => theme.spacing(2)}px;
    margin-bottom: ${({theme}) => theme.spacing(2)}px;
  `);
export default ContentElement;
