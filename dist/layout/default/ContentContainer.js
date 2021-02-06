import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Container, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
const ContentContainer = withTheme(styled(Container)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `);
export default ContentContainer;
