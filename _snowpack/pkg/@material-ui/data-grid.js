import { g as global } from '../common/polyfill-node:global-21e5c503.js';
import { p as process } from '../common/process-2545f00a.js';
import { r as react } from '../common/index-45809189.js';
import { p as _createClass, A as SheetsRegistry, B as createGenerateClassName, S as StylesProvider, _ as _objectWithoutProperties, C as makeStyles, c as clsx, b as _defineProperty, r as formatMuiErrorMessage, j as defaultTheme, h as createMuiTheme, w as withStyles, D as jssPreset, E as hexToRgb, F as rgbToHex, G as hslToRgb, H as decomposeColor, I as recomposeColor, J as getContrastRatio, K as getLuminance, e as emphasize, f as fade, k as darken, l as lighten, L as easing, d as duration, a as capitalize, s as createSvgIcon, i as deepmerge, g as getThemeProps } from '../common/createSvgIcon-d7ea2643.js';
import { c as createMuiStrictModeTheme, w as withTheme, d as ThemeProvider, E, b as TableCell, N as NoSsr, C as ClickAwayListener } from '../common/TableCell-e7959508.js';
import { c as createStyles, m as makeStyles$1, K as KeyboardArrowRight, a as KeyboardArrowLeft } from '../common/KeyboardArrowRight-c2400df3.js';
import { _ as _extends } from '../common/extends-7477639a.js';
import { p as propTypes } from '../common/index-c103191b.js';
import { h as hoistNonReactStatics_cjs } from '../common/hoist-non-react-statics.cjs-fec7e822.js';
import { _ as _classCallCheck, u as useTheme, h as useFormControl, T as Typography, e as Toolbar, W, I as InputBase, G as Grow, j as ownerWindow, o as ownerDocument, b as TextField, f as MenuList, B as Button, C as CircularProgress, $, c as B, d as debounce } from '../common/TextField-66653f18.js';
import { e as useControlled, _ as _slicedToArray, I as IconButton, a as useIsFocusVisible, u as useForkRef, s as setRef, b as useEventCallback, P as Paper } from '../common/Portal-4295522f.js';
import { u as useId, P as Popper } from '../common/Popper-f687c99a.js';
import { r as reactDom } from '../common/index-e22d40e2.js';
import '../common/_commonjsHelpers-37fa8da4.js';
import '../common/red-359464ee.js';

var ServerStyleSheets = /*#__PURE__*/function () {
  function ServerStyleSheets() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ServerStyleSheets);

    this.options = options;
  }

  _createClass(ServerStyleSheets, [{
    key: "collect",
    value: function collect(children) {
      // This is needed in order to deduplicate the injection of CSS in the page.
      var sheetsManager = new Map(); // This is needed in order to inject the critical CSS.

      this.sheetsRegistry = new SheetsRegistry(); // A new class name generator

      var generateClassName = createGenerateClassName();
      return /*#__PURE__*/react.createElement(StylesProvider, _extends({
        sheetsManager: sheetsManager,
        serverGenerateClassName: generateClassName,
        sheetsRegistry: this.sheetsRegistry
      }, this.options), children);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.sheetsRegistry ? this.sheetsRegistry.toString() : '';
    }
  }, {
    key: "getStyleElement",
    value: function getStyleElement(props) {
      return /*#__PURE__*/react.createElement('style', _extends({
        id: 'jss-server-side',
        key: 'jss-server-side',
        dangerouslySetInnerHTML: {
          __html: this.toString()
        }
      }, props));
    }
  }]);

  return ServerStyleSheets;
}();

function omit(input, fields) {
  var output = {};
  Object.keys(input).forEach(function (prop) {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
} // styled-components's API removes the mapping between components and styles.
// Using components as a low-level styling construct can be simpler.


function styled(Component) {
  var componentCreator = function componentCreator(style) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var name = options.name,
        stylesOptions = _objectWithoutProperties(options, ["name"]);

    var classNamePrefix = name;

    var stylesOrCreator = typeof style === 'function' ? function (theme) {
      return {
        root: function root(props) {
          return style(_extends({
            theme: theme
          }, props));
        }
      };
    } : {
      root: style
    };
    var useStyles = makeStyles(stylesOrCreator, _extends({
      Component: Component,
      name: name || Component.displayName,
      classNamePrefix: classNamePrefix
    }, stylesOptions));
    var filterProps;

    if (style.filterProps) {
      filterProps = style.filterProps;
      delete style.filterProps;
    }
    /* eslint-disable react/forbid-foreign-prop-types */


    if (style.propTypes) {
      style.propTypes;
      delete style.propTypes;
    }
    /* eslint-enable react/forbid-foreign-prop-types */


    var StyledComponent = /*#__PURE__*/react.forwardRef(function StyledComponent(props, ref) {
      var children = props.children,
          classNameProp = props.className,
          clone = props.clone,
          ComponentProp = props.component,
          other = _objectWithoutProperties(props, ["children", "className", "clone", "component"]);

      var classes = useStyles(props);
      var className = clsx(classes.root, classNameProp);
      var spread = other;

      if (filterProps) {
        spread = omit(spread, filterProps);
      }

      if (clone) {
        return /*#__PURE__*/react.cloneElement(children, _extends({
          className: clsx(children.props.className, className)
        }, spread));
      }

      if (typeof children === 'function') {
        return children(_extends({
          className: className
        }, spread));
      }

      var FinalComponent = ComponentProp || Component;
      return /*#__PURE__*/react.createElement(FinalComponent, _extends({
        ref: ref,
        className: className
      }, spread), children);
    });

    hoistNonReactStatics_cjs(StyledComponent, Component);
    return StyledComponent;
  };

  return componentCreator;
}

function isUnitless(value) {
  return String(parseFloat(value)).length === String(value).length;
} // Ported from Compass
// https://github.com/Compass/compass/blob/master/core/stylesheets/compass/typography/_units.scss
// Emulate the sass function "unit"

function getUnit(input) {
  return String(input).match(/[\d.\-+]*\s*(.*)/)[1] || '';
} // Emulate the sass function "unitless"

function toUnitless(length) {
  return parseFloat(length);
} // Convert any CSS <length> or <percentage> value to any another.
// From https://github.com/KyleAMathews/convert-css-length

function convertLength(baseFontSize) {
  return function (length, toUnit) {
    var fromUnit = getUnit(length); // Optimize for cases where `from` and `to` units are accidentally the same.

    if (fromUnit === toUnit) {
      return length;
    } // Convert input length to pixels.


    var pxLength = toUnitless(length);

    if (fromUnit !== 'px') {
      if (fromUnit === 'em') {
        pxLength = toUnitless(length) * toUnitless(baseFontSize);
      } else if (fromUnit === 'rem') {
        pxLength = toUnitless(length) * toUnitless(baseFontSize);
        return length;
      }
    } // Convert length in pixels to the output unit


    var outputLength = pxLength;

    if (toUnit !== 'px') {
      if (toUnit === 'em') {
        outputLength = pxLength / toUnitless(baseFontSize);
      } else if (toUnit === 'rem') {
        outputLength = pxLength / toUnitless(baseFontSize);
      } else {
        return length;
      }
    }

    return parseFloat(outputLength.toFixed(5)) + toUnit;
  };
}
function alignProperty(_ref) {
  var size = _ref.size,
      grid = _ref.grid;
  var sizeBelow = size - size % grid;
  var sizeAbove = sizeBelow + grid;
  return size - sizeBelow < sizeAbove - size ? sizeBelow : sizeAbove;
} // fontGrid finds a minimal grid (in rem) for the fontSize values so that the
// lineHeight falls under a x pixels grid, 4px in the case of Material Design,
// without changing the relative line height

function fontGrid(_ref2) {
  var lineHeight = _ref2.lineHeight,
      pixels = _ref2.pixels,
      htmlFontSize = _ref2.htmlFontSize;
  return pixels / (lineHeight * htmlFontSize);
}
/**
 * generate a responsive version of a given CSS property
 * @example
 * responsiveProperty({
 *   cssProperty: 'fontSize',
 *   min: 15,
 *   max: 20,
 *   unit: 'px',
 *   breakpoints: [300, 600],
 * })
 *
 * // this returns
 *
 * {
 *   fontSize: '15px',
 *   '@media (min-width:300px)': {
 *     fontSize: '17.5px',
 *   },
 *   '@media (min-width:600px)': {
 *     fontSize: '20px',
 *   },
 * }
 *
 * @param {Object} params
 * @param {string} params.cssProperty - The CSS property to be made responsive
 * @param {number} params.min - The smallest value of the CSS property
 * @param {number} params.max - The largest value of the CSS property
 * @param {string} [params.unit] - The unit to be used for the CSS property
 * @param {Array.number} [params.breakpoints]  - An array of breakpoints
 * @param {number} [params.alignStep] - Round scaled value to fall under this grid
 * @returns {Object} responsive styles for {params.cssProperty}
 */

function responsiveProperty(_ref3) {
  var cssProperty = _ref3.cssProperty,
      min = _ref3.min,
      max = _ref3.max,
      _ref3$unit = _ref3.unit,
      unit = _ref3$unit === void 0 ? 'rem' : _ref3$unit,
      _ref3$breakpoints = _ref3.breakpoints,
      breakpoints = _ref3$breakpoints === void 0 ? [600, 960, 1280] : _ref3$breakpoints,
      _ref3$transform = _ref3.transform,
      transform = _ref3$transform === void 0 ? null : _ref3$transform;

  var output = _defineProperty({}, cssProperty, "".concat(min).concat(unit));

  var factor = (max - min) / breakpoints[breakpoints.length - 1];
  breakpoints.forEach(function (breakpoint) {
    var value = min + factor * breakpoint;

    if (transform !== null) {
      value = transform(value);
    }

    output["@media (min-width:".concat(breakpoint, "px)")] = _defineProperty({}, cssProperty, "".concat(Math.round(value * 10000) / 10000).concat(unit));
  });
  return output;
}

function responsiveFontSizes(themeInput) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$breakpoints = options.breakpoints,
      breakpoints = _options$breakpoints === void 0 ? ['sm', 'md', 'lg'] : _options$breakpoints,
      _options$disableAlign = options.disableAlign,
      disableAlign = _options$disableAlign === void 0 ? false : _options$disableAlign,
      _options$factor = options.factor,
      factor = _options$factor === void 0 ? 2 : _options$factor,
      _options$variants = options.variants,
      variants = _options$variants === void 0 ? ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'] : _options$variants;

  var theme = _extends({}, themeInput);

  theme.typography = _extends({}, theme.typography);
  var typography = theme.typography; // Convert between css lengths e.g. em->px or px->rem
  // Set the baseFontSize for your project. Defaults to 16px (also the browser default).

  var convert = convertLength(typography.htmlFontSize);
  var breakpointValues = breakpoints.map(function (x) {
    return theme.breakpoints.values[x];
  });
  variants.forEach(function (variant) {
    var style = typography[variant];
    var remFontSize = parseFloat(convert(style.fontSize, 'rem'));

    if (remFontSize <= 1) {
      return;
    }

    var maxFontSize = remFontSize;
    var minFontSize = 1 + (maxFontSize - 1) / factor;
    var lineHeight = style.lineHeight;

    if (!isUnitless(lineHeight) && !disableAlign) {
      throw new Error(formatMuiErrorMessage(6));
    }

    if (!isUnitless(lineHeight)) {
      // make it unitless
      lineHeight = parseFloat(convert(lineHeight, 'rem')) / parseFloat(remFontSize);
    }

    var transform = null;

    if (!disableAlign) {
      transform = function transform(value) {
        return alignProperty({
          size: value,
          grid: fontGrid({
            pixels: 4,
            lineHeight: lineHeight,
            htmlFontSize: typography.htmlFontSize
          })
        });
      };
    }

    typography[variant] = _extends({}, style, responsiveProperty({
      cssProperty: 'fontSize',
      min: minFontSize,
      max: maxFontSize,
      unit: 'rem',
      breakpoints: breakpointValues,
      transform: transform
    }));
  });
  return theme;
}

var styled$1 = function styled$1(Component) {
  var componentCreator = styled(Component);
  return function (style, options) {
    return componentCreator(style, _extends({
      defaultTheme: defaultTheme
    }, options));
  };
};

var m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createMuiTheme: createMuiTheme,
  unstable_createMuiStrictModeTheme: createMuiStrictModeTheme,
  createStyles: createStyles,
  makeStyles: makeStyles$1,
  responsiveFontSizes: responsiveFontSizes,
  styled: styled$1,
  useTheme: useTheme,
  withStyles: withStyles,
  withTheme: withTheme,
  createGenerateClassName: createGenerateClassName,
  jssPreset: jssPreset,
  ServerStyleSheets: ServerStyleSheets,
  StylesProvider: StylesProvider,
  MuiThemeProvider: ThemeProvider,
  ThemeProvider: ThemeProvider,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  hslToRgb: hslToRgb,
  decomposeColor: decomposeColor,
  recomposeColor: recomposeColor,
  getContrastRatio: getContrastRatio,
  getLuminance: getLuminance,
  emphasize: emphasize,
  fade: fade,
  darken: darken,
  lighten: lighten,
  easing: easing,
  duration: duration
});

var RADIUS_STANDARD = 10;
var RADIUS_DOT = 4;
var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      display: 'inline-flex',
      // For correct alignment with the text.
      verticalAlign: 'middle',
      flexShrink: 0
    },

    /* Styles applied to the badge `span` element. */
    badge: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      boxSizing: 'border-box',
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(12),
      minWidth: RADIUS_STANDARD * 2,
      lineHeight: 1,
      padding: '0 6px',
      height: RADIUS_STANDARD * 2,
      borderRadius: RADIUS_STANDARD,
      zIndex: 1,
      // Render the badge on top of potential ripples.
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },

    /* Styles applied to the root element if `color="error"`. */
    colorError: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    },

    /* Styles applied to the root element if `variant="dot"`. */
    dot: {
      borderRadius: RADIUS_DOT,
      height: RADIUS_DOT * 2,
      minWidth: RADIUS_DOT * 2,
      padding: 0
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangle"`. */
    anchorOriginTopRightRectangle: {
      top: 0,
      right: 0,
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      '&$invisible': {
        transform: 'scale(0) translate(50%, -50%)'
      }
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangle"`. */
    anchorOriginBottomRightRectangle: {
      bottom: 0,
      right: 0,
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      '&$invisible': {
        transform: 'scale(0) translate(50%, 50%)'
      }
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangle"`. */
    anchorOriginTopLeftRectangle: {
      top: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      '&$invisible': {
        transform: 'scale(0) translate(-50%, -50%)'
      }
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangle"`. */
    anchorOriginBottomLeftRectangle: {
      bottom: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      '&$invisible': {
        transform: 'scale(0) translate(-50%, 50%)'
      }
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="circle"`. */
    anchorOriginTopRightCircle: {
      top: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      '&$invisible': {
        transform: 'scale(0) translate(50%, -50%)'
      }
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circle"`. */
    anchorOriginBottomRightCircle: {
      bottom: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      '&$invisible': {
        transform: 'scale(0) translate(50%, 50%)'
      }
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="circle"`. */
    anchorOriginTopLeftCircle: {
      top: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      '&$invisible': {
        transform: 'scale(0) translate(-50%, -50%)'
      }
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circle"`. */
    anchorOriginBottomLeftCircle: {
      bottom: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      '&$invisible': {
        transform: 'scale(0) translate(-50%, 50%)'
      }
    },

    /* Pseudo-class to the badge `span` element if `invisible={true}`. */
    invisible: {
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  };
};
var Badge = /*#__PURE__*/react.forwardRef(function Badge(props, ref) {
  var _props$anchorOrigin = props.anchorOrigin,
      anchorOrigin = _props$anchorOrigin === void 0 ? {
    vertical: 'top',
    horizontal: 'right'
  } : _props$anchorOrigin,
      badgeContent = props.badgeContent,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      _props$component = props.component,
      ComponentProp = _props$component === void 0 ? 'span' : _props$component,
      invisibleProp = props.invisible,
      _props$max = props.max,
      max = _props$max === void 0 ? 99 : _props$max,
      _props$overlap = props.overlap,
      overlap = _props$overlap === void 0 ? 'rectangle' : _props$overlap,
      _props$showZero = props.showZero,
      showZero = _props$showZero === void 0 ? false : _props$showZero,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = _objectWithoutProperties(props, ["anchorOrigin", "badgeContent", "children", "classes", "className", "color", "component", "invisible", "max", "overlap", "showZero", "variant"]);

  var invisible = invisibleProp;

  if (invisibleProp == null && (badgeContent === 0 && !showZero || badgeContent == null && variant !== 'dot')) {
    invisible = true;
  }

  var displayValue = '';

  if (variant !== 'dot') {
    displayValue = badgeContent > max ? "".concat(max, "+") : badgeContent;
  }

  return /*#__PURE__*/react.createElement(ComponentProp, _extends({
    className: clsx(classes.root, className),
    ref: ref
  }, other), children, /*#__PURE__*/react.createElement("span", {
    className: clsx(classes.badge, classes["".concat(anchorOrigin.horizontal).concat(capitalize(anchorOrigin.vertical), "}")], classes["anchorOrigin".concat(capitalize(anchorOrigin.vertical)).concat(capitalize(anchorOrigin.horizontal)).concat(capitalize(overlap))], color !== 'default' && classes["color".concat(capitalize(color))], invisible && classes.invisible, variant === 'dot' && classes.dot)
  }, displayValue));
});
var _ = withStyles(styles, {
  name: 'MuiBadge'
})(Badge);

var styles$1 = {
  root: {
    padding: 9
  },
  checked: {},
  disabled: {},
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    zIndex: 1
  }
};
/**
 * @ignore - internal component.
 */

var SwitchBase = /*#__PURE__*/react.forwardRef(function SwitchBase(props, ref) {
  var autoFocus = props.autoFocus,
      checkedProp = props.checked,
      checkedIcon = props.checkedIcon,
      classes = props.classes,
      className = props.className,
      defaultChecked = props.defaultChecked,
      disabledProp = props.disabled,
      icon = props.icon,
      id = props.id,
      inputProps = props.inputProps,
      inputRef = props.inputRef,
      name = props.name,
      onBlur = props.onBlur,
      onChange = props.onChange,
      onFocus = props.onFocus,
      readOnly = props.readOnly,
      required = props.required,
      tabIndex = props.tabIndex,
      type = props.type,
      value = props.value,
      other = _objectWithoutProperties(props, ["autoFocus", "checked", "checkedIcon", "classes", "className", "defaultChecked", "disabled", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"]);

  var _useControlled = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchBase',
    state: 'checked'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      checked = _useControlled2[0],
      setCheckedState = _useControlled2[1];

  var muiFormControl = useFormControl();

  var handleFocus = function handleFocus(event) {
    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  var handleBlur = function handleBlur(event) {
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  var handleInputChange = function handleInputChange(event) {
    var newChecked = event.target.checked;
    setCheckedState(newChecked);

    if (onChange) {
      // TODO v5: remove the second argument.
      onChange(event, newChecked);
    }
  };

  var disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  var hasLabelFor = type === 'checkbox' || type === 'radio';
  return /*#__PURE__*/react.createElement(IconButton, _extends({
    component: "span",
    className: clsx(classes.root, className, checked && classes.checked, disabled && classes.disabled),
    disabled: disabled,
    tabIndex: null,
    role: undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ref: ref
  }, other), /*#__PURE__*/react.createElement("input", _extends({
    autoFocus: autoFocus,
    checked: checkedProp,
    defaultChecked: defaultChecked,
    className: classes.input,
    disabled: disabled,
    id: hasLabelFor && id,
    name: name,
    onChange: handleInputChange,
    readOnly: readOnly,
    ref: inputRef,
    required: required,
    tabIndex: tabIndex,
    type: type,
    value: value
  }, inputProps)), checked ? checkedIcon : icon);
}); // NB: If changed, please update Checkbox, Switch and Radio
var SwitchBase$1 = withStyles(styles$1, {
  name: 'PrivateSwitchBase'
})(SwitchBase);

/**
 * @ignore - internal component.
 */

var CheckBoxOutlineBlankIcon = createSvgIcon( /*#__PURE__*/react.createElement("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}));

/**
 * @ignore - internal component.
 */

var CheckBoxIcon = createSvgIcon( /*#__PURE__*/react.createElement("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}));

/**
 * @ignore - internal component.
 */

var IndeterminateCheckBoxIcon = createSvgIcon( /*#__PURE__*/react.createElement("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}));

var styles$2 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      color: theme.palette.text.secondary
    },

    /* Pseudo-class applied to the root element if `checked={true}`. */
    checked: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if `indeterminate={true}`. */
    indeterminate: {},

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      '&$checked': {
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      '&$checked': {
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    }
  };
};
var defaultCheckedIcon = /*#__PURE__*/react.createElement(CheckBoxIcon, null);
var defaultIcon = /*#__PURE__*/react.createElement(CheckBoxOutlineBlankIcon, null);
var defaultIndeterminateIcon = /*#__PURE__*/react.createElement(IndeterminateCheckBoxIcon, null);
var Checkbox = /*#__PURE__*/react.forwardRef(function Checkbox(props, ref) {
  var _props$checkedIcon = props.checkedIcon,
      checkedIcon = _props$checkedIcon === void 0 ? defaultCheckedIcon : _props$checkedIcon,
      classes = props.classes,
      _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      _props$icon = props.icon,
      iconProp = _props$icon === void 0 ? defaultIcon : _props$icon,
      _props$indeterminate = props.indeterminate,
      indeterminate = _props$indeterminate === void 0 ? false : _props$indeterminate,
      _props$indeterminateI = props.indeterminateIcon,
      indeterminateIconProp = _props$indeterminateI === void 0 ? defaultIndeterminateIcon : _props$indeterminateI,
      inputProps = props.inputProps,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      other = _objectWithoutProperties(props, ["checkedIcon", "classes", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size"]);

  var icon = indeterminate ? indeterminateIconProp : iconProp;
  var indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
  return /*#__PURE__*/react.createElement(SwitchBase$1, _extends({
    type: "checkbox",
    classes: {
      root: clsx(classes.root, classes["color".concat(capitalize(color))], indeterminate && classes.indeterminate),
      checked: classes.checked,
      disabled: classes.disabled
    },
    color: color,
    inputProps: _extends({
      'data-indeterminate': indeterminate
    }, inputProps),
    icon: /*#__PURE__*/react.cloneElement(icon, {
      fontSize: icon.props.fontSize === undefined && size === "small" ? size : icon.props.fontSize
    }),
    checkedIcon: /*#__PURE__*/react.cloneElement(indeterminateIcon, {
      fontSize: indeterminateIcon.props.fontSize === undefined && size === "small" ? size : indeterminateIcon.props.fontSize
    }),
    ref: ref
  }, other));
});
var D = withStyles(styles$2, {
  name: 'MuiCheckbox'
})(Checkbox);

var styles$3 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      // For correct alignment with the text.
      verticalAlign: 'middle',
      WebkitTapHighlightColor: 'transparent',
      marginLeft: -11,
      marginRight: 16,
      // used for row presentation of radio/checkbox
      '&$disabled': {
        cursor: 'default'
      }
    },

    /* Styles applied to the root element if `labelPlacement="start"`. */
    labelPlacementStart: {
      flexDirection: 'row-reverse',
      marginLeft: 16,
      // used for row presentation of radio/checkbox
      marginRight: -11
    },

    /* Styles applied to the root element if `labelPlacement="top"`. */
    labelPlacementTop: {
      flexDirection: 'column-reverse',
      marginLeft: 16
    },

    /* Styles applied to the root element if `labelPlacement="bottom"`. */
    labelPlacementBottom: {
      flexDirection: 'column',
      marginLeft: 16
    },

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the label's Typography component. */
    label: {
      '&$disabled': {
        color: theme.palette.text.disabled
      }
    }
  };
};
/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */

var FormControlLabel = /*#__PURE__*/react.forwardRef(function FormControlLabel(props, ref) {
  props.checked;
      var classes = props.classes,
      className = props.className,
      control = props.control,
      disabledProp = props.disabled;
      props.inputRef;
      var label = props.label,
      _props$labelPlacement = props.labelPlacement,
      labelPlacement = _props$labelPlacement === void 0 ? 'end' : _props$labelPlacement;
      props.name;
      props.onChange;
      props.value;
      var other = _objectWithoutProperties(props, ["checked", "classes", "className", "control", "disabled", "inputRef", "label", "labelPlacement", "name", "onChange", "value"]);

  var muiFormControl = useFormControl();
  var disabled = disabledProp;

  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }

  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  var controlProps = {
    disabled: disabled
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(function (key) {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  return /*#__PURE__*/react.createElement("label", _extends({
    className: clsx(classes.root, className, labelPlacement !== 'end' && classes["labelPlacement".concat(capitalize(labelPlacement))], disabled && classes.disabled),
    ref: ref
  }, other), /*#__PURE__*/react.cloneElement(control, controlProps), /*#__PURE__*/react.createElement(Typography, {
    component: "span",
    className: clsx(classes.label, disabled && classes.disabled)
  }, label));
});
var H = withStyles(styles$3, {
  name: 'MuiFormControlLabel'
})(FormControlLabel);

var styles$4 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      width: 34 + 12 * 2,
      height: 14 + 12 * 2,
      overflow: 'hidden',
      padding: 12,
      boxSizing: 'border-box',
      position: 'relative',
      flexShrink: 0,
      zIndex: 0,
      // Reset the stacking context.
      verticalAlign: 'middle',
      // For correct alignment with the text.
      '@media print': {
        colorAdjust: 'exact'
      }
    },

    /* Styles applied to the root element if `edge="start"`. */
    edgeStart: {
      marginLeft: -8
    },

    /* Styles applied to the root element if `edge="end"`. */
    edgeEnd: {
      marginRight: -8
    },

    /* Styles applied to the internal `SwitchBase` component's `root` class. */
    switchBase: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      // Render above the focus ripple.
      color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
      transition: theme.transitions.create(['left', 'transform'], {
        duration: theme.transitions.duration.shortest
      }),
      '&$checked': {
        transform: 'translateX(20px)'
      },
      '&$disabled': {
        color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800]
      },
      '&$checked + $track': {
        opacity: 0.5
      },
      '&$disabled + $track': {
        opacity: theme.palette.type === 'light' ? 0.12 : 0.1
      }
    },

    /* Styles applied to the internal SwitchBase component's root element if `color="primary"`. */
    colorPrimary: {
      '&$checked': {
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800]
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.primary.main
      },
      '&$disabled + $track': {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
      }
    },

    /* Styles applied to the internal SwitchBase component's root element if `color="secondary"`. */
    colorSecondary: {
      '&$checked': {
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800]
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.secondary.main
      },
      '&$disabled + $track': {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
      }
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      width: 40,
      height: 24,
      padding: 7,
      '& $thumb': {
        width: 16,
        height: 16
      },
      '& $switchBase': {
        padding: 4,
        '&$checked': {
          transform: 'translateX(16px)'
        }
      }
    },

    /* Pseudo-class applied to the internal `SwitchBase` component's `checked` class. */
    checked: {},

    /* Pseudo-class applied to the internal SwitchBase component's disabled class. */
    disabled: {},

    /* Styles applied to the internal SwitchBase component's input element. */
    input: {
      left: '-100%',
      width: '300%'
    },

    /* Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop. */
    thumb: {
      boxShadow: theme.shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%'
    },

    /* Styles applied to the track element. */
    track: {
      height: '100%',
      width: '100%',
      borderRadius: 14 / 2,
      zIndex: -1,
      transition: theme.transitions.create(['opacity', 'background-color'], {
        duration: theme.transitions.duration.shortest
      }),
      backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
      opacity: theme.palette.type === 'light' ? 0.38 : 0.3
    }
  };
};
var Switch = /*#__PURE__*/react.forwardRef(function Switch(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      _props$edge = props.edge,
      edge = _props$edge === void 0 ? false : _props$edge,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      other = _objectWithoutProperties(props, ["classes", "className", "color", "edge", "size"]);

  var icon = /*#__PURE__*/react.createElement("span", {
    className: classes.thumb
  });
  return /*#__PURE__*/react.createElement("span", {
    className: clsx(classes.root, className, {
      'start': classes.edgeStart,
      'end': classes.edgeEnd
    }[edge], size === "small" && classes["size".concat(capitalize(size))])
  }, /*#__PURE__*/react.createElement(SwitchBase$1, _extends({
    type: "checkbox",
    icon: icon,
    checkedIcon: icon,
    classes: {
      root: clsx(classes.switchBase, classes["color".concat(capitalize(color))]),
      input: classes.input,
      checked: classes.checked,
      disabled: classes.disabled
    },
    ref: ref
  }, other)), /*#__PURE__*/react.createElement("span", {
    className: classes.track
  }));
});
var G = withStyles(styles$4, {
  name: 'MuiSwitch'
})(Switch);

/**
 * @ignore - internal component.
 */

var _ref = /*#__PURE__*/react.createElement(KeyboardArrowRight, null);

var _ref2 = /*#__PURE__*/react.createElement(KeyboardArrowLeft, null);

var _ref3 = /*#__PURE__*/react.createElement(KeyboardArrowLeft, null);

var _ref4 = /*#__PURE__*/react.createElement(KeyboardArrowRight, null);

var TablePaginationActions = /*#__PURE__*/react.forwardRef(function TablePaginationActions(props, ref) {
  var backIconButtonProps = props.backIconButtonProps,
      count = props.count,
      nextIconButtonProps = props.nextIconButtonProps,
      onChangePage = props.onChangePage,
      page = props.page,
      rowsPerPage = props.rowsPerPage,
      other = _objectWithoutProperties(props, ["backIconButtonProps", "count", "nextIconButtonProps", "onChangePage", "page", "rowsPerPage"]);

  var theme = useTheme();

  var handleBackButtonClick = function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  };

  var handleNextButtonClick = function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  };

  return /*#__PURE__*/react.createElement("div", _extends({
    ref: ref
  }, other), /*#__PURE__*/react.createElement(IconButton, _extends({
    onClick: handleBackButtonClick,
    disabled: page === 0,
    color: "inherit"
  }, backIconButtonProps), theme.direction === 'rtl' ? _ref : _ref2), /*#__PURE__*/react.createElement(IconButton, _extends({
    onClick: handleNextButtonClick,
    disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
    color: "inherit"
  }, nextIconButtonProps), theme.direction === 'rtl' ? _ref3 : _ref4));
});

var styles$5 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(14),
      overflow: 'auto',
      // Increase the specificity to override TableCell.
      '&:last-child': {
        padding: 0
      }
    },

    /* Styles applied to the Toolbar component. */
    toolbar: {
      minHeight: 52,
      paddingRight: 2
    },

    /* Styles applied to the spacer element. */
    spacer: {
      flex: '1 1 100%'
    },

    /* Styles applied to the caption Typography components if `variant="caption"`. */
    caption: {
      flexShrink: 0
    },
    // TODO v5: `.selectRoot` should be merged with `.input`

    /* Styles applied to the Select component root element. */
    selectRoot: {
      marginRight: 32,
      marginLeft: 8
    },

    /* Styles applied to the Select component `select` class. */
    select: {
      paddingLeft: 8,
      paddingRight: 24,
      textAlign: 'right',
      textAlignLast: 'right' // Align <select> on Chrome.

    },
    // TODO v5: remove

    /* Styles applied to the Select component `icon` class. */
    selectIcon: {},

    /* Styles applied to the `InputBase` component. */
    input: {
      color: 'inherit',
      fontSize: 'inherit',
      flexShrink: 0
    },

    /* Styles applied to the MenuItem component. */
    menuItem: {},

    /* Styles applied to the internal `TablePaginationActions` component. */
    actions: {
      flexShrink: 0,
      marginLeft: 20
    }
  };
};

var defaultLabelDisplayedRows = function defaultLabelDisplayedRows(_ref) {
  var from = _ref.from,
      to = _ref.to,
      count = _ref.count;
  return "".concat(from, "-").concat(to, " of ").concat(count !== -1 ? count : "more than ".concat(to));
};

var defaultRowsPerPageOptions = [10, 25, 50, 100];
/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */

var TablePagination = /*#__PURE__*/react.forwardRef(function TablePagination(props, ref) {
  var _props$ActionsCompone = props.ActionsComponent,
      ActionsComponent = _props$ActionsCompone === void 0 ? TablePaginationActions : _props$ActionsCompone,
      backIconButtonProps = props.backIconButtonProps,
      _props$backIconButton = props.backIconButtonText,
      backIconButtonText = _props$backIconButton === void 0 ? 'Previous page' : _props$backIconButton,
      classes = props.classes,
      className = props.className,
      colSpanProp = props.colSpan,
      _props$component = props.component,
      Component = _props$component === void 0 ? TableCell : _props$component,
      count = props.count,
      _props$labelDisplayed = props.labelDisplayedRows,
      labelDisplayedRows = _props$labelDisplayed === void 0 ? defaultLabelDisplayedRows : _props$labelDisplayed,
      _props$labelRowsPerPa = props.labelRowsPerPage,
      labelRowsPerPage = _props$labelRowsPerPa === void 0 ? 'Rows per page:' : _props$labelRowsPerPa,
      nextIconButtonProps = props.nextIconButtonProps,
      _props$nextIconButton = props.nextIconButtonText,
      nextIconButtonText = _props$nextIconButton === void 0 ? 'Next page' : _props$nextIconButton,
      onChangePage = props.onChangePage,
      onChangeRowsPerPage = props.onChangeRowsPerPage,
      page = props.page,
      rowsPerPage = props.rowsPerPage,
      _props$rowsPerPageOpt = props.rowsPerPageOptions,
      rowsPerPageOptions = _props$rowsPerPageOpt === void 0 ? defaultRowsPerPageOptions : _props$rowsPerPageOpt,
      _props$SelectProps = props.SelectProps,
      SelectProps = _props$SelectProps === void 0 ? {} : _props$SelectProps,
      other = _objectWithoutProperties(props, ["ActionsComponent", "backIconButtonProps", "backIconButtonText", "classes", "className", "colSpan", "component", "count", "labelDisplayedRows", "labelRowsPerPage", "nextIconButtonProps", "nextIconButtonText", "onChangePage", "onChangeRowsPerPage", "page", "rowsPerPage", "rowsPerPageOptions", "SelectProps"]);

  var colSpan;

  if (Component === TableCell || Component === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  var selectId = useId();
  var labelId = useId();
  var MenuItemComponent = SelectProps.native ? 'option' : E;
  return /*#__PURE__*/react.createElement(Component, _extends({
    className: clsx(classes.root, className),
    colSpan: colSpan,
    ref: ref
  }, other), /*#__PURE__*/react.createElement(Toolbar, {
    className: classes.toolbar
  }, /*#__PURE__*/react.createElement("div", {
    className: classes.spacer
  }), rowsPerPageOptions.length > 1 && /*#__PURE__*/react.createElement(Typography, {
    color: "inherit",
    variant: "body2",
    className: classes.caption,
    id: labelId
  }, labelRowsPerPage), rowsPerPageOptions.length > 1 && /*#__PURE__*/react.createElement(W, _extends({
    classes: {
      select: classes.select,
      icon: classes.selectIcon
    },
    input: /*#__PURE__*/react.createElement(InputBase, {
      className: clsx(classes.input, classes.selectRoot)
    }),
    value: rowsPerPage,
    onChange: onChangeRowsPerPage,
    id: selectId,
    labelId: labelId
  }, SelectProps), rowsPerPageOptions.map(function (rowsPerPageOption) {
    return /*#__PURE__*/react.createElement(MenuItemComponent, {
      className: classes.menuItem,
      key: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption,
      value: rowsPerPageOption.value ? rowsPerPageOption.value : rowsPerPageOption
    }, rowsPerPageOption.label ? rowsPerPageOption.label : rowsPerPageOption);
  })), /*#__PURE__*/react.createElement(Typography, {
    color: "inherit",
    variant: "body2",
    className: classes.caption
  }, labelDisplayedRows({
    from: count === 0 ? 0 : page * rowsPerPage + 1,
    to: count !== -1 ? Math.min(count, (page + 1) * rowsPerPage) : (page + 1) * rowsPerPage,
    count: count === -1 ? -1 : count,
    page: page
  })), /*#__PURE__*/react.createElement(ActionsComponent, {
    className: classes.actions,
    backIconButtonProps: _extends({
      title: backIconButtonText,
      'aria-label': backIconButtonText
    }, backIconButtonProps),
    count: count,
    nextIconButtonProps: _extends({
      title: nextIconButtonText,
      'aria-label': nextIconButtonText
    }, nextIconButtonProps),
    onChangePage: onChangePage,
    page: page,
    rowsPerPage: rowsPerPage
  })));
});
var Y = withStyles(styles$5, {
  name: 'MuiTablePagination'
})(TablePagination);

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

function arrowGenerator() {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '0 100%'
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.71em',
      marginLeft: 4,
      marginRight: 4,
      '&::before': {
        transformOrigin: '100% 0'
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.71em',
      height: '1em',
      width: '0.71em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '100% 100%'
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.71em',
      height: '1em',
      width: '0.71em',
      marginTop: 4,
      marginBottom: 4,
      '&::before': {
        transformOrigin: '0 0'
      }
    }
  };
}

var styles$6 = function styles(theme) {
  return {
    /* Styles applied to the Popper component. */
    popper: {
      zIndex: theme.zIndex.tooltip,
      pointerEvents: 'none' // disable jss-rtl plugin

    },

    /* Styles applied to the Popper component if `interactive={true}`. */
    popperInteractive: {
      pointerEvents: 'auto'
    },

    /* Styles applied to the Popper component if `arrow={true}`. */
    popperArrow: arrowGenerator(),

    /* Styles applied to the tooltip (label wrapper) element. */
    tooltip: {
      backgroundColor: fade(theme.palette.grey[700], 0.9),
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.common.white,
      fontFamily: theme.typography.fontFamily,
      padding: '4px 8px',
      fontSize: theme.typography.pxToRem(10),
      lineHeight: "".concat(round(14 / 10), "em"),
      maxWidth: 300,
      wordWrap: 'break-word',
      fontWeight: theme.typography.fontWeightMedium
    },

    /* Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
    tooltipArrow: {
      position: 'relative',
      margin: '0'
    },

    /* Styles applied to the arrow element. */
    arrow: {
      overflow: 'hidden',
      position: 'absolute',
      width: '1em',
      height: '0.71em'
      /* = width / sqrt(2) = (length of the hypotenuse) */
      ,
      boxSizing: 'border-box',
      color: fade(theme.palette.grey[700], 0.9),
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: 'currentColor',
        transform: 'rotate(45deg)'
      }
    },

    /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
    touch: {
      padding: '8px 16px',
      fontSize: theme.typography.pxToRem(14),
      lineHeight: "".concat(round(16 / 14), "em"),
      fontWeight: theme.typography.fontWeightRegular
    },

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
    tooltipPlacementLeft: _defineProperty({
      transformOrigin: 'right center',
      margin: '0 24px '
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
    tooltipPlacementRight: _defineProperty({
      transformOrigin: 'left center',
      margin: '0 24px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
    tooltipPlacementTop: _defineProperty({
      transformOrigin: 'center bottom',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
    tooltipPlacementBottom: _defineProperty({
      transformOrigin: 'center top',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    })
  };
};
var hystersisOpen = false;
var hystersisTimer = null;
var Tooltip = /*#__PURE__*/react.forwardRef(function Tooltip(props, ref) {
  var _props$arrow = props.arrow,
      arrow = _props$arrow === void 0 ? false : _props$arrow,
      children = props.children,
      classes = props.classes,
      _props$disableFocusLi = props.disableFocusListener,
      disableFocusListener = _props$disableFocusLi === void 0 ? false : _props$disableFocusLi,
      _props$disableHoverLi = props.disableHoverListener,
      disableHoverListener = _props$disableHoverLi === void 0 ? false : _props$disableHoverLi,
      _props$disableTouchLi = props.disableTouchListener,
      disableTouchListener = _props$disableTouchLi === void 0 ? false : _props$disableTouchLi,
      _props$enterDelay = props.enterDelay,
      enterDelay = _props$enterDelay === void 0 ? 100 : _props$enterDelay,
      _props$enterNextDelay = props.enterNextDelay,
      enterNextDelay = _props$enterNextDelay === void 0 ? 0 : _props$enterNextDelay,
      _props$enterTouchDela = props.enterTouchDelay,
      enterTouchDelay = _props$enterTouchDela === void 0 ? 700 : _props$enterTouchDela,
      idProp = props.id,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? false : _props$interactive,
      _props$leaveDelay = props.leaveDelay,
      leaveDelay = _props$leaveDelay === void 0 ? 0 : _props$leaveDelay,
      _props$leaveTouchDela = props.leaveTouchDelay,
      leaveTouchDelay = _props$leaveTouchDela === void 0 ? 1500 : _props$leaveTouchDela,
      onClose = props.onClose,
      onOpen = props.onOpen,
      openProp = props.open,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottom' : _props$placement,
      _props$PopperComponen = props.PopperComponent,
      PopperComponent = _props$PopperComponen === void 0 ? Popper : _props$PopperComponen,
      PopperProps = props.PopperProps,
      title = props.title,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = _objectWithoutProperties(props, ["arrow", "children", "classes", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "id", "interactive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"]);

  var theme = useTheme();

  var _React$useState = react.useState(),
      childNode = _React$useState[0],
      setChildNode = _React$useState[1];

  var _React$useState2 = react.useState(null),
      arrowRef = _React$useState2[0],
      setArrowRef = _React$useState2[1];

  var ignoreNonTouchEvents = react.useRef(false);
  var closeTimer = react.useRef();
  var enterTimer = react.useRef();
  var leaveTimer = react.useRef();
  var touchTimer = react.useRef();

  var _useControlled = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      openState = _useControlled2[0],
      setOpenState = _useControlled2[1];

  var open = openState;

  var id = useId(idProp);
  react.useEffect(function () {
    return function () {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(touchTimer.current);
    };
  }, []);

  var handleOpen = function handleOpen(event) {
    clearTimeout(hystersisTimer);
    hystersisOpen = true; // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.

    setOpenState(true);

    if (onOpen) {
      onOpen(event);
    }
  };

  var handleEnter = function handleEnter() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      var childrenProps = children.props;

      if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
        childrenProps.onMouseOver(event);
      }

      if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
        return;
      } // Remove the title ahead of time.
      // We don't want to wait for the next render commit.
      // We would risk displaying two tooltips at the same time (native + this one).


      if (childNode) {
        childNode.removeAttribute('title');
      }

      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);

      if (enterDelay || hystersisOpen && enterNextDelay) {
        event.persist();
        enterTimer.current = setTimeout(function () {
          handleOpen(event);
        }, hystersisOpen ? enterNextDelay : enterDelay);
      } else {
        handleOpen(event);
      }
    };
  };

  var _useIsFocusVisible = useIsFocusVisible(),
      isFocusVisible = _useIsFocusVisible.isFocusVisible,
      onBlurVisible = _useIsFocusVisible.onBlurVisible,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState3 = react.useState(false),
      childIsFocusVisible = _React$useState3[0],
      setChildIsFocusVisible = _React$useState3[1];

  var handleBlur = function handleBlur() {
    if (childIsFocusVisible) {
      setChildIsFocusVisible(false);
      onBlurVisible();
    }
  };

  var handleFocus = function handleFocus() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      // Workaround for https://github.com/facebook/react/issues/7769
      // The autoFocus of React might trigger the event before the componentDidMount.
      // We need to account for this eventuality.
      if (!childNode) {
        setChildNode(event.currentTarget);
      }

      if (isFocusVisible(event)) {
        setChildIsFocusVisible(true);
        handleEnter()(event);
      }

      var childrenProps = children.props;

      if (childrenProps.onFocus && forward) {
        childrenProps.onFocus(event);
      }
    };
  };

  var handleClose = function handleClose(event) {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(function () {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(function () {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  };

  var handleLeave = function handleLeave() {
    var forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return function (event) {
      var childrenProps = children.props;

      if (event.type === 'blur') {
        if (childrenProps.onBlur && forward) {
          childrenProps.onBlur(event);
        }

        handleBlur();
      }

      if (event.type === 'mouseleave' && childrenProps.onMouseLeave && event.currentTarget === childNode) {
        childrenProps.onMouseLeave(event);
      }

      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      event.persist();
      leaveTimer.current = setTimeout(function () {
        handleClose(event);
      }, leaveDelay);
    };
  };

  var detectTouchStart = function detectTouchStart(event) {
    ignoreNonTouchEvents.current = true;
    var childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  var handleTouchStart = function handleTouchStart(event) {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(touchTimer.current);
    event.persist();
    touchTimer.current = setTimeout(function () {
      handleEnter()(event);
    }, enterTouchDelay);
  };

  var handleTouchEnd = function handleTouchEnd(event) {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(function () {
      handleClose(event);
    }, leaveTouchDelay);
  };

  var handleUseRef = useForkRef(setChildNode, ref);
  var handleFocusRef = useForkRef(focusVisibleRef, handleUseRef); // can be removed once we drop support for non ref forwarding class components

  var handleOwnRef = react.useCallback(function (instance) {
    // #StrictMode ready
    setRef(handleFocusRef, reactDom.findDOMNode(instance));
  }, [handleFocusRef]);
  var handleRef = useForkRef(children.ref, handleOwnRef); // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  } // For accessibility and SEO concerns, we render the title to the DOM node when
  // the tooltip is hidden. However, we have made a tradeoff when
  // `disableHoverListener` is set. This title logic is disabled.
  // It's allowing us to keep the implementation size minimal.
  // We are open to change the tradeoff.


  var shouldShowNativeTitle = !open && !disableHoverListener;

  var childrenProps = _extends({
    'aria-describedby': open ? id : null,
    title: shouldShowNativeTitle && typeof title === 'string' ? title : null
  }, other, children.props, {
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  });

  var interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = handleEnter();
    childrenProps.onMouseLeave = handleLeave();

    if (interactive) {
      interactiveWrapperListeners.onMouseOver = handleEnter(false);
      interactiveWrapperListeners.onMouseLeave = handleLeave(false);
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = handleFocus();
    childrenProps.onBlur = handleLeave();

    if (interactive) {
      interactiveWrapperListeners.onFocus = handleFocus(false);
      interactiveWrapperListeners.onBlur = handleLeave(false);
    }
  }

  var mergedPopperProps = react.useMemo(function () {
    return deepmerge({
      popperOptions: {
        modifiers: {
          arrow: {
            enabled: Boolean(arrowRef),
            element: arrowRef
          }
        }
      }
    }, PopperProps);
  }, [arrowRef, PopperProps]);
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.cloneElement(children, childrenProps), /*#__PURE__*/react.createElement(PopperComponent, _extends({
    className: clsx(classes.popper, interactive && classes.popperInteractive, arrow && classes.popperArrow),
    placement: placement,
    anchorEl: childNode,
    open: childNode ? open : false,
    id: childrenProps['aria-describedby'],
    transition: true
  }, interactiveWrapperListeners, mergedPopperProps), function (_ref) {
    var placementInner = _ref.placement,
        TransitionPropsInner = _ref.TransitionProps;
    return /*#__PURE__*/react.createElement(TransitionComponent, _extends({
      timeout: theme.transitions.duration.shorter
    }, TransitionPropsInner, TransitionProps), /*#__PURE__*/react.createElement("div", {
      className: clsx(classes.tooltip, classes["tooltipPlacement".concat(capitalize(placementInner.split('-')[0]))], ignoreNonTouchEvents.current && classes.touch, arrow && classes.tooltipArrow)
    }, title, arrow ? /*#__PURE__*/react.createElement("span", {
      className: classes.arrow,
      ref: setArrowRef
    }) : null));
  }));
});
var Tooltip$1 = withStyles(styles$6, {
  name: 'MuiTooltip',
  flip: false
})(Tooltip);

function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  var length = prev.length;
  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = memoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params);
    });

    selector.resultFunc = resultFunc;
    selector.dependencies = dependencies;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = createSelectorCreator(defaultMemoize);

function chainPropTypes(propType1, propType2) {
  {
    return () => null;
  }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function J(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);}return n}function Q(e,t){return e===t||e!=e&&t!=t}function ee(e,t){for(var n=e.length;n--;)if(Q(e[n][0],t))return n;return -1}var te=Array.prototype.splice;function ne(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}ne.prototype.clear=function(){this.__data__=[],this.size=0;},ne.prototype.delete=function(e){var t=this.__data__,n=ee(t,e);return !(n<0)&&(n==t.length-1?t.pop():te.call(t,n,1),--this.size,!0)},ne.prototype.get=function(e){var t=this.__data__,n=ee(t,e);return n<0?void 0:t[n][1]},ne.prototype.has=function(e){return ee(this.__data__,e)>-1},ne.prototype.set=function(e,t){var n=this.__data__,r=ee(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this};var re="object"==typeof global&&global&&global.Object===Object&&global,oe="object"==typeof self&&self&&self.Object===Object&&self,ie=re||oe||Function("return this")(),le=ie.Symbol,ae=Object.prototype,se=ae.hasOwnProperty,ce=ae.toString,ue=le?le.toStringTag:void 0;var de=Object.prototype.toString;var pe=le?le.toStringTag:void 0;function ge(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":pe&&pe in Object(e)?function(e){var t=se.call(e,ue),n=e[ue];try{e[ue]=void 0;var r=!0;}catch(e){}var o=ce.call(e);return r&&(t?e[ue]=n:delete e[ue]),o}(e):function(e){return de.call(e)}(e)}function me(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function fe(e){if(!me(e))return !1;var t=ge(e);return "[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}var he,be=ie["__core-js_shared__"],ve=(he=/[^.]+$/.exec(be&&be.keys&&be.keys.IE_PROTO||""))?"Symbol(src)_1."+he:"";var we=Function.prototype.toString;function Ce(e){if(null!=e){try{return we.call(e)}catch(e){}try{return e+""}catch(e){}}return ""}var ye=/^\[object .+?Constructor\]$/,Oe=Function.prototype,Se=Object.prototype,Me=Oe.toString,xe=Se.hasOwnProperty,je=RegExp("^"+Me.call(xe).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Ie(e){return !(!me(e)||(t=e,ve&&ve in t))&&(fe(e)?je:ye).test(Ce(e));var t;}function ze(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return Ie(n)?n:void 0}var De=ze(ie,"Map"),_e=ze(Object,"create");var Re=Object.prototype.hasOwnProperty;var Pe=Object.prototype.hasOwnProperty;function Ee(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}function Fe(e,t){var n,r,o=e.__data__;return ("string"==(r=typeof(n=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof t?"string":"hash"]:o.map}function Te(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}Ee.prototype.clear=function(){this.__data__=_e?_e(null):{},this.size=0;},Ee.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},Ee.prototype.get=function(e){var t=this.__data__;if(_e){var n=t[e];return "__lodash_hash_undefined__"===n?void 0:n}return Re.call(t,e)?t[e]:void 0},Ee.prototype.has=function(e){var t=this.__data__;return _e?void 0!==t[e]:Pe.call(t,e)},Ee.prototype.set=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=_e&&void 0===t?"__lodash_hash_undefined__":t,this},Te.prototype.clear=function(){this.size=0,this.__data__={hash:new Ee,map:new(De||ne),string:new Ee};},Te.prototype.delete=function(e){var t=Fe(this,e).delete(e);return this.size-=t?1:0,t},Te.prototype.get=function(e){return Fe(this,e).get(e)},Te.prototype.has=function(e){return Fe(this,e).has(e)},Te.prototype.set=function(e,t){var n=Fe(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this};function Le(e){var t=this.__data__=new ne(e);this.size=t.size;}Le.prototype.clear=function(){this.__data__=new ne,this.size=0;},Le.prototype.delete=function(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n},Le.prototype.get=function(e){return this.__data__.get(e)},Le.prototype.has=function(e){return this.__data__.has(e)},Le.prototype.set=function(e,t){var n=this.__data__;if(n instanceof ne){var r=n.__data__;if(!De||r.length<199)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new Te(r);}return n.set(e,t),this.size=n.size,this};function ke(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new Te;++t<n;)this.add(e[t]);}function Ae(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(t(e[n],n,e))return !0;return !1}ke.prototype.add=ke.prototype.push=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this},ke.prototype.has=function(e){return this.__data__.has(e)};function Ge(e,t,n,r,o,i){var l=1&n,a=e.length,s=t.length;if(a!=s&&!(l&&s>a))return !1;var c=i.get(e);if(c&&i.get(t))return c==t;var u=-1,d=!0,p=2&n?new ke:void 0;for(i.set(e,t),i.set(t,e);++u<a;){var g=e[u],m=t[u];if(r)var f=l?r(m,g,u,t,e,i):r(g,m,u,e,t,i);if(void 0!==f){if(f)continue;d=!1;break}if(p){if(!Ae(t,(function(e,t){if(l=t,!p.has(l)&&(g===e||o(g,e,n,r,i)))return p.push(t);var l;}))){d=!1;break}}else if(g!==m&&!o(g,m,n,r,i)){d=!1;break}}return i.delete(e),i.delete(t),d}var Ne=ie.Uint8Array;function He(e){var t=-1,n=Array(e.size);return e.forEach((function(e,r){n[++t]=[r,e];})),n}function Ve(e){var t=-1,n=Array(e.size);return e.forEach((function(e){n[++t]=e;})),n}var $e=le?le.prototype:void 0,Be=$e?$e.valueOf:void 0;var We=Array.isArray;var Ue=Object.prototype.propertyIsEnumerable,Xe=Object.getOwnPropertySymbols,Ye=Xe?function(e){return null==e?[]:(e=Object(e),function(e,t){for(var n=-1,r=null==e?0:e.length,o=0,i=[];++n<r;){var l=e[n];t(l,n,e)&&(i[o++]=l);}return i}(Xe(e),(function(t){return Ue.call(e,t)})))}:function(){return []};function Ke(e){return null!=e&&"object"==typeof e}function Ze(e){return Ke(e)&&"[object Arguments]"==ge(e)}var qe=Object.prototype,Je=qe.hasOwnProperty,Qe=qe.propertyIsEnumerable,et=Ze(function(){return arguments}())?Ze:function(e){return Ke(e)&&Je.call(e,"callee")&&!Qe.call(e,"callee")};var tt="object"==typeof exports&&exports&&!exports.nodeType&&exports,nt=tt&&"object"==typeof module&&module&&!module.nodeType&&module,rt=nt&&nt.exports===tt?ie.Buffer:void 0,ot=(rt?rt.isBuffer:void 0)||function(){return !1},it=/^(?:0|[1-9]\d*)$/;function lt(e,t){var n=typeof e;return !!(t=null==t?9007199254740991:t)&&("number"==n||"symbol"!=n&&it.test(e))&&e>-1&&e%1==0&&e<t}function at(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}var st={};st["[object Float32Array]"]=st["[object Float64Array]"]=st["[object Int8Array]"]=st["[object Int16Array]"]=st["[object Int32Array]"]=st["[object Uint8Array]"]=st["[object Uint8ClampedArray]"]=st["[object Uint16Array]"]=st["[object Uint32Array]"]=!0,st["[object Arguments]"]=st["[object Array]"]=st["[object ArrayBuffer]"]=st["[object Boolean]"]=st["[object DataView]"]=st["[object Date]"]=st["[object Error]"]=st["[object Function]"]=st["[object Map]"]=st["[object Number]"]=st["[object Object]"]=st["[object RegExp]"]=st["[object Set]"]=st["[object String]"]=st["[object WeakMap]"]=!1;var ct,ut="object"==typeof exports&&exports&&!exports.nodeType&&exports,dt=ut&&"object"==typeof module&&module&&!module.nodeType&&module,pt=dt&&dt.exports===ut&&re.process,gt=function(){try{return pt&&pt.binding&&pt.binding("util")}catch(e){}}(),mt=gt&&gt.isTypedArray,ft=mt?(ct=mt,function(e){return ct(e)}):function(e){return Ke(e)&&at(e.length)&&!!st[ge(e)]},ht=Object.prototype.hasOwnProperty;function bt(e,t){var n=We(e),r=!n&&et(e),o=!n&&!r&&ot(e),i=!n&&!r&&!o&&ft(e),l=n||r||o||i,a=l?function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}(e.length,String):[],s=a.length;for(var c in e)!t&&!ht.call(e,c)||l&&("length"==c||o&&("offset"==c||"parent"==c)||i&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||lt(c,s))||a.push(c);return a}var vt=Object.prototype;var wt=function(e,t){return function(n){return e(t(n))}}(Object.keys,Object),Ct=Object.prototype.hasOwnProperty;function yt(e){if(n=(t=e)&&t.constructor,t!==("function"==typeof n&&n.prototype||vt))return wt(e);var t,n,r=[];for(var o in Object(e))Ct.call(e,o)&&"constructor"!=o&&r.push(o);return r}function Ot(e){return null!=(t=e)&&at(t.length)&&!fe(t)?bt(e):yt(e);var t;}function St(e){return function(e,t,n){var r=t(e);return We(e)?r:function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}(r,n(e))}(e,Ot,Ye)}var Mt=Object.prototype.hasOwnProperty;var xt=ze(ie,"DataView"),jt=ze(ie,"Promise"),It=ze(ie,"Set"),zt=ze(ie,"WeakMap"),Dt=Ce(xt),_t=Ce(De),Rt=Ce(jt),Pt=Ce(It),Et=Ce(zt),Ft=ge;(xt&&"[object DataView]"!=Ft(new xt(new ArrayBuffer(1)))||De&&"[object Map]"!=Ft(new De)||jt&&"[object Promise]"!=Ft(jt.resolve())||It&&"[object Set]"!=Ft(new It)||zt&&"[object WeakMap]"!=Ft(new zt))&&(Ft=function(e){var t=ge(e),n="[object Object]"==t?e.constructor:void 0,r=n?Ce(n):"";if(r)switch(r){case Dt:return "[object DataView]";case _t:return "[object Map]";case Rt:return "[object Promise]";case Pt:return "[object Set]";case Et:return "[object WeakMap]"}return t});var Tt=Ft,Lt=Object.prototype.hasOwnProperty;function kt(e,t,n,r,o,i){var l=We(e),a=We(t),s=l?"[object Array]":Tt(e),c=a?"[object Array]":Tt(t),u="[object Object]"==(s="[object Arguments]"==s?"[object Object]":s),d="[object Object]"==(c="[object Arguments]"==c?"[object Object]":c),p=s==c;if(p&&ot(e)){if(!ot(t))return !1;l=!0,u=!1;}if(p&&!u)return i||(i=new Le),l||ft(e)?Ge(e,t,n,r,o,i):function(e,t,n,r,o,i,l){switch(n){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return !1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return !(e.byteLength!=t.byteLength||!i(new Ne(e),new Ne(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return Q(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var a=He;case"[object Set]":var s=1&r;if(a||(a=Ve),e.size!=t.size&&!s)return !1;var c=l.get(e);if(c)return c==t;r|=2,l.set(e,t);var u=Ge(a(e),a(t),r,o,i,l);return l.delete(e),u;case"[object Symbol]":if(Be)return Be.call(e)==Be.call(t)}return !1}(e,t,s,n,r,o,i);if(!(1&n)){var g=u&&Lt.call(e,"__wrapped__"),m=d&&Lt.call(t,"__wrapped__");if(g||m){var f=g?e.value():e,h=m?t.value():t;return i||(i=new Le),o(f,h,n,r,i)}}return !!p&&(i||(i=new Le),function(e,t,n,r,o,i){var l=1&n,a=St(e),s=a.length;if(s!=St(t).length&&!l)return !1;for(var c=s;c--;){var u=a[c];if(!(l?u in t:Mt.call(t,u)))return !1}var d=i.get(e);if(d&&i.get(t))return d==t;var p=!0;i.set(e,t),i.set(t,e);for(var g=l;++c<s;){var m=e[u=a[c]],f=t[u];if(r)var h=l?r(f,m,u,t,e,i):r(m,f,u,e,t,i);if(!(void 0===h?m===f||o(m,f,n,r,i):h)){p=!1;break}g||(g="constructor"==u);}if(p&&!g){var b=e.constructor,v=t.constructor;b==v||!("constructor"in e)||!("constructor"in t)||"function"==typeof b&&b instanceof b&&"function"==typeof v&&v instanceof v||(p=!1);}return i.delete(e),i.delete(t),p}(e,t,n,r,o,i))}function At(e,t,n,r,o){return e===t||(null==e||null==t||!Ke(e)&&!Ke(t)?e!=e&&t!=t:kt(e,t,n,r,At,o))}function Gt(e,t){return At(e,t)}function Nt(e){return e instanceof Date}function Ht(e){return Array.isArray(e)}function Vt(e){return "string"==typeof e}function $t(e){return "number"==typeof e}function Bt(e){return "function"==typeof e}function Ut(e){return e.type||e.mode}function Xt(){return "alpha"in m}function Yt(e,t){var n,r;return Xt()?null===(n=m)||void 0===n?void 0:n.alpha(e,t):null===(r=m)||void 0===r?void 0:r.fade(e,t)}function Kt(){try{const e="__some_random_key_you_are_not_going_to_use__";return window.localStorage.setItem(e,e),window.localStorage.removeItem(e),!0}catch(e){return !1}}const Zt=makeStyles$1((e=>{const t="light"===Ut(e.palette)?lighten(Yt(e.palette.divider,1),.88):darken(Yt(e.palette.divider,1),.68),n={root:Object.assign(Object.assign({flex:1,boxSizing:"border-box",position:"relative",border:"1px solid "+t,borderRadius:e.shape.borderRadius,color:e.palette.text.primary},e.typography.body2),{outline:"none",height:"100%",display:"flex",flexDirection:"column","& *, & *::before, & *::after":{boxSizing:"inherit"},"&.MuiDataGrid-autoHeight":{height:"auto"},"& .MuiDataGrid-main":{position:"relative",flexGrow:1,display:"flex",flexDirection:"column"},"& .MuiDataGrid-overlay":{display:"flex",position:"absolute",top:0,left:0,right:0,bottom:0,alignSelf:"center",alignItems:"center",justifyContent:"center",backgroundColor:Yt(e.palette.background.default,e.palette.action.disabledOpacity)},"& .MuiDataGrid-toolbar":{display:"flex",alignItems:"center",padding:"4px 4px 0"},"& .MuiDataGrid-columnsContainer":{position:"absolute",top:0,left:0,right:0,overflow:"hidden",display:"flex",flexDirection:"column",borderBottom:"1px solid "+t},"& .MuiDataGrid-scrollArea":{position:"absolute",top:0,zIndex:101,width:20,bottom:0},"& .MuiDataGrid-scrollArea-left":{left:0},"& .MuiDataGrid-scrollArea-right":{right:0},"& .MuiDataGrid-colCellWrapper":{display:"flex",width:"100%",alignItems:"center",overflow:"hidden"},"& .MuiDataGrid-colCell, & .MuiDataGrid-cell":{WebkitTapHighlightColor:"transparent",lineHeight:null,padding:e.spacing(0,2)},"& .MuiDataGrid-colCell:focus, & .MuiDataGrid-cell:focus":{outline:"dotted",outlineWidth:1,outlineOffset:-2},"& .MuiDataGrid-colCellCheckbox, & .MuiDataGrid-cellCheckbox":{padding:0,justifyContent:"center",alignItems:"center"},"& .MuiDataGrid-colCell":{position:"relative",display:"flex",alignItems:"center"},"& .MuiDataGrid-colCellTitleContainer":{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",display:"inline-flex",flex:1},"& .MuiDataGrid-colCellNumeric .MuiDataGrid-iconButtonContainer":{paddingRight:5},"& .MuiDataGrid-colCellSortable":{cursor:"pointer"},"& .MuiDataGrid-sortIcon":{fontSize:18},"& .MuiDataGrid-colCellCenter .MuiDataGrid-colCellTitleContainer":{justifyContent:"center"},"& .MuiDataGrid-colCellRight .MuiDataGrid-colCellTitleContainer":{justifyContent:"flex-end"},"& .MuiDataGrid-colCellTitle":{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontWeight:e.typography.fontWeightMedium},"& .MuiDataGrid-colCellMoving":{backgroundColor:e.palette.action.hover},"& .MuiDataGrid-columnSeparator":{position:"absolute",right:-12,zIndex:100,display:"flex",flexDirection:"column",justifyContent:"center",color:t},"& .MuiDataGrid-columnSeparatorResizable":{cursor:"col-resize",touchAction:"none","&:hover":{color:e.palette.text.primary,"@media (hover: none)":{color:t}},"&.Mui-resizing":{color:e.palette.text.primary}},"& .MuiDataGrid-iconSeparator":{color:"inherit"},"& .MuiDataGrid-menuIcon":{visibility:"hidden",fontSize:20,marginRight:-6,display:"flex",alignItems:"center"},"& .MuiDataGrid-colCell:hover .MuiDataGrid-menuIcon, .MuiDataGrid-menuOpen":{visibility:"visible"},"& .MuiDataGrid-colCellWrapper.scroll .MuiDataGrid-colCell:last-child":{borderRight:"none"},"& .MuiDataGrid-dataContainer":{position:"relative",flexGrow:1,display:"flex",flexDirection:"column"},"& .MuiDataGrid-window":{position:"absolute",bottom:0,left:0,right:0,overflowX:"auto"},"& .MuiDataGrid-viewport":{position:"sticky",top:0,left:0,display:"flex",flexDirection:"column",overflow:"hidden"},"& .MuiDataGrid-row":{display:"flex",width:"fit-content","&:hover":{backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},"&.Mui-selected":{backgroundColor:Yt(e.palette.primary.main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:Yt(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:Yt(e.palette.primary.main,e.palette.action.selectedOpacity)}}}},"& .MuiDataGrid-cell":{display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",borderBottom:"1px solid "+t},"& .MuiDataGrid-colCellWrapper .MuiDataGrid-cell":{borderBottom:"none"},"& .MuiDataGrid-cellWithRenderer":{display:"flex",alignItems:"center"},"& .MuiDataGrid-withBorder":{borderRight:"1px solid "+t},"& .MuiDataGrid-cellLeft":{textAlign:"left"},"& .MuiDataGrid-cellRight":{textAlign:"right"},"& .MuiDataGrid-cellCenter":{textAlign:"center"},"& .MuiDataGrid-rowCount, & .MuiDataGrid-selectedRowCount":{alignItems:"center",display:"flex",margin:e.spacing(0,2)},"& .MuiDataGrid-footer":{display:"flex",justifyContent:"space-between",alignItems:"center",minHeight:52,"& .MuiDataGrid-selectedRowCount":{visibility:"hidden",width:0,height:0,[e.breakpoints.up("sm")]:{visibility:"visible",width:"auto",height:"auto"}}},"& .MuiDataGrid-colCell-dropZone .MuiDataGrid-colCell-draggable":{cursor:"move"},"& .MuiDataGrid-colCell-draggable":{display:"flex",width:"100%",justifyContent:"inherit"},"& .MuiDataGrid-colCell-dragging":{background:e.palette.background.paper,padding:"0 12px",borderRadius:e.shape.borderRadius,opacity:e.palette.action.disabledOpacity}})};if("dark"===Ut(e.palette)){const e="#202022",t="#585859",r="#838384";n.root=Object.assign(Object.assign({},n.root),{scrollbarColor:`${t} ${e}`,"& *::-webkit-scrollbar":{backgroundColor:e},"& *::-webkit-scrollbar-thumb":{borderRadius:8,backgroundColor:t,minHeight:24,border:"3px solid "+e},"& *::-webkit-scrollbar-thumb:focus":{backgroundColor:r},"& *::-webkit-scrollbar-thumb:active":{backgroundColor:r},"& *::-webkit-scrollbar-thumb:hover":{backgroundColor:r},"& *::-webkit-scrollbar-corner":{backgroundColor:e}});}return n}),{name:"MuiDataGrid"}),Jt=e=>e.columns.all,Qt=e=>e.columns.lookup,en=createSelector(Jt,Qt,((e,t)=>e.map((e=>t[e])))),tn=createSelector(en,(e=>e.filter((e=>null!=e.field&&!e.hide)))),nn=createSelector(tn,(e=>{const t=[];return {totalWidth:e.reduce(((e,n)=>(t.push(e),e+n.width)),0),positions:t}})),rn=createSelector(en,(e=>e.filter((e=>e.filterable)))),on=createSelector(rn,(e=>e.map((e=>e.field)))),ln=createSelector(tn,(e=>e.length)),an=createSelector(nn,(e=>e.totalWidth)),Kn=Kt()&&null!=window.localStorage.getItem("DEBUG"),Zn=()=>{},qn={debug:Zn,info:Zn,warn:Zn,error:Zn},Jn=["debug","info","warn","error"];function Qn(e,t,n=console){const r=Jn.indexOf(t);if(-1===r)throw new Error(`Material-UI: Log level ${t} not recognized.`);return Jn.reduce(((t,o,i)=>(t[o]=i>=r?(...t)=>{const[r,...i]=t;n[o](`Material-UI: ${e} - ${r}`,...i);}:Zn,t)),{})}const er=e=>t=>Qn(t,e);let tr;function nr(e,t=("error")){tr=Kn?er("debug"):e?Bt(e)?e:t?n=>Qn(n,t.toString(),e):null:t?er(t.toString()):null;}function rr(t){const{current:n}=react.useRef(tr?tr(t):qn);return n}function or(n,r,o){const i=rr("useApiMethod"),l=react.useRef(r);react.useEffect((()=>{l.current=r;}),[r]),react.useEffect((()=>{n.current.isInitialised&&Object.keys(r).forEach((e=>{n.current.hasOwnProperty(e)||(i.debug(`Adding ${o}.${e} to apiRef`),n.current[e]=(...t)=>l.current[e](...t));}));}),[r,o,n,i]);}const lr={rootGridLabel:"grid",noRowsLabel:"No rows",errorOverlayDefaultLabel:"An error occurred.",toolbarDensity:"Density",toolbarDensityLabel:"Density",toolbarDensityCompact:"Compact",toolbarDensityStandard:"Standard",toolbarDensityComfortable:"Comfortable",toolbarColumns:"Columns",toolbarColumnsLabel:"Show Column Selector",toolbarFilters:"Filters",toolbarFiltersLabel:"Show Filters",toolbarFiltersTooltipHide:"Hide Filters",toolbarFiltersTooltipShow:"Show Filters",toolbarFiltersTooltipActive:e=>e+" active filter(s)",columnsPanelTextFieldLabel:"Find column",columnsPanelTextFieldPlaceholder:"Column title",columnsPanelDragIconLabel:"Reorder Column",columnsPanelShowAllButton:"Show All",columnsPanelHideAllButton:"Hide All",filterPanelAddFilter:"Add Filter",filterPanelDeleteIconLabel:"Delete",filterPanelOperators:"Operators",filterPanelOperatorAnd:"And",filterPanelOperatorOr:"Or",filterPanelColumns:"Columns",filterPanelInputLabel:"Value",filterPanelInputPlaceholder:"Filter value",filterOperatorContains:"contains",filterOperatorEquals:"equals",filterOperatorStartsWith:"starts with",filterOperatorEndsWith:"ends with",filterOperatorIs:"is",filterOperatorNot:"is not",filterOperatorOnOrAfter:"is on or after",filterOperatorBefore:"is before",filterOperatorOnOrBefore:"is on or before",columnMenuLabel:"Menu",columnMenuShowColumns:"Show columns",columnMenuFilter:"Filter",columnMenuHideColumn:"Hide",columnMenuUnsort:"Unsort",columnMenuSortAsc:"Sort by Asc",columnMenuSortDesc:"Sort by Desc",columnHeaderFiltersTooltipActive:e=>e+" active filter(s)",columnHeaderFiltersLabel:"Show Filters",columnHeaderSortIconLabel:"Sort",footerRowSelected:e=>1!==e?e.toLocaleString()+" rows selected":e.toLocaleString()+" row selected",footerTotalRows:"Total Rows:",footerPaginationRowsPerPage:"Rows per page:"},ar=(e,t)=>{const n=e.indexOf(t);return t&&-1!==n&&n+1!==e.length?e[n+1]:e[0]},sr=e=>"desc"===e,cr=(e,t)=>null==e&&null!=t?-1:null==t&&null!=e?1:null==e&&null==t?0:null,ur=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=cr(o,i);return null!==l?l:"string"==typeof o?o.localeCompare(i.toString()):o-i},dr=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=cr(o,i);return null!==l?l:Number(o)-Number(i)},pr=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=cr(o,i);return null!==l?l:o>i?1:o<i?-1:0},gr=createSvgIcon(react.createElement("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"})),mr=createSvgIcon(react.createElement("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"})),fr=createSvgIcon(react.createElement("path",{d:"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"})),hr=createSvgIcon(react.createElement("path",{d:"M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"}));createSvgIcon(react.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}));createSvgIcon(react.createElement("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}));createSvgIcon(react.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}));const Cr=createSvgIcon(react.createElement("path",{d:"M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"})),yr=createSvgIcon(react.createElement("path",{d:"M11 19V5h2v14z"})),Or=createSvgIcon(react.createElement("path",{d:"M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"})),Sr=createSvgIcon(react.createElement("path",{d:"M21,8H3V4h18V8z M21,10H3v4h18V10z M21,16H3v4h18V16z"})),Mr=createSvgIcon(react.createElement("path",{d:"M4 18h17v-6H4v6zM4 5v6h17V5H4z"})),xr=createSvgIcon(react.createElement("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})),jr=createSvgIcon(react.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),Ir=createSvgIcon(react.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})),zr=createSvgIcon(react.createElement("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"})),Dr=createSvgIcon(react.createElement("path",{d:"M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}));function _r(i){const{item:l,applyValue:a,type:s,apiRef:c}=i,u=J(i,["item","applyValue","type","apiRef"]),d=react.useRef(),[p,g]=react.useState(l.value||""),[m,f]=react.useState(!1),h=react.useCallback((e=>{clearTimeout(d.current);const t=e.target.value;g(t),f(!0),d.current=setTimeout((()=>{a(Object.assign(Object.assign({},l),{value:t})),f(!1);}),500);}),[a,l]);react.useEffect((()=>()=>{clearTimeout(d.current);}),[]),react.useEffect((()=>{g(l.value||"");}),[l.value]);const b=m?{endAdornment:react.createElement(zr,null)}:u.InputProps;return react.createElement(TextField,Object.assign({label:c.current.getLocaleText("filterPanelInputLabel"),placeholder:c.current.getLocaleText("filterPanelInputPlaceholder"),value:p,onChange:h,type:s||"text",variant:"standard",InputProps:b,InputLabelProps:{shrink:!0}},u))}const Rr=()=>[{value:"contains",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(e.value,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:_r},{value:"equals",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{var r;const o=t.valueGetter?t.valueGetter(n):n.value;return 0===(null===(r=e.value)||void 0===r?void 0:r.localeCompare((null==o?void 0:o.toString())||"",void 0,{sensitivity:"base"}))}:null,InputComponent:_r},{value:"startsWith",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(`^${e.value}.*$`,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:_r},{value:"endsWith",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(`.*${e.value}$`,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:_r}],Pr={width:100,hide:!1,sortable:!0,resizable:!0,filterable:!0,sortComparator:ur,type:"string",align:"left",filterOperators:Rr()},Er=()=>[{label:"=",value:"=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)===Number(e.value)}:null,InputComponent:_r,InputComponentProps:{type:"number"}},{label:"!=",value:"!=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)!==Number(e.value)}:null,InputComponent:_r,InputComponentProps:{type:"number"}},{label:">",value:">",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)>Number(e.value)}:null,InputComponent:_r,InputComponentProps:{type:"number"}},{label:">=",value:">=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)>=Number(e.value)}:null,InputComponent:_r,InputComponentProps:{type:"number"}},{label:"<",value:"<",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)<Number(e.value)}:null,InputComponent:_r,InputComponentProps:{type:"number"}},{label:"<=",value:"<=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)<=Number(e.value)}:null,InputComponent:_r,InputComponentProps:{type:"number"}}],Fr=Object.assign(Object.assign({},Pr),{type:"number",align:"right",headerAlign:"right",sortComparator:dr,valueFormatter:({value:e})=>e&&$t(e)&&e.toLocaleString()||e,filterOperators:Er()}),Tr=e=>[{value:"is",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()===n:new Date(r.toString()).getTime()===n)}},InputComponent:_r,InputComponentProps:{type:e?"datetime-local":"date"}},{value:"not",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()!==n:new Date(r.toString()).getTime()!==n)}},InputComponent:_r,InputComponentProps:{type:e?"datetime-local":"date"}},{value:"after",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()>n:new Date(r.toString()).getTime()>n)}},InputComponent:_r,InputComponentProps:{type:e?"datetime-local":"date"}},{value:"onOrAfter",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()>=n:new Date(r.toString()).getTime()>=n)}},InputComponent:_r,InputComponentProps:{type:e?"datetime-local":"date"}},{value:"before",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()<n:new Date(r.toString()).getTime()<n)}},InputComponent:_r,InputComponentProps:{type:e?"datetime-local":"date"}},{value:"onOrBefore",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()<=n:new Date(r.toString()).getTime()<=n)}},InputComponent:_r,InputComponentProps:{type:e?"datetime-local":"date"}}];function Lr({value:e}){return Nt(e)?e.toLocaleDateString():e}function kr({value:e}){return Nt(e)?e.toLocaleString():e}const Ar=Object.assign(Object.assign({},Pr),{type:"date",sortComparator:pr,valueFormatter:Lr,filterOperators:Tr()}),Gr=Object.assign(Object.assign({},Pr),{type:"dateTime",sortComparator:pr,valueFormatter:kr,filterOperators:Tr(!0)}),Hr=()=>{const e={string:Object.assign({},Pr),number:Object.assign({},Fr),date:Object.assign({},Ar),dateTime:Object.assign({},Gr)};return e.__default__=Object.assign({},Pr),e};var Vr;!function(e){e.Compact="compact",e.Standard="standard",e.Comfortable="comfortable";}(Vr||(Vr={}));const $r={client:"client",server:"server"},Br={rowHeight:52,headerHeight:56,columnBuffer:2,rowsPerPageOptions:[25,50,100],pageSize:100,paginationMode:$r.client,sortingMode:$r.client,filterMode:$r.client,sortingOrder:["asc","desc",null],columnTypes:Hr(),density:Vr.Standard,localeText:lr};var Ur;!function(e){e.And="and",e.Or="or";}(Ur||(Ur={}));const Xr=()=>({items:[],linkOperator:Ur.And});function Kr(e){return {type:"SET_PAGE_ACTION",payload:{page:e}}}function Zr(e){return {type:"SET_PAGESIZE_ACTION",payload:{pageSize:e}}}function qr(e){return {type:"SET_PAGINATION_MODE_ACTION",payload:e}}function Jr(e){return {type:"SET_ROWCOUNT_ACTION",payload:e}}const Qr=(e,t)=>e&&t>0?Math.ceil(t/e):1,eo=(e,{page:t})=>e.page!==t?Object.assign(Object.assign({},e),{page:t}):e,to=(e,t)=>{const{pageSize:n}=t;if(e.pageSize===n)return e;return Object.assign(Object.assign({},e),{pageSize:n,pageCount:Qr(n,e.rowCount)})},no=(e,t)=>{const{totalRowCount:n}=t;if(e.rowCount!==n){const t=Qr(e.pageSize,n);return Object.assign(Object.assign({},e),{pageCount:t,rowCount:n,page:e.page>t?t:e.page})}return e},ro={page:0,pageCount:0,pageSize:0,paginationMode:"client",rowCount:0},oo=(e,t)=>{switch(t.type){case"SET_PAGE_ACTION":return eo(e,t.payload);case"SET_PAGESIZE_ACTION":return to(e,t.payload);case"SET_PAGINATION_MODE_ACTION":return Object.assign(Object.assign({},e),{paginationMode:t.payload.paginationMode});case"SET_ROWCOUNT_ACTION":return no(e,t.payload);default:throw new Error("Material-UI: Action not found - "+JSON.stringify(t))}};const so=()=>({rows:{idRowsLookup:{},allRows:[],totalRowCount:0},pagination:ro,options:Br,isScrolling:!1,columns:{all:[],lookup:{}},columnReorder:{dragCol:""},rendering:{realScroll:{left:0,top:0},renderContext:null,renderingZoneScroll:{left:0,top:0},virtualPage:0,virtualRowsCount:0,renderedSizes:null},containerSizes:null,scrollBar:{hasScrollX:!1,hasScrollY:!1,scrollBarSize:{x:0,y:0}},viewportSizes:{width:0,height:1},sorting:{sortedRows:[],sortModel:[]},keyboard:{cell:null,isMultipleKeyPressed:!1},selection:{},filter:Xr(),columnMenu:{open:!1},preferencePanel:{open:!1},visibleRows:{visibleRowsLookup:{}},density:{value:Br.density,rowHeight:Br.rowHeight,headerHeight:Br.headerHeight}}),co=e=>{const t=rr("useGridApi"),[,n]=react.useState();e.current.isInitialised||e.current.state||(t.info("Initialising state."),e.current.state=so(),e.current.forceUpdate=n);const i=react.useCallback((t=>t?e.current.state[t]:e.current.state),[e]),l=react.useCallback((t=>e.current.subscribeEvent("stateChange",t)),[e]),a=react.useCallback((t=>{let r;r=Bt(t)?t(e.current.state):t,e.current.state=r,n((()=>r));const o={api:e.current,state:r};e.current.publishEvent("stateChange",o);}),[e]);return or(e,{getState:i,onStateChange:l,setState:a},"StateApi"),e.current},uo=e=>{co(e);const t=react.useCallback((()=>e.current.forceUpdate((()=>e.current.state))),[e]),n=react.useCallback((t=>{const n=t(e.current.state),r=e.current.state!==n;if(e.current.state=n,r&&e.current.publishEvent){const t={api:e.current,state:n};e.current.publishEvent("stateChange",t);}}),[e]);return [e.current.state,n,t]},po=(e,t)=>{const[n]=uo(e);return t(n)};function yo(e){return e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth}function Oo(e,t){return e.closest("."+t)}function So(e){return null!=e&&e.classList.contains("MuiDataGrid-cell")}function Mo(e){return null!=e&&(So(e)||null!==Oo(e,"MuiDataGrid-cell"))}function jo(e){return e.getAttribute("data-id")}function Io(e){return e.getAttribute("data-field")}function zo(e,t){return e.querySelector(`[data-field="${t}"]`)}function Do(e){const t=e.getAttribute("data-field"),n=Oo(e,"MuiDataGrid-root");if(!n)throw new Error("Material-UI: The root element is not found.");return n.querySelectorAll(`:scope .MuiDataGrid-cell[data-field="${t}"]`)}function Eo(...e){return e.reduce(((e,t)=>t?(Ht(t)?e+=t.join(" "):Vt(t)?e+=t:"object"==typeof t&&(Object.keys(t).forEach((n=>{t[n]&&(e+=n+" ");})),e=e.trim()),e+=" "):e),"").trim()}const Fo=["Meta","Control"],To=e=>Fo.indexOf(e)>-1,ko=e=>" "===e,Ao=e=>0===e.indexOf("Arrow"),Go=e=>"Home"===e||"End"===e,No=e=>0===e.indexOf("Page"),Ho=e=>Go(e)||Ao(e)||No(e)||ko(e);function Vo(e,t){const n=Object.assign(Object.assign({},e),t),r={};return Object.entries(n).forEach((([e,t])=>{t=t.extendType?Object.assign(Object.assign(Object.assign({},n[t.extendType]),t),{type:e}):Object.assign(Object.assign(Object.assign({},n.__default__),t),{type:e}),r[e]=t;})),r}function $o(e){const t=Object.assign({},e);return Object.keys(e).forEach((n=>{e.hasOwnProperty(n)&&void 0===e[n]&&delete t[n];})),t}function Bo(e,t){t=$o(t);return Object.assign(Object.assign({},e),t)}function Uo({element:e,value:t,rowIndex:n,rowModel:r,colDef:o,api:i}){return {element:e,value:t,field:null==o?void 0:o.field,getValue:t=>{const o=i.getColumnFromField(t);return o&&o.valueGetter?o.valueGetter(Uo({value:r[t],colDef:o,rowIndex:n,element:e,rowModel:r,api:i})):r[t]},row:r,colDef:o,rowIndex:n,api:i}}function Xo({element:e,rowIndex:t,rowModel:n,api:r}){return {element:e,columns:r.getAllColumns(),getValue:e=>n[e],row:n,rowIndex:t,api:r}}function Ko(e){return useEventCallback(e)}const Zo="undefined"!=typeof window?react.useLayoutEffect:react.useEffect;function qo({props:e,name:t}){const n=Object.assign({},e),r=useTheme(),o=getThemeProps({theme:r,name:t,props:n}),i=o.theme||r,l="rtl"===i.direction;return Object.assign({theme:i,isRtl:l},o)}function Jo(e){const t=e.createElement("div");t.style.width="99px",t.style.height="99px",t.style.position="absolute",t.style.top="-9999px",t.style.overflow="scroll",e.body.appendChild(t);const n=t.offsetWidth-t.clientWidth;return e.body.removeChild(t),n}const Qo=react.createContext(void 0),ei=react.forwardRef((function(e,t){const{className:r}=e,o=J(e,["className"]),i=Zt(),l=react.useContext(Qo),a=po(l,ln),[c]=uo(l);return react.createElement("div",Object.assign({ref:t,className:Eo(i.root,r,{"MuiDataGrid-autoHeight":c.options.autoHeight}),role:"grid","aria-colcount":a,"aria-rowcount":c.rows.totalRowCount,tabIndex:0,"aria-label":l.current.getLocaleText("rootGridLabel"),"aria-multiselectable":!c.options.disableMultipleSelection},o))})),ti=e=>e.density;createSelector(ti,(e=>e.value));const ri=createSelector(ti,(e=>e.rowHeight)),oi=createSelector(ti,(e=>e.headerHeight)),ii=react.forwardRef((function(e,t){const{className:r,style:o}=e,i=J(e,["className","style"]),l=react.useContext(Qo),a=po(l,oi);return react.createElement("div",Object.assign({ref:t,className:Eo("MuiDataGrid-columnsContainer",r)},i,{style:Object.assign({minHeight:a,maxHeight:a,lineHeight:a+"px"},o)}))}));function li(e){var t,r,o,i;const{className:l}=e,a=J(e,["className"]),c=react.useContext(Qo),[u]=uo(c);return react.createElement("div",Object.assign({className:Eo("MuiDataGrid-dataContainer","data-container",l),style:{minHeight:null===(r=null===(t=u.containerSizes)||void 0===t?void 0:t.dataContainerSizes)||void 0===r?void 0:r.height,minWidth:null===(i=null===(o=u.containerSizes)||void 0===o?void 0:o.dataContainerSizes)||void 0===i?void 0:i.width}},a))}const ai=function(e){const{className:t}=e,r=J(e,["className"]);return react.createElement("div",Object.assign({className:Eo("MuiDataGrid-footer",t)},r))};function si(e){const{className:t,style:r}=e,o=J(e,["className","style"]),i=react.useContext(Qo),l=po(i,oi);return react.createElement("div",Object.assign({className:Eo("MuiDataGrid-overlay",t),style:Object.assign({top:l},r)},o))}const ci=e=>e.options,ui=(e,t,n)=>{if(!e.autoHeight)return n;let r=t&&t.dataContainerSizes.height||0;return r<e.rowHeight&&(r=2*e.rowHeight),e.headerHeight+r},di=react.forwardRef((function(e,r){const{className:o,size:i}=e,l=J(e,["className","size"]),a=react.useContext(Qo),{autoHeight:c}=po(a,ci),u=po(a,oi),[d]=uo(a);return react.useEffect((()=>{a.current.resize();}),[a]),react.createElement("div",{style:{width:i.width,height:ui(d.options,d.containerSizes,i.height)}},react.createElement("div",Object.assign({ref:r,className:Eo("MuiDataGrid-window",o)},l,{style:{top:u,overflowY:c?"hidden":"auto"}})))}));react.forwardRef((function(e,t){const{className:r,children:o}=e,i=J(e,["className","children"]);return o?react.createElement("div",Object.assign({ref:t,className:Eo("MuiDataGrid-toolbar",r)},i),o):null}));const gi=e=>e.rows,mi=createSelector(gi,(e=>e&&e.totalRowCount)),fi=createSelector(gi,(e=>e&&e.idRowsLookup)),hi=createSelector(gi,(e=>e.allRows.map((t=>e.idRowsLookup[t])))),bi=e=>e.sorting,vi=createSelector(bi,(e=>e.sortedRows)),wi=createSelector(vi,fi,hi,((e,t,n)=>e.length>0?e.map((e=>t[e])):n)),Ci=createSelector(bi,(e=>e.sortModel)),yi=createSelector(Ci,(e=>e.reduce(((t,n,r)=>(t[n.field]={sortDirection:n.sort,sortIndex:e.length>1?r+1:void 0},t)),{}))),Oi=e=>e.visibleRows,Si=createSelector(Oi,wi,((e,t)=>[...t].filter((t=>!1!==e.visibleRowsLookup[t.id])))),Mi=createSelector(Oi,mi,((e,t)=>null==e.visibleRows?t:e.visibleRows.length)),xi=e=>e.filter,ji=createSelector(xi,(e=>{var t;return null===(t=e.items)||void 0===t?void 0:t.filter((e=>{var t;return null!=e.value&&""!==(null===(t=e.value)||void 0===t?void 0:t.toString())}))}));createSelector(ji,(e=>e.length));const zi=createSelector(ji,(e=>e.reduce(((e,t)=>(e[t.columnField]?e[t.columnField].push(t):e[t.columnField]=[t],e)),{}))),Di=e=>e.selection,_i=createSelector(Di,(e=>Object.keys(e).length)),Ri=()=>{const e=react.useContext(Qo),o=po(e,Si),i=po(e,_i),l=po(e,mi),[a,c]=react.useState(i>0&&i!==l),[u,d]=react.useState(i===l||a);react.useEffect((()=>{const e=i>0&&i!==l;d(i===l||a),c(e);}),[a,l,i]);return react.createElement(D,{indeterminate:a,checked:u,onChange:(t,n)=>{d(n),e.current.selectRows(o.map((e=>e.id)),n);},className:"MuiDataGrid-checkboxInput",color:"primary",inputProps:{"aria-label":"Select All Rows checkbox"}})};Ri.displayName="HeaderCheckbox";const Pi=react.memo((e=>{const{row:t,getValue:r,field:o}=e,i=react.useContext(Qo);return react.createElement(D,{checked:!!r(o),onChange:(e,n)=>{i.current.selectRow(t.id,n,!0);},className:"MuiDataGrid-checkboxInput",color:"primary",inputProps:{"aria-label":"Select Row checkbox"}})}));Pi.displayName="CellCheckboxRenderer";const Ei={field:"__check__",headerName:"Checkbox Selection",description:"Select Multiple Rows",type:"checkboxSelection",width:48,align:"center",headerAlign:"center",resizable:!0,sortable:!1,filterable:!1,disableClickEventBubbling:!0,disableColumnMenu:!0,valueGetter:e=>e.api.getState().selection[e.row.id],renderHeader:e=>react.createElement(Ri,Object.assign({},e)),renderCell:e=>react.createElement(Pi,Object.assign({},e)),cellClassName:"MuiDataGrid-cellCheckbox",headerClassName:"MuiDataGrid-colCellCheckbox"},Fi=(e,t)=>t?e[t]:e.__default__;function Gi(e,t){const r="asc"===t?e.ColumnSortedAscendingIcon:e.ColumnSortedDescendingIcon;return react.createElement(r,{className:"MuiDataGrid-sortIcon"})}const Ni=react.memo((function(e){const{direction:t,index:r,hide:o}=e,i=react.useContext(Qo);return o||null==t?null:react.createElement("div",{className:"MuiDataGrid-iconButtonContainer"},react.createElement("div",null,null!=r&&react.createElement(_,{badgeContent:r,color:"default"},react.createElement(IconButton,{"aria-label":i.current.getLocaleText("columnHeaderSortIconLabel"),title:i.current.getLocaleText("columnHeaderSortIconLabel"),size:"small"},Gi(i.current.components,t))),null==r&&react.createElement(IconButton,{"aria-label":i.current.getLocaleText("columnHeaderSortIconLabel"),title:i.current.getLocaleText("columnHeaderSortIconLabel"),size:"small"},Gi(i.current.components,t))))})),Hi=react.forwardRef((function(e,t){const{className:r}=e,o=J(e,["className"]);return react.createElement("div",Object.assign({ref:t,className:Eo("MuiDataGrid-colCellTitle",r)},o))}));function Vi(o){const{label:i,description:l,columnWidth:a}=o,s=react.useRef(null),[c,u]=react.useState("");return react.useEffect((()=>{if(!l&&s&&s.current){const e=yo(s.current);u(e?i:"");}}),[s,a,l,i]),react.createElement(Tooltip$1,{title:l||c},react.createElement(Hi,{ref:s},i))}const $i=react.memo((function(e){const{resizable:t,resizing:r,height:i}=e,l=J(e,["resizable","resizing","height"]),a=react.useContext(Qo),{showColumnRightBorder:c}=po(a,ci),u=a.current.components.ColumnResizeIcon,d=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();}),[]);return react.createElement("div",Object.assign({className:Eo("MuiDataGrid-columnSeparator",{"MuiDataGrid-columnSeparatorResizable":t,"Mui-resizing":r}),style:{minHeight:i,opacity:c?0:1}},l,{onClick:d}),react.createElement(u,{className:"MuiDataGrid-iconSeparator"}))})),Bi=e=>e.columnMenu;function Wi(e){const{column:t}=e,r=react.useContext(Qo),i=po(r,Bi),l=r.current.components.ColumnMenuIcon,a=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();const n=r.current.getState().columnMenu;n.open&&n.field===t.field?r.current.hideColumnMenu():r.current.showColumnMenu(t.field);}),[r,t.field]),c=i.open&&i.field===t.field;return react.createElement("div",{className:Eo("MuiDataGrid-menuIcon",{"MuiDataGrid-menuOpen":c})},react.createElement(IconButton,{className:"MuiDataGrid-menuIconButton","aria-label":r.current.getLocaleText("columnMenuLabel"),title:r.current.getLocaleText("columnMenuLabel"),size:"small",onClick:a},react.createElement(l,{fontSize:"small"})))}const Ui=e=>e.preferencePanel;var Yi;function Ki(e){const{counter:t}=e,r=react.useContext(Qo),i=po(r,ci),l=po(r,Ui),a=r.current.components.ColumnFilteredIcon,c=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();const{open:t,openedPanelValue:n}=l;t&&n===Yi.filters?r.current.hideFilterPanel():r.current.showFilterPanel();}),[r,l]);if(!t||i.disableColumnFilter)return null;const u=react.createElement(IconButton,{onClick:c,color:"default","aria-label":r.current.getLocaleText("columnHeaderFiltersLabel"),size:"small"},react.createElement(a,{fontSize:"small"}));return react.createElement(Tooltip$1,{title:r.current.getLocaleText("columnHeaderFiltersTooltipActive")(t),enterDelay:1e3},react.createElement("div",{className:"MuiDataGrid-iconButtonContainer"},react.createElement("div",null,t>1&&react.createElement(_,{badgeContent:t,color:"default"},u),1===t&&u)))}!function(e){e.filters="filters",e.columns="columns";}(Yi||(Yi={}));const Zi=({column:e,colIndex:t,isDragging:r,isResizing:i,sortDirection:l,sortIndex:a,options:c,filterItemsCounter:d})=>{const p=react.useContext(Qo),g=po(p,oi),{disableColumnReorder:m,showColumnRightBorder:f,disableColumnResize:h,disableColumnMenu:b}=c,v=null!=l,w="number"===e.type;let C=null;e.renderHeader&&(C=e.renderHeader({api:p.current,colDef:e,colIndex:t,field:e.field}));const y=react.useCallback((t=>p.current.onColItemDragStart(e,t.currentTarget)),[p,e]),O=react.useCallback((e=>p.current.onColItemDragEnter(e)),[p]),S=react.useCallback((t=>p.current.onColItemDragOver(e,{x:t.clientX,y:t.clientY})),[p,e]),M=react.useCallback((()=>{const n={field:e.field,colDef:e,colIndex:t,api:p.current};p.current.publishEvent("columnClick",n);}),[p,t,e]),x=Eo("MuiDataGrid-colCell",e.headerClassName,"center"===e.headerAlign&&"MuiDataGrid-colCellCenter","right"===e.headerAlign&&"MuiDataGrid-colCellRight",{"MuiDataGrid-colCellSortable":e.sortable,"MuiDataGrid-colCellMoving":r,"MuiDataGrid-colCellSorted":v,"MuiDataGrid-colCellNumeric":w,"MuiDataGrid-withBorder":f}),j={draggable:!m,onDragStart:y,onDragEnter:O,onDragOver:S},I=e.width;let z;null!=l&&(z={"aria-sort":"asc"===l?"ascending":"descending"});const D=react.createElement(react.Fragment,null,react.createElement(Ni,{direction:l,index:a,hide:e.hideSortIcons}),react.createElement(Ki,{counter:d})),_=react.createElement(Wi,{column:e});return react.createElement("div",Object.assign({className:x,key:e.field,"data-field":e.field,style:{width:I,minWidth:I,maxWidth:I},role:"columnheader",tabIndex:-1,"aria-colindex":t+1},z,{onClick:M}),react.createElement("div",Object.assign({className:"MuiDataGrid-colCell-draggable"},j),!b&&w&&!e.disableColumnMenu&&_,react.createElement("div",{className:"MuiDataGrid-colCellTitleContainer"},w&&D,C||react.createElement(Vi,{label:e.headerName||e.field,description:e.description,columnWidth:I}),!w&&D),!w&&!b&&!e.disableColumnMenu&&_),react.createElement($i,{resizable:!h&&!!e.resizable,resizing:i,height:g,onMouseDown:null==p?void 0:p.current.startResizeOnMouseDown}))},qi=e=>e.rendering,Ji=react.memo((r=>{const{align:o,children:i,colIndex:l,cssClass:a,hasFocus:s,field:c,formattedValue:u,rowIndex:d,showRightBorder:p,tabIndex:g,value:m,width:f,height:h}=r,b=u||m,v=react.useRef(null);return react.useEffect((()=>{s&&v.current&&v.current.focus();}),[s]),react.createElement("div",{ref:v,className:Eo("MuiDataGrid-cell",a,"MuiDataGrid-cell"+capitalize(o),{"MuiDataGrid-withBorder":p}),role:"cell","data-value":m,"data-field":c,"data-rowindex":d,"aria-colindex":l,style:{minWidth:f,maxWidth:f,lineHeight:h-1+"px",minHeight:h,maxHeight:h},tabIndex:g},i||(null==b?void 0:b.toString()))}));Ji.displayName="GridCell";const Qi=react.memo((({width:e,height:t})=>e&&t?react.createElement(Ji,{width:e,height:t,align:"left"}):null));Qi.displayName="LeftEmptyCell";const el=react.memo((({width:e,height:t})=>e&&t?react.createElement(Ji,{width:e,height:t,align:"left"}):null));function tl(e,n,r){const o=rr("useApiEventHandler");react.useEffect((()=>{if(r&&n)return e.current.subscribeEvent(n,r)}),[e,o,n,r]);}el.displayName="RightEmptyCell";const nl=react.memo((function(i){const{scrollDirection:l}=i,a=react.useRef(null),c=react.useContext(Qo),u=react.useRef(),[d,p]=react.useState(!1),g=react.useRef({left:0,top:0}),m=react.useCallback((e=>{g.current=e;}),[]),f=react.useCallback((e=>{let t;if("left"===l)t=e.clientX-a.current.getBoundingClientRect().right;else {if("right"!==l)throw new Error("wrong dir");t=Math.max(1,e.clientX-a.current.getBoundingClientRect().left);}t=1.5*(t-1)+1,clearTimeout(u.current),u.current=setTimeout((()=>{c.current.scroll({left:g.current.left+t,top:g.current.top});}));}),[l,c]);react.useEffect((()=>()=>{clearTimeout(u.current);}),[]);const h=react.useCallback((()=>{p((e=>!e));}),[]);return tl(c,"scrolling",m),tl(c,"colReordering:dragStart",h),tl(c,"colReordering:dragStop",h),d?react.createElement("div",{ref:a,className:Eo("MuiDataGrid-scrollArea","MuiDataGrid-scrollArea-"+l),onDragOver:f}):null})),rl=e=>e.keyboard,ol=createSelector(rl,(e=>e.cell)),il=createSelector(rl,(e=>e.isMultipleKeyPressed)),ll=react.forwardRef((({height:e,width:t,children:r},o)=>react.createElement("div",{ref:o,className:"rendering-zone",style:{maxHeight:e,width:t}},r)));ll.displayName="RenderingZone";const al=({selected:e,id:t,className:r,rowIndex:o,children:i})=>{const l=o+2,a=react.useContext(Qo),c=po(a,ri);return react.createElement("div",{key:t,"data-id":t,"data-rowindex":o,role:"row",className:Eo("MuiDataGrid-row",r,{"Mui-selected":e}),"aria-rowindex":l,"aria-selected":e,style:{maxHeight:c,minHeight:c}},i)};al.displayName="Row";const sl=react.memo((e=>{const{columns:t,domIndex:r,firstColIdx:o,hasScroll:i,lastColIdx:l,row:a,rowIndex:c,scrollSize:d,cellFocus:p,showCellRightBorder:g}=e,m=react.useContext(Qo),f=po(m,ri),h=t.slice(o,l+1).map(((n,l)=>{const s=o+l===t.length-1,u=s&&i.y&&i.x?n.width-d:n.width,h=s&&i.x&&!i.y,b=s?!h&&!e.extendRowFullWidth:g;let v=a[n.field];const w=Uo({rowModel:a,colDef:n,rowIndex:c,value:v,api:m.current});let C={cssClass:""};if(n.cellClassName&&(C=Bt(n.cellClassName)?{cssClass:n.cellClassName(w)}:{cssClass:Eo(n.cellClassName)}),n.cellClassRules){const e=(y=n.cellClassRules,O=w,Object.entries(y).reduce(((e,t)=>e+((Bt(t[1])?t[1](O):t[1])?t[0]+" ":"")),""));C={cssClass:`${C.cssClass} ${e}`};}var y,O;let S=null;n.renderCell&&(S=n.renderCell(w),C={cssClass:C.cssClass+" MuiDataGrid-cellWithRenderer"}),n.valueGetter&&(v=n.valueGetter(w),w.value=v);let M={};n.valueFormatter&&(M={formattedValue:n.valueFormatter(w)});return Object.assign(Object.assign(Object.assign(Object.assign({value:v,field:n.field,width:u,height:f,showRightBorder:b},M),{align:n.align||"left"}),C),{tabIndex:0===r&&0===l?0:-1,rowIndex:c,colIndex:l+o,children:S,hasFocus:null!==p&&p.rowIndex===c&&p.colIndex===l+o})}));return react.createElement(react.Fragment,null,h.map((e=>react.createElement(Ji,Object.assign({key:e.field},e)))))}));sl.displayName="RowCells";const cl=({height:e,width:t,children:r})=>react.createElement("div",{className:"MuiDataGrid-viewport",style:{minWidth:t,maxWidth:t,minHeight:e,maxHeight:e}},r);cl.displayName="StickyContainer";const ul=e=>e.containerSizes,dl=e=>e.viewportSizes,pl=e=>e.scrollBar,gl=react.forwardRef(((e,t)=>{const r=react.useContext(Qo),o=po(r,ci),i=po(r,ul),l=po(r,dl),a=po(r,pl),c=po(r,tn),u=po(r,qi),d=po(r,ol),p=po(r,Di),g=po(r,Si),m=po(r,ri);return react.createElement(li,null,react.createElement(cl,Object.assign({},l),react.createElement(ll,Object.assign({ref:t},(null==i?void 0:i.renderingZone)||{width:0,height:0}),(()=>{if(null==u.renderContext)return null;return g.slice(u.renderContext.firstRowIdx,u.renderContext.lastRowIdx).map(((e,t)=>react.createElement(al,{className:(u.renderContext.firstRowIdx+t)%2==0?"Mui-even":"Mui-odd",key:e.id,id:e.id,selected:!!p[e.id],rowIndex:u.renderContext.firstRowIdx+t},react.createElement(Qi,{width:u.renderContext.leftEmptyWidth,height:m}),react.createElement(sl,{columns:c,row:e,firstColIdx:u.renderContext.firstColIdx,lastColIdx:u.renderContext.lastColIdx,hasScroll:{y:a.hasScrollY,x:a.hasScrollX},scrollSize:o.scrollbarSize,showCellRightBorder:!!o.showCellRightBorder,extendRowFullWidth:!o.disableExtendRowFullWidth,rowIndex:u.renderContext.firstRowIdx+t,cellFocus:d,domIndex:t}),react.createElement(el,{width:u.renderContext.rightEmptyWidth,height:m}))))})())))}));gl.displayName="Viewport";const ml=e=>e.columnReorder,fl=createSelector(ml,(e=>e.dragCol));function hl(e){const{columns:t}=e,[i,l]=react.useState(""),a=react.useContext(Qo),c=po(a,ci),d=po(a,yi),p=po(a,zi),g=po(a,fl),m=react.useCallback((e=>{l(e.field);}),[]),f=react.useCallback((()=>{l("");}),[]);tl(a,"colResizing:start",m),tl(a,"colResizing:stop",f);const h=t.map(((e,t)=>react.createElement(Zi,Object.assign({key:e.field},d[e.field],{filterItemsCounter:p[e.field]&&p[e.field].length,options:c,isDragging:e.field===g,column:e,colIndex:t,isResizing:i===e.field}))));return react.createElement(react.Fragment,null,h)}const bl=e=>e.scrollBar,vl=react.forwardRef((function(e,t){var r;const o=react.useContext(Qo),i=po(o,tn),{disableColumnReorder:l}=po(o,ci),a=po(o,ul),c=po(o,oi),p=po(o,qi).renderContext,{hasScrollX:g}=po(o,bl),m="MuiDataGrid-colCellWrapper "+(g?"scroll":""),f=react.useMemo((()=>null==p?[]:i.slice(p.firstColIdx,p.lastColIdx+1)),[i,p]),h=!l&&o?e=>o.current.onColHeaderDragOver(e,t):void 0;return react.createElement(react.Fragment,null,react.createElement(nl,{scrollDirection:"left"}),react.createElement("div",{ref:t,className:m,"aria-rowindex":1,role:"row",style:{minWidth:null===(r=null==a?void 0:a.totalSizes)||void 0===r?void 0:r.width},onDragOver:h},react.createElement(Qi,{width:null==p?void 0:p.leftEmptyWidth,height:c}),react.createElement(hl,{columns:f}),react.createElement(el,{width:null==p?void 0:p.rightEmptyWidth,height:c})),react.createElement(nl,{scrollDirection:"right"}))})),wl=({onClick:e})=>{const t=react.useContext(Qo),r=po(t,ci),i=react.useCallback((n=>{e(n),t.current.showPreferences(Yi.columns);}),[t,e]);return r.disableColumnSelector?null:react.createElement(E,{onClick:i},t.current.getLocaleText("columnMenuShowColumns"))},Cl=({column:e,onClick:t})=>{const r=react.useContext(Qo),i=po(r,ci),l=react.useCallback((n=>{t(n),r.current.showFilterPanel(null==e?void 0:e.field);}),[r,null==e?void 0:e.field,t]);return i.disableColumnFilter||!(null==e?void 0:e.filterable)?null:react.createElement(E,{onClick:l},r.current.getLocaleText("columnMenuFilter"))},yl={"bottom-start":"top left","bottom-end":"top right"},Ol=e=>{var{open:t,target:r,onClickAway:o,children:i,position:l}=e,a=J(e,["open","target","onClickAway","children","position"]);return react.createElement(Popper,Object.assign({open:t,anchorEl:r,transition:!0,placement:l},a),(({TransitionProps:e,placement:t})=>react.createElement(Grow,Object.assign({},e,{style:{transformOrigin:yl[t]}}),react.createElement(Paper,null,react.createElement(ClickAwayListener,{onClickAway:o},react.createElement("div",null,i))))))},Sl=e=>e.columnMenu;function Ml({ContentComponent:i,contentComponentProps:l}){const a=react.useContext(Qo),c=po(a,Sl),u=c.field?null==a?void 0:a.current.getColumnFromField(c.field):null,[d,p]=react.useState(null),g=react.useRef(),m=react.useRef(),f=react.useCallback((()=>{null==a||a.current.hideColumnMenu();}),[a]),h=react.useCallback((()=>{g.current=setTimeout(f,50);}),[f]),b=react.useCallback((({open:e,field:t})=>{if(t&&e){m.current=setTimeout((()=>clearTimeout(g.current)),0);const e=zo(a.current.rootElementRef.current,t).querySelector(".MuiDataGrid-menuIconButton");p(e);}}),[a]);return react.useEffect((()=>{b(c);}),[c,b]),react.useEffect((()=>()=>{clearTimeout(g.current),clearTimeout(m.current);}),[]),d&&u?react.createElement(Ol,{placement:"bottom-"+("right"===u.align?"start":"end"),open:c.open,target:d,onClickAway:h},react.createElement(i,Object.assign({currentColumn:u,hideMenu:f,open:c.open},l))):null}const xl=({column:r,onClick:i})=>{const l=react.useContext(Qo),a=react.useRef(),c=react.useCallback((e=>{i(e),a.current=setTimeout((()=>{l.current.toggleColumn(null==r?void 0:r.field,!0);}),10);}),[l,null==r?void 0:r.field,i]);return react.useEffect((()=>()=>clearTimeout(a.current)),[]),r?react.createElement(E,{onClick:c},l.current.getLocaleText("columnMenuHideColumn")):null},jl=({column:e,onClick:t})=>{const r=react.useContext(Qo),i=po(r,Ci),l=react.useMemo((()=>{if(!e)return null;const t=i.find((t=>t.field===e.field));return null==t?void 0:t.sort}),[e,i]),a=react.useCallback((n=>{t(n);const o=n.currentTarget.getAttribute("data-value")||null;null==r||r.current.sortColumn(e,o);}),[r,e,t]);return e&&e.sortable?react.createElement(react.Fragment,null,react.createElement(E,{onClick:a,disabled:null==l},r.current.getLocaleText("columnMenuUnsort")),react.createElement(E,{onClick:a,"data-value":"asc",disabled:"asc"===l},r.current.getLocaleText("columnMenuSortAsc")),react.createElement(E,{onClick:a,"data-value":"desc",disabled:"desc"===l},r.current.getLocaleText("columnMenuSortDesc"))):null};function Il(e){const{hideMenu:t,currentColumn:r}=e,i=react.useCallback((e=>{"Tab"===e.key&&(e.preventDefault(),t());}),[t]);return react.createElement(MenuList,{id:"menu-list-grow",onKeyDown:i},react.createElement(jl,{onClick:t,column:r}),react.createElement(Cl,{onClick:t,column:r}),react.createElement(xl,{onClick:t,column:r}),react.createElement(wl,{onClick:t,column:r}))}const zl=makeStyles$1((()=>({root:{display:"flex",flexDirection:"column",overflow:"auto",flex:"1 1",maxHeight:400}})),{name:"MuiDataGridPanelContent"});function Dl(e){const t=zl(),{className:r}=e,o=J(e,["className"]);return react.createElement("div",Object.assign({className:Eo(t.root,r)},o))}const _l=makeStyles$1((()=>({root:{padding:4,display:"flex",justifyContent:"space-between"}})),{name:"MuiDataGridPanelFooter"});function Rl(e){const t=_l(),{className:r}=e,o=J(e,["className"]);return react.createElement("div",Object.assign({className:Eo(t.root,r)},o))}const Pl=makeStyles$1((e=>({root:{padding:e.spacing(1)}})),{name:"MuiDataGridPanelHeader"});function El(e){const t=Pl(),{className:r}=e,o=J(e,["className"]);return react.createElement("div",Object.assign({className:Eo(t.root,r)},o))}const Fl=makeStyles$1((()=>({root:{display:"flex",flexDirection:"column",flex:1}})),{name:"MuiDataGridPanelWrapper"});function Tl(e){const t=Fl(),{className:r}=e,o=J(e,["className"]);return react.createElement("div",Object.assign({className:Eo(t.root,r)},o))}const Ll=makeStyles$1({container:{padding:"8px 0px 8px 8px"},column:{display:"flex",justifyContent:"space-between",padding:"1px 8px 1px 7px"},switch:{marginRight:4},dragIcon:{justifyContent:"flex-end"}},{name:"MuiDataGridColumnsPanel"});function kl(){const i=Ll(),l=react.useContext(Qo),a=react.useRef(null),c=po(l,en),{disableColumnReorder:u}=po(l,ci),[p,g]=react.useState(""),m=react.useCallback((e=>{const{name:t}=e.target;l.current.toggleColumn(t);}),[l]),f=react.useCallback((e=>{l.current.updateColumns(c.map((t=>(t.hide=e,t))));}),[l,c]),h=react.useCallback((()=>f(!1)),[f]),b=react.useCallback((()=>f(!0)),[f]),v=react.useCallback((e=>{g(e.target.value);}),[]),w=react.useMemo((()=>p?c.filter((e=>e.field.toLowerCase().indexOf(p.toLowerCase())>-1||e.headerName&&e.headerName.toLowerCase().indexOf(p.toLowerCase())>-1)):c),[c,p]);return react.useEffect((()=>{a.current.focus();}),[]),react.createElement(Tl,null,react.createElement(El,null,react.createElement(TextField,{label:l.current.getLocaleText("columnsPanelTextFieldLabel"),placeholder:l.current.getLocaleText("columnsPanelTextFieldPlaceholder"),inputRef:a,value:p,onChange:v,variant:"standard",fullWidth:!0})),react.createElement(Dl,null,react.createElement("div",{className:i.container},w.map((e=>react.createElement("div",{key:e.field,className:i.column},react.createElement(H,{control:react.createElement(G,{className:i.switch,checked:!e.hide,onClick:m,name:e.field,color:"primary",size:"small"}),label:e.headerName||e.field}),!u&&react.createElement(IconButton,{draggable:!0,className:i.dragIcon,"aria-label":l.current.getLocaleText("columnsPanelDragIconLabel"),title:l.current.getLocaleText("columnsPanelDragIconLabel"),size:"small",disabled:!0},react.createElement(Dr,null))))))),react.createElement(Rl,null,react.createElement(Button,{onClick:b,color:"primary"},l.current.getLocaleText("columnsPanelHideAllButton")),react.createElement(Button,{onClick:h,color:"primary"},l.current.getLocaleText("columnsPanelShowAllButton"))))}const Al=makeStyles$1((e=>({root:{backgroundColor:e.palette.background.paper,minWidth:300,maxHeight:450,display:"flex"}})),{name:"MuiDataGridPanel"});function Gl(e){var t,r;const i=Al(),{children:l,open:a}=e,c=react.useContext(Qo),u=react.useCallback((()=>{c.current.hidePreferences();}),[c]);let d;return c.current&&(null===(t=c.current.columnHeadersElementRef)||void 0===t?void 0:t.current)&&(d=null===(r=null==c?void 0:c.current.columnHeadersElementRef)||void 0===r?void 0:r.current),d?react.createElement(Popper,{placement:"bottom-start",open:a,anchorEl:d,modifiers:Xt()?[{name:"flip",enabled:!1}]:{flip:{enabled:!1}}},react.createElement(ClickAwayListener,{onClickAway:u},react.createElement(Paper,{className:i.root,elevation:8},l))):null}const Nl=e=>{const t=po(e,ci),n=po(e,hi),r=po(e,tn),[o]=uo(e);return react.useMemo((()=>e&&{state:o,rows:n,columns:r,options:t,api:e,rootElement:e.current.rootElementRef}),[o,n,r,t,e])};function Hl(){var e,t,r;const o=react.useContext(Qo),i=po(o,en),l=po(o,ci),a=po(o,Ui),c=Nl(o),u=a.openedPanelValue===Yi.columns,d=!a.openedPanelValue||!u,p=o.current.components.ColumnsPanel,g=o.current.components.FilterPanel,m=o.current.components.Panel;return react.createElement(m,Object.assign({open:i.length>0&&a.open},c,null===(e=null==o?void 0:o.current.componentsProps)||void 0===e?void 0:e.panel),!l.disableColumnSelector&&u&&react.createElement(p,Object.assign({},c,null===(t=null==o?void 0:o.current.componentsProps)||void 0===t?void 0:t.columnsPanel)),!l.disableColumnFilter&&d&&react.createElement(g,Object.assign({},c,null===(r=null==o?void 0:o.current.componentsProps)||void 0===r?void 0:r.filterPanel)))}const Vl=makeStyles$1((()=>({root:{display:"flex",justifyContent:"space-around",padding:8},linkOperatorSelect:{width:60},columnSelect:{width:150},operatorSelect:{width:120},filterValueInput:{width:190},closeIcon:{flexShrink:0,justifyContent:"flex-end",marginRight:6,marginBottom:2}})),{name:"MuiDataGridFilterForm"});function $l(e){var t;const{item:i,hasMultipleFilters:l,deleteFilter:a,applyFilterChanges:c,multiFilterOperator:u,showMultiFilterOperators:d,disableMultiFilterOperator:p,applyMultiFilterOperatorChanges:g}=e,m=Vl(),f=react.useContext(Qo),h=po(f,rn),[b,v]=react.useState((()=>i.columnField?f.current.getColumnFromField(i.columnField):null)),[w,C]=react.useState((()=>{var e;return i.operatorValue&&b&&(null===(e=b.filterOperators)||void 0===e?void 0:e.find((e=>e.value===i.operatorValue)))||null})),y=react.useCallback((e=>{const t=e.target.value,n=f.current.getColumnFromField(t),r=n.filterOperators[0];C(r),v(n),c(Object.assign(Object.assign({},i),{value:void 0,columnField:t,operatorValue:r.value}));}),[f,c,i]),O=react.useCallback((e=>{var t;const n=e.target.value;c(Object.assign(Object.assign({},i),{operatorValue:n}));const r=(null===(t=b.filterOperators)||void 0===t?void 0:t.find((e=>e.value===n)))||null;C(r);}),[c,b,i]),S=react.useCallback((e=>{const t=e.target.value===Ur.And.toString()?Ur.And:Ur.Or;g(t);}),[g]),M=react.useCallback((()=>{a(i);}),[a,i]);return react.createElement("div",{className:m.root},react.createElement($,{className:m.closeIcon},react.createElement(IconButton,{"aria-label":f.current.getLocaleText("filterPanelDeleteIconLabel"),title:f.current.getLocaleText("filterPanelDeleteIconLabel"),onClick:M,size:"small"},react.createElement(jr,{fontSize:"small"}))),react.createElement($,{className:m.linkOperatorSelect,style:{display:l?"block":"none",visibility:d?"visible":"hidden"}},react.createElement(B,{id:"columns-filter-operator-select-label"},f.current.getLocaleText("filterPanelOperators")),react.createElement(W,{labelId:"columns-filter-operator-select-label",id:"columns-filter-operator-select",value:u,onChange:S,disabled:!!p,native:!0},react.createElement("option",{key:Ur.And.toString(),value:Ur.And.toString()},f.current.getLocaleText("filterPanelOperatorAnd")),react.createElement("option",{key:Ur.Or.toString(),value:Ur.Or.toString()},f.current.getLocaleText("filterPanelOperatorOr")))),react.createElement($,{className:m.columnSelect},react.createElement(B,{id:"columns-filter-select-label"},f.current.getLocaleText("filterPanelColumns")),react.createElement(W,{labelId:"columns-filter-select-label",id:"columns-filter-select",value:i.columnField||"",onChange:y,native:!0},h.map((e=>react.createElement("option",{key:e.field,value:e.field},e.headerName||e.field))))),react.createElement($,{className:m.operatorSelect},react.createElement(B,{id:"columns-operators-select-label"},f.current.getLocaleText("filterPanelOperators")),react.createElement(W,{labelId:"columns-operators-select-label",id:"columns-operators-select",value:i.operatorValue,onChange:O,native:!0},null===(t=null==b?void 0:b.filterOperators)||void 0===t?void 0:t.map((e=>react.createElement("option",{key:e.value,value:e.value},e.label||f.current.getLocaleText("filterOperator"+capitalize(e.value))))))),react.createElement($,{className:m.filterValueInput},b&&w&&react.createElement(w.InputComponent,Object.assign({apiRef:f,item:i,applyValue:c},w.InputComponentProps))))}function Bl(){const e=react.useContext(Qo),[r]=uo(e),{disableMultipleColumnsFiltering:i}=po(e,ci),l=react.useMemo((()=>r.filter.items.length>1),[r.filter.items.length]),a=react.useCallback((t=>{e.current.upsertFilter(t);}),[e]),c=react.useCallback((t=>{e.current.applyFilterLinkOperator(t);}),[e]),u=react.useCallback((()=>{e.current.upsertFilter({});}),[e]),p=react.useCallback((t=>{e.current.deleteFilter(t);}),[e]);return react.useEffect((()=>{0===r.filter.items.length&&u();}),[u,r.filter.items.length]),react.createElement(Tl,null,react.createElement(Dl,null,r.filter.items.map(((e,t)=>react.createElement($l,{key:e.id,item:e,applyFilterChanges:a,deleteFilter:p,hasMultipleFilters:l,showMultiFilterOperators:t>0,multiFilterOperator:r.filter.linkOperator,disableMultiFilterOperator:1!==t,applyMultiFilterOperatorChanges:c})))),!i&&react.createElement(Rl,null,react.createElement(Button,{onClick:u,startIcon:react.createElement(Ir,null),color:"primary"},e.current.getLocaleText("filterPanelAddFilter"))))}function Kl(e,t){var n=function(e){var t=e.__resizeTriggers__,n=t.firstElementChild,r=t.lastElementChild,o=n.firstElementChild;r.scrollLeft=r.scrollWidth,r.scrollTop=r.scrollHeight,o.style.width=n.offsetWidth+1+"px",o.style.height=n.offsetHeight+1+"px",n.scrollLeft=n.scrollWidth,n.scrollTop=n.scrollHeight;},r=function(e){if(!(e.target.className.indexOf("contract-trigger")<0&&e.target.className.indexOf("expand-trigger")<0)){var r=this;n(this),this.__resizeRAF__&&t.cancelAnimationFrame(this.__resizeRAF__),this.__resizeRAF__=t.requestAnimationFrame((function(){(function(e){return e.offsetWidth!=e.__resizeLast__.width||e.offsetHeight!=e.__resizeLast__.height})(r)&&(r.__resizeLast__.width=r.offsetWidth,r.__resizeLast__.height=r.offsetHeight,r.__resizeListeners__.forEach((function(t){t.call(r,e);})));}));}},o=!1,i="",l="animationstart",a="Webkit Moz O ms".split(" "),s="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),c=document.createElement("fakeelement");if(void 0!==c.style.animationName&&(o=!0),!1===o)for(var u=0;u<a.length;u++)if(void 0!==c.style[a[u]+"AnimationName"]){i="-"+a[u].toLowerCase()+"-",l=s[u],o=!0;break}var d="resizeanim",p="@"+i+"keyframes "+"resizeanim { from { opacity: 0; } to { opacity: 0; } } ",g=i+"animation: 1ms "+"resizeanim; ";return {addResizeListener:function(o,i){if(!o.__resizeTriggers__){var a=o.ownerDocument,s=t.getComputedStyle(o);s&&"static"==s.position&&(o.style.position="relative"),function(t){if(!t.getElementById("muiDetectElementResize")){var n=(p||"")+".Mui-resizeTriggers { "+(g||"")+'visibility: hidden; opacity: 0; } .Mui-resizeTriggers, .Mui-resizeTriggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .Mui-resizeTriggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',r=t.head||t.getElementsByTagName("head")[0],o=t.createElement("style");o.id="muiDetectElementResize",o.type="text/css",null!=e&&o.setAttribute("nonce",e),o.styleSheet?o.styleSheet.cssText=n:o.appendChild(t.createTextNode(n)),r.appendChild(o);}}(a),o.__resizeLast__={},o.__resizeListeners__=[],(o.__resizeTriggers__=a.createElement("div")).className="Mui-resizeTriggers",o.__resizeTriggers__.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>',o.appendChild(o.__resizeTriggers__),n(o),o.addEventListener("scroll",r,!0),l&&(o.__resizeTriggers__.__animationListener__=function(e){e.animationName==d&&n(o);},o.__resizeTriggers__.addEventListener(l,o.__resizeTriggers__.__animationListener__));}o.__resizeListeners__.push(i);},removeResizeListener:function(e,t){if(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1),!e.__resizeListeners__.length){e.removeEventListener("scroll",r,!0),e.__resizeTriggers__.__animationListener__&&(e.__resizeTriggers__.removeEventListener(l,e.__resizeTriggers__.__animationListener__),e.__resizeTriggers__.__animationListener__=null);try{e.__resizeTriggers__=!e.removeChild(e.__resizeTriggers__);}catch(e){}}}}}const Zl=react.forwardRef((function(t,o){const{children:i,defaultHeight:l=null,defaultWidth:a=null,disableHeight:s=!1,disableWidth:c=!1,nonce:u,onResize:d,style:p}=t,g=J(t,["children","defaultHeight","defaultWidth","disableHeight","disableWidth","nonce","onResize","style"]),[m,f]=react.useState({height:l,width:a}),h=react.useRef(null),b=react.useRef(null),v=Ko((()=>{if(b.current){const e=b.current.offsetHeight||0,t=b.current.offsetWidth||0,n=ownerWindow(b.current).getComputedStyle(b.current),r=parseInt(n.paddingLeft,10)||0,o=parseInt(n.paddingRight,10)||0,i=e-(parseInt(n.paddingTop,10)||0)-(parseInt(n.paddingBottom,10)||0),l=t-r-o;(!s&&m.height!==i||!c&&m.width!==l)&&(f({height:i,width:l}),d&&d({height:i,width:l}));}}));Zo((()=>{var e;if(b.current=h.current.parentElement,!b)return;const t=ownerWindow(null!==(e=b.current)&&void 0!==e?e:void 0),n=Kl(u,t);return n.addResizeListener(b.current,v),v(),()=>{n.removeResizeListener(b.current,v);}}),[u,v]);const w={overflow:"visible"},C={};s||(w.height=0,C.height=m.height),c||(w.width=0,C.width=m.width);const y=useForkRef(h,o);return react.createElement("div",Object.assign({ref:y,style:Object.assign(Object.assign({},w),p)},g),null===m.height&&null===m.width?null:i(C))})),ql=e=>e.pagination,Jl=({rowCount:e})=>{const t=react.useContext(Qo);return 0===e?null:react.createElement("div",{className:"MuiDataGrid-rowCount"},`${t.current.getLocaleText("footerTotalRows")} ${e.toLocaleString()}`)};function Ql(e){const{selectedRowCount:t}=e,r=react.useContext(Qo).current.getLocaleText("footerRowSelected")(t);return react.createElement("div",{className:"MuiDataGrid-selectedRowCount"},r)}function ea(){var e;const t=react.useContext(Qo),r=po(t,mi),o=po(t,ci),i=po(t,_i),l=po(t,ql),a=Nl(t),c=!o.hideFooterSelectedRowCount&&i>0?react.createElement(Ql,{selectedRowCount:i}):react.createElement("div",null),u=o.hideFooterRowCount||o.pagination?null:react.createElement(Jl,{rowCount:r}),d=!!o.pagination&&null!=l.pageSize&&!o.hideFooterPagination&&(null==t?void 0:t.current.components.Pagination),p=d&&react.createElement(d,Object.assign({},a,null===(e=null==t?void 0:t.current.componentsProps)||void 0===e?void 0:e.pagination));return react.createElement(ai,null,c,u,p)}function ta(){var e,t;const r=react.useContext(Qo),o=Nl(r),i=null==r?void 0:r.current.components.PreferencesPanel,l=i&&react.createElement(i,Object.assign({},o,null===(e=null==r?void 0:r.current.componentsProps)||void 0===e?void 0:e.preferencesPanel)),a=null==r?void 0:r.current.components.Toolbar,c=a&&react.createElement(a,Object.assign({},o,null===(t=null==r?void 0:r.current.componentsProps)||void 0===t?void 0:t.toolbar));return react.createElement(react.Fragment,null,l,c)}function na(){return react.createElement(si,null,react.createElement(CircularProgress,null))}function ra(){const e=react.useContext(Qo).current.getLocaleText("noRowsLabel");return react.createElement(si,null,e)}const oa=makeStyles$1((e=>({selectLabel:{display:"none",[e.breakpoints.up("md")]:{display:"block"}},caption:{"&[id]":{display:"none",[e.breakpoints.up("md")]:{display:"block"}}},input:{display:"none",[e.breakpoints.up("md")]:{display:"inline-flex"}}})));function ia(){const e=oa(),t=react.useContext(Qo),r=po(t,ql),i=po(t,ci),l=react.useCallback((e=>{const n=Number(e.target.value);t.current.setPageSize(n);}),[t]),a=react.useCallback(((e,n)=>{t.current.setPage(n);}),[t]);return react.createElement(Y,Object.assign({classes:Object.assign(Object.assign({},Xt()?{selectLabel:e.selectLabel}:{caption:e.caption}),{input:e.input}),component:"div",count:r.rowCount,page:r.page,rowsPerPageOptions:i.rowsPerPageOptions&&i.rowsPerPageOptions.indexOf(r.pageSize)>-1?i.rowsPerPageOptions:[],rowsPerPage:r.pageSize,labelRowsPerPage:t.current.getLocaleText("footerPaginationRowsPerPage")},Xt()?{onPageChange:a,onRowsPerPageChange:l}:{onChangePage:a,onChangeRowsPerPage:l}))}var la;!function(e){e.NotFound="NotFound",e.Invalid="Invalid",e.Expired="Expired",e.Valid="Valid";}(la||(la={}));const aa=({licenseStatus:e})=>e===la.Valid.toString()?null:react.createElement("div",{style:{position:"absolute",pointerEvents:"none",color:"#8282829e",zIndex:1e5,width:"100%",textAlign:"center",bottom:"50%",right:0,letterSpacing:5,fontSize:24}}," ",function(e){switch(e){case la.Expired.toString():return "Material-UI X License Expired";case la.Invalid.toString():return "Material-UI X Invalid License";case la.NotFound.toString():return "Material-UI X Unlicensed product";default:throw new Error("Material-UI: Unhandled license status.")}}(e)," ");"undefined"!=typeof process&&void 0!==process.env.EXPERIMENTAL_ENABLED&&Kt()&&window.localStorage.getItem("EXPERIMENTAL_ENABLED")?"true"===window.localStorage.getItem("EXPERIMENTAL_ENABLED"):"undefined"!=typeof process&&("true"===process.env.EXPERIMENTAL_ENABLED);const ua=e=>{const n=rr("useColumnMenu"),[r,i,l]=uo(e),a=react.useCallback((t=>{n.debug("Opening Column Menu"),i((e=>Object.assign(Object.assign({},e),{columnMenu:{open:!0,field:t}}))),e.current.hidePreferences(),l();}),[e,l,n,i]),s=react.useCallback((()=>{n.debug("Hiding Column Menu"),i((e=>Object.assign(Object.assign({},e),{columnMenu:Object.assign(Object.assign({},e.columnMenu),{open:!1})}))),l();}),[l,n,i]);react.useEffect((()=>{r.isScrolling&&s();}),[r.isScrolling,s]),or(e,{showColumnMenu:a,hideColumnMenu:s},"ColumnMenuApi");},da=(e,t)=>e.x<=t.x?"right":"left",pa=n=>{const r=rr("useColumnReorder"),[,i,l]=uo(n),a=po(n,fl),s=react.useRef(null),c=react.useRef(null),u=react.useRef({x:0,y:0}),d=react.useRef(),p=react.useCallback((()=>{r.debug("End dragging col"),n.current.publishEvent("colReordering:dragStop"),clearTimeout(d.current),c.current.classList.remove("MuiDataGrid-colCell-dropZone"),s.current.removeEventListener("dragend",p),s.current=null,i((e=>Object.assign(Object.assign({},e),{columnReorder:Object.assign(Object.assign({},e.columnReorder),{dragCol:""})}))),l();}),[n,i,l,r]),g=react.useCallback(((e,t)=>{r.debug("Start dragging col "+e.field),n.current.publishEvent("colReordering:dragStart"),s.current=t,s.current.addEventListener("dragend",p,{once:!0}),s.current.classList.add("MuiDataGrid-colCell-dragging"),i((t=>Object.assign(Object.assign({},t),{columnReorder:Object.assign(Object.assign({},t.columnReorder),{dragCol:e.field})}))),l(),d.current=setTimeout((()=>{s.current.classList.remove("MuiDataGrid-colCell-dragging");}));}),[n,i,l,p,r]);react.useEffect((()=>()=>{clearTimeout(d.current);}),[]);const m=react.useCallback(((e,t)=>{e.preventDefault(),n.current.publishEvent("colReordering:dragOverHeader"),c.current=t.current,c.current.classList.add("MuiDataGrid-colCell-dropZone");}),[n]),f=react.useCallback((e=>{e.preventDefault(),n.current.publishEvent("colReordering:dragEnter");}),[n]),h=react.useCallback(((e,t)=>{if(r.debug("Dragging over col "+e.field),n.current.publishEvent("colReordering:dragOver"),e.field!==a&&(o=u.current,i=t,o.x!==i.x||o.y!==i.y)){const r=n.current.getColumnIndex(e.field,!1),o=n.current.getColumnIndex(a,!1);("right"===da(u.current,t)&&o<r||"left"===da(u.current,t)&&r<o)&&n.current.moveColumn(a,r),u.current=t;}var o,i;}),[n,a,r]);or(n,{onColItemDragStart:g,onColHeaderDragOver:m,onColItemDragOver:h,onColItemDragEnter:f},"ColReorderApi");};function ga(e,t){const n=e.filter((e=>!!e.flex&&!e.hide)).length;let r=0;n&&t&&e.forEach((e=>{e.hide||(e.flex?r+=e.flex:t-=e.width);}));let o=e;if(t>0&&n){const n=t/r;o=e.map((e=>Object.assign(Object.assign({},e),{width:e.flex?Math.floor(n*e.flex):e.width})));}return o}function ma(e,t){return e.debug("Building columns lookup"),t.reduce(((e,t)=>(e[t.field]=t,e)),{})}function fa(e,n){const r=rr("useColumns"),[i,l,a]=uo(n),s=po(n,nn),c=po(n,en),u=po(n,tn),d=po(n,ci),p=react.useCallback(((e,t=!0)=>{r.debug("Updating columns state."),l((t=>Object.assign(Object.assign({},t),{columns:e}))),a(),n.current&&t&&n.current.publishEvent("columnsUpdated",e.all);}),[r,l,a,n]),g=react.useCallback((e=>n.current.state.columns.lookup[e]),[n]),m=react.useCallback((()=>c),[c]),f=react.useCallback((()=>u),[u]),h=react.useCallback((()=>s),[s]),b=react.useCallback(((e,t=!0)=>t?u.findIndex((t=>t.field===e)):c.findIndex((t=>t.field===e))),[c,u]),v=react.useCallback((e=>{const t=b(e);return s.positions[t]}),[s.positions,b]),w=react.useCallback((e=>{r.debug("updating Columns with new state");const t=((e,t)=>{const n={all:[...e.all],lookup:Object.assign({},e.lookup)};return t.forEach((e=>{null==n.lookup[e.field]?(n.lookup[e.field]=e,n.all.push(e.field)):n.lookup[e.field]=Object.assign(Object.assign({},n.lookup[e.field]),e);})),n})(i.columns,e);p(t,!1);}),[r,i.columns,p]),C=react.useCallback((e=>w([e])),[w]),y=react.useCallback(((e,t)=>{const n=g(e),r=Object.assign(Object.assign({},n),{hide:null==t?!n.hide:t});w([r]),a();}),[a,g,w]),O=react.useCallback(((e,t)=>{r.debug(`Moving column ${e} to index ${t}`);const n=i.columns.all.findIndex((t=>t===e)),o=[...i.columns.all];o.splice(t,0,o.splice(n,1)[0]),p(Object.assign(Object.assign({},i.columns),{all:o}),!1);}),[i.columns,r,p]);or(n,{getColumnFromField:g,getAllColumns:m,getColumnIndex:b,getColumnPosition:v,getVisibleColumns:f,getColumnsMeta:h,updateColumn:C,updateColumns:w,toggleColumn:y,moveColumn:O},"ColApi"),react.useEffect((()=>{if(r.info("Columns have changed, new length "+e.length),e.length>0){const t=ga(function(e,t,n,r){r.debug("Hydrating Columns with default definitions");const o=Vo(Hr(),t),i=e.map((e=>Object.assign(Object.assign({},Fi(o,e.type)),e)));return n?[Ei,...i]:i}(e,d.columnTypes,!!d.checkboxSelection,r),n.current.getState().viewportSizes.width);p({all:t.map((e=>e.field)),lookup:ma(r,t)});}else p({all:[],lookup:{}});}),[r,n,e,d.columnTypes,d.checkboxSelection,p]),react.useEffect((()=>{r.debug("Columns gridState.viewportSizes.width, changed "+i.viewportSizes.width);const e=ga(en(n.current.getState()),i.viewportSizes.width);n.current.updateColumns(e);}),[n,i.viewportSizes.width,r]);}const ha=(n,r,i,l)=>{const a=co(n),[s,c,u]=uo(n),d=react.useCallback((e=>{void 0===s[r]&&(s[r]=l),c((t=>{const n=Object.assign({},t);return n[r]=i(t[r],e),n})),u();}),[u,s,l,i,c,r]),p=react.useRef(d);react.useEffect((()=>{p.current=d;}),[d]);const g=react.useCallback((e=>p.current(e)),[]);return {gridState:s,dispatch:g,gridApi:a}},ba=(e,n)=>{const r=rr("useFilter"),[i,l,a]=uo(e),s=po(e,on),c=po(e,ci),u=react.useCallback((()=>({filterModel:e.current.getState("filter"),api:e.current,columns:e.current.getAllColumns(),rows:e.current.getRowModels()})),[e]),d=react.useCallback((()=>{r.debug("clearing filtered rows"),l((e=>Object.assign(Object.assign({},e),{visibleRows:{visibleRowsLookup:{}}})));}),[r,l]),p=react.useCallback(((t,n=Ur.And)=>{if(!t.columnField||!t.operatorValue||!t.value)return;r.debug(`Filtering column: ${t.columnField} ${t.operatorValue} ${t.value} `);const o=e.current.getColumnFromField(t.columnField);if(!o)return;const i=o.filterOperators;if(!(null==i?void 0:i.length))throw new Error(`Material-UI: No filter operators found for column '${o.field}'.`);const s=i.find((e=>e.value===t.operatorValue));if(!s)throw new Error(`Material-UI: No filter operator found for column '${o.field}' and operator value '${t.operatorValue}'.`);const c=s.getApplyFilterFn(t,o);l((t=>{const r=Object.assign({},t.visibleRows.visibleRowsLookup);return wi(t).forEach(((t,i)=>{const l=Uo({rowModel:t,colDef:o,rowIndex:i,value:t[o.field],api:e.current}),a=c(l);null==r[t.id]?r[t.id]=a:r[t.id]=n===Ur.And?r[t.id]&&a:r[t.id]||a;})),Object.assign(Object.assign({},t),{visibleRows:{visibleRowsLookup:r,visibleRows:Object.entries(r).filter((e=>e[1])).map((e=>e[0]))}})})),a();}),[e,a,r,l]),g=react.useCallback((()=>{if(c.filterMode===$r.server)return void a();d();const{items:t,linkOperator:n}=e.current.state.filter;t.forEach((t=>{e.current.applyFilter(t,n);})),a();}),[e,d,a,c.filterMode]),m=react.useCallback((t=>{r.debug("Upserting filter"),l((n=>{const r=[...n.filter.items],o=Object.assign({},t),i=r.findIndex((e=>e.id===o.id));if(1===r.length&&Gt(r[0],{})?r[0]=o:-1===i?r.push(o):r[i]=o,null==o.id&&(o.id=(new Date).getTime()),null==o.columnField&&(o.columnField=s[0]),null!=o.columnField&&null==o.operatorValue){const t=e.current.getColumnFromField(o.columnField);o.operatorValue=t&&t.filterOperators[0].value;}c.disableMultipleColumnsFiltering&&r.length>1&&(r.length=1);return Object.assign(Object.assign({},n),{filter:Object.assign(Object.assign({},n.filter),{items:r})})})),e.current.publishEvent("filterModelChange",u()),g();}),[r,l,e,u,g,c.disableMultipleColumnsFiltering,s]),f=react.useCallback((t=>{r.debug(`Deleting filter on column ${t.columnField} with value ${t.value}`);let n=!1;l((e=>{const r=[...e.filter.items.filter((e=>e.id!==t.id))];n=0===r.length;return Object.assign(Object.assign({},e),{filter:Object.assign(Object.assign({},e.filter),{items:r})})})),n&&m({}),e.current.publishEvent("filterModelChange",u()),g();}),[e,g,u,r,l,m]),h=react.useCallback((t=>{if(r.debug("Displaying filter panel"),t){const n=i.filter.items.length>0?i.filter.items[i.filter.items.length-1]:null;n&&n.columnField===t||e.current.upsertFilter({columnField:t});}e.current.showPreferences(Yi.filters);}),[e,i.filter.items,r]),b=react.useCallback((()=>{r.debug("Hiding filter panel"),null==e||e.current.hidePreferences();}),[e,r]),v=react.useCallback(((e=Ur.And)=>{r.debug("Applying filter link operator"),l((t=>Object.assign(Object.assign({},t),{filter:Object.assign(Object.assign({},t.filter),{linkOperator:e})}))),g();}),[g,r,l]),w=react.useCallback((()=>{d(),r.debug("Clearing filter model"),l((e=>Object.assign(Object.assign({},e),{filter:Xr()})));}),[d,r,l]),C=react.useCallback((t=>{w(),r.debug("Setting filter model"),v(t.linkOperator),t.items.forEach((e=>m(e))),e.current.publishEvent("filterModelChange",u());}),[e,v,w,u,r,m]),y=react.useCallback((t=>e.current.subscribeEvent("filterModelChange",t)),[e]);or(e,{applyFilterLinkOperator:v,applyFilters:g,applyFilter:p,deleteFilter:f,upsertFilter:m,onFilterModelChange:y,setFilterModel:C,showFilterPanel:h,hideFilterPanel:b},"FilterApi"),tl(e,"rowsSet",e.current.applyFilters),tl(e,"rowsUpdated",e.current.applyFilters),tl(e,"filterModelChange",c.onFilterModelChange),react.useEffect((()=>{const t=c.filterModel,n=e.current.state.filter;t&&!Gt(t,n)&&(r.debug("filterModel prop changed, applying filters"),e.current.setFilterModel(t));}),[e,r,c.filterModel]),react.useEffect((()=>{e.current&&(r.debug("Rows prop changed, applying filters"),d(),e.current.applyFilters());}),[e,d,r,n]);const O=react.useCallback((()=>{r.debug("onColUpdated - Columns changed, applying filters");const t=e.current.getState("filter"),n=on(e.current.state);r.debug("Columns changed, applying filters"),t.items.forEach((t=>{n.find((e=>e===t.columnField))||e.current.deleteFilter(t);})),e.current.applyFilters();}),[e,r]);tl(e,"columnsUpdated",O);},va=(e,t)=>{const n=rr("useKeyboard"),r=po(t,ci),[,i,l]=uo(t),a=po(t,ql),s=po(t,mi),c=po(t,ln),u=po(t,ul),d=po(t,Di),p=react.useCallback((e=>{i((t=>{n.debug("Toggling keyboard multiple key pressed to "+e);const r=Object.assign(Object.assign({},t.keyboard),{isMultipleKeyPressed:e});return Object.assign(Object.assign({},t),{keyboard:r})})),l(),t.current.publishEvent("multipleKeyPressChange",e);}),[t,l,n,i]),g=react.useCallback(((e,o)=>{const d=Oo(document.activeElement,"MuiDataGrid-cell");d.tabIndex=-1;const p=Number(d.getAttribute("aria-colindex")),g=Number(d.getAttribute("data-rowindex")),m=r.pagination?a.pageSize*(a.page+1):s;let f;if(Ao(e))f=((e,t)=>{if(!Ao(e))throw new Error("Material-UI: The first argument (code) should be an arrow key code.");return "ArrowLeft"===e?Object.assign(Object.assign({},t),{colIndex:t.colIndex-1}):"ArrowRight"===e?Object.assign(Object.assign({},t),{colIndex:t.colIndex+1}):"ArrowUp"===e?Object.assign(Object.assign({},t),{rowIndex:t.rowIndex-1}):Object.assign(Object.assign({},t),{rowIndex:t.rowIndex+1})})(e,{colIndex:p,rowIndex:g});else if(Go(e)){const t="Home"===e?0:c-1;if(o){let e=0;e=0===t?r.pagination?m-a.pageSize:0:m-1,f={colIndex:t,rowIndex:e};}else f={colIndex:t,rowIndex:g};}else {if(!No(e)&&!ko(e))throw new Error("Material-UI. Key not mapped to navigation behavior.");{const t=g+(e.indexOf("Down")>-1||ko(e)?u.viewportPageSize:-1*u.viewportPageSize);f={colIndex:p,rowIndex:t};}}return f.rowIndex=f.rowIndex<=0?0:f.rowIndex,f.rowIndex=f.rowIndex>=m&&m>0?m-1:f.rowIndex,f.colIndex=f.colIndex<=0?0:f.colIndex,f.colIndex=f.colIndex>=c?c-1:f.colIndex,t.current.scrollToIndexes(f),i((e=>(n.debug("Setting keyboard state, cell focus to "+JSON.stringify(f)),Object.assign(Object.assign({},e),{keyboard:Object.assign(Object.assign({},e.keyboard),{cell:f})})))),l(),f}),[r.pagination,a.pageSize,a.page,s,c,t,i,l,u,n]),m=react.useCallback((()=>{const e=jo(Oo(document.activeElement,"MuiDataGrid-row"));t.current.selectRow(e);}),[t]),f=react.useCallback((e=>{const r=Oo(document.activeElement,"MuiDataGrid-row"),o=Number(r.getAttribute("data-rowindex"));let i=o;const l=t.current.getSelectedRows();if(l.length>0){const e=l.map((e=>t.current.getRowIndexFromId(e.id))),n=e.map((e=>Math.abs(o-e))),r=Math.max(...n);i=e[n.indexOf(r)];}const a=g(e,!1),s=Array(Math.abs(a.rowIndex-i)+1).fill(a.rowIndex>i?i:a.rowIndex).map(((e,n)=>t.current.getRowIdFromRowIndex(e+n)));n.debug("Selecting rows "),t.current.selectRows(s,!0,!0);}),[n,t,g]),h=react.useCallback((()=>{var e,t;const n=Oo(document.activeElement,"MuiDataGrid-row"),r=jo(n);d[r]?null===(e=null===window||void 0===window?void 0:window.getSelection())||void 0===e||e.selectAllChildren(n):null===(t=null===window||void 0===window?void 0:window.getSelection())||void 0===t||t.selectAllChildren(document.activeElement),document.execCommand("copy");}),[d]),b=react.useCallback((e=>{if(To(e.key)&&(n.debug("Multiple Select key pressed"),p(!0)),So(document.activeElement))return ko(e.key)&&e.shiftKey?(e.preventDefault(),void m()):Ho(e.key)&&!e.shiftKey?(e.preventDefault(),void g(e.key,e.ctrlKey||e.metaKey)):Ho(e.key)&&e.shiftKey?(e.preventDefault(),void f(e.key)):void("c"!==e.key.toLowerCase()||!e.ctrlKey&&!e.metaKey?"a"===e.key.toLowerCase()&&(e.ctrlKey||e.metaKey)&&(e.preventDefault(),t.current.selectRows(t.current.getAllRowIds(),!0)):h())}),[t,n,p,f,h,g,m]),v=react.useCallback((e=>{To(e.key)&&(n.debug("Multiple Select key released"),p(!1));}),[n,p]),w=react.useCallback((e=>{n.debug("Grid lost focus, releasing key press",e),t.current.getState().keyboard.isMultipleKeyPressed&&p(!1);}),[t,n,p]);tl(t,"keydown",b),tl(t,"keyup",v),tl(t,"gridFocusOut",w);},wa=e=>{const n=rr("usePagination"),{dispatch:r}=ha(e,"pagination",oo,Object.assign({},ro)),i=po(e,ci),l=po(e,Mi),a=po(e,ul),s=react.useCallback((t=>{n.debug("Setting page to "+t),r(Kr(t));const o=e.current.getState("pagination");e.current.publishEvent("pageChange",o);}),[e,r,n]),c=react.useCallback((t=>{r(Zr(t)),e.current.publishEvent("pageSizeChange",e.current.getState("pagination"));}),[e,r]),u=react.useCallback((t=>e.current.subscribeEvent("pageChange",t)),[e]),d=react.useCallback((t=>e.current.subscribeEvent("pageSizeChange",t)),[e]);tl(e,"pageChange",i.onPageChange),tl(e,"pageSizeChange",i.onPageSizeChange),react.useEffect((()=>{r(qr({paginationMode:i.paginationMode}));}),[e,r,i.paginationMode]),react.useEffect((()=>{const e=null!=i.page?i.page:0;r(Kr(e));}),[r,i.page]),react.useEffect((()=>{!i.autoPageSize&&i.pageSize&&r(Zr(i.pageSize));}),[i.autoPageSize,i.pageSize,n,r]),react.useEffect((()=>{i.autoPageSize&&a&&(null==a?void 0:a.viewportPageSize)>0&&r(Zr(null==a?void 0:a.viewportPageSize));}),[a,r,i.autoPageSize]),react.useEffect((()=>{r(Jr({totalRowCount:l}));}),[e,r,l]);or(e,{setPageSize:c,setPage:s,onPageChange:u,onPageSizeChange:d},"paginationApi");},Ca=n=>{const r=rr("usePreferencesPanel"),[,i,l]=uo(n),a=react.useRef(),s=react.useRef(),c=react.useCallback((()=>{r.debug("Hiding Preferences Panel"),i((e=>Object.assign(Object.assign({},e),{preferencePanel:{open:!1}}))),l();}),[l,r,i]),u=react.useCallback((()=>{s.current=setTimeout((()=>clearTimeout(a.current)),0);}),[]),d=react.useCallback((()=>{a.current=setTimeout(c,100);}),[c]);or(n,{showPreferences:react.useCallback((e=>{r.debug("Opening Preferences Panel"),u(),i((t=>Object.assign(Object.assign({},t),{preferencePanel:Object.assign(Object.assign({},t.preferencePanel),{open:!0,openedPanelValue:e})}))),l();}),[u,l,r,i]),hidePreferences:d},"ColumnMenuApi"),react.useEffect((()=>()=>{clearTimeout(a.current),clearTimeout(s.current);}),[]);};function ya(e,t){if(null==e.id)throw new Error(["Material-UI: The data grid component requires all rows to have a unique id property.",t||"A row was provided without id in the rows prop:",JSON.stringify(e)].join("\n"));return !0}function Oa(e,t){return null==t?e:Object.assign({id:t(e)},e)}function Sa(e,t,n){const r=Object.assign(Object.assign({},{idRowsLookup:{},allRows:[],totalRowCount:0}),{totalRowCount:t&&t>e.length?t:e.length});return e.forEach((e=>{const t=Oa(e,n);ya(t),r.allRows.push(t.id),r.idRowsLookup[t.id]=t;})),r}const Ma=(n,r,i)=>{const l=rr("useRows"),[a,s,c]=uo(n),u=react.useRef(),d=react.useCallback((e=>{null==u.current&&(u.current=setTimeout((()=>{l.debug("Updating component"),u.current=null,e&&e(),c();}),100));}),[l,c]),p=react.useRef(a.rows);react.useEffect((()=>()=>clearTimeout(u.current)),[]),react.useEffect((()=>{s((e=>(p.current=Sa(r,e.options.rowCount,i),Object.assign(Object.assign({},e),{rows:p.current}))));}),[i,r,s]);const g=react.useCallback((e=>n.current.state.rows.allRows.indexOf(e)),[n]),m=react.useCallback((e=>n.current.state.rows.allRows[e]),[n]),f=react.useCallback((e=>n.current.state.rows.idRowsLookup[e]),[n]),h=react.useCallback((e=>{l.debug("updating all rows, new length "+e.length),p.current.allRows.length>0&&n.current.publishEvent("rowsCleared");const t=[],r=e.reduce(((e,n)=>(ya(n=Oa(n,i)),e[n.id]=n,t.push(n.id),e)),{}),o=a.options&&a.options.rowCount&&a.options.rowCount>t.length?a.options.rowCount:t.length;p.current={idRowsLookup:r,allRows:t,totalRowCount:o},s((e=>Object.assign(Object.assign({},e),{rows:p.current}))),d((()=>n.current.publishEvent("rowsSet")));}),[l,a.options,s,d,n,i]),b=react.useCallback((e=>{const t=e.reduce(((e,t)=>{const n=Oa(t,i),r=n.id;return ya(n,"A row was provided without id when calling updateRows():"),e[r]=null!=e[r]?Object.assign(Object.assign({},e[r]),n):n,e}),{}),r=[],o=[];if(Object.entries(t).forEach((([e,t])=>{if("delete"===t._action)return void o.push(t);const n=f(e);n?Object.assign(p.current.idRowsLookup[e],Object.assign(Object.assign({},n),t)):r.push(t);})),s((e=>Object.assign(Object.assign({},e),{rows:p.current}))),o.length>0||r.length>0){o.forEach((e=>{delete p.current.idRowsLookup[e.id];}));const e=[...Object.values(p.current.idRowsLookup),...r];h(e);}d((()=>n.current.publishEvent("rowsUpdated")));}),[n,d,f,i,s,h]),v=react.useCallback((()=>n.current.state.rows.allRows.map((e=>n.current.state.rows.idRowsLookup[e]))),[n]),w=react.useCallback((()=>n.current.state.rows.totalRowCount),[n]),C=react.useCallback((()=>n.current.state.rows.allRows),[n]);or(n,{getRowIndexFromId:g,getRowIdFromRowIndex:m,getRowFromId:f,getRowModels:v,getRowsCount:w,getAllRowIds:C,setRows:h,updateRows:b},"RowApi");},xa=n=>{const r=rr("useSelection"),[i,l,a]=uo(n),s=po(n,ci),c=po(n,fi),u=po(n,il),d=react.useRef(!1);react.useEffect((()=>{d.current=!s.disableMultipleSelection&&u;}),[u,s.disableMultipleSelection]);const p=react.useCallback((()=>Object.keys(i.selection).map((e=>n.current.getRowFromId(e)))),[n,i.selection]),g=react.useCallback(((e,t,o)=>{if(!n.current.isInitialised)return void l((t=>{const n={};return n[e.id]=!0,Object.assign(Object.assign({},t),{selection:n})}));r.debug("Selecting row "+e.id);const i=t||d.current||s.checkboxSelection;l(i?t=>{const n=Object.assign({},t.selection);return (i&&null!=o?o:!n[e.id])?n[e.id]=!0:delete n[e.id],Object.assign(Object.assign({},t),{selection:n})}:t=>{const n={};return n[e.id]=!0,Object.assign(Object.assign({},t),{selection:n})}),a();const c=n.current.getState("selection"),u={api:n,data:e,isSelected:!!c[e.id]},p={selectionModel:Object.keys(c)};n.current.publishEvent("rowSelected",u),n.current.publishEvent("selectionChange",p);}),[n,r,s.checkboxSelection,a,l]),m=react.useCallback(((e,t=!0,r=!1)=>{g(n.current.getRowFromId(e),r,t);}),[n,g]),f=react.useCallback(((e,t=!0,r=!1)=>{if(s.disableMultipleSelection&&e.length>1&&!s.checkboxSelection)return;l((n=>{const o=r?{}:Object.assign({},n.selection);return e.reduce(((e,n)=>(t?e[n]=!0:e[n]&&delete e[n],e)),o),Object.assign(Object.assign({},n),{selection:o})})),a();const o={selectionModel:Object.keys(n.current.getState("selection"))};n.current.publishEvent("selectionChange",o);}),[s.disableMultipleSelection,s.checkboxSelection,l,a,n]),h=react.useCallback((e=>{n.current.selectRows(e,!0,!0);}),[n]),b=react.useCallback((e=>{s.disableSelectionOnClick||g(e.row);}),[s.disableSelectionOnClick,g]),v=react.useCallback((e=>n.current.subscribeEvent("rowSelected",e)),[n]),w=react.useCallback((e=>n.current.subscribeEvent("selectionChange",e)),[n]);tl(n,"rowClick",b),tl(n,"rowSelected",s.onRowSelected),tl(n,"selectionChange",s.onSelectionModelChange);or(n,{selectRow:m,getSelectedRows:p,selectRows:f,setSelectionModel:h,onRowSelected:v,onSelectionModelChange:w},"SelectionApi"),react.useEffect((()=>{l((e=>{const t=Object.assign({},e.selection);let n=!1;return Object.keys(t).forEach((e=>{c[e]||(delete t[e],n=!0);})),n?Object.assign(Object.assign({},e),{selection:t}):e})),a();}),[c,n,l,a]),react.useEffect((()=>{Gt(Object.keys(n.current.getState().selection),s.selectionModel)||n.current.setSelectionModel(s.selectionModel||[]);}),[n,s.selectionModel]);},ja=(n,r)=>{const i=rr("useSorting"),l=react.useRef(!1),a=react.useRef([]),[s,c,u]=uo(n),d=po(n,ci),p=po(n,tn),g=po(n,mi),m=react.useCallback((e=>({sortModel:e,api:n.current,columns:n.current.getAllColumns()})),[n]),f=react.useCallback(((e,t)=>{const n=s.sorting.sortModel.findIndex((t=>t.field===e));let r=[...s.sorting.sortModel];return n>-1?t?r.splice(n,1,t):r.splice(n,1):r=[...s.sorting.sortModel,t],r}),[s.sorting.sortModel]),h=react.useCallback(((e,t)=>{const n=s.sorting.sortModel.find((t=>t.field===e.field));if(n){const e=void 0===t?ar(d.sortingOrder,n.sort):t;return null==e?void 0:Object.assign(Object.assign({},n),{sort:e})}return {field:e.field,sort:void 0===t?ar(d.sortingOrder):t}}),[s.sorting.sortModel,d.sortingOrder]),b=react.useCallback(((e,t)=>a.current.reduce(((r,o)=>{const{field:i,comparator:l}=o;return r=r||l(e[i],t[i],Uo({api:n.current,colDef:n.current.getColumnFromField(i),rowModel:e,value:e[i]}),Uo({api:n.current,colDef:n.current.getColumnFromField(i),rowModel:t,value:t[i]}))}),0)),[n]),v=react.useCallback((e=>e.map((e=>{const t=n.current.getColumnFromField(e.field);if(!t)throw new Error(`Error sorting: column with field '${e.field}' not found. `);const r=sr(e.sort)?(e,n,r,o)=>-1*t.sortComparator(e,n,r,o):t.sortComparator;return {field:t.field,comparator:r}}))),[n]),w=react.useCallback((()=>{const e=n.current.getRowModels();if(d.sortingMode===$r.server)return i.debug("Skipping sorting rows as sortingMode = server"),void c((t=>Object.assign(Object.assign({},t),{sorting:Object.assign(Object.assign({},t.sorting),{sortedRows:e.map((e=>e.id))})})));const t=n.current.getState().sorting.sortModel;i.debug("Sorting rows with ",t);const r=[...e];t.length>0&&(a.current=v(t),r.sort(b)),c((e=>Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortedRows:r.map((e=>e.id))})}))),u();}),[n,i,c,u,v,b,d.sortingMode]),C=react.useCallback((e=>{c((t=>{const n=Object.assign(Object.assign({},t.sorting),{sortModel:e});return Object.assign(Object.assign({},t),{sorting:Object.assign({},n)})})),u(),0!==p.length&&(n.current.publishEvent("sortModelChange",m(e)),n.current.applySorting());}),[c,u,p.length,n,m]),y=react.useCallback(((e,t)=>{if(!e.sortable)return;const n=h(e,t);let r;r=l.current?f(e.field,n):n?[n]:[],C(r);}),[f,C,h]),O=react.useCallback((({colDef:e})=>{y(e);}),[y]),S=react.useCallback((()=>{c((e=>Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortedRows:[]})})));}),[c]),M=react.useCallback((()=>s.sorting.sortModel),[s.sorting.sortModel]),x=react.useCallback((e=>{l.current=!d.disableMultipleColumnsSorting&&e;}),[d.disableMultipleColumnsSorting]),j=react.useCallback((e=>n.current.subscribeEvent("sortModelChange",e)),[n]),I=react.useCallback((()=>{c((e=>{const t=e.sorting.sortModel,n=en(e);let r=t;return t.length>0&&(r=t.reduce(((e,t)=>(n.find((e=>e.field===t.field))&&e.push(t),e)),[])),Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortModel:r})})}));}),[c]);tl(n,"columnClick",O),tl(n,"rowsSet",n.current.applySorting),tl(n,"rowsCleared",S),tl(n,"rowsUpdated",n.current.applySorting),tl(n,"columnsUpdated",I),tl(n,"multipleKeyPressChange",x),tl(n,"sortModelChange",d.onSortModelChange);or(n,{getSortModel:M,setSortModel:C,sortColumn:y,onSortModelChange:j,applySorting:w},"SortApi"),react.useEffect((()=>{n.current.applySorting();}),[n,r]),react.useEffect((()=>{g>0&&(i.debug("row changed, applying sortModel"),n.current.applySorting());}),[g,n,i]),react.useEffect((()=>{const e=d.sortModel||[];Gt(e,n.current.state.sorting.sortModel)||n.current.setSortModel(e);}),[d.sortModel,n]);},Ia=(t,n)=>{const r=rr("useVirtualColumns"),i=react.useRef(null),l=react.useRef(null),a=react.useRef(0),s=po(n,nn),c=po(n,ln),u=po(n,tn),d=react.useCallback((e=>{const t=s.positions;if(!c)return -1;let n=[...t].reverse().findIndex((t=>e>=t));return n=t.length-1-n,n}),[s.positions,c]),p=react.useCallback((e=>u.length?u[d(e)]:null),[d,u]),g=react.useCallback((e=>{if(!l.current)return !1;const t=l.current.windowSizes.width,n=p(a.current),r=p(a.current+t),o=u.findIndex((e=>e.field===(null==n?void 0:n.field)))+1,i=u.findIndex((e=>e.field===(null==r?void 0:r.field)))-1;return e>=o&&e<=i}),[p,u]),m=react.useCallback(((e,o)=>{var c,g,m,f;if(!e)return !1;l.current=e;const h=e.windowSizes.width;a.current=o,r.debug(`Columns from ${null===(c=p(o))||void 0===c?void 0:c.field} to ${null===(g=p(o+h))||void 0===g?void 0:g.field}`);const b=d(o),v=d(o+h),w=(null===(m=null==i?void 0:i.current)||void 0===m?void 0:m.firstColIdx)||0,C=(null===(f=null==i?void 0:i.current)||void 0===f?void 0:f.lastColIdx)||0,y=t.columnBuffer,O=y>1?y-1:y,S=Math.abs(b-O-w),M=Math.abs(v+O-C);r.debug(`Column buffer: ${y}, tolerance: ${O}`),r.debug(`Previous values  => first: ${w}, last: ${C}`),r.debug(`Current displayed values  => first: ${b}, last: ${v}`),r.debug(`Difference with first: ${S} and last: ${M} `);const x=u.length>0?u.length-1:0,j=b-y>=0?b-y:0,I={leftEmptyWidth:s.positions[j],rightEmptyWidth:0,firstColIdx:j,lastColIdx:v+y>=x?x:v+y};return n.current.state.scrollBar.hasScrollX?I.rightEmptyWidth=s.totalWidth-s.positions[I.lastColIdx]-u[I.lastColIdx].width:t.disableExtendRowFullWidth||(I.rightEmptyWidth=n.current.state.viewportSizes.width-s.totalWidth),Gt(I,i.current)?(r.debug("No rendering needed on columns"),!1):(i.current=I,r.debug("New columns state to render",I),!0)}),[r,p,d,t.columnBuffer,t.disableExtendRowFullWidth,u,s.positions,s.totalWidth,n]);or(n,{isColumnVisibleInWindow:g},"ColumnVirtualizationApi");const f=react.useCallback((()=>{r.debug("Clearing previous renderedColRef"),i.current=null;}),[r,i]);return tl(n,"columnsUpdated",f),tl(n,"resize",f),[i,m]},za=(n,i,l,a,s)=>{const c=rr("useNativeEventListener"),[u,d]=react.useState(!1),p=react.useRef(a),g=react.useCallback((e=>p.current&&p.current(e)),[]);react.useEffect((()=>{p.current=a;}),[a]),react.useEffect((()=>{let e;if(e=Bt(i)?i():i&&i.current?i.current:null,e&&g&&l&&!u){c.debug(`Binding native ${l} event`),e.addEventListener(l,g,s);const t=e;d(!0);const r=()=>{c.debug(`Clearing native ${l} event`),t.removeEventListener(l,g,s);};n.current.onUnmount(r);}}),[i,g,l,u,c,s,n]);};function Da(n,r){const i=rr("useScrollFn"),l=react.useRef(),a=react.useMemo((()=>debounce((()=>{null!=n.current&&(n.current.style.pointerEvents="unset");}),300)),[n]),s=react.useCallback((e=>{var t;e.left===(null===(t=l.current)||void 0===t?void 0:t.left)&&e.top===l.current.top||n&&n.current&&(i.debug(`Moving ${n.current.className} to: ${e.left}-${e.top}`),"none"!==n.current.style.pointerEvents&&(n.current.style.pointerEvents="none"),n.current.style.transform=`translate3d(-${e.left}px, -${e.top}px, 0)`,r.current.style.transform=`translate3d(-${e.left}px, 0, 0)`,a(),l.current=e);}),[n,i,r,a]);return react.useEffect((()=>()=>{a.clear();}),[n,a]),[s]}const _a=(n,r,i,l)=>{var a;const s=rr("useVirtualRows"),[c,u,d]=uo(l),p=po(l,ci),g=po(l,ri),m=po(l,ql),f=po(l,mi),h=po(l,tn),b=po(l,nn),[v]=Da(i,n),[w,C]=Ia(p,l),y=react.useCallback((e=>{let t=!1;return u((n=>{const r=Object.assign(Object.assign({},n.rendering),e);return Gt(n.rendering,r)?n:(t=!0,Object.assign(Object.assign({},n),{rendering:r}))})),t}),[u]),O=react.useCallback((e=>{if(null==l.current.state.containerSizes)return null;let t=0;p.pagination&&null!=m.pageSize&&"client"===m.paginationMode&&(t=m.pageSize*m.page);const n=e*l.current.state.containerSizes.viewportPageSize+t;let r=n+l.current.state.containerSizes.renderingZonePageSize;const o=l.current.state.containerSizes.virtualRowsCount+t;r>o&&(r=o);return {page:e,firstRowIdx:n,lastRowIdx:r}}),[l,p.pagination,m.pageSize,m.paginationMode,m.page]),S=react.useCallback((()=>{if(null==l.current.state.containerSizes)return null;return Object.assign(Object.assign(Object.assign({},w.current),O(l.current.state.rendering.virtualPage)),{paginationCurrentPage:m.page,pageSize:m.pageSize})}),[w,O,l,m.page,m.pageSize]),M=react.useCallback((()=>{const e=S();y({renderContext:e,renderedSizes:l.current.state.containerSizes})&&(s.debug("reRender: trigger rendering"),d());}),[l,S,s,d,y]),x=react.useCallback(((e=!1)=>{const t=l.current.getState(),n=t.containerSizes;if(!r||!r.current||!n)return;const o=t.viewportSizes,i=t.scrollBar,{scrollLeft:a,scrollTop:c}=r.current;s.debug(`Handling scroll Left: ${a} Top: ${c}`);let u=C(n,a);const d=a;let p=c/o.height;const g=c%o.height;s.debug(` viewportHeight:${o.height}, rzScrollTop: ${g}, scrollTop: ${c}, current page = ${p}`);const f={left:i.hasScrollX?d:0,top:i.hasScrollY?g:0},h=t.rendering.virtualPage;p=Math.floor(p),h!==p?(y({virtualPage:p}),s.debug(`Changing page from ${h} to ${p}`),u=!0):(v(f),l.current.publishEvent("scrolling",f)),y({renderingZoneScroll:f});const b=t.rendering.renderContext&&t.rendering.renderContext.paginationCurrentPage!==m.page;(e||u||b)&&M();}),[l,s,m.page,M,v,y,C,r]),j=react.useCallback((e=>{let t;s.debug(`Scrolling to cell at row ${e.rowIndex}, col: ${e.colIndex} `);const n=l.current.isColumnVisibleInWindow(e.colIndex);if(s.debug(`Column ${e.colIndex} is ${n?"already":"not"} visible.`),!n){if(e.colIndex+1===b.positions.length){const n=h[e.colIndex].width;t=b.positions[e.colIndex]+n-c.containerSizes.windowSizes.width;}else t=b.positions[e.colIndex+1]-c.containerSizes.windowSizes.width+c.scrollBar.scrollBarSize.y,s.debug("Scrolling to the right, scrollLeft: "+t);c.rendering.renderingZoneScroll.left>t&&(t=b.positions[e.colIndex],s.debug("Scrolling to the left, scrollLeft: "+t));}let o;const i=(e.rowIndex-c.pagination.page*c.pagination.pageSize)/c.containerSizes.viewportPageSize*c.viewportSizes.height,a=c.viewportSizes.height,u=r.current.scrollTop>i,d=r.current.scrollTop+a<i+g;u?(o=i,s.debug("Row is above, setting scrollTop to "+o)):d&&(o=i-a+g,s.debug("Row is below, setting scrollTop to "+o));const p=!n||u||d;return p&&l.current.scroll({left:t,top:o}),p}),[s,l,c,r,g,b.positions,h]),I=react.useCallback((()=>{v({left:0,top:0}),y({virtualPage:1}),r&&r.current&&r.current.scrollTo(0,0),y({renderingZoneScroll:{left:0,top:0}});}),[v,y,r]),z=react.useRef(null),D=react.useCallback((()=>{r.current.scrollLeft<0||r.current.scrollTop<0||(z.current||u((e=>Object.assign(Object.assign({},e),{isScrolling:!0}))),clearTimeout(z.current),z.current=setTimeout((()=>{z.current=null,u((e=>Object.assign(Object.assign({},e),{isScrolling:!1}))),d();}),300),l.current.updateViewport&&l.current.updateViewport());}),[r,l,u,d]),_=react.useCallback((e=>{r.current&&null!=e.left&&n.current&&(n.current.scrollLeft=e.left,r.current.scrollLeft=e.left,s.debug("Scrolling left: "+e.left)),r.current&&null!=e.top&&(r.current.scrollTop=e.top,s.debug("Scrolling top: "+e.top)),s.debug("Scrolling, updating container, and viewport");}),[r,n,s]),R=react.useCallback((()=>c.containerSizes),[c.containerSizes]),P=react.useCallback((()=>c.rendering.renderContext||void 0),[c.rendering.renderContext]);Zo((()=>{i&&i.current&&(s.debug("applying scrollTop ",c.rendering.renderingZoneScroll.top),v(c.rendering.renderingZoneScroll));}));or(l,{scroll:_,scrollToIndexes:j,getContainerPropsState:R,getRenderContextState:P,updateViewport:x},"VirtualizationApi"),react.useEffect((()=>{var e;(null===(e=c.rendering.renderContext)||void 0===e?void 0:e.paginationCurrentPage)!==c.pagination.page&&l.current.updateViewport&&(s.debug(`State pagination.page changed to ${c.pagination.page}. `),l.current.updateViewport(!0),I());}),[l,c.pagination.page,null===(a=c.rendering.renderContext)||void 0===a?void 0:a.paginationCurrentPage,s,I]),react.useEffect((()=>{c.containerSizes!==c.rendering.renderedSizes&&l.current.updateViewport&&(s.debug("gridState.containerSizes updated, updating viewport. "),l.current.updateViewport(!0));}),[l,c.containerSizes,c.rendering.renderedSizes,s]),react.useEffect((()=>{l.current.updateViewport&&(s.debug(`totalRowCount has changed to ${f}, updating viewport.`),l.current.updateViewport(!0));}),[s,f,c.viewportSizes,c.scrollBar,c.containerSizes,l]),react.useEffect((()=>()=>{clearTimeout(z.current);}),[]);const E=react.useCallback((e=>(s.debug("Using keyboard to navigate cells, converting scroll events "),e.target.scrollLeft=0,e.target.scrollTop=0,e.preventDefault(),e.stopPropagation(),!1)),[s]);za(l,r,"scroll",D,{passive:!0}),za(l,(()=>{var e;return null===(e=i.current)||void 0===e?void 0:e.parentElement}),"scroll",E),tl(l,"resize",x);};class Ra{constructor(){this.maxListeners=10,this.warnOnce=!1,this.events={};}on(e,t){Array.isArray(this.events[e])||(this.events[e]=[]),this.events[e].push(t),"production"!=="production";}removeListener(e,t){if(Array.isArray(this.events[e])){const n=this.events[e].indexOf(t);n>-1&&this.events[e].splice(n,1);}}removeAllListeners(e){e?Array.isArray(this.events[e])&&(this.events[e]=[]):this.events={};}emit(e,...t){if(Array.isArray(this.events[e])){const n=this.events[e].slice(),r=n.length;for(let e=0;e<r;e+=1)n[e].apply(this,t);}}once(e,t){const n=this;this.on(e,(function r(...o){n.removeListener(e,r),t.apply(n,o);}));}}function Pa(...t){const n=t[0],r=react.useRef(0===t.length?null:new Ra);return react.useImperativeHandle(n,(()=>r.current),[r]),r}let Ea=!1;function Fa(){if(!Ea){const e=document.createElement("div");e.style.touchAction="none",document.body.appendChild(e),Ea="none"===window.getComputedStyle(e).touchAction,e.parentElement.removeChild(e);}return Ea}function Ta(e,t){if(void 0!==t&&e.changedTouches){for(let n=0;n<e.changedTouches.length;n+=1){const r=e.changedTouches[n];if(r.identifier===t)return {x:r.clientX,y:r.clientY}}return !1}return {x:e.clientX,y:e.clientY}}const La=(n,r)=>{const i=rr("useColumnResize"),l=react.useRef(),a=react.useRef(),s=react.useRef(),c=react.useRef(),u=react.useRef(),d=react.useRef(),p=n.current,g=e=>{i.debug(`Updating width to ${e} for col ${l.current.field}`),l.current.width=e,a.current.style.width=e+"px",a.current.style.minWidth=e+"px",a.current.style.maxWidth=e+"px",s.current.forEach((t=>{const n=t;n.style.width=e+"px",n.style.minWidth=e+"px",n.style.maxWidth=e+"px";}));},m=Ko((()=>{C(),r.current.updateColumn(l.current),clearTimeout(u.current),u.current=setTimeout((()=>{r.current.publishEvent("colResizing:stop");})),i.debug(`Updating col ${l.current.field} with new width: ${l.current.width}`);})),f=Ko((e=>{if(0===e.buttons)return void m();let t=c.current+e.clientX-a.current.getBoundingClientRect().left;t=Math.max(50,t),g(t);})),h=Ko((e=>{if(0!==e.button)return;if(!e.currentTarget.classList.contains("MuiDataGrid-columnSeparatorResizable"))return;e.preventDefault(),a.current=Oo(e.currentTarget,"MuiDataGrid-colCell");const t=a.current.getAttribute("data-field"),n=r.current.getColumnFromField(t);i.debug("Start Resize on col "+n.field),r.current.publishEvent("colResizing:start",{field:t}),l.current=n,a.current=p.querySelector(`[data-field="${n.field}"]`),s.current=Do(a.current);const o=ownerDocument(r.current.rootElementRef.current);o.body.style.cursor="col-resize",c.current=l.current.width-(e.clientX-a.current.getBoundingClientRect().left),o.addEventListener("mousemove",f),o.addEventListener("mouseup",m);})),b=Ko((e=>{Ta(e,d.current)&&(C(),r.current.updateColumn(l.current),clearTimeout(u.current),u.current=setTimeout((()=>{r.current.publishEvent("colResizing:stop");})),i.debug(`Updating col ${l.current.field} with new width: ${l.current.width}`));})),v=Ko((e=>{const t=Ta(e,d.current);if(!t)return;if("mousemove"===e.type&&0===e.buttons)return void b(e);let n=c.current+t.x-a.current.getBoundingClientRect().left;n=Math.max(50,n),g(n);})),w=Ko((e=>{if(!Oo(e.target,"MuiDataGrid-columnSeparatorResizable"))return;Fa()||e.preventDefault();const t=e.changedTouches[0];null!=t&&(d.current=t.identifier),a.current=Oo(e.target,"MuiDataGrid-colCell");const n=Io(a.current),o=r.current.getColumnFromField(n);i.debug("Start Resize on col "+o.field),r.current.publishEvent("colResizing:start",{field:n}),l.current=o,a.current=zo(p,o.field),s.current=Do(a.current),c.current=l.current.width-(t.clientX-a.current.getBoundingClientRect().left);const u=ownerDocument(e.currentTarget);u.addEventListener("touchmove",v),u.addEventListener("touchend",b);})),C=react.useCallback((()=>{const e=ownerDocument(r.current.rootElementRef.current);e.body.style.removeProperty("cursor"),e.removeEventListener("mousemove",f),e.removeEventListener("mouseup",m),e.removeEventListener("touchmove",v),e.removeEventListener("touchend",b);}),[r,f,m,v,b]);react.useEffect((()=>(null==p||p.addEventListener("touchstart",w,{passive:Fa()}),()=>{null==p||p.removeEventListener("touchstart",w),clearTimeout(u.current),C();})),[p,w,C]),or(r,{startResizeOnMouseDown:h},"columnResizeApi");};const ka={OpenFilterButtonIcon:fr,ColumnFilteredIcon:hr,ColumnSelectorIcon:Cr,ColumnMenuIcon:xr,ColumnSortedAscendingIcon:gr,ColumnSortedDescendingIcon:mr,ColumnResizeIcon:yr,DensityCompactIcon:Or,DensityStandardIcon:Sr,DensityComfortableIcon:Mr},Aa=Object.assign(Object.assign({},ka),{ColumnMenu:Il,ColumnsPanel:kl,ErrorOverlay:function({message:e}){const t=react.useContext(Qo).current.getLocaleText("errorOverlayDefaultLabel");return react.createElement(si,null,e||t)},FilterPanel:Bl,Footer:ea,Header:ta,PreferencesPanel:Hl,LoadingOverlay:na,NoRowsOverlay:ra,Pagination:ia,Panel:Gl}),Ga=(e,t,n)=>{const r=react.useMemo((()=>{const t={ColumnFilteredIcon:e&&e.ColumnFilteredIcon||Aa.ColumnFilteredIcon,ColumnMenuIcon:e&&e.ColumnMenuIcon||Aa.ColumnMenuIcon,ColumnResizeIcon:e&&e.ColumnResizeIcon||Aa.ColumnResizeIcon,ColumnSelectorIcon:e&&e.ColumnSelectorIcon||Aa.ColumnSelectorIcon,ColumnSortedAscendingIcon:e&&e.ColumnSortedAscendingIcon||Aa.ColumnSortedAscendingIcon,ColumnSortedDescendingIcon:e&&e.ColumnSortedDescendingIcon||Aa.ColumnSortedDescendingIcon,DensityComfortableIcon:e&&e.DensityComfortableIcon||Aa.DensityComfortableIcon,DensityCompactIcon:e&&e.DensityCompactIcon||Aa.DensityCompactIcon,DensityStandardIcon:e&&e.DensityStandardIcon||Aa.DensityStandardIcon,OpenFilterButtonIcon:e&&e.OpenFilterButtonIcon||Aa.OpenFilterButtonIcon,ColumnMenu:e&&e.ColumnMenu||Aa.ColumnMenu,ErrorOverlay:e&&e.ErrorOverlay||Aa.ErrorOverlay,Footer:e&&e.Footer||Aa.Footer,Header:e&&e.Header||Aa.Header,Toolbar:e&&e.Toolbar,PreferencesPanel:e&&e.PreferencesPanel||Aa.PreferencesPanel,LoadingOverlay:e&&e.LoadingOverlay||Aa.LoadingOverlay,NoRowsOverlay:e&&e.NoRowsOverlay||Aa.NoRowsOverlay,Pagination:e&&e.Pagination||Aa.Pagination,FilterPanel:e&&e.FilterPanel||Aa.FilterPanel,ColumnsPanel:e&&e.ColumnsPanel||Aa.ColumnsPanel,Panel:e&&e.Panel||Aa.Panel};return n.current.components=t,t}),[n,e]);return n.current.componentsProps=t,r};function Na(e,n,i){const[l,a]=react.useState(!1),s=rr("useApi"),c=react.useCallback(((e,...t)=>{i.current.emit(e,...t);}),[i]),u=react.useCallback(((e,t)=>{s.debug(`Binding ${e} event`),i.current.on(e,t);const n=i.current;return ()=>{s.debug(`Clearing ${e} event`),n.removeListener(e,t);}}),[i,s]),d=react.useCallback((e=>{c("componentError",e);}),[c]);return react.useEffect((()=>{s.debug("Initializing grid api."),i.current.isInitialised=!0,i.current.rootElementRef=e,i.current.columnHeadersElementRef=n,a(!0);const t=i.current;return ()=>{s.debug("Unmounting Grid component"),t.emit("unmount"),s.debug("Clearing all events listeners"),t.removeAllListeners();}}),[e,s,i,n]),or(i,{subscribeEvent:u,publishEvent:c,showError:d},"CoreApi"),l}const Ha=(n,r)=>{const i=rr("useContainerProps"),[l,a,s]=uo(r),c=react.useRef({width:0,height:0}),u=po(r,ci),d=po(r,ri),p=po(r,an),g=po(r,Mi),m=po(r,ql),f=react.useCallback((()=>{i.debug("Calculating virtual row count.");const e=m.page;let t=u.pagination&&m.pageSize?m.pageSize:null;t=!t||e*t<=g?t:g-(e-1)*t;return null==t||t>g?g:t}),[i,u.pagination,m.page,m.pageSize,g]),h=react.useCallback((e=>{i.debug("Calculating scrollbar sizes.");const t=!u.autoPageSize&&!u.autoHeight&&c.current.height<e*d,n=p>c.current.width;return {hasScrollX:n,hasScrollY:t,scrollBarSize:{y:t?u.scrollbarSize:0,x:n?u.scrollbarSize:0}}}),[i,u.autoPageSize,u.autoHeight,u.scrollbarSize,d,p]),b=react.useCallback(((e,t)=>{if(!n.current)return null;i.debug("Calculating container sizes.");const r=n.current.getBoundingClientRect();c.current={width:r.width,height:r.height},i.debug(`window Size - W: ${c.current.width} H: ${c.current.height} `);return {width:c.current.width-t.scrollBarSize.y,height:u.autoHeight?e*d:c.current.height-t.scrollBarSize.x}}),[i,u.autoHeight,d,n]),v=react.useCallback(((e,t,r)=>{if(!n||!n.current||0===p||Number.isNaN(p))return null;let o=t.height/d;o=u.pagination?Math.floor(o):Math.round(o);const l=2*o,a=u.autoPageSize?1:Math.ceil(e/o);i.debug(`viewportPageSize:  ${o}, rzPageSize: ${l}, viewportMaxPage: ${a}`);const s=l*d+d+r.scrollBarSize.x,g=p-r.scrollBarSize.y;let m=(u.autoPageSize?1:e/o)*t.height+(r.hasScrollY?r.scrollBarSize.x:0);u.autoHeight&&(m=e*d+r.scrollBarSize.x);const f={virtualRowsCount:u.autoPageSize?o:e,renderingZonePageSize:l,viewportPageSize:o,totalSizes:{width:p,height:m||1},dataContainerSizes:{width:g,height:m||1},renderingZone:{width:g,height:s},windowSizes:c.current,lastPage:a};return i.debug("returning container props",f),f}),[n,p,d,u.pagination,u.autoPageSize,u.autoHeight,i]),w=react.useCallback(((e,t)=>{let n=!1;a((r=>(n=e(r),n?t(r):r))),n&&s();}),[s,a]),C=react.useCallback((()=>{i.debug("Refreshing container sizes");const e=f(),t=h(e),n=b(e,t);if(!n)return;w((e=>e.scrollBar!==t),(e=>Object.assign(Object.assign({},e),{scrollBar:t}))),w((e=>e.viewportSizes!==n),(e=>Object.assign(Object.assign({},e),{viewportSizes:n})));const r=v(e,n,t);w((e=>!Gt(e.containerSizes,r)),(e=>Object.assign(Object.assign({},e),{containerSizes:r})));}),[v,h,b,f,i,w]);react.useEffect((()=>{C();}),[l.columns,l.options.hideFooter,C,g]),tl(r,"resize",C);};class $a extends react.Component{static getDerivedStateFromError(e){return {hasError:!0,error:e}}componentDidCatch(e,t){this.props.api.current&&(this.logError(e),this.props.api.current.showError({error:e,errorInfo:t}));}logError(e,t){this.props.logger.error(`An unexpected error occurred. Error: ${e&&e.message}. `,e,t);}render(){var e;return this.props.hasError||(null===(e=this.state)||void 0===e?void 0:e.hasError)?this.props.render(this.props.componentProps||this.state):this.props.children}}function Ba(e){return react.createElement("div",{className:"MuiDataGrid-main"},e.children)}function Wa(e,t){switch(t.type){case"options::UPDATE":return Bo(e,t.payload);default:throw new Error(`Material-UI: Action ${t.type} not found.`)}}const Ua=react.forwardRef((function(i,l){var a,s,c,u,p;const g=react.useRef(null),m=useForkRef(g,l),f=react.useRef(null),h=react.useRef(null),b=react.useRef(null),v=react.useRef(null),w=react.useRef(null),C=react.useRef(null),y=Pa(i.apiRef),[O]=uo(y),S=function(e,n){var i,l;const a=rr("useOptionsProp"),[s,c]=react.useState(0),u=react.useCallback((()=>{var t,n;if(null===(n=null===(t=e.current)||void 0===t?void 0:t.rootElementRef)||void 0===n?void 0:n.current){const t=Jo(ownerDocument(e.current.rootElementRef.current));return a.debug(`Detected Scroll Bar size ${t}.`),t}return 0}),[e,a,null===(l=null===(i=e.current)||void 0===i?void 0:i.rootElementRef)||void 0===l?void 0:l.current]);Zo((()=>{c(u());}),[u]);const p=react.useMemo((()=>Object.assign(Object.assign({},n),{localeText:Object.assign(Object.assign({},lr),n.localeText),scrollbarSize:null==n.scrollbarSize?s:n.scrollbarSize||0})),[s,n]),{gridState:g,dispatch:m}=ha(e,"options",Wa,Object.assign({},Br)),f=react.useCallback((e=>{m({type:"options::UPDATE",payload:e});}),[m]);return react.useEffect((()=>{f(p);}),[p,f]),g.options}(y,i);nr(S.logger,S.logLevel);const M=rr("GridComponent");Na(g,v,y);const j=function(e,n){const[o,i]=react.useState(null),l=e=>{i(e);};return react.useEffect((()=>e.current.subscribeEvent("componentError",l)),[e]),react.useEffect((()=>{e.current.showError(n.error);}),[e,n.error]),o}(y,i);!function(n,r){var i;const l=react.useRef(!1),a=rr("useEvents"),s=po(r,ci),c=react.useCallback((e=>(...t)=>r.current.publishEvent(e,...t)),[r]),u=react.useCallback((e=>{if(null==e.target)throw new Error("Event target null - Target has been removed or component might already be unmounted.");const t=e.target,n={};if(Mo(t)){const e=Oo(t,"MuiDataGrid-cell"),o=Oo(t,"MuiDataGrid-row");if(null==o)return null;const i=jo(o),l=r.current.getRowFromId(i),a=r.current.getRowIndexFromId(i),s=e.getAttribute("data-field"),c=e.getAttribute("data-value"),u=r.current.getColumnFromField(s);if(!u||!u.disableClickEventBubbling){const t={data:l,rowIndex:a,colDef:u,rowModel:l,api:r.current};n.cell=Uo(Object.assign(Object.assign({},t),{element:e,value:c})),n.row=Xo(Object.assign(Object.assign({},t),{element:o}));}}return n}),[r]),d=react.useCallback((e=>{const t=u(e);t&&(t.cell&&r.current.publishEvent("cellClick",t.cell),t.row&&r.current.publishEvent("rowClick",t.row));}),[r,u]),p=react.useCallback((e=>{const t=u(e);t&&(t.cell&&r.current.publishEvent("cellHover",t.cell),t.row&&r.current.publishEvent("rowHover",t.row),t.header&&r.current.publishEvent("columnHeaderHover",t.header));}),[r,u]),g=react.useCallback((e=>{r.current.publishEvent("focusout",e),null===e.relatedTarget&&r.current.publishEvent("gridFocusOut",e);}),[r]),m=react.useCallback((e=>r.current.subscribeEvent("unmount",e)),[r]),f=react.useCallback((e=>r.current.subscribeEvent("resize",e)),[r]),h=react.useCallback((()=>{l.current=!0;}),[]),b=react.useCallback((()=>{l.current=!1;}),[]),v=react.useCallback((()=>r.current.publishEvent("resize")),[r]);or(r,{resize:v,onUnmount:m,onResize:f},"EventsApi"),tl(r,"colResizing:start",h),tl(r,"colResizing:stop",b),tl(r,"columnClick",s.onColumnHeaderClick),tl(r,"cellClick",s.onCellClick),tl(r,"rowClick",s.onRowClick),tl(r,"cellHover",s.onCellHover),tl(r,"rowHover",s.onRowHover),tl(r,"componentError",s.onError),tl(r,"stateChange",s.onStateChange),react.useEffect((()=>{var e;if(n&&n.current&&(null===(e=r.current)||void 0===e?void 0:e.isInitialised)){a.debug("Binding events listeners");const e=c("keydown"),t=c("keyup"),o=n.current;o.addEventListener("click",d,{capture:!0}),o.addEventListener("mouseover",p,{capture:!0}),o.addEventListener("focusout",g),o.addEventListener("keydown",e),o.addEventListener("keyup",t),r.current.isInitialised=!0;const i=r.current;return ()=>{a.debug("Clearing all events listeners"),i.publishEvent("unmount"),o.removeEventListener("click",d,{capture:!0}),o.removeEventListener("mouseover",p,{capture:!0}),o.removeEventListener("focusout",g),o.removeEventListener("keydown",e),o.removeEventListener("keyup",t),i.removeAllListeners();}}}),[n,null===(i=r.current)||void 0===i?void 0:i.isInitialised,c,a,d,p,g,r]);}(g,y),(e=>{const{localeText:t}=po(e,ci);or(e,{getLocaleText:react.useCallback((e=>{if(null==t[e])throw new Error(`Missing translation for key ${e}.`);return t[e]}),[t])},"LocaleTextApi");})(y);const z=function(n){const r=rr("useResizeContainer"),i=react.useRef(),l=react.useRef(),{autoHeight:a}=po(n,ci),s=react.useCallback((e=>{clearTimeout(i.current),clearTimeout(l.current),0!==e.height||a||(i.current=setTimeout((()=>{r.warn(["The parent of the grid has an empty height.","You need to make sure the container has an intrinsic height.","The grid displays with a height of 0px.","","You can find a solution in the docs:","https://material-ui.com/components/data-grid/rendering/#layout"].join("\n"));}))),0===e.width&&(l.current=setTimeout((()=>{r.warn(["The parent of the grid has an empty width.","You need to make sure the container has an intrinsic width.","The grid displays with a width of 0px.","","You can find a solution in the docs:","https://material-ui.com/components/data-grid/rendering/#layout"].join("\n"));}))),r.info("resized...",e),n.current.resize();}),[r,n,a]);return react.useEffect((()=>()=>{clearTimeout(i.current),clearTimeout(l.current);}),[]),s}(y);fa(i.columns,y),Ma(y,i.rows,i.getRowId),va(0,y),xa(y),ja(y,i.rows),ua(y),Ca(y),ba(y,i.rows),Ha(w,y),(e=>{const n=rr("useDensity"),{density:r,rowHeight:i,headerHeight:l}=po(e,ci),[,a,s]=uo(e),c=react.useCallback(((e,t,n)=>{switch(e){case Vr.Compact:return {value:e,headerHeight:Math.floor(.7*t),rowHeight:Math.floor(.7*n)};case Vr.Comfortable:return {value:e,headerHeight:Math.floor(1.3*t),rowHeight:Math.floor(1.3*n)};default:return {value:e,headerHeight:t,rowHeight:n}}}),[]),u=react.useCallback(((e,t=l,r=i)=>{n.debug("Set grid density to "+e),a((n=>Object.assign(Object.assign({},n),{density:Object.assign(Object.assign({},n.density),c(e,t,r))}))),s();}),[n,a,s,c,l,i]);react.useEffect((()=>{u(r,l,i);}),[u,r,i,l]),or(e,{setDensity:u},"DensityApi");})(y),_a(b,w,C,y),pa(y),La(b,y),wa(y);const D=Ga(i.components,i.componentsProps,y);!function(e,n){const[,r,o]=uo(e),i=rr("useStateProp");react.useEffect((()=>{null!=n&&e.current.state!==n&&(i.debug("Overriding state with props.state"),r((e=>Object.assign(Object.assign({},e),n))),o());}),[e,o,i,n,r]);}(y,i.state),function(e,t){const[n]=uo(e);if(null!=n.rendering.renderContext){const{page:e,firstColIdx:r,lastColIdx:o,firstRowIdx:i,lastRowIdx:l}=n.rendering.renderContext;t.info(`Rendering, page: ${e}, col: ${r}-${o}, row: ${i}-${l}`);}}(y,M);const _=Nl(y),R=!i.loading&&0===O.rows.totalRowCount;return react.createElement(Qo.Provider,{value:y},react.createElement(NoSsr,null,react.createElement(ei,{ref:m,className:i.className},react.createElement($a,{hasError:null!=j,componentProps:j,api:y,logger:M,render:e=>{var t;return react.createElement(Ba,null,react.createElement(D.ErrorOverlay,Object.assign({},e,_,null===(t=i.componentsProps)||void 0===t?void 0:t.errorOverlay)))}},react.createElement("div",{ref:h},react.createElement(D.Header,Object.assign({},_,null===(a=i.componentsProps)||void 0===a?void 0:a.header))),react.createElement(Ba,null,react.createElement(Ml,{ContentComponent:D.ColumnMenu,contentComponentProps:Object.assign(Object.assign({},_),null===(s=i.componentsProps)||void 0===s?void 0:s.columnMenu)}),react.createElement(aa,{licenseStatus:i.licenseStatus}),react.createElement(ii,{ref:v},react.createElement(vl,{ref:b})),R&&react.createElement(D.NoRowsOverlay,Object.assign({},_,null===(c=i.componentsProps)||void 0===c?void 0:c.noRowsOverlay)),i.loading&&react.createElement(D.LoadingOverlay,Object.assign({},_,null===(u=i.componentsProps)||void 0===u?void 0:u.loadingOverlay)),react.createElement(Zl,{onResize:z,nonce:i.nonce,disableHeight:i.autoHeight},(e=>react.createElement(di,{ref:w,size:e},react.createElement(gl,{ref:C}))))),!O.options.hideFooter&&react.createElement("div",{ref:f},react.createElement(D.Footer,Object.assign({},_,null===(p=i.componentsProps)||void 0===p?void 0:p.footer)))))))})),Xa={disableColumnResize:!0,disableColumnReorder:!0,disableMultipleColumnsFiltering:!0,disableMultipleColumnsSorting:!0,disableMultipleSelection:!0,pagination:!0,apiRef:void 0},Ya=react.forwardRef((function(e,t){const r=qo({props:e,name:"MuiDataGrid"}),{className:o,pageSize:i}=r,l=J(r,["className","pageSize"]);let a=i;return a&&a>100&&(a=100),react.createElement(Ua,Object.assign({ref:t,className:Eo("MuiDataGrid-root",o),pageSize:a},l,Xa,{licenseStatus:"Valid"}))}));Ya.propTypes={apiRef:chainPropTypes(propTypes.any),columns:chainPropTypes(propTypes.any),disableColumnReorder:chainPropTypes(propTypes.bool),disableColumnResize:chainPropTypes(propTypes.bool),disableMultipleColumnsFiltering:chainPropTypes(propTypes.bool),disableMultipleColumnsSorting:chainPropTypes(propTypes.bool),disableMultipleSelection:chainPropTypes(propTypes.bool),pageSize:chainPropTypes(propTypes.number),pagination:e=>!1===e.pagination?new Error(["Material-UI: `<DataGrid pagination={false} />` is not a valid prop.","Infinite scrolling is not available in the MIT version.","","You need to upgrade to the XGrid component to disable the pagination."].join("\n")):null};const Ka=react.memo(Ya);Ka.Naked=Ya;

export { Ka as DataGrid };
