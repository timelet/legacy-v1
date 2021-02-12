import {unstable_createMuiStrictModeTheme as createMuiTheme} from "../_snowpack/pkg/@material-ui/core.js";
import {deepOrange, red} from "../_snowpack/pkg/@material-ui/core/colors.js";
export const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: red
  },
  typography: {
    h2: {
      fontSize: "1.6rem",
      marginBottom: "0.5rem"
    },
    h3: {
      fontSize: "1.2rem",
      marginBottom: "1rem"
    }
  }
});
