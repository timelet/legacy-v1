import styled from "../../../_snowpack/pkg/@emotion/styled.js";
import {Container, withTheme} from "../../../_snowpack/pkg/@material-ui/core.js";
import React from "../../../_snowpack/pkg/react.js";
import {useIntl} from "../../../_snowpack/pkg/react-intl.js";
import {useLocation} from "../../../_snowpack/pkg/react-use.js";
import ContentContainer from "./ContentContainer.js";
import Header from "./Header.js";
const LayoutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
`;
const NativeMain = withTheme(styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: ${({theme}) => theme.spacing(4)}px 0;
  `);
export default function DefaultLayout({children}) {
  const location = useLocation();
  let titleKey = location.pathname || "/";
  titleKey = titleKey.substring(1).replaceAll("/", ".") || "dashboard";
  const intl = useIntl();
  const title = intl.formatMessage({id: `title.${titleKey}`});
  return /* @__PURE__ */ React.createElement(LayoutContainer, {
    maxWidth: false
  }, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement(Header, null)), /* @__PURE__ */ React.createElement(NativeMain, null, /* @__PURE__ */ React.createElement(ContentContainer, {
    title
  }, children)), /* @__PURE__ */ React.createElement("footer", null));
}
