import { g as global, p as process } from '../common/process-e3699881.js';
import { r as react } from '../common/index-8f144fe1.js';
import { q as _createClass, x as SheetsRegistry, y as createGenerateClassName, S as StylesProvider, _ as _objectWithoutProperties, A as makeStyles, c as clsx, b as _defineProperty, r as formatMuiErrorMessage, j as defaultTheme, h as createMuiTheme, w as withStyles, B as jssPreset, C as hexToRgb, D as rgbToHex, E as hslToRgb, F as decomposeColor, G as recomposeColor, H as getContrastRatio, I as getLuminance, e as emphasize, f as fade, J as darken, K as lighten, L as easing, d as duration, a as capitalize, s as createSvgIcon, u as useTheme$1, i as deepmerge } from '../common/createSvgIcon-2c0a731f.js';
import { c as createMuiStrictModeTheme, w as withTheme, T as ThemeProvider, _, C as ClickAwayListener, V } from '../common/MenuItem-12269dbd.js';
import { c as createStyles, m as makeStyles$1, K as KeyboardArrowRight, a as KeyboardArrowLeft, C as CircularProgress } from '../common/KeyboardArrowRight-89ad5e7f.js';
import { _ as _extends$1 } from '../common/extends-7477639a.js';
import { p as propTypes } from '../common/index-4bda1d4e.js';
import { h as hoistNonReactStatics_cjs } from '../common/hoist-non-react-statics.cjs-fd576625.js';
import { f as _classCallCheck, u as useTheme, _ as _slicedToArray, h as useFormControl, I as IconButton, T as Typography, i as Portal, c as Toolbar, H, j as InputBase, G as Grow, b as TextField, d as MenuList, B as Button, P as Paper, k as G, N } from '../common/TextField-4fc0b07a.js';
import { f as useControlled, u as useForkRef, c as createChainedFunction, s as setRef, a as useIsFocusVisible, b as useEventCallback, e as ownerWindow, o as ownerDocument, d as debounce$1 } from '../common/useIsFocusVisible-919e76d8.js';
import { u as useId } from '../common/unstable_useId-cb546235.js';
import { r as reactDom } from '../common/index-821eef78.js';
import '../common/_commonjsHelpers-f5d70792.js';
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
      return /*#__PURE__*/react.createElement(StylesProvider, _extends$1({
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
      return /*#__PURE__*/react.createElement('style', _extends$1({
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
          return style(_extends$1({
            theme: theme
          }, props));
        }
      };
    } : {
      root: style
    };
    var useStyles = makeStyles(stylesOrCreator, _extends$1({
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
        return /*#__PURE__*/react.cloneElement(children, _extends$1({
          className: clsx(children.props.className, className)
        }, spread));
      }

      if (typeof children === 'function') {
        return children(_extends$1({
          className: className
        }, spread));
      }

      var FinalComponent = ComponentProp || Component;
      return /*#__PURE__*/react.createElement(FinalComponent, _extends$1({
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

  var theme = _extends$1({}, themeInput);

  theme.typography = _extends$1({}, theme.typography);
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
      throw new Error( formatMuiErrorMessage(6));
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

    typography[variant] = _extends$1({}, style, responsiveProperty({
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
    return componentCreator(style, _extends$1({
      defaultTheme: defaultTheme
    }, options));
  };
};

var p = /*#__PURE__*/Object.freeze({
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

  return /*#__PURE__*/react.createElement(ComponentProp, _extends$1({
    className: clsx(classes.root, className),
    ref: ref
  }, other), children, /*#__PURE__*/react.createElement("span", {
    className: clsx(classes.badge, classes["".concat(anchorOrigin.horizontal).concat(capitalize(anchorOrigin.vertical), "}")], classes["anchorOrigin".concat(capitalize(anchorOrigin.vertical)).concat(capitalize(anchorOrigin.horizontal)).concat(capitalize(overlap))], color !== 'default' && classes["color".concat(capitalize(color))], invisible && classes.invisible, variant === 'dot' && classes.dot)
  }, displayValue));
});
var I = withStyles(styles, {
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
  return /*#__PURE__*/react.createElement(IconButton, _extends$1({
    component: "span",
    className: clsx(classes.root, className, checked && classes.checked, disabled && classes.disabled),
    disabled: disabled,
    tabIndex: null,
    role: undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ref: ref
  }, other), /*#__PURE__*/react.createElement("input", _extends$1({
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
  return /*#__PURE__*/react.createElement(SwitchBase$1, _extends$1({
    type: "checkbox",
    classes: {
      root: clsx(classes.root, classes["color".concat(capitalize(color))], indeterminate && classes.indeterminate),
      checked: classes.checked,
      disabled: classes.disabled
    },
    color: color,
    inputProps: _extends$1({
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
var j = withStyles(styles$2, {
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
  return /*#__PURE__*/react.createElement("label", _extends$1({
    className: clsx(classes.root, className, labelPlacement !== 'end' && classes["labelPlacement".concat(capitalize(labelPlacement))], disabled && classes.disabled),
    ref: ref
  }, other), /*#__PURE__*/react.cloneElement(control, controlProps), /*#__PURE__*/react.createElement(Typography, {
    component: "span",
    className: clsx(classes.label, disabled && classes.disabled)
  }, label));
});
var A = withStyles(styles$3, {
  name: 'MuiFormControlLabel'
})(FormControlLabel);

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1-lts
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

function flipPlacement(placement, theme) {
  var direction = theme && theme.direction || 'ltr';

  if (direction === 'ltr') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';

    case 'bottom-start':
      return 'bottom-end';

    case 'top-end':
      return 'top-start';

    case 'top-start':
      return 'top-end';

    default:
      return placement;
  }
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

var useEnhancedEffect = typeof window !== 'undefined' ? react.useLayoutEffect : react.useEffect;
var defaultPopperOptions = {};
/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v1/) for positioning.
 */

var Popper$1 = /*#__PURE__*/react.forwardRef(function Popper$1(props, ref) {
  var anchorEl = props.anchorEl,
      children = props.children,
      container = props.container,
      _props$disablePortal = props.disablePortal,
      disablePortal = _props$disablePortal === void 0 ? false : _props$disablePortal,
      _props$keepMounted = props.keepMounted,
      keepMounted = _props$keepMounted === void 0 ? false : _props$keepMounted,
      modifiers = props.modifiers,
      open = props.open,
      _props$placement = props.placement,
      initialPlacement = _props$placement === void 0 ? 'bottom' : _props$placement,
      _props$popperOptions = props.popperOptions,
      popperOptions = _props$popperOptions === void 0 ? defaultPopperOptions : _props$popperOptions,
      popperRefProp = props.popperRef,
      style = props.style,
      _props$transition = props.transition,
      transition = _props$transition === void 0 ? false : _props$transition,
      other = _objectWithoutProperties(props, ["anchorEl", "children", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"]);

  var tooltipRef = react.useRef(null);
  var ownRef = useForkRef(tooltipRef, ref);
  var popperRef = react.useRef(null);
  var handlePopperRef = useForkRef(popperRef, popperRefProp);
  var handlePopperRefRef = react.useRef(handlePopperRef);
  useEnhancedEffect(function () {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  react.useImperativeHandle(popperRefProp, function () {
    return popperRef.current;
  }, []);

  var _React$useState = react.useState(true),
      exited = _React$useState[0],
      setExited = _React$useState[1];

  var theme = useTheme$1();
  var rtlPlacement = flipPlacement(initialPlacement, theme);
  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */

  var _React$useState2 = react.useState(rtlPlacement),
      placement = _React$useState2[0],
      setPlacement = _React$useState2[1];

  react.useEffect(function () {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });
  var handleOpen = react.useCallback(function () {
    if (!tooltipRef.current || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      handlePopperRefRef.current(null);
    }

    var handlePopperUpdate = function handlePopperUpdate(data) {
      setPlacement(data.placement);
    };

    getAnchorEl(anchorEl);

    var popper = new Popper(getAnchorEl(anchorEl), tooltipRef.current, _extends$1({
      placement: rtlPlacement
    }, popperOptions, {
      modifiers: _extends$1({}, disablePortal ? {} : {
        // It's using scrollParent by default, we can use the viewport when using a portal.
        preventOverflow: {
          boundariesElement: 'window'
        }
      }, modifiers, popperOptions.modifiers),
      // We could have been using a custom modifier like react-popper is doing.
      // But it seems this is the best public API for this use case.
      onCreate: createChainedFunction(handlePopperUpdate, popperOptions.onCreate),
      onUpdate: createChainedFunction(handlePopperUpdate, popperOptions.onUpdate)
    }));
    handlePopperRefRef.current(popper);
  }, [anchorEl, disablePortal, modifiers, open, rtlPlacement, popperOptions]);
  var handleRef = react.useCallback(function (node) {
    setRef(ownRef, node);
    handleOpen();
  }, [ownRef, handleOpen]);

  var handleEnter = function handleEnter() {
    setExited(false);
  };

  var handleClose = function handleClose() {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current(null);
  };

  var handleExited = function handleExited() {
    setExited(true);
    handleClose();
  };

  react.useEffect(function () {
    return function () {
      handleClose();
    };
  }, []);
  react.useEffect(function () {
    if (!open && !transition) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open, transition]);

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  var childProps = {
    placement: placement
  };

  if (transition) {
    childProps.TransitionProps = {
      in: open,
      onEnter: handleEnter,
      onExited: handleExited
    };
  }

  return /*#__PURE__*/react.createElement(Portal, {
    disablePortal: disablePortal,
    container: container
  }, /*#__PURE__*/react.createElement("div", _extends$1({
    ref: handleRef,
    role: "tooltip"
  }, other, {
    style: _extends$1({
      // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
      position: 'fixed',
      // Fix Popper.js display issue
      top: 0,
      left: 0,
      display: !open && keepMounted && !transition ? 'none' : null
    }, style)
  }), typeof children === 'function' ? children(childProps) : children));
});

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
  }, /*#__PURE__*/react.createElement(SwitchBase$1, _extends$1({
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
var k = withStyles(styles$4, {
  name: 'MuiSwitch'
})(Switch);

/**
 * @ignore - internal component.
 */

var TableContext = react.createContext();

/**
 * @ignore - internal component.
 */

var Tablelvl2Context = react.createContext();

var styles$5 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: _extends$1({}, theme.typography.body2, {
      display: 'table-cell',
      verticalAlign: 'inherit',
      // Workaround for a rendering bug with spanned columns in Chrome 62.0.
      // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
      borderBottom: "1px solid\n    ".concat(theme.palette.type === 'light' ? lighten(fade(theme.palette.divider, 1), 0.88) : darken(fade(theme.palette.divider, 1), 0.68)),
      textAlign: 'left',
      padding: 16
    }),

    /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
    head: {
      color: theme.palette.text.primary,
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightMedium
    },

    /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
    body: {
      color: theme.palette.text.primary
    },

    /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
    footer: {
      color: theme.palette.text.secondary,
      lineHeight: theme.typography.pxToRem(21),
      fontSize: theme.typography.pxToRem(12)
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      padding: '6px 24px 6px 16px',
      '&:last-child': {
        paddingRight: 16
      },
      '&$paddingCheckbox': {
        width: 24,
        // prevent the checkbox column from growing
        padding: '0 12px 0 16px',
        '&:last-child': {
          paddingLeft: 12,
          paddingRight: 16
        },
        '& > *': {
          padding: 0
        }
      }
    },

    /* Styles applied to the root element if `padding="checkbox"`. */
    paddingCheckbox: {
      width: 48,
      // prevent the checkbox column from growing
      padding: '0 0 0 4px',
      '&:last-child': {
        paddingLeft: 0,
        paddingRight: 4
      }
    },

    /* Styles applied to the root element if `padding="none"`. */
    paddingNone: {
      padding: 0,
      '&:last-child': {
        padding: 0
      }
    },

    /* Styles applied to the root element if `align="left"`. */
    alignLeft: {
      textAlign: 'left'
    },

    /* Styles applied to the root element if `align="center"`. */
    alignCenter: {
      textAlign: 'center'
    },

    /* Styles applied to the root element if `align="right"`. */
    alignRight: {
      textAlign: 'right',
      flexDirection: 'row-reverse'
    },

    /* Styles applied to the root element if `align="justify"`. */
    alignJustify: {
      textAlign: 'justify'
    },

    /* Styles applied to the root element if `context.table.stickyHeader={true}`. */
    stickyHeader: {
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 2,
      backgroundColor: theme.palette.background.default
    }
  };
};
/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 */

var TableCell = /*#__PURE__*/react.forwardRef(function TableCell(props, ref) {
  var _props$align = props.align,
      align = _props$align === void 0 ? 'inherit' : _props$align,
      classes = props.classes,
      className = props.className,
      component = props.component,
      paddingProp = props.padding,
      scopeProp = props.scope,
      sizeProp = props.size,
      sortDirection = props.sortDirection,
      variantProp = props.variant,
      other = _objectWithoutProperties(props, ["align", "classes", "className", "component", "padding", "scope", "size", "sortDirection", "variant"]);

  var table = react.useContext(TableContext);
  var tablelvl2 = react.useContext(Tablelvl2Context);
  var isHeadCell = tablelvl2 && tablelvl2.variant === 'head';
  var role;
  var Component;

  if (component) {
    Component = component;
    role = isHeadCell ? 'columnheader' : 'cell';
  } else {
    Component = isHeadCell ? 'th' : 'td';
  }

  var scope = scopeProp;

  if (!scope && isHeadCell) {
    scope = 'col';
  }

  var padding = paddingProp || (table && table.padding ? table.padding : 'default');
  var size = sizeProp || (table && table.size ? table.size : 'medium');
  var variant = variantProp || tablelvl2 && tablelvl2.variant;
  var ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return /*#__PURE__*/react.createElement(Component, _extends$1({
    ref: ref,
    className: clsx(classes.root, classes[variant], className, align !== 'inherit' && classes["align".concat(capitalize(align))], padding !== 'default' && classes["padding".concat(capitalize(padding))], size !== 'medium' && classes["size".concat(capitalize(size))], variant === 'head' && table && table.stickyHeader && classes.stickyHeader),
    "aria-sort": ariaSort,
    role: role,
    scope: scope
  }, other));
});
var TableCell$1 = withStyles(styles$5, {
  name: 'MuiTableCell'
})(TableCell);

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

  return /*#__PURE__*/react.createElement("div", _extends$1({
    ref: ref
  }, other), /*#__PURE__*/react.createElement(IconButton, _extends$1({
    onClick: handleBackButtonClick,
    disabled: page === 0,
    color: "inherit"
  }, backIconButtonProps), theme.direction === 'rtl' ? _ref : _ref2), /*#__PURE__*/react.createElement(IconButton, _extends$1({
    onClick: handleNextButtonClick,
    disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
    color: "inherit"
  }, nextIconButtonProps), theme.direction === 'rtl' ? _ref3 : _ref4));
});

var styles$6 = function styles(theme) {
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
      Component = _props$component === void 0 ? TableCell$1 : _props$component,
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

  if (Component === TableCell$1 || Component === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  var selectId = useId();
  var labelId = useId();
  var MenuItemComponent = SelectProps.native ? 'option' : _;
  return /*#__PURE__*/react.createElement(Component, _extends$1({
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
  }, labelRowsPerPage), rowsPerPageOptions.length > 1 && /*#__PURE__*/react.createElement(H, _extends$1({
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
    backIconButtonProps: _extends$1({
      title: backIconButtonText,
      'aria-label': backIconButtonText
    }, backIconButtonProps),
    count: count,
    nextIconButtonProps: _extends$1({
      title: nextIconButtonText,
      'aria-label': nextIconButtonText
    }, nextIconButtonProps),
    onChangePage: onChangePage,
    page: page,
    rowsPerPage: rowsPerPage
  })));
});
var $ = withStyles(styles$6, {
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

var styles$7 = function styles(theme) {
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
      PopperComponent = _props$PopperComponen === void 0 ? Popper$1 : _props$PopperComponen,
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

  var childrenProps = _extends$1({
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
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.cloneElement(children, childrenProps), /*#__PURE__*/react.createElement(PopperComponent, _extends$1({
    className: clsx(classes.popper, interactive && classes.popperInteractive, arrow && classes.popperArrow),
    placement: placement,
    anchorEl: childNode,
    open: childNode ? open : false,
    id: childrenProps['aria-describedby'],
    transition: true
  }, interactiveWrapperListeners, mergedPopperProps), function (_ref) {
    var placementInner = _ref.placement,
        TransitionPropsInner = _ref.TransitionProps;
    return /*#__PURE__*/react.createElement(TransitionComponent, _extends$1({
      timeout: theme.transitions.duration.shorter
    }, TransitionPropsInner, TransitionProps), /*#__PURE__*/react.createElement("div", {
      className: clsx(classes.tooltip, classes["tooltipPlacement".concat(capitalize(placementInner.split('-')[0]))], ignoreNonTouchEvents.current && classes.touch, arrow && classes.tooltipArrow)
    }, title, arrow ? /*#__PURE__*/react.createElement("span", {
      className: classes.arrow,
      ref: setArrowRef
    }) : null));
  }));
});
var R = withStyles(styles$7, {
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
***************************************************************************** */function X(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);}return n}function Y(e,t){return e===t||e!=e&&t!=t}function K(e,t){for(var n=e.length;n--;)if(Y(e[n][0],t))return n;return -1}var Z=Array.prototype.splice;function q(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}q.prototype.clear=function(){this.__data__=[],this.size=0;},q.prototype.delete=function(e){var t=this.__data__,n=K(t,e);return !(n<0)&&(n==t.length-1?t.pop():Z.call(t,n,1),--this.size,!0)},q.prototype.get=function(e){var t=this.__data__,n=K(t,e);return n<0?void 0:t[n][1]},q.prototype.has=function(e){return K(this.__data__,e)>-1},q.prototype.set=function(e,t){var n=this.__data__,r=K(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this};var J="object"==typeof global&&global&&global.Object===Object&&global,Q="object"==typeof self&&self&&self.Object===Object&&self,ee=J||Q||Function("return this")(),te=ee.Symbol,ne=Object.prototype,re=ne.hasOwnProperty,oe=ne.toString,ie=te?te.toStringTag:void 0;var le=Object.prototype.toString;var ae=te?te.toStringTag:void 0;function se(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":ae&&ae in Object(e)?function(e){var t=re.call(e,ie),n=e[ie];try{e[ie]=void 0;var r=!0;}catch(e){}var o=oe.call(e);return r&&(t?e[ie]=n:delete e[ie]),o}(e):function(e){return le.call(e)}(e)}function ce(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function ue(e){if(!ce(e))return !1;var t=se(e);return "[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}var de,ge=ee["__core-js_shared__"],pe=(de=/[^.]+$/.exec(ge&&ge.keys&&ge.keys.IE_PROTO||""))?"Symbol(src)_1."+de:"";var me=Function.prototype.toString;function he(e){if(null!=e){try{return me.call(e)}catch(e){}try{return e+""}catch(e){}}return ""}var fe=/^\[object .+?Constructor\]$/,be=Function.prototype,ve=Object.prototype,we=be.toString,Ce=ve.hasOwnProperty,ye=RegExp("^"+we.call(Ce).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Se(e){return !(!ce(e)||(t=e,pe&&pe in t))&&(ue(e)?ye:fe).test(he(e));var t;}function Oe(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return Se(n)?n:void 0}var Me=Oe(ee,"Map"),xe=Oe(Object,"create");var je=Object.prototype.hasOwnProperty;var Ie=Object.prototype.hasOwnProperty;function ze(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}function Re(e,t){var n,r,o=e.__data__;return ("string"==(r=typeof(n=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof t?"string":"hash"]:o.map}function _e(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}ze.prototype.clear=function(){this.__data__=xe?xe(null):{},this.size=0;},ze.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},ze.prototype.get=function(e){var t=this.__data__;if(xe){var n=t[e];return "__lodash_hash_undefined__"===n?void 0:n}return je.call(t,e)?t[e]:void 0},ze.prototype.has=function(e){var t=this.__data__;return xe?void 0!==t[e]:Ie.call(t,e)},ze.prototype.set=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=xe&&void 0===t?"__lodash_hash_undefined__":t,this},_e.prototype.clear=function(){this.size=0,this.__data__={hash:new ze,map:new(Me||q),string:new ze};},_e.prototype.delete=function(e){var t=Re(this,e).delete(e);return this.size-=t?1:0,t},_e.prototype.get=function(e){return Re(this,e).get(e)},_e.prototype.has=function(e){return Re(this,e).has(e)},_e.prototype.set=function(e,t){var n=Re(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this};function De(e){var t=this.__data__=new q(e);this.size=t.size;}De.prototype.clear=function(){this.__data__=new q,this.size=0;},De.prototype.delete=function(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n},De.prototype.get=function(e){return this.__data__.get(e)},De.prototype.has=function(e){return this.__data__.has(e)},De.prototype.set=function(e,t){var n=this.__data__;if(n instanceof q){var r=n.__data__;if(!Me||r.length<199)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new _e(r);}return n.set(e,t),this.size=n.size,this};function Fe(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new _e;++t<n;)this.add(e[t]);}function Ee(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(t(e[n],n,e))return !0;return !1}Fe.prototype.add=Fe.prototype.push=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this},Fe.prototype.has=function(e){return this.__data__.has(e)};function Te(e,t,n,r,o,i){var l=1&n,a=e.length,s=t.length;if(a!=s&&!(l&&s>a))return !1;var c=i.get(e);if(c&&i.get(t))return c==t;var u=-1,d=!0,g=2&n?new Fe:void 0;for(i.set(e,t),i.set(t,e);++u<a;){var p=e[u],m=t[u];if(r)var h=l?r(m,p,u,t,e,i):r(p,m,u,e,t,i);if(void 0!==h){if(h)continue;d=!1;break}if(g){if(!Ee(t,(function(e,t){if(l=t,!g.has(l)&&(p===e||o(p,e,n,r,i)))return g.push(t);var l;}))){d=!1;break}}else if(p!==m&&!o(p,m,n,r,i)){d=!1;break}}return i.delete(e),i.delete(t),d}var Pe=ee.Uint8Array;function ke(e){var t=-1,n=Array(e.size);return e.forEach((function(e,r){n[++t]=[r,e];})),n}function Le(e){var t=-1,n=Array(e.size);return e.forEach((function(e){n[++t]=e;})),n}var Ae=te?te.prototype:void 0,Ge=Ae?Ae.valueOf:void 0;var Ne=Array.isArray;var He=Object.prototype.propertyIsEnumerable,Ve=Object.getOwnPropertySymbols,Be=Ve?function(e){return null==e?[]:(e=Object(e),function(e,t){for(var n=-1,r=null==e?0:e.length,o=0,i=[];++n<r;){var l=e[n];t(l,n,e)&&(i[o++]=l);}return i}(Ve(e),(function(t){return He.call(e,t)})))}:function(){return []};function $e(e){return null!=e&&"object"==typeof e}function We(e){return $e(e)&&"[object Arguments]"==se(e)}var Ue=Object.prototype,Xe=Ue.hasOwnProperty,Ye=Ue.propertyIsEnumerable,Ke=We(function(){return arguments}())?We:function(e){return $e(e)&&Xe.call(e,"callee")&&!Ye.call(e,"callee")};var Ze="object"==typeof exports&&exports&&!exports.nodeType&&exports,qe=Ze&&"object"==typeof module&&module&&!module.nodeType&&module,Je=qe&&qe.exports===Ze?ee.Buffer:void 0,Qe=(Je?Je.isBuffer:void 0)||function(){return !1},et=/^(?:0|[1-9]\d*)$/;function tt(e,t){var n=typeof e;return !!(t=null==t?9007199254740991:t)&&("number"==n||"symbol"!=n&&et.test(e))&&e>-1&&e%1==0&&e<t}function nt(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}var rt={};rt["[object Float32Array]"]=rt["[object Float64Array]"]=rt["[object Int8Array]"]=rt["[object Int16Array]"]=rt["[object Int32Array]"]=rt["[object Uint8Array]"]=rt["[object Uint8ClampedArray]"]=rt["[object Uint16Array]"]=rt["[object Uint32Array]"]=!0,rt["[object Arguments]"]=rt["[object Array]"]=rt["[object ArrayBuffer]"]=rt["[object Boolean]"]=rt["[object DataView]"]=rt["[object Date]"]=rt["[object Error]"]=rt["[object Function]"]=rt["[object Map]"]=rt["[object Number]"]=rt["[object Object]"]=rt["[object RegExp]"]=rt["[object Set]"]=rt["[object String]"]=rt["[object WeakMap]"]=!1;var ot,it="object"==typeof exports&&exports&&!exports.nodeType&&exports,lt=it&&"object"==typeof module&&module&&!module.nodeType&&module,at=lt&&lt.exports===it&&J.process,st=function(){try{return at&&at.binding&&at.binding("util")}catch(e){}}(),ct=st&&st.isTypedArray,ut=ct?(ot=ct,function(e){return ot(e)}):function(e){return $e(e)&&nt(e.length)&&!!rt[se(e)]},dt=Object.prototype.hasOwnProperty;function gt(e,t){var n=Ne(e),r=!n&&Ke(e),o=!n&&!r&&Qe(e),i=!n&&!r&&!o&&ut(e),l=n||r||o||i,a=l?function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}(e.length,String):[],s=a.length;for(var c in e)!t&&!dt.call(e,c)||l&&("length"==c||o&&("offset"==c||"parent"==c)||i&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||tt(c,s))||a.push(c);return a}var pt=Object.prototype;var mt=function(e,t){return function(n){return e(t(n))}}(Object.keys,Object),ht=Object.prototype.hasOwnProperty;function ft(e){if(n=(t=e)&&t.constructor,t!==("function"==typeof n&&n.prototype||pt))return mt(e);var t,n,r=[];for(var o in Object(e))ht.call(e,o)&&"constructor"!=o&&r.push(o);return r}function bt(e){return null!=(t=e)&&nt(t.length)&&!ue(t)?gt(e):ft(e);var t;}function vt(e){return function(e,t,n){var r=t(e);return Ne(e)?r:function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}(r,n(e))}(e,bt,Be)}var wt=Object.prototype.hasOwnProperty;var Ct=Oe(ee,"DataView"),yt=Oe(ee,"Promise"),St=Oe(ee,"Set"),Ot=Oe(ee,"WeakMap"),Mt=he(Ct),xt=he(Me),jt=he(yt),It=he(St),zt=he(Ot),Rt=se;(Ct&&"[object DataView]"!=Rt(new Ct(new ArrayBuffer(1)))||Me&&"[object Map]"!=Rt(new Me)||yt&&"[object Promise]"!=Rt(yt.resolve())||St&&"[object Set]"!=Rt(new St)||Ot&&"[object WeakMap]"!=Rt(new Ot))&&(Rt=function(e){var t=se(e),n="[object Object]"==t?e.constructor:void 0,r=n?he(n):"";if(r)switch(r){case Mt:return "[object DataView]";case xt:return "[object Map]";case jt:return "[object Promise]";case It:return "[object Set]";case zt:return "[object WeakMap]"}return t});var _t=Rt,Dt=Object.prototype.hasOwnProperty;function Ft(e,t,n,r,o,i){var l=Ne(e),a=Ne(t),s=l?"[object Array]":_t(e),c=a?"[object Array]":_t(t),u="[object Object]"==(s="[object Arguments]"==s?"[object Object]":s),d="[object Object]"==(c="[object Arguments]"==c?"[object Object]":c),g=s==c;if(g&&Qe(e)){if(!Qe(t))return !1;l=!0,u=!1;}if(g&&!u)return i||(i=new De),l||ut(e)?Te(e,t,n,r,o,i):function(e,t,n,r,o,i,l){switch(n){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return !1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return !(e.byteLength!=t.byteLength||!i(new Pe(e),new Pe(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return Y(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var a=ke;case"[object Set]":var s=1&r;if(a||(a=Le),e.size!=t.size&&!s)return !1;var c=l.get(e);if(c)return c==t;r|=2,l.set(e,t);var u=Te(a(e),a(t),r,o,i,l);return l.delete(e),u;case"[object Symbol]":if(Ge)return Ge.call(e)==Ge.call(t)}return !1}(e,t,s,n,r,o,i);if(!(1&n)){var p=u&&Dt.call(e,"__wrapped__"),m=d&&Dt.call(t,"__wrapped__");if(p||m){var h=p?e.value():e,f=m?t.value():t;return i||(i=new De),o(h,f,n,r,i)}}return !!g&&(i||(i=new De),function(e,t,n,r,o,i){var l=1&n,a=vt(e),s=a.length;if(s!=vt(t).length&&!l)return !1;for(var c=s;c--;){var u=a[c];if(!(l?u in t:wt.call(t,u)))return !1}var d=i.get(e);if(d&&i.get(t))return d==t;var g=!0;i.set(e,t),i.set(t,e);for(var p=l;++c<s;){var m=e[u=a[c]],h=t[u];if(r)var f=l?r(h,m,u,t,e,i):r(m,h,u,e,t,i);if(!(void 0===f?m===h||o(m,h,n,r,i):f)){g=!1;break}p||(p="constructor"==u);}if(g&&!p){var b=e.constructor,v=t.constructor;b==v||!("constructor"in e)||!("constructor"in t)||"function"==typeof b&&b instanceof b&&"function"==typeof v&&v instanceof v||(g=!1);}return i.delete(e),i.delete(t),g}(e,t,n,r,o,i))}function Et(e,t,n,r,o){return e===t||(null==e||null==t||!$e(e)&&!$e(t)?e!=e&&t!=t:Ft(e,t,n,r,Et,o))}function Tt(e,t){return Et(e,t)}function Pt(e){return e instanceof Date}function kt(e){return Array.isArray(e)}function Lt(e){return "string"==typeof e}function At(e){return "number"==typeof e}function Gt(e){return "function"==typeof e}function Ht(e){return e.type||e.mode}function Vt(){return "alpha"in p}function Bt(e,t){var n,r;return Vt()?null===(n=p)||void 0===n?void 0:n.alpha(e,t):null===(r=p)||void 0===r?void 0:r.fade(e,t)}function $t(){try{const e="__some_random_key_you_are_not_going_to_use__";return window.localStorage.setItem(e,e),window.localStorage.removeItem(e),!0}catch(e){return !1}}const Wt=makeStyles$1((e=>{const t="light"===Ht(e.palette)?lighten(Bt(e.palette.divider,1),.88):darken(Bt(e.palette.divider,1),.68),n={root:Object.assign(Object.assign({flex:1,boxSizing:"border-box",position:"relative",border:"1px solid "+t,borderRadius:e.shape.borderRadius,color:e.palette.text.primary},e.typography.body2),{outline:"none",display:"flex",flexDirection:"column","& *, & *::before, & *::after":{boxSizing:"inherit"},"& .MuiDataGrid-main":{position:"relative",flexGrow:1,display:"flex",flexDirection:"column"},"& .MuiDataGrid-overlay":{display:"flex",position:"absolute",top:0,left:0,right:0,bottom:0,alignSelf:"center",alignItems:"center",justifyContent:"center",backgroundColor:Bt(e.palette.background.default,e.palette.action.disabledOpacity)},"& .MuiDataGrid-toolbar":{display:"flex",alignItems:"center",padding:"4px 4px 0"},"& .MuiDataGrid-columnsContainer":{position:"absolute",top:0,left:0,right:0,overflow:"hidden",display:"flex",flexDirection:"column",borderBottom:"1px solid "+t},"& .MuiDataGrid-scrollArea":{position:"absolute",top:0,zIndex:101,width:20,bottom:0},"& .MuiDataGrid-scrollArea-left":{left:0},"& .MuiDataGrid-scrollArea-right":{right:0},"& .MuiDataGrid-colCellWrapper":{display:"flex",width:"100%",alignItems:"center",overflow:"hidden"},"& .MuiDataGrid-colCell, & .MuiDataGrid-cell":{WebkitTapHighlightColor:"transparent",lineHeight:null,padding:e.spacing(0,2)},"& .MuiDataGrid-colCell:focus, & .MuiDataGrid-cell:focus":{outline:"dotted",outlineWidth:1,outlineOffset:-2},"& .MuiDataGrid-colCellCheckbox, & .MuiDataGrid-cellCheckbox":{padding:0,justifyContent:"center",alignItems:"center"},"& .MuiDataGrid-colCell":{position:"relative",display:"flex",alignItems:"center"},"& .MuiDataGrid-colCellTitleContainer":{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",display:"inline-flex",flex:1},"& .MuiDataGrid-colCellNumeric .MuiDataGrid-iconButtonContainer":{paddingRight:5},"& .MuiDataGrid-colCellSortable":{cursor:"pointer"},"& .MuiDataGrid-sortIcon":{fontSize:18},"& .MuiDataGrid-colCellCenter .MuiDataGrid-colCellTitleContainer":{justifyContent:"center"},"& .MuiDataGrid-colCellRight .MuiDataGrid-colCellTitleContainer":{justifyContent:"flex-end"},"& .MuiDataGrid-colCellTitle":{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontWeight:e.typography.fontWeightMedium},"& .MuiDataGrid-colCellMoving":{backgroundColor:e.palette.action.hover},"& .MuiDataGrid-columnSeparator":{position:"absolute",right:-12,zIndex:100,display:"flex",flexDirection:"column",justifyContent:"center",color:t},"& .MuiDataGrid-columnSeparatorResizable":{cursor:"col-resize",touchAction:"none","&:hover":{color:e.palette.text.primary,"@media (hover: none)":{color:t}},"&.Mui-resizing":{color:e.palette.text.primary}},"& .MuiDataGrid-iconSeparator":{color:"inherit"},"& .MuiDataGrid-menuIcon":{visibility:"hidden",fontSize:20,marginRight:-6,display:"flex",alignItems:"center"},"& .MuiDataGrid-colCell:hover .MuiDataGrid-menuIcon, .MuiDataGrid-menuOpen":{visibility:"visible"},"& .MuiDataGrid-colCellWrapper.scroll .MuiDataGrid-colCell:last-child":{borderRight:"none"},"& .MuiDataGrid-dataContainer":{position:"relative",flexGrow:1,display:"flex",flexDirection:"column"},"& .MuiDataGrid-window":{position:"absolute",bottom:0,left:0,right:0,overflowX:"auto"},"& .MuiDataGrid-viewport":{position:"sticky",top:0,left:0,display:"flex",flexDirection:"column",overflow:"hidden"},"& .MuiDataGrid-row":{display:"flex",width:"fit-content","&:hover":{backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},"&.Mui-selected":{backgroundColor:Bt(e.palette.primary.main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:Bt(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:Bt(e.palette.primary.main,e.palette.action.selectedOpacity)}}}},"& .MuiDataGrid-cell":{display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",borderBottom:"1px solid "+t},"& .MuiDataGrid-colCellWrapper .MuiDataGrid-cell":{borderBottom:"none"},"& .MuiDataGrid-cellWithRenderer":{display:"flex",alignItems:"center"},"& .MuiDataGrid-withBorder":{borderRight:"1px solid "+t},"& .MuiDataGrid-cellLeft":{textAlign:"left"},"& .MuiDataGrid-cellRight":{textAlign:"right"},"& .MuiDataGrid-cellCenter":{textAlign:"center"},"& .MuiDataGrid-rowCount, & .MuiDataGrid-selectedRowCount":{alignItems:"center",display:"flex",margin:e.spacing(0,2)},"& .MuiDataGrid-footer":{display:"flex",justifyContent:"space-between",alignItems:"center",minHeight:52,"& .MuiDataGrid-selectedRowCount":{visibility:"hidden",width:0,[e.breakpoints.up("sm")]:{visibility:"visible",width:"auto"}}},"& .MuiDataGrid-colCell-dropZone .MuiDataGrid-colCell-draggable":{cursor:"move"},"& .MuiDataGrid-colCell-draggable":{display:"flex",width:"100%",justifyContent:"inherit"},"& .MuiDataGrid-colCell-dragging":{background:e.palette.background.paper,padding:"0 12px",borderRadius:e.shape.borderRadius,opacity:e.palette.action.disabledOpacity}})};if("dark"===Ht(e.palette)){const e="#202022",t="#585859",r="#838384";n.root=Object.assign(Object.assign({},n.root),{scrollbarColor:`${t} ${e}`,"& *::-webkit-scrollbar":{backgroundColor:e},"& *::-webkit-scrollbar-thumb":{borderRadius:8,backgroundColor:t,minHeight:24,border:"3px solid "+e},"& *::-webkit-scrollbar-thumb:focus":{backgroundColor:r},"& *::-webkit-scrollbar-thumb:active":{backgroundColor:r},"& *::-webkit-scrollbar-thumb:hover":{backgroundColor:r},"& *::-webkit-scrollbar-corner":{backgroundColor:e}});}return n}),{name:"MuiDataGrid"}),Xt=e=>e.columns.all,Yt=e=>e.columns.lookup,Kt=createSelector(Xt,Yt,((e,t)=>e.map((e=>t[e])))),Zt=createSelector(Kt,(e=>e.filter((e=>null!=e.field&&!e.hide)))),qt=createSelector(Zt,(e=>{const t=[];return {totalWidth:e.reduce(((e,n)=>(t.push(e),e+n.width)),0),positions:t}})),Jt=createSelector(Kt,(e=>e.filter((e=>e.filterable)))),Qt=createSelector(Jt,(e=>e.map((e=>e.field)))),en=createSelector(Zt,(e=>e.length)),tn=createSelector(qt,(e=>e.totalWidth)),$n=$t()&&null!=window.localStorage.getItem("DEBUG"),Wn=()=>{},Un={debug:Wn,info:Wn,warn:Wn,error:Wn},Xn=["debug","info","warn","error"];function Yn(e,t,n=console){const r=Xn.indexOf(t);if(-1===r)throw new Error(`Material-UI: Log level ${t} not recognized.`);return Xn.reduce(((t,o,i)=>(t[o]=i>=r?(...t)=>{const[r,...i]=t;n[o](`Material-UI: ${e} - ${r}`,...i);}:Wn,t)),{})}const Kn=e=>t=>Yn(t,e);let Zn;function qn(e,t=("error")){Zn=$n?Kn("debug"):e?Gt(e)?e:t?n=>Yn(n,t.toString(),e):null:t?Kn(t.toString()):null;}function Jn(t){const{current:n}=react.useRef(Zn?Zn(t):Un);return n}function Qn(n,r,o){const i=Jn("useApiMethod"),l=react.useRef(r);react.useEffect((()=>{l.current=r;}),[r]),react.useEffect((()=>{n.current.isInitialised&&Object.keys(r).forEach((e=>{n.current.hasOwnProperty(e)||(i.debug(`Adding ${o}.${e} to apiRef`),n.current[e]=(...t)=>l.current[e](...t));}));}),[r,o,n,i]);}const tr={rootGridLabel:"grid",noRowsLabel:"No rows",errorOverlayDefaultLabel:"An error occurred.",toolbarDensity:"Density",toolbarDensityLabel:"Density",toolbarDensityCompact:"Compact",toolbarDensityStandard:"Standard",toolbarDensityComfortable:"Comfortable",toolbarColumns:"Columns",toolbarColumnsLabel:"Show Column Selector",toolbarFilters:"Filters",toolbarFiltersLabel:"Show Filters",toolbarFiltersTooltipHide:"Hide Filters",toolbarFiltersTooltipShow:"Show Filters",toolbarFiltersTooltipActive:e=>e+" active filter(s)",columnsPanelTextFieldLabel:"Find column",columnsPanelTextFieldPlaceholder:"Column title",columnsPanelDragIconLabel:"Reorder Column",columnsPanelShowAllButton:"Show All",columnsPanelHideAllButton:"Hide All",filterPanelAddFilter:"Add Filter",filterPanelDeleteIconLabel:"Delete",filterPanelOperators:"Operators",filterPanelOperatorAnd:"And",filterPanelOperatorOr:"Or",filterPanelColumns:"Columns",columnMenuLabel:"Menu",columnMenuShowColumns:"Show columns",columnMenuFilter:"Filter",columnMenuHideColumn:"Hide",columnMenuUnsort:"Unsort",columnMenuSortAsc:"Sort by Asc",columnMenuSortDesc:"Sort by Desc",columnHeaderFiltersTooltipActive:e=>e+" active filter(s)",columnHeaderFiltersLabel:"Show Filters",columnHeaderSortIconLabel:"Sort",footerRowSelected:e=>1!==e?e.toLocaleString()+" rows selected":e.toLocaleString()+" row selected",footerTotalRows:"Total Rows:",footerPaginationRowsPerPage:"Rows per page:"},nr=(e,t)=>{const n=e.indexOf(t);return t&&-1!==n&&n+1!==e.length?e[n+1]:e[0]},rr=e=>"desc"===e,or=(e,t)=>null==e&&null!=t?-1:null==t&&null!=e?1:null==e&&null==t?0:null,ir=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=or(o,i);return null!==l?l:"string"==typeof o?o.localeCompare(i.toString()):o-i},lr=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=or(o,i);return null!==l?l:Number(o)-Number(i)},ar=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=or(o,i);return null!==l?l:o>i?1:o<i?-1:0},sr=createSvgIcon(react.createElement("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"})),cr=createSvgIcon(react.createElement("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"})),ur=createSvgIcon(react.createElement("path",{d:"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"})),dr=createSvgIcon(react.createElement("path",{d:"M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"}));createSvgIcon(react.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}));createSvgIcon(react.createElement("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}));createSvgIcon(react.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}));const hr=createSvgIcon(react.createElement("path",{d:"M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"})),fr=createSvgIcon(react.createElement("path",{d:"M11 19V5h2v14z"})),br=createSvgIcon(react.createElement("path",{d:"M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"})),vr=createSvgIcon(react.createElement("path",{d:"M21,8H3V4h18V8z M21,10H3v4h18V10z M21,16H3v4h18V16z"})),wr=createSvgIcon(react.createElement("path",{d:"M4 18h17v-6H4v6zM4 5v6h17V5H4z"})),Cr=createSvgIcon(react.createElement("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})),yr=createSvgIcon(react.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),Sr=createSvgIcon(react.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})),Or=createSvgIcon(react.createElement("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"})),Mr=createSvgIcon(react.createElement("path",{d:"M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}));function xr(i){const{item:l,applyValue:a,type:s}=i,c=react.useRef(),[u,d]=react.useState(l.value||""),[g,p]=react.useState(!1),m=react.useCallback((e=>{clearTimeout(c.current);const t=e.target.value;d(t),p(!0),c.current=setTimeout((()=>{a(Object.assign(Object.assign({},l),{value:t})),p(!1);}),500);}),[a,l]);react.useEffect((()=>()=>{clearTimeout(c.current);}),[]),react.useEffect((()=>{d(l.value||"");}),[l.value]);const h=g?{endAdornment:react.createElement(Or,null)}:void 0;return react.createElement(TextField,{label:"Value",placeholder:"Filter value",value:u,onChange:m,type:s||"text",variant:"standard",InputProps:h,InputLabelProps:{shrink:!0}})}const jr=()=>[{label:"contains",value:"contains",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(e.value,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:xr},{label:"equals",value:"equals",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{var r;const o=t.valueGetter?t.valueGetter(n):n.value;return 0===(null===(r=e.value)||void 0===r?void 0:r.localeCompare((null==o?void 0:o.toString())||"",void 0,{sensitivity:"base"}))}:null,InputComponent:xr},{label:"starts with",value:"startsWith",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(`^${e.value}.*$`,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:xr},{label:"ends with",value:"endsWith",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(`.*${e.value}$`,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:xr}],Ir={width:100,hide:!1,sortable:!0,resizable:!0,filterable:!0,sortDirection:null,sortComparator:ir,type:"string",align:"left",filterOperators:jr()},zr=()=>[{label:"=",value:"=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)===Number(e.value)}:null,InputComponent:xr,InputComponentProps:{type:"number"}},{label:"!=",value:"!=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)!==Number(e.value)}:null,InputComponent:xr,InputComponentProps:{type:"number"}},{label:">",value:">",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)>Number(e.value)}:null,InputComponent:xr,InputComponentProps:{type:"number"}},{label:">=",value:">=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)>=Number(e.value)}:null,InputComponent:xr,InputComponentProps:{type:"number"}},{label:"<",value:"<",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)<Number(e.value)}:null,InputComponent:xr,InputComponentProps:{type:"number"}},{label:"<=",value:"<=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)<=Number(e.value)}:null,InputComponent:xr,InputComponentProps:{type:"number"}}],Rr=Object.assign(Object.assign({},Ir),{type:"number",align:"right",headerAlign:"right",sortComparator:lr,valueFormatter:({value:e})=>e&&At(e)&&e.toLocaleString()||e,filterOperators:zr()}),_r=e=>[{label:"is",value:"is",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()===n:new Date(r.toString()).getTime()===n)}},InputComponent:xr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is not",value:"not",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()!==n:new Date(r.toString()).getTime()!==n)}},InputComponent:xr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is after",value:"after",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()>n:new Date(r.toString()).getTime()>n)}},InputComponent:xr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is on or after",value:"onOrAfter",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()>=n:new Date(r.toString()).getTime()>=n)}},InputComponent:xr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is before",value:"before",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()<n:new Date(r.toString()).getTime()<n)}},InputComponent:xr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is on or before",value:"onOrBefore",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()<=n:new Date(r.toString()).getTime()<=n)}},InputComponent:xr,InputComponentProps:{type:e?"datetime-local":"date"}}];function Dr({value:e}){return Pt(e)?e.toLocaleDateString():e}function Fr({value:e}){return Pt(e)?e.toLocaleString():e}const Er=Object.assign(Object.assign({},Ir),{type:"date",sortComparator:ar,valueFormatter:Dr,filterOperators:_r()}),Tr=Object.assign(Object.assign({},Ir),{type:"dateTime",sortComparator:ar,valueFormatter:Fr,filterOperators:_r(!0)}),kr=()=>{const e={string:Object.assign({},Ir),number:Object.assign({},Rr),date:Object.assign({},Er),dateTime:Object.assign({},Tr)};return e.__default__=Object.assign({},Ir),e};var Lr;!function(e){e.Compact="compact",e.Standard="standard",e.Comfortable="comfortable";}(Lr||(Lr={}));const Ar={client:"client",server:"server"},Gr={rowHeight:52,headerHeight:56,scrollbarSize:15,columnBuffer:2,rowsPerPageOptions:[25,50,100],pageSize:100,paginationMode:Ar.client,sortingMode:Ar.client,filterMode:Ar.client,sortingOrder:["asc","desc",null],columnTypes:kr(),density:Lr.Standard,showToolbar:!1,localeText:tr};var Hr;!function(e){e.And="and",e.Or="or";}(Hr||(Hr={}));const Vr=()=>({items:[],linkOperator:Hr.And});function $r(e){return {type:"SET_PAGE_ACTION",payload:{page:e}}}function Wr(e){return {type:"SET_PAGESIZE_ACTION",payload:{pageSize:e}}}function Ur(e){return {type:"SET_PAGINATION_MODE_ACTION",payload:e}}function Xr(e){return {type:"SET_ROWCOUNT_ACTION",payload:e}}const Yr=(e,t)=>e&&t>0?Math.ceil(t/e):1,Kr=(e,{page:t})=>e.page!==t?Object.assign(Object.assign({},e),{page:t}):e,Zr=(e,t)=>{const{pageSize:n}=t;if(e.pageSize===n)return e;return Object.assign(Object.assign({},e),{pageSize:n,pageCount:Yr(n,e.rowCount)})},qr=(e,t)=>{const{totalRowCount:n}=t;if(e.rowCount!==n){const t=Yr(e.pageSize,n);return Object.assign(Object.assign({},e),{pageCount:t,rowCount:n,page:e.page>t?t:e.page})}return e},Jr={page:1,pageCount:0,pageSize:0,paginationMode:"client",rowCount:0},Qr=(e,t)=>{switch(t.type){case"SET_PAGE_ACTION":return Kr(e,t.payload);case"SET_PAGESIZE_ACTION":return Zr(e,t.payload);case"SET_PAGINATION_MODE_ACTION":return Object.assign(Object.assign({},e),{paginationMode:t.payload.paginationMode});case"SET_ROWCOUNT_ACTION":return qr(e,t.payload);default:throw new Error("Material-UI: Action not found - "+JSON.stringify(t))}};const ro=()=>({rows:{idRowsLookup:{},allRows:[],totalRowCount:0},pagination:Jr,options:Gr,isScrolling:!1,columns:{all:[],lookup:{}},columnReorder:{dragCol:""},rendering:{realScroll:{left:0,top:0},renderContext:null,renderingZoneScroll:{left:0,top:0},virtualPage:0,virtualRowsCount:0,renderedSizes:null},containerSizes:null,scrollBar:{hasScrollX:!1,hasScrollY:!1,scrollBarSize:{x:0,y:0}},viewportSizes:{width:0,height:1},sorting:{sortedRows:[],sortModel:[]},keyboard:{cell:null,isMultipleKeyPressed:!1},selection:{},filter:Vr(),columnMenu:{open:!1},preferencePanel:{open:!1},visibleRows:{visibleRowsLookup:{}},density:{value:Gr.density,rowHeight:Gr.rowHeight,headerHeight:Gr.headerHeight}}),oo=e=>{const t=Jn("useGridApi"),[,n]=react.useState();e.current.isInitialised||e.current.state||(t.info("Initialising state."),e.current.state=ro(),e.current.forceUpdate=n);const i=react.useCallback((t=>t?e.current.state[t]:e.current.state),[e]),l=react.useCallback((t=>e.current.subscribeEvent("stateChange",t)),[e]),a=react.useCallback((t=>{let r;r=Gt(t)?t(e.current.state):t,e.current.state=r,n((()=>r));const o={api:e.current,state:r};e.current.publishEvent("stateChange",o);}),[e]);return Qn(e,{getState:i,onStateChange:l,setState:a},"StateApi"),e.current},io=e=>{oo(e);const t=react.useCallback((()=>e.current.forceUpdate((()=>e.current.state))),[e]),n=react.useCallback((t=>{const n=t(e.current.state),r=e.current.state!==n;if(e.current.state=n,r&&e.current.publishEvent){const t={api:e.current,state:n};e.current.publishEvent("stateChange",t);}}),[e]);return [e.current.state,n,t]},lo=(e,t)=>{const[n]=io(e);return t(n)};function fo(e){return e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth}function bo(e,t){return e.closest("."+t)}function vo(e){return null!=e&&e.classList.contains("MuiDataGrid-cell")}function wo(e){return null!=e&&(vo(e)||null!==bo(e,"MuiDataGrid-cell"))}function yo(e){return e.getAttribute("data-id")}function So(e){return e.getAttribute("data-field")}function Oo(e,t){return e.querySelector(`[data-field="${t}"]`)}function Mo(e){const t=e.getAttribute("data-field"),n=bo(e,"MuiDataGrid-root");if(!n)throw new Error("Material-UI: The root element is not found.");return n.querySelectorAll(`:scope .MuiDataGrid-cell[data-field="${t}"]`)}function zo(...e){return e.reduce(((e,t)=>t?(kt(t)?e+=t.join(" "):Lt(t)?e+=t:"object"==typeof t&&(Object.keys(t).forEach((n=>{t[n]&&(e+=n+" ");})),e=e.trim()),e+=" "):e),"").trim()}const Ro=["Meta","Control"],_o=e=>Ro.indexOf(e)>-1,Fo=e=>" "===e,Eo=e=>0===e.indexOf("Arrow"),To=e=>"Home"===e||"End"===e,Po=e=>0===e.indexOf("Page"),ko=e=>To(e)||Eo(e)||Po(e)||Fo(e);function Lo(e,t){const n=Object.assign(Object.assign({},e),t),r={};return Object.entries(n).forEach((([e,t])=>{t=t.extendType?Object.assign(Object.assign(Object.assign({},n[t.extendType]),t),{type:e}):Object.assign(Object.assign(Object.assign({},n.__default__),t),{type:e}),r[e]=t;})),r}function Ao(e){const t=Object.assign({},e);return Object.keys(e).forEach((n=>{e.hasOwnProperty(n)&&void 0===e[n]&&delete t[n];})),t}function Go(e,t){t=Ao(t);const n=Lo(e.columnTypes,null==t?void 0:t.columnTypes),r=Object.assign(Object.assign({},e),t);return r.columnTypes=n,r}function Ho({element:e,value:t,rowIndex:n,rowModel:r,colDef:o,api:i}){return {element:e,value:t,field:null==o?void 0:o.field,getValue:t=>{const o=i.getColumnFromField(t);return o&&o.valueGetter?o.valueGetter(Ho({value:r[t],colDef:o,rowIndex:n,element:e,rowModel:r,api:i})):r[t]},row:r,colDef:o,rowIndex:n,api:i}}function Vo({element:e,rowIndex:t,rowModel:n,api:r}){return {element:e,columns:r.getAllColumns(),getValue:e=>n[e],row:n,rowIndex:t,api:r}}const Bo=react.createContext(void 0),$o=react.forwardRef((function(e,t){const{className:r,style:i}=e,l=X(e,["className","style"]),s=Wt(),c=react.useContext(Bo),u=lo(c,en),[d]=io(c),g=react.useCallback((t=>{return (n=d.options,r=d.containerSizes,o=e.header,i=e.footer,e=>{const t=r&&r.dataContainerSizes.height||0;if(!n.autoHeight)return e.height;const l=i.current&&i.current.getBoundingClientRect().height||0,a=o.current&&o.current.getBoundingClientRect().height||0;let s=t;return s<n.rowHeight&&(s=2*n.rowHeight),a+l+s+n.headerHeight})(t);var n,r,o,i;}),[d.options,d.containerSizes,e.header,e.footer]);return react.createElement("div",Object.assign({ref:t,className:zo(s.root,r),role:"grid","aria-colcount":u,"aria-rowcount":d.rows.totalRowCount,tabIndex:0,"aria-label":c.current.getLocaleText("rootGridLabel"),"aria-multiselectable":!d.options.disableMultipleSelection,style:Object.assign({width:e.size.width,height:g(e.size)},i)},l))})),Wo=e=>e.density,Uo=createSelector(Wo,(e=>e.value)),Xo=createSelector(Wo,(e=>e.rowHeight)),Yo=createSelector(Wo,(e=>e.headerHeight)),Ko=react.forwardRef((function(e,t){const{className:r,style:o}=e,i=X(e,["className","style"]),l=react.useContext(Bo),s=lo(l,Yo);return react.createElement("div",Object.assign({ref:t,className:zo("MuiDataGrid-columnsContainer",r)},i,{style:Object.assign({minHeight:s,maxHeight:s,lineHeight:s+"px"},o)}))}));function Zo(e){var t,r,o,i;const{className:l}=e,s=X(e,["className"]),c=react.useContext(Bo),[u]=io(c);return react.createElement("div",Object.assign({className:zo("MuiDataGrid-dataContainer","data-container",l),style:{minHeight:null===(r=null===(t=u.containerSizes)||void 0===t?void 0:t.dataContainerSizes)||void 0===r?void 0:r.height,minWidth:null===(i=null===(o=u.containerSizes)||void 0===o?void 0:o.dataContainerSizes)||void 0===i?void 0:i.width}},s))}const qo=function(e){const{className:t}=e,r=X(e,["className"]);return react.createElement("div",Object.assign({className:zo("MuiDataGrid-footer",t)},r))};function Jo(e){const{className:t,style:r}=e,o=X(e,["className","style"]),i=react.useContext(Bo),l=lo(i,Yo);return react.createElement("div",Object.assign({className:zo("MuiDataGrid-overlay",t),style:Object.assign({top:l},r)},o))}const Qo=e=>e.options,ei=react.forwardRef((function(e,t){const{className:r}=e,o=X(e,["className"]),i=react.useContext(Bo),{autoHeight:l}=lo(i,Qo),s=lo(i,Yo);return react.createElement("div",Object.assign({ref:t,className:zo("MuiDataGrid-window",r)},o,{style:{top:s,overflowY:l?"hidden":"auto"}}))})),ti=e=>e.rows,ni=createSelector(ti,(e=>e&&e.totalRowCount)),ri=createSelector(ti,(e=>e&&e.idRowsLookup)),oi=createSelector(ti,(e=>e.allRows.map((t=>e.idRowsLookup[t])))),ii=e=>e.selection,li=createSelector(ii,(e=>Object.keys(e).length)),ai=()=>{const e=react.useContext(Bo),o=lo(e,li),i=lo(e,ni),[l,s]=react.useState(o>0&&o!==i),[c,u]=react.useState(o===i||l);react.useEffect((()=>{const e=o>0&&o!==i;u(o===i||l),s(e);}),[l,i,o]);return react.createElement(j,{indeterminate:l,checked:c,onChange:(t,n)=>{u(n),e.current.selectRows(e.current.getAllRowIds(),n);},className:"MuiDataGrid-checkboxInput",color:"primary",inputProps:{"aria-label":"Select All Rows checkbox"}})};ai.displayName="HeaderCheckbox";const si=react.memo((e=>{const{row:t,getValue:r,field:o}=e,i=react.useContext(Bo);return react.createElement(j,{checked:!!r(o),onChange:(e,n)=>{i.current.selectRow(t.id,n,!0);},className:"MuiDataGrid-checkboxInput",color:"primary",inputProps:{"aria-label":"Select Row checkbox"}})}));si.displayName="CellCheckboxRenderer";const ci={field:"__check__",headerName:"Checkbox Selection",description:"Select Multiple Rows",type:"checkboxSelection",width:48,align:"center",headerAlign:"center",resizable:!0,sortable:!1,filterable:!1,disableClickEventBubbling:!0,disableColumnMenu:!0,valueGetter:e=>e.api.getState().selection[e.row.id],renderHeader:e=>react.createElement(ai,Object.assign({},e)),renderCell:e=>react.createElement(si,Object.assign({},e)),cellClassName:"MuiDataGrid-cellCheckbox",headerClassName:"MuiDataGrid-colCellCheckbox"},ui=(e,t)=>t?e[t]:e.__default__;function hi(e,t){const r="asc"===t?e.ColumnSortedAscendingIcon:e.ColumnSortedDescendingIcon;return react.createElement(r,{className:"MuiDataGrid-sortIcon"})}const fi=react.memo((function(e){const{direction:t,index:r,hide:o}=e,i=react.useContext(Bo);return o||null==t?null:react.createElement("div",{className:"MuiDataGrid-iconButtonContainer"},react.createElement("div",null,null!=r&&react.createElement(I,{badgeContent:r,color:"default"},react.createElement(IconButton,{"aria-label":i.current.getLocaleText("columnHeaderSortIconLabel"),title:i.current.getLocaleText("columnHeaderSortIconLabel"),size:"small"},hi(i.current.components,t))),null==r&&react.createElement(IconButton,{"aria-label":i.current.getLocaleText("columnHeaderSortIconLabel"),title:i.current.getLocaleText("columnHeaderSortIconLabel"),size:"small"},hi(i.current.components,t))))})),bi=react.forwardRef((function(e,t){const{className:r}=e,o=X(e,["className"]);return react.createElement("div",Object.assign({ref:t,className:zo("MuiDataGrid-colCellTitle",r),"aria-label":String(o.children)},o))}));function vi(o){const{label:i,description:l,columnWidth:a}=o,s=react.useRef(null),[c,u]=react.useState("");return react.useEffect((()=>{if(!l&&s&&s.current){const e=fo(s.current);u(e?i:"");}}),[s,a,l,i]),react.createElement(R,{title:l||c},react.createElement(bi,{ref:s},i))}const wi=react.memo((function(e){const{resizable:t,resizing:r,height:i}=e,l=X(e,["resizable","resizing","height"]),s=react.useContext(Bo),{showColumnRightBorder:c}=lo(s,Qo),u=s.current.components.ColumnResizeIcon,d=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();}),[]);return react.createElement("div",Object.assign({className:zo("MuiDataGrid-columnSeparator",{"MuiDataGrid-columnSeparatorResizable":t,"Mui-resizing":r}),style:{minHeight:i,opacity:c?0:1}},l,{onClick:d}),react.createElement(u,{className:"MuiDataGrid-iconSeparator"}))})),Ci=e=>e.columnMenu;function yi(e){const{column:t}=e,r=react.useContext(Bo),i=lo(r,Ci),l=r.current.components.ColumnMenuIcon,s=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();const n=r.current.getState().columnMenu;n.open&&n.field===t.field?r.current.hideColumnMenu():r.current.showColumnMenu(t.field);}),[r,t.field]),c=i.open&&i.field===t.field;return react.createElement("div",{className:zo("MuiDataGrid-menuIcon",{"MuiDataGrid-menuOpen":c})},react.createElement(IconButton,{className:"MuiDataGrid-menuIconButton","aria-label":r.current.getLocaleText("columnMenuLabel"),title:r.current.getLocaleText("columnMenuLabel"),size:"small",onClick:s},react.createElement(l,{fontSize:"small"})))}const Si=e=>e.preferencePanel;var Mi;function xi(e){const{counter:t}=e,r=react.useContext(Bo),i=lo(r,Qo),l=lo(r,Si),s=r.current.components.ColumnFilteredIcon,c=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();const{open:t,openedPanelValue:n}=l;t&&n===Mi.filters?r.current.hideFilterPanel():r.current.showFilterPanel();}),[r,l]);if(!t||i.disableColumnFilter||i.showToolbar)return null;const u=react.createElement(IconButton,{onClick:c,color:"default","aria-label":r.current.getLocaleText("columnHeaderFiltersLabel"),size:"small"},react.createElement(s,{fontSize:"small"}));return react.createElement(R,{title:r.current.getLocaleText("columnHeaderFiltersTooltipActive")(t),enterDelay:1e3},react.createElement("div",{className:"MuiDataGrid-iconButtonContainer"},react.createElement("div",null,t>1&&react.createElement(I,{badgeContent:t,color:"default"},u),1===t&&u)))}!function(e){e.filters="filters",e.columns="columns";}(Mi||(Mi={}));const ji=({column:e,colIndex:t,isDragging:r,isResizing:i,sortDirection:l,sortIndex:s,options:u,filterItemsCounter:d})=>{const g=react.useContext(Bo),p=lo(g,Yo),{disableColumnReorder:m,showColumnRightBorder:h,disableColumnResize:f,disableColumnMenu:b}=u,v=null!=e.sortDirection,w="number"===e.type;let C=null;e.renderHeader&&(C=e.renderHeader({api:g.current,colDef:e,colIndex:t,field:e.field}));const y=react.useCallback((t=>g.current.onColItemDragStart(e,t.currentTarget)),[g,e]),S=react.useCallback((e=>g.current.onColItemDragEnter(e)),[g]),O=react.useCallback((t=>g.current.onColItemDragOver(e,{x:t.clientX,y:t.clientY})),[g,e]),M=react.useCallback((()=>{const n={field:e.field,colDef:e,colIndex:t,api:g.current};g.current.publishEvent("columnClick",n);}),[g,t,e]),x=zo("MuiDataGrid-colCell",e.headerClassName,"center"===e.headerAlign&&"MuiDataGrid-colCellCenter","right"===e.headerAlign&&"MuiDataGrid-colCellRight",{"MuiDataGrid-colCellSortable":e.sortable,"MuiDataGrid-colCellMoving":r,"MuiDataGrid-colCellSorted":v,"MuiDataGrid-colCellNumeric":w,"MuiDataGrid-withBorder":h}),j={draggable:!m,onDragStart:y,onDragEnter:S,onDragOver:O},I=e.width;let z;null!=l&&(z={"aria-sort":"asc"===l?"ascending":"descending"});const R=react.createElement(react.Fragment,null,react.createElement(fi,{direction:l,index:s,hide:e.hideSortIcons}),react.createElement(xi,{counter:d})),_=react.createElement(yi,{column:e});return react.createElement("div",Object.assign({className:x,key:e.field,"data-field":e.field,style:{width:I,minWidth:I,maxWidth:I},role:"columnheader",tabIndex:-1,"aria-colindex":t+1},z,{onClick:M}),react.createElement("div",Object.assign({className:"MuiDataGrid-colCell-draggable"},j),!b&&w&&!e.disableColumnMenu&&_,react.createElement("div",{className:"MuiDataGrid-colCellTitleContainer"},w&&R,C||react.createElement(vi,{label:e.headerName||e.field,description:e.description,columnWidth:I}),!w&&R),!w&&!b&&!e.disableColumnMenu&&_),react.createElement(wi,{resizable:!f&&!!e.resizable,resizing:i,height:p,onMouseDown:null==g?void 0:g.current.startResizeOnMouseDown}))},Ii=e=>e.rendering,zi=react.memo((r=>{const{align:o,children:i,colIndex:l,cssClass:a,hasFocus:s,field:c,formattedValue:u,rowIndex:d,showRightBorder:g,tabIndex:p,value:m,width:h,height:f}=r,b=u||m,v=react.useRef(null);return react.useEffect((()=>{s&&v.current&&v.current.focus();}),[s]),react.createElement("div",{ref:v,className:zo("MuiDataGrid-cell",a,"MuiDataGrid-cell"+capitalize(o),{"MuiDataGrid-withBorder":g}),role:"cell","data-value":m,"data-field":c,"data-rowindex":d,"aria-colindex":l,style:{minWidth:h,maxWidth:h,lineHeight:f-1+"px",minHeight:f,maxHeight:f},tabIndex:p},i||(null==b?void 0:b.toString()))}));zi.displayName="GridCell";const Ri=react.memo((({width:e,height:t})=>e&&t?react.createElement(zi,{width:e,height:t,align:"left"}):null));Ri.displayName="LeftEmptyCell";const _i=react.memo((({width:e,height:t})=>e&&t?react.createElement(zi,{width:e,height:t,align:"left"}):null));function Di(e,n,r){const o=Jn("useApiEventHandler");react.useEffect((()=>{if(r&&n)return e.current.subscribeEvent(n,r)}),[e,o,n,r]);}_i.displayName="RightEmptyCell";const Fi=react.memo((function(i){const{scrollDirection:l}=i,s=react.useRef(null),c=react.useContext(Bo),u=react.useRef(),[d,g]=react.useState(!1),p=react.useRef({left:0,top:0}),m=react.useCallback((e=>{p.current=e;}),[]),h=react.useCallback((e=>{let t;if("left"===l)t=e.clientX-s.current.getBoundingClientRect().right;else {if("right"!==l)throw new Error("wrong dir");t=Math.max(1,e.clientX-s.current.getBoundingClientRect().left);}t=1.5*(t-1)+1,clearTimeout(u.current),u.current=setTimeout((()=>{c.current.scroll({left:p.current.left+t,top:p.current.top});}));}),[l,c]);react.useEffect((()=>()=>{clearTimeout(u.current);}),[]);const f=react.useCallback((()=>{g((e=>!e));}),[]);return Di(c,"scrolling",m),Di(c,"colReordering:dragStart",f),Di(c,"colReordering:dragStop",f),d?react.createElement("div",{ref:s,className:zo("MuiDataGrid-scrollArea","MuiDataGrid-scrollArea-"+l),onDragOver:h}):null})),Ei=e=>e.sorting,Ti=createSelector(Ei,(e=>e.sortedRows)),Pi=createSelector(Ti,ri,oi,((e,t,n)=>e.length>0?e.map((e=>t[e])):n)),ki=createSelector(Ei,(e=>e.sortModel)),Li=createSelector(ki,(e=>e.reduce(((t,n,r)=>(t[n.field]={sortDirection:n.sort,sortIndex:e.length>1?r+1:void 0},t)),{}))),Ai=e=>e.visibleRows,Gi=createSelector(Ai,Pi,((e,t)=>[...t].filter((t=>!1!==e.visibleRowsLookup[t.id])))),Ni=createSelector(Ai,ni,((e,t)=>null==e.visibleRows?t:e.visibleRows.length)),Hi=e=>e.filter,Vi=createSelector(Hi,(e=>{var t;return null===(t=e.items)||void 0===t?void 0:t.filter((e=>{var t;return null!=e.value&&""!==(null===(t=e.value)||void 0===t?void 0:t.toString())}))})),Bi=createSelector(Vi,(e=>e.length)),$i=createSelector(Vi,(e=>e.reduce(((e,t)=>(e[t.columnField]?e[t.columnField].push(t):e[t.columnField]=[t],e)),{}))),Wi=e=>e.keyboard,Ui=createSelector(Wi,(e=>e.cell)),Xi=createSelector(Wi,(e=>e.isMultipleKeyPressed)),Yi=react.forwardRef((({height:e,width:t,children:r},o)=>react.createElement("div",{ref:o,className:"rendering-zone",style:{maxHeight:e,width:t}},r)));Yi.displayName="RenderingZone";const Ki=({selected:e,id:t,className:r,rowIndex:o,children:i})=>{const l=o+2,s=react.useContext(Bo),c=lo(s,Xo);return react.createElement("div",{key:t,"data-id":t,"data-rowindex":o,role:"row",className:zo("MuiDataGrid-row",r,{"Mui-selected":e}),"aria-rowindex":l,"aria-selected":e,style:{maxHeight:c,minHeight:c}},i)};Ki.displayName="Row";const Zi=react.memo((e=>{const{columns:t,domIndex:r,firstColIdx:o,hasScroll:i,lastColIdx:l,row:s,rowIndex:u,scrollSize:d,cellFocus:g,showCellRightBorder:p}=e,m=react.useContext(Bo),h=lo(m,Xo),f=t.slice(o,l+1).map(((n,l)=>{const a=o+l===t.length-1,c=a&&i.y&&i.x?n.width-d:n.width,f=a&&i.x&&!i.y,b=a?!f&&!e.extendRowFullWidth:p;let v=s[n.field];const w=Ho({rowModel:s,colDef:n,rowIndex:u,value:v,api:m.current});let C={cssClass:""};if(n.cellClassName&&(C=Gt(n.cellClassName)?{cssClass:n.cellClassName(w)}:{cssClass:zo(n.cellClassName)}),n.cellClassRules){const e=(y=n.cellClassRules,S=w,Object.entries(y).reduce(((e,t)=>e+((Gt(t[1])?t[1](S):t[1])?t[0]+" ":"")),""));C={cssClass:`${C.cssClass} ${e}`};}var y,S;let O=null;n.renderCell&&(O=n.renderCell(w),C={cssClass:C.cssClass+" MuiDataGrid-cellWithRenderer"}),n.valueGetter&&(v=n.valueGetter(w),w.value=v);let M={};n.valueFormatter&&(M={formattedValue:n.valueFormatter(w)});return Object.assign(Object.assign(Object.assign(Object.assign({value:v,field:n.field,width:c,height:h,showRightBorder:b},M),{align:n.align||"left"}),C),{tabIndex:0===r&&0===l?0:-1,rowIndex:u,colIndex:l+o,children:O,hasFocus:null!==g&&g.rowIndex===u&&g.colIndex===l+o})}));return react.createElement(react.Fragment,null,f.map((e=>react.createElement(zi,Object.assign({key:e.field},e)))))}));Zi.displayName="RowCells";const qi=({height:e,width:t,children:r})=>react.createElement("div",{className:"MuiDataGrid-viewport",style:{minWidth:t,maxWidth:t,minHeight:e,maxHeight:e}},r);qi.displayName="StickyContainer";const Ji=e=>e.containerSizes,Qi=e=>e.viewportSizes,el=e=>e.scrollBar,tl=react.forwardRef(((e,t)=>{const r=react.useContext(Bo),o=lo(r,Qo),i=lo(r,Ji),l=lo(r,Qi),s=lo(r,el),c=lo(r,Zt),u=lo(r,Ii),d=lo(r,Ui),g=lo(r,ii),p=lo(r,Gi),m=lo(r,Xo);return react.createElement(Zo,null,react.createElement(qi,Object.assign({},l),react.createElement(Yi,Object.assign({ref:t},(null==i?void 0:i.renderingZone)||{width:0,height:0}),(()=>{if(null==u.renderContext)return null;return p.slice(u.renderContext.firstRowIdx,u.renderContext.lastRowIdx).map(((e,t)=>react.createElement(Ki,{className:(u.renderContext.firstRowIdx+t)%2==0?"Mui-even":"Mui-odd",key:e.id,id:e.id,selected:!!g[e.id],rowIndex:u.renderContext.firstRowIdx+t},react.createElement(Ri,{width:u.renderContext.leftEmptyWidth,height:m}),react.createElement(Zi,{columns:c,row:e,firstColIdx:u.renderContext.firstColIdx,lastColIdx:u.renderContext.lastColIdx,hasScroll:{y:s.hasScrollY,x:s.hasScrollX},scrollSize:o.scrollbarSize,showCellRightBorder:!!o.showCellRightBorder,extendRowFullWidth:!o.disableExtendRowFullWidth,rowIndex:u.renderContext.firstRowIdx+t,cellFocus:d,domIndex:t}),react.createElement(_i,{width:u.renderContext.rightEmptyWidth,height:m}))))})())))}));tl.displayName="Viewport";const nl=e=>e.columnReorder,rl=createSelector(nl,(e=>e.dragCol));function ol(e){const{columns:t}=e,[i,l]=react.useState(""),s=react.useContext(Bo),u=lo(s,Qo),d=lo(s,Li),g=lo(s,$i),p=lo(s,rl),m=react.useCallback((e=>{l(e.field);}),[]),h=react.useCallback((()=>{l("");}),[]);Di(s,"colResizing:start",m),Di(s,"colResizing:stop",h);const f=t.map(((e,t)=>react.createElement(ji,Object.assign({key:e.field},d[e.field],{filterItemsCounter:g[e.field]&&g[e.field].length,options:u,isDragging:e.field===p,column:e,colIndex:t,isResizing:i===e.field}))));return react.createElement(react.Fragment,null,f)}const il=e=>e.scrollBar,ll=react.forwardRef((function(e,t){var r;const o=react.useContext(Bo),i=lo(o,Zt),{disableColumnReorder:l}=lo(o,Qo),s=lo(o,Ji),d=lo(o,Yo),g=lo(o,Ii).renderContext,{hasScrollX:p}=lo(o,il),m="MuiDataGrid-colCellWrapper "+(p?"scroll":""),h=react.useMemo((()=>null==g?[]:i.slice(g.firstColIdx,g.lastColIdx+1)),[i,g]),f=!l&&o?e=>o.current.onColHeaderDragOver(e,t):void 0;return react.createElement(react.Fragment,null,react.createElement(Fi,{scrollDirection:"left"}),react.createElement("div",{ref:t,className:m,"aria-rowindex":1,role:"row",style:{minWidth:null===(r=null==s?void 0:s.totalSizes)||void 0===r?void 0:r.width},onDragOver:f},react.createElement(Ri,{width:null==g?void 0:g.leftEmptyWidth,height:d}),react.createElement(ol,{columns:h}),react.createElement(_i,{width:null==g?void 0:g.rightEmptyWidth,height:d})),react.createElement(Fi,{scrollDirection:"right"}))})),al=({onClick:e})=>{const t=react.useContext(Bo),r=lo(t,Qo),i=react.useCallback((n=>{e(n),t.current.showPreferences(Mi.columns);}),[t,e]);return r.disableColumnSelector?null:react.createElement(_,{onClick:i},t.current.getLocaleText("columnMenuShowColumns"))},sl=({column:e,onClick:t})=>{const r=react.useContext(Bo),i=lo(r,Qo),l=react.useCallback((n=>{t(n),r.current.showFilterPanel(null==e?void 0:e.field);}),[r,null==e?void 0:e.field,t]);return i.disableColumnFilter||!(null==e?void 0:e.filterable)?null:react.createElement(_,{onClick:l},r.current.getLocaleText("columnMenuFilter"))},cl={"bottom-start":"top left","bottom-end":"top right"},ul=e=>{var{open:t,target:r,onClickAway:o,children:i,position:l}=e,a=X(e,["open","target","onClickAway","children","position"]);return react.createElement(Popper$1,Object.assign({open:t,anchorEl:r,transition:!0,placement:l},a),(({TransitionProps:e,placement:t})=>react.createElement(Grow,Object.assign({},e,{style:{transformOrigin:cl[t]}}),react.createElement(Paper,null,react.createElement(ClickAwayListener,{onClickAway:o},react.createElement("div",null,i))))))},dl=e=>e.columnMenu;function gl({ContentComponent:i,contentComponentProps:l}){const s=react.useContext(Bo),c=lo(s,dl),u=c.field?null==s?void 0:s.current.getColumnFromField(c.field):null,[d,g]=react.useState(null),p=react.useRef(),m=react.useRef(),h=react.useCallback((()=>{null==s||s.current.hideColumnMenu();}),[s]),f=react.useCallback((()=>{p.current=setTimeout(h,50);}),[h]),b=react.useCallback((({open:e,field:t})=>{if(t&&e){m.current=setTimeout((()=>clearTimeout(p.current)),0);const e=Oo(s.current.rootElementRef.current,t).querySelector(".MuiDataGrid-menuIconButton");g(e);}}),[s]);return react.useEffect((()=>{b(c);}),[c,b]),react.useEffect((()=>()=>{clearTimeout(p.current),clearTimeout(m.current);}),[]),d&&u?react.createElement(ul,{placement:"bottom-"+("right"===u.align?"start":"end"),open:c.open,target:d,onClickAway:f},react.createElement(i,Object.assign({currentColumn:u,hideMenu:h,open:c.open},l))):null}const pl=({column:r,onClick:i})=>{const l=react.useContext(Bo),s=react.useRef(),c=react.useCallback((e=>{i(e),s.current=setTimeout((()=>{l.current.toggleColumn(null==r?void 0:r.field,!0);}),10);}),[l,null==r?void 0:r.field,i]);return react.useEffect((()=>()=>clearTimeout(s.current)),[]),r?react.createElement(_,{onClick:c},l.current.getLocaleText("columnMenuHideColumn")):null},ml=({column:e,onClick:t})=>{const r=react.useContext(Bo),i=lo(r,ki),l=react.useMemo((()=>{if(!e)return null;const t=i.find((t=>t.field===e.field));return null==t?void 0:t.sort}),[e,i]),s=react.useCallback((n=>{t(n);const o=n.currentTarget.getAttribute("data-value")||null;null==r||r.current.sortColumn(e,o);}),[r,e,t]);return e&&e.sortable?react.createElement(react.Fragment,null,react.createElement(_,{onClick:s,disabled:null==l},r.current.getLocaleText("columnMenuUnsort")),react.createElement(_,{onClick:s,"data-value":"asc",disabled:"asc"===l},r.current.getLocaleText("columnMenuSortAsc")),react.createElement(_,{onClick:s,"data-value":"desc",disabled:"desc"===l},r.current.getLocaleText("columnMenuSortDesc"))):null};function hl(e){const{hideMenu:t,currentColumn:r}=e,i=react.useCallback((e=>{"Tab"===e.key&&(e.preventDefault(),t());}),[t]);return react.createElement(MenuList,{id:"menu-list-grow",onKeyDown:i},react.createElement(ml,{onClick:t,column:r}),react.createElement(sl,{onClick:t,column:r}),react.createElement(pl,{onClick:t,column:r}),react.createElement(al,{onClick:t,column:r}))}const fl=makeStyles$1((()=>({root:{display:"flex",flexDirection:"column",overflow:"auto",flex:"1 1",maxHeight:400}})),{name:"MuiDataGridPanelContent"});function bl(e){const t=fl(),{className:r}=e,o=X(e,["className"]);return react.createElement("div",Object.assign({className:zo(t.root,r)},o))}const vl=makeStyles$1((()=>({root:{padding:4,display:"flex",justifyContent:"space-between"}})),{name:"MuiDataGridPanelFooter"});function wl(e){const t=vl(),{className:r}=e,o=X(e,["className"]);return react.createElement("div",Object.assign({className:zo(t.root,r)},o))}const Cl=makeStyles$1((e=>({root:{padding:e.spacing(1)}})),{name:"MuiDataGridPanelHeader"});function yl(e){const t=Cl(),{className:r}=e,o=X(e,["className"]);return react.createElement("div",Object.assign({className:zo(t.root,r)},o))}const Sl=makeStyles$1((()=>({root:{display:"flex",flexDirection:"column",flex:1}})),{name:"MuiDataGridPanelWrapper"});function Ol(e){const t=Sl(),{className:r}=e,o=X(e,["className"]);return react.createElement("div",Object.assign({className:zo(t.root,r)},o))}const Ml=makeStyles$1({container:{padding:"8px 0px 8px 8px"},column:{display:"flex",justifyContent:"space-between",padding:"1px 8px 1px 7px"},switch:{marginRight:4},dragIcon:{justifyContent:"flex-end"}},{name:"MuiDataGridColumnsPanel"});function xl(){const i=Ml(),l=react.useContext(Bo),s=react.useRef(null),c=lo(l,Kt),{disableColumnReorder:d}=lo(l,Qo),[g,p]=react.useState(""),m=react.useCallback((e=>{const{name:t}=e.target;l.current.toggleColumn(t);}),[l]),h=react.useCallback((e=>{l.current.updateColumns(c.map((t=>(t.hide=e,t))));}),[l,c]),f=react.useCallback((()=>h(!1)),[h]),b=react.useCallback((()=>h(!0)),[h]),w=react.useCallback((e=>{p(e.target.value);}),[]),C=react.useMemo((()=>g?c.filter((e=>e.field.toLowerCase().indexOf(g.toLowerCase())>-1||e.headerName&&e.headerName.toLowerCase().indexOf(g.toLowerCase())>-1)):c),[c,g]);return react.useEffect((()=>{s.current.focus();}),[]),react.createElement(Ol,null,react.createElement(yl,null,react.createElement(TextField,{label:l.current.getLocaleText("columnsPanelTextFieldLabel"),placeholder:l.current.getLocaleText("columnsPanelTextFieldPlaceholder"),inputRef:s,value:g,onChange:w,variant:"standard",fullWidth:!0})),react.createElement(bl,null,react.createElement("div",{className:i.container},C.map((e=>react.createElement("div",{key:e.field,className:i.column},react.createElement(A,{control:react.createElement(k,{className:i.switch,checked:!e.hide,onClick:m,name:e.field,color:"primary",size:"small"}),label:e.headerName||e.field}),!d&&react.createElement(IconButton,{draggable:!0,className:i.dragIcon,"aria-label":l.current.getLocaleText("columnsPanelDragIconLabel"),title:l.current.getLocaleText("columnsPanelDragIconLabel"),size:"small",disabled:!0},react.createElement(Mr,null))))))),react.createElement(wl,null,react.createElement(Button,{onClick:b,color:"primary"},l.current.getLocaleText("columnsPanelHideAllButton")),react.createElement(Button,{onClick:f,color:"primary"},l.current.getLocaleText("columnsPanelShowAllButton"))))}const jl=makeStyles$1((e=>({root:{backgroundColor:e.palette.background.paper,minWidth:300,maxHeight:450,display:"flex"}})),{name:"MuiDataGridPanel"});function Il(e){const t=jl(),{children:r,open:i}=e,l=react.useContext(Bo),s=react.useCallback((()=>{l.current.hidePreferences();}),[l]);let c;return l.current&&l.current.columnHeadersElementRef.current&&(c=null==l?void 0:l.current.columnHeadersElementRef.current),c?react.createElement(Popper$1,{placement:"bottom-start",open:i,anchorEl:c,modifiers:Vt()?[{name:"flip",enabled:!1}]:{flip:{enabled:!1}}},react.createElement(ClickAwayListener,{onClickAway:s},react.createElement(Paper,{className:t.root,elevation:8},r))):null}const zl=e=>{const t=lo(e,Qo),n=lo(e,oi),r=lo(e,Zt),[o]=io(e);return react.useMemo((()=>e&&{state:o,rows:n,columns:r,options:t,api:e,rootElement:e.current.rootElementRef}),[o,n,r,t,e])};function Rl(){var e,t,r;const o=react.useContext(Bo),i=lo(o,Kt),l=lo(o,Qo),s=lo(o,Si),c=zl(o),u=s.openedPanelValue===Mi.columns,d=!s.openedPanelValue||!u,g=o.current.components.ColumnsPanel,p=o.current.components.FilterPanel,m=o.current.components.Panel;return react.createElement(m,Object.assign({open:i.length>0&&s.open},c,null===(e=null==o?void 0:o.current.componentsProps)||void 0===e?void 0:e.panel),!l.disableColumnSelector&&u&&react.createElement(g,Object.assign({},c,null===(t=null==o?void 0:o.current.componentsProps)||void 0===t?void 0:t.columnsPanel)),!l.disableColumnFilter&&d&&react.createElement(p,Object.assign({},c,null===(r=null==o?void 0:o.current.componentsProps)||void 0===r?void 0:r.filterPanel)))}const _l=makeStyles$1((()=>({root:{display:"flex",justifyContent:"space-around",padding:8},linkOperatorSelect:{width:60},columnSelect:{width:150},operatorSelect:{width:120},filterValueInput:{width:190},closeIcon:{flexShrink:0,justifyContent:"flex-end",marginRight:6,marginBottom:2}})),{name:"MuiDataGridFilterForm"});function Dl(e){var t;const{item:i,hasMultipleFilters:l,deleteFilter:s,applyFilterChanges:c,multiFilterOperator:u,showMultiFilterOperators:d,disableMultiFilterOperator:g,applyMultiFilterOperatorChanges:p}=e,m=_l(),h=react.useContext(Bo),f=lo(h,Jt),[b,v]=react.useState((()=>i.columnField?h.current.getColumnFromField(i.columnField):null)),[w,C]=react.useState((()=>{var e;return i.operatorValue&&b&&(null===(e=b.filterOperators)||void 0===e?void 0:e.find((e=>e.value===i.operatorValue)))||null})),y=react.useCallback((e=>{const t=e.target.value,n=h.current.getColumnFromField(t),r=n.filterOperators[0];C(r),v(n),c(Object.assign(Object.assign({},i),{value:void 0,columnField:t,operatorValue:r.value}));}),[h,c,i]),S=react.useCallback((e=>{var t;const n=e.target.value;c(Object.assign(Object.assign({},i),{operatorValue:n}));const r=(null===(t=b.filterOperators)||void 0===t?void 0:t.find((e=>e.value===n)))||null;C(r);}),[c,b,i]),O=react.useCallback((e=>{const t=e.target.value===Hr.And.toString()?Hr.And:Hr.Or;p(t);}),[p]),M=react.useCallback((()=>{s(i);}),[s,i]);return react.createElement("div",{className:m.root},react.createElement(G,{className:m.closeIcon},react.createElement(IconButton,{"aria-label":h.current.getLocaleText("filterPanelDeleteIconLabel"),title:h.current.getLocaleText("filterPanelDeleteIconLabel"),onClick:M,size:"small"},react.createElement(yr,{fontSize:"small"}))),react.createElement(G,{className:m.linkOperatorSelect,style:{display:l?"block":"none",visibility:d?"visible":"hidden"}},react.createElement(N,{id:"columns-filter-operator-select-label"},h.current.getLocaleText("filterPanelOperators")),react.createElement(H,{labelId:"columns-filter-operator-select-label",id:"columns-filter-operator-select",value:u,onChange:O,disabled:!!g,native:!0},react.createElement("option",{key:Hr.And.toString(),value:Hr.And.toString()},h.current.getLocaleText("filterPanelOperatorAnd")),react.createElement("option",{key:Hr.Or.toString(),value:Hr.Or.toString()},h.current.getLocaleText("filterPanelOperatorOr")))),react.createElement(G,{className:m.columnSelect},react.createElement(N,{id:"columns-filter-select-label"},h.current.getLocaleText("filterPanelColumns")),react.createElement(H,{labelId:"columns-filter-select-label",id:"columns-filter-select",value:i.columnField||"",onChange:y,native:!0},f.map((e=>react.createElement("option",{key:e.field,value:e.field},e.headerName||e.field))))),react.createElement(G,{className:m.operatorSelect},react.createElement(N,{id:"columns-operators-select-label"},h.current.getLocaleText("filterPanelOperators")),react.createElement(H,{labelId:"columns-operators-select-label",id:"columns-operators-select",value:i.operatorValue,onChange:S,native:!0},null===(t=null==b?void 0:b.filterOperators)||void 0===t?void 0:t.map((e=>react.createElement("option",{key:e.value,value:e.value},e.label))))),react.createElement(G,{className:m.filterValueInput},b&&w&&react.createElement(w.InputComponent,Object.assign({item:i,applyValue:c},w.InputComponentProps))))}function Fl(){const e=react.useContext(Bo),[r]=io(e),{disableMultipleColumnsFiltering:i}=lo(e,Qo),l=react.useMemo((()=>r.filter.items.length>1),[r.filter.items.length]),s=react.useCallback((t=>{e.current.upsertFilter(t);}),[e]),c=react.useCallback((t=>{e.current.applyFilterLinkOperator(t);}),[e]),d=react.useCallback((()=>{e.current.upsertFilter({});}),[e]),g=react.useCallback((t=>{e.current.deleteFilter(t);}),[e]);return react.useEffect((()=>{0===r.filter.items.length&&d();}),[d,r.filter.items.length]),react.createElement(Ol,null,react.createElement(bl,null,r.filter.items.map(((e,t)=>react.createElement(Dl,{key:e.id,item:e,applyFilterChanges:s,deleteFilter:g,hasMultipleFilters:l,showMultiFilterOperators:t>0,multiFilterOperator:r.filter.linkOperator,disableMultiFilterOperator:1!==t,applyMultiFilterOperatorChanges:c})))),!i&&react.createElement(wl,null,react.createElement(Button,{onClick:d,startIcon:react.createElement(Sr,null),color:"primary"},e.current.getLocaleText("filterPanelAddFilter"))))}const El=()=>{const e=react.useContext(Bo),t=e.current.components.ColumnSelectorIcon,{open:r,openedPanelValue:i}=lo(e,Si),l=react.useCallback((()=>{r&&i===Mi.columns?e.current.hidePreferences():e.current.showPreferences(Mi.columns);}),[e,r,i]);return react.createElement(Button,{onClick:l,size:"small",color:"primary","aria-label":e.current.getLocaleText("toolbarColumnsLabel"),startIcon:react.createElement(t,null)},e.current.getLocaleText("toolbarColumns"))};function Tl(){const e=react.useContext(Bo),t=lo(e,Uo),[i,l]=react.useState(null),s=e.current.components.DensityCompactIcon,u=e.current.components.DensityStandardIcon,d=e.current.components.DensityComfortableIcon,g=[{icon:react.createElement(s,null),label:e.current.getLocaleText("toolbarDensityCompact"),value:Lr.Compact},{icon:react.createElement(u,null),label:e.current.getLocaleText("toolbarDensityStandard"),value:Lr.Standard},{icon:react.createElement(d,null),label:e.current.getLocaleText("toolbarDensityComfortable"),value:Lr.Comfortable}],p=react.useCallback((()=>{switch(t){case Lr.Compact:return react.createElement(s,null);case Lr.Comfortable:return react.createElement(d,null);default:return react.createElement(u,null)}}),[t]),m=()=>l(null),h=g.map(((r,o)=>react.createElement(_,{key:o,onClick:()=>{return t=r.value,e.current.setDensity(t),void l(null);var t;},selected:r.value===t},react.createElement(V,null,r.icon),r.label)));return react.createElement(react.Fragment,null,react.createElement(Button,{color:"primary",size:"small",startIcon:p(),onClick:e=>l(e.currentTarget),"aria-label":e.current.getLocaleText("toolbarDensityLabel"),"aria-haspopup":"true"},e.current.getLocaleText("toolbarDensity")),react.createElement(ul,{open:Boolean(i),target:i,onClickAway:m,position:"bottom-start"},react.createElement(MenuList,{id:"menu-list-grow",onKeyDown:e=>{"Tab"!==e.key&&"Escape"!==e.key||(e.preventDefault(),m());}},h)))}const Pl=()=>{const e=react.useContext(Bo),t=lo(e,Qo),r=lo(e,Bi),i=lo(e,Vi),l=lo(e,Yt),s=lo(e,Si),c=react.useMemo((()=>s.open?e.current.getLocaleText("toolbarFiltersTooltipHide"):0===r?e.current.getLocaleText("toolbarFiltersTooltipShow"):react.createElement("div",null,e.current.getLocaleText("toolbarFiltersTooltipActive")(r),react.createElement("ul",null,i.map((e=>Object.assign({},l[e.columnField]&&react.createElement("li",{key:e.id},l[e.columnField].headerName||e.columnField," ",e.operatorValue," ",e.value))))))),[e,s.open,r,i,l]),d=react.useCallback((()=>{const{open:t,openedPanelValue:n}=s;t&&n===Mi.filters?e.current.hideFilterPanel():e.current.showFilterPanel();}),[e,s]);if(t.disableColumnFilter)return null;const g=e.current.components.OpenFilterButtonIcon;return react.createElement(R,{title:c,enterDelay:1e3},react.createElement(Button,{onClick:d,size:"small",color:"primary","aria-label":e.current.getLocaleText("toolbarFiltersLabel"),startIcon:react.createElement(I,{badgeContent:r,color:"primary"},react.createElement(g,null))},e.current.getLocaleText("toolbarFilters")))},kl=react.forwardRef((function(e,t){const{className:r,children:o}=e,i=X(e,["className","children"]);return o?react.createElement("div",Object.assign({ref:t,className:zo("MuiDataGrid-toolbar",r)},i),o):null}));function Ll(){const e=react.useContext(Bo),t=lo(e,Qo);return !t.showToolbar||t.disableColumnFilter&&t.disableColumnSelector&&t.disableDensitySelector?null:react.createElement(kl,null,!t.disableColumnSelector&&react.createElement(El,null),!t.disableColumnFilter&&react.createElement(Pl,null),!t.disableDensitySelector&&react.createElement(Tl,null))}function Al(e){return useEventCallback(e)}const Gl="undefined"!=typeof window?react.useLayoutEffect:react.useEffect;function Nl(e,t){var n=function(e){var t=e.__resizeTriggers__,n=t.firstElementChild,r=t.lastElementChild,o=n.firstElementChild;r.scrollLeft=r.scrollWidth,r.scrollTop=r.scrollHeight,o.style.width=n.offsetWidth+1+"px",o.style.height=n.offsetHeight+1+"px",n.scrollLeft=n.scrollWidth,n.scrollTop=n.scrollHeight;},r=function(e){if(!(e.target.className.indexOf("contract-trigger")<0&&e.target.className.indexOf("expand-trigger")<0)){var r=this;n(this),this.__resizeRAF__&&t.cancelAnimationFrame(this.__resizeRAF__),this.__resizeRAF__=t.requestAnimationFrame((function(){(function(e){return e.offsetWidth!=e.__resizeLast__.width||e.offsetHeight!=e.__resizeLast__.height})(r)&&(r.__resizeLast__.width=r.offsetWidth,r.__resizeLast__.height=r.offsetHeight,r.__resizeListeners__.forEach((function(t){t.call(r,e);})));}));}},o=!1,i="",l="animationstart",a="Webkit Moz O ms".split(" "),s="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),c=document.createElement("fakeelement");if(void 0!==c.style.animationName&&(o=!0),!1===o)for(var u=0;u<a.length;u++)if(void 0!==c.style[a[u]+"AnimationName"]){i="-"+a[u].toLowerCase()+"-",l=s[u],o=!0;break}var d="resizeanim",g="@"+i+"keyframes "+"resizeanim { from { opacity: 0; } to { opacity: 0; } } ",p=i+"animation: 1ms "+"resizeanim; ";return {addResizeListener:function(o,i){if(!o.__resizeTriggers__){var a=o.ownerDocument,s=t.getComputedStyle(o);s&&"static"==s.position&&(o.style.position="relative"),function(t){if(!t.getElementById("muiDetectElementResize")){var n=(g||"")+".Mui-resizeTriggers { "+(p||"")+'visibility: hidden; opacity: 0; } .Mui-resizeTriggers, .Mui-resizeTriggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .Mui-resizeTriggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',r=t.head||t.getElementsByTagName("head")[0],o=t.createElement("style");o.id="muiDetectElementResize",o.type="text/css",null!=e&&o.setAttribute("nonce",e),o.styleSheet?o.styleSheet.cssText=n:o.appendChild(t.createTextNode(n)),r.appendChild(o);}}(a),o.__resizeLast__={},o.__resizeListeners__=[],(o.__resizeTriggers__=a.createElement("div")).className="Mui-resizeTriggers",o.__resizeTriggers__.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>',o.appendChild(o.__resizeTriggers__),n(o),o.addEventListener("scroll",r,!0),l&&(o.__resizeTriggers__.__animationListener__=function(e){e.animationName==d&&n(o);},o.__resizeTriggers__.addEventListener(l,o.__resizeTriggers__.__animationListener__));}o.__resizeListeners__.push(i);},removeResizeListener:function(e,t){if(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1),!e.__resizeListeners__.length){e.removeEventListener("scroll",r,!0),e.__resizeTriggers__.__animationListener__&&(e.__resizeTriggers__.removeEventListener(l,e.__resizeTriggers__.__animationListener__),e.__resizeTriggers__.__animationListener__=null);try{e.__resizeTriggers__=!e.removeChild(e.__resizeTriggers__);}catch(e){}}}}}const Hl=react.forwardRef((function(t,o){const{children:i,defaultHeight:l=null,defaultWidth:a=null,disableHeight:s=!1,disableWidth:c=!1,nonce:u,onResize:d,style:g}=t,p=X(t,["children","defaultHeight","defaultWidth","disableHeight","disableWidth","nonce","onResize","style"]),[m,h]=react.useState({height:l,width:a}),f=react.useRef(null),b=react.useRef(null),v=Al((()=>{if(b.current){const e=b.current.offsetHeight||0,t=b.current.offsetWidth||0,n=ownerWindow(b.current).getComputedStyle(b.current),r=parseInt(n.paddingLeft,10)||0,o=parseInt(n.paddingRight,10)||0,i=e-(parseInt(n.paddingTop,10)||0)-(parseInt(n.paddingBottom,10)||0),l=t-r-o;(!s&&m.height!==i||!c&&m.width!==l)&&(h({height:i,width:l}),d&&d({height:i,width:l}));}}));Gl((()=>{var e;if(b.current=f.current.parentElement,!b)return;const t=ownerWindow(null!==(e=b.current)&&void 0!==e?e:void 0),n=Nl(u,t);return n.addResizeListener(b.current,v),v(),()=>{n.removeResizeListener(b.current,v);}}),[u,v]);const w={overflow:"visible"},C={};s||(w.height=0,C.height=m.height),c||(w.width=0,C.width=m.width);const y=useForkRef(f,o);return react.createElement("div",Object.assign({ref:y,style:Object.assign(Object.assign({},w),g)},p),null===m.height&&null===m.width?null:i(C))})),Vl=e=>e.pagination,Bl=({rowCount:e})=>{const t=react.useContext(Bo);return 0===e?null:react.createElement("div",{className:"MuiDataGrid-rowCount"},`${t.current.getLocaleText("footerTotalRows")} ${e.toLocaleString()}`)};function $l(e){const{selectedRowCount:t}=e,r=react.useContext(Bo).current.getLocaleText("footerRowSelected")(t);return react.createElement("div",{className:"MuiDataGrid-selectedRowCount"},r)}function Wl(){var e;const t=react.useContext(Bo),r=lo(t,ni),o=lo(t,Qo),i=lo(t,li),l=lo(t,Vl),s=zl(t),c=!o.hideFooterSelectedRowCount&&i>0?react.createElement($l,{selectedRowCount:i}):react.createElement("div",null),u=o.hideFooterRowCount||o.pagination?null:react.createElement(Bl,{rowCount:r}),d=!!o.pagination&&null!=l.pageSize&&!o.hideFooterPagination&&(null==t?void 0:t.current.components.Pagination),g=d&&react.createElement(d,Object.assign({},s,null===(e=null==t?void 0:t.current.componentsProps)||void 0===e?void 0:e.pagination));return react.createElement(qo,null,c,u,g)}function Ul(){return react.createElement(react.Fragment,null,react.createElement(Rl,null),react.createElement(Ll,null))}function Xl(){return react.createElement(Jo,null,react.createElement(CircularProgress,null))}function Yl(){const e=react.useContext(Bo).current.getLocaleText("noRowsLabel");return react.createElement(Jo,null,e)}const Kl=makeStyles$1((e=>({caption:{"&[id]":{display:"none",[e.breakpoints.up("md")]:{display:"block"}}},input:{display:"none",[e.breakpoints.up("md")]:{display:"block"}}})));function Zl(){const e=Kl(),t=react.useContext(Bo),r=lo(t,Vl),i=lo(t,Qo),l=react.useCallback((e=>{const n=Number(e.target.value);t.current.setPageSize(n);}),[t]),s=react.useCallback(((e,n)=>{t.current.setPage(n+1);}),[t]);return react.createElement($,Object.assign({classes:e,component:"div",count:r.rowCount,page:r.page-1,rowsPerPageOptions:i.rowsPerPageOptions&&i.rowsPerPageOptions.indexOf(r.pageSize)>-1?i.rowsPerPageOptions:[],rowsPerPage:r.pageSize,labelRowsPerPage:t.current.getLocaleText("footerPaginationRowsPerPage")},Vt()?{onPageChange:s,onRowsPerPageChange:l}:{onChangePage:s,onChangeRowsPerPage:l}))}var ql;!function(e){e.NotFound="NotFound",e.Invalid="Invalid",e.Expired="Expired",e.Valid="Valid";}(ql||(ql={}));const Jl=({licenseStatus:e})=>e===ql.Valid.toString()?null:react.createElement("div",{style:{position:"absolute",pointerEvents:"none",color:"#8282829e",zIndex:1e5,width:"100%",textAlign:"center",bottom:"50%",right:0,letterSpacing:5,fontSize:24}}," ",function(e){switch(e){case ql.Expired.toString():return "Material-UI X License Expired";case ql.Invalid.toString():return "Material-UI X Invalid License";case ql.NotFound.toString():return "Material-UI X Unlicensed product";default:throw new Error("Material-UI: Unhandled license status.")}}(e)," ");void 0!==process.env.EXPERIMENTAL_ENABLED&&$t()&&window.localStorage.getItem("EXPERIMENTAL_ENABLED")?"true"===window.localStorage.getItem("EXPERIMENTAL_ENABLED"):"true"===process.env.EXPERIMENTAL_ENABLED;const ta=e=>{const n=Jn("useColumnMenu"),[r,i,l]=io(e),a=react.useCallback((t=>{n.debug("Opening Column Menu"),i((e=>Object.assign(Object.assign({},e),{columnMenu:{open:!0,field:t}}))),e.current.hidePreferences(),l();}),[e,l,n,i]),s=react.useCallback((()=>{n.debug("Hiding Column Menu"),i((e=>Object.assign(Object.assign({},e),{columnMenu:Object.assign(Object.assign({},e.columnMenu),{open:!1})}))),l();}),[l,n,i]);react.useEffect((()=>{r.isScrolling&&s();}),[r.isScrolling,s]),Qn(e,{showColumnMenu:a,hideColumnMenu:s},"ColumnMenuApi");},na=(e,t)=>e.x<=t.x?"right":"left",ra=n=>{const r=Jn("useColumnReorder"),[,i,l]=io(n),a=lo(n,rl),s=react.useRef(null),c=react.useRef(null),u=react.useRef({x:0,y:0}),d=react.useRef(),g=react.useCallback((()=>{r.debug("End dragging col"),n.current.publishEvent("colReordering:dragStop"),clearTimeout(d.current),c.current.classList.remove("MuiDataGrid-colCell-dropZone"),s.current.removeEventListener("dragend",g),s.current=null,i((e=>Object.assign(Object.assign({},e),{columnReorder:Object.assign(Object.assign({},e.columnReorder),{dragCol:""})}))),l();}),[n,i,l,r]),p=react.useCallback(((e,t)=>{r.debug("Start dragging col "+e.field),n.current.publishEvent("colReordering:dragStart"),s.current=t,s.current.addEventListener("dragend",g,{once:!0}),s.current.classList.add("MuiDataGrid-colCell-dragging"),i((t=>Object.assign(Object.assign({},t),{columnReorder:Object.assign(Object.assign({},t.columnReorder),{dragCol:e.field})}))),l(),d.current=setTimeout((()=>{s.current.classList.remove("MuiDataGrid-colCell-dragging");}));}),[n,i,l,g,r]);react.useEffect((()=>()=>{clearTimeout(d.current);}),[]);const m=react.useCallback(((e,t)=>{e.preventDefault(),n.current.publishEvent("colReordering:dragOverHeader"),c.current=t.current,c.current.classList.add("MuiDataGrid-colCell-dropZone");}),[n]),h=react.useCallback((e=>{e.preventDefault(),n.current.publishEvent("colReordering:dragEnter");}),[n]),f=react.useCallback(((e,t)=>{if(r.debug("Dragging over col "+e.field),n.current.publishEvent("colReordering:dragOver"),e.field!==a&&(o=u.current,i=t,o.x!==i.x||o.y!==i.y)){const r=n.current.getColumnIndex(e.field,!1),o=n.current.getColumnIndex(a,!1);("right"===na(u.current,t)&&o<r||"left"===na(u.current,t)&&r<o)&&n.current.moveColumn(a,r),u.current=t;}var o,i;}),[n,a,r]);Qn(n,{onColItemDragStart:p,onColHeaderDragOver:m,onColItemDragOver:f,onColItemDragEnter:h},"ColReorderApi");};function oa(e,t){const n=e.filter((e=>!!e.flex&&!e.hide)).length;let r=0;n&&t&&e.forEach((e=>{e.hide||(e.flex?r+=e.flex:t-=e.width);}));let o=e;if(t>0&&n){const n=t/r;o=e.map((e=>Object.assign(Object.assign({},e),{width:e.flex?Math.floor(n*e.flex):e.width})));}return o}function ia(e,t){return e.debug("Building columns lookup"),t.reduce(((e,t)=>(e[t.field]=t,e)),{})}function la(e,n){const r=Jn("useColumns"),[i,l,a]=io(n),s=lo(n,qt),c=lo(n,Kt),u=lo(n,Zt),d=lo(n,Qo),g=react.useCallback(((e,t=!0)=>{r.debug("Updating columns state."),l((t=>Object.assign(Object.assign({},t),{columns:e}))),a(),n.current&&t&&n.current.publishEvent("columnsUpdated",e.all);}),[r,l,a,n]),p=react.useCallback((e=>n.current.state.columns.lookup[e]),[n]),m=react.useCallback((()=>c),[c]),h=react.useCallback((()=>u),[u]),f=react.useCallback((()=>s),[s]),b=react.useCallback(((e,t=!0)=>t?u.findIndex((t=>t.field===e)):c.findIndex((t=>t.field===e))),[c,u]),v=react.useCallback((e=>{const t=b(e);return s.positions[t]}),[s.positions,b]),w=react.useCallback((e=>{r.debug("updating Columns with new state");const t=((e,t)=>{const n={all:[...e.all],lookup:Object.assign({},e.lookup)};return t.forEach((e=>{null==n.lookup[e.field]?(n.lookup[e.field]=e,n.all.push(e.field)):n.lookup[e.field]=Object.assign(Object.assign({},n.lookup[e.field]),e);})),n})(i.columns,e);g(t,!1);}),[r,i.columns,g]),C=react.useCallback((e=>w([e])),[w]),y=react.useCallback(((e,t)=>{const n=p(e),r=Object.assign(Object.assign({},n),{hide:null==t?!n.hide:t});w([r]),a();}),[a,p,w]),S=react.useCallback(((e,t)=>{r.debug(`Moving column ${e} to index ${t}`);const n=i.columns.all.findIndex((t=>t===e)),o=[...i.columns.all];o.splice(t,0,o.splice(n,1)[0]),g(Object.assign(Object.assign({},i.columns),{all:o}),!1);}),[i.columns,r,g]);Qn(n,{getColumnFromField:p,getAllColumns:m,getColumnIndex:b,getColumnPosition:v,getVisibleColumns:h,getColumnsMeta:f,updateColumn:C,updateColumns:w,toggleColumn:y,moveColumn:S},"ColApi"),react.useEffect((()=>{if(r.info("Columns have changed, new length "+e.length),e.length>0){const t=oa(function(e,t,n,r){r.debug("Hydrating Columns with default definitions");const o=e.map((e=>Object.assign(Object.assign({},ui(t,e.type)),e)));return n?[ci,...o]:o}(e,d.columnTypes,!!d.checkboxSelection,r),n.current.getState().viewportSizes.width);g({all:t.map((e=>e.field)),lookup:ia(r,t)});}else g({all:[],lookup:{}});}),[r,n,e,d.columnTypes,d.checkboxSelection,g]),react.useEffect((()=>{r.debug("Columns gridState.viewportSizes.width, changed "+i.viewportSizes.width);const e=oa(Kt(n.current.getState()),i.viewportSizes.width);n.current.updateColumns(e);}),[n,i.viewportSizes.width,r]);}const aa=(n,r,i,l)=>{const a=oo(n),[s,c,u]=io(n),d=react.useCallback((e=>{void 0===s[r]&&(s[r]=l),c((t=>{const n=Object.assign({},t);return n[r]=i(t[r],e),n})),u();}),[u,s,l,i,c,r]),g=react.useRef(d);react.useEffect((()=>{g.current=d;}),[d]);const p=react.useCallback((e=>g.current(e)),[]);return {gridState:s,dispatch:p,gridApi:a}},sa=(e,n)=>{const r=Jn("useFilter"),[i,l,a]=io(e),s=lo(e,Qt),c=lo(e,Qo),u=react.useCallback((()=>({filterModel:e.current.getState("filter"),api:e.current,columns:e.current.getAllColumns(),rows:e.current.getRowModels()})),[e]),d=react.useCallback((()=>{r.debug("clearing filtered rows"),l((e=>Object.assign(Object.assign({},e),{visibleRows:{visibleRowsLookup:{}}})));}),[r,l]),g=react.useCallback(((t,n=Hr.And)=>{if(!t.columnField||!t.operatorValue||!t.value)return;r.debug(`Filtering column: ${t.columnField} ${t.operatorValue} ${t.value} `);const o=e.current.getColumnFromField(t.columnField);if(!o)return;const i=o.filterOperators;if(!(null==i?void 0:i.length))throw new Error("No Filter operator found for column "+o.field);const s=i.find((e=>e.value===t.operatorValue)).getApplyFilterFn(t,o);l((t=>{const r=Object.assign({},t.visibleRows.visibleRowsLookup);return Pi(t).forEach(((t,i)=>{const l=Ho({rowModel:t,colDef:o,rowIndex:i,value:t[o.field],api:e.current}),a=s(l);null==r[t.id]?r[t.id]=a:r[t.id]=n===Hr.And?r[t.id]&&a:r[t.id]||a;})),Object.assign(Object.assign({},t),{visibleRows:{visibleRowsLookup:r,visibleRows:Object.entries(r).filter((e=>e[1])).map((e=>e[0]))}})})),a();}),[e,a,r,l]),p=react.useCallback((()=>{if(c.filterMode===Ar.server)return;d();const{items:t,linkOperator:n}=e.current.state.filter;t.forEach((t=>{e.current.applyFilter(t,n);})),a();}),[e,d,a,c.filterMode]),m=react.useCallback((t=>{r.debug("Upserting filter"),l((n=>{const r=[...n.filter.items],o=Object.assign({},t),i=r.findIndex((e=>e.id===o.id));if(1===r.length&&Tt(r[0],{})?r[0]=o:-1===i?r.push(o):r[i]=o,null==o.id&&(o.id=(new Date).getTime()),null==o.columnField&&(o.columnField=s[0]),null!=o.columnField&&null==o.operatorValue){const t=e.current.getColumnFromField(o.columnField);o.operatorValue=t&&t.filterOperators[0].value;}c.disableMultipleColumnsFiltering&&r.length>1&&(r.length=1);return Object.assign(Object.assign({},n),{filter:Object.assign(Object.assign({},n.filter),{items:r})})})),e.current.publishEvent("filterModelChange",u()),p();}),[r,l,e,u,p,c.disableMultipleColumnsFiltering,s]),h=react.useCallback((t=>{r.debug(`Deleting filter on column ${t.columnField} with value ${t.value}`);let n=!1;l((e=>{const r=[...e.filter.items.filter((e=>e.id!==t.id))];n=0===r.length;return Object.assign(Object.assign({},e),{filter:Object.assign(Object.assign({},e.filter),{items:r})})})),n&&m({}),e.current.publishEvent("filterModelChange",u()),p();}),[e,p,u,r,l,m]),f=react.useCallback((t=>{if(r.debug("Displaying filter panel"),t){const n=i.filter.items.length>0?i.filter.items[i.filter.items.length-1]:null;n&&n.columnField===t||e.current.upsertFilter({columnField:t});}e.current.showPreferences(Mi.filters);}),[e,i.filter.items,r]),b=react.useCallback((()=>{r.debug("Hiding filter panel"),null==e||e.current.hidePreferences();}),[e,r]),v=react.useCallback(((e=Hr.And)=>{r.debug("Applying filter link operator"),l((t=>Object.assign(Object.assign({},t),{filter:Object.assign(Object.assign({},t.filter),{linkOperator:e})}))),p();}),[p,r,l]),w=react.useCallback((()=>{d(),r.debug("Clearing filter model"),l((e=>Object.assign(Object.assign({},e),{filter:Vr()})));}),[d,r,l]),C=react.useCallback((t=>{w(),r.debug("Setting filter model"),v(t.linkOperator),t.items.forEach((e=>m(e))),e.current.publishEvent("filterModelChange",u());}),[e,v,w,u,r,m]),y=react.useCallback((t=>e.current.subscribeEvent("filterModelChange",t)),[e]);Qn(e,{applyFilterLinkOperator:v,applyFilters:p,applyFilter:g,deleteFilter:h,upsertFilter:m,onFilterModelChange:y,setFilterModel:C,showFilterPanel:f,hideFilterPanel:b},"FilterApi"),Di(e,"rowsSet",e.current.applyFilters),Di(e,"rowsUpdated",e.current.applyFilters),Di(e,"filterModelChange",c.onFilterModelChange),react.useEffect((()=>{const t=c.filterModel,n=e.current.state.filter;t&&t.items.length>0&&!Tt(t,n)&&(r.debug("filterModel prop changed, applying filters"),e.current.setFilterModel(t));}),[e,r,c.filterModel]),react.useEffect((()=>{e.current&&(r.debug("Rows prop changed, applying filters"),d(),e.current.applyFilters());}),[e,d,r,n]);const S=react.useCallback((()=>{r.debug("onColUpdated - Columns changed, applying filters");const t=e.current.getState("filter"),n=Qt(e.current.state);r.debug("Columns changed, applying filters"),t.items.forEach((t=>{n.find((e=>e===t.columnField))||e.current.deleteFilter(t);})),e.current.applyFilters();}),[e,r]);Di(e,"columnsUpdated",S);},ca=(e,t)=>{const n=Jn("useKeyboard"),r=lo(t,Qo),[,i,l]=io(t),a=lo(t,Vl),s=lo(t,ni),c=lo(t,en),u=lo(t,Ji),d=lo(t,ii),g=react.useCallback((e=>{i((t=>{n.debug("Toggling keyboard multiple key pressed to "+e);const r=Object.assign(Object.assign({},t.keyboard),{isMultipleKeyPressed:e});return Object.assign(Object.assign({},t),{keyboard:r})})),l(),t.current.publishEvent("multipleKeyPressChange",e);}),[t,l,n,i]),p=react.useCallback(((e,o)=>{const d=bo(document.activeElement,"MuiDataGrid-cell");d.tabIndex=-1;const g=Number(d.getAttribute("aria-colindex")),p=Number(d.getAttribute("data-rowindex")),m=r.pagination?a.pageSize*a.page:s;let h;if(Eo(e))h=((e,t)=>{if(!Eo(e))throw new Error("Material-UI: The first argument (code) should be an arrow key code.");return "ArrowLeft"===e?Object.assign(Object.assign({},t),{colIndex:t.colIndex-1}):"ArrowRight"===e?Object.assign(Object.assign({},t),{colIndex:t.colIndex+1}):"ArrowUp"===e?Object.assign(Object.assign({},t),{rowIndex:t.rowIndex-1}):Object.assign(Object.assign({},t),{rowIndex:t.rowIndex+1})})(e,{colIndex:g,rowIndex:p});else if(To(e)){const t="Home"===e?0:c-1;if(o){let e=0;e=0===t?r.pagination?m-a.pageSize:0:m-1,h={colIndex:t,rowIndex:e};}else h={colIndex:t,rowIndex:p};}else {if(!Po(e)&&!Fo(e))throw new Error("Material-UI. Key not mapped to navigation behavior.");{const t=p+(e.indexOf("Down")>-1||Fo(e)?u.viewportPageSize:-1*u.viewportPageSize);h={colIndex:g,rowIndex:t};}}return h.rowIndex=h.rowIndex<=0?0:h.rowIndex,h.rowIndex=h.rowIndex>=m&&m>0?m-1:h.rowIndex,h.colIndex=h.colIndex<=0?0:h.colIndex,h.colIndex=h.colIndex>=c?c-1:h.colIndex,t.current.scrollToIndexes(h),i((e=>(n.debug("Setting keyboard state, cell focus to "+JSON.stringify(h)),Object.assign(Object.assign({},e),{keyboard:Object.assign(Object.assign({},e.keyboard),{cell:h})})))),l(),h}),[r.pagination,a.pageSize,a.page,s,c,t,i,l,u,n]),m=react.useCallback((()=>{const e=yo(bo(document.activeElement,"MuiDataGrid-row"));t.current.selectRow(e);}),[t]),h=react.useCallback((e=>{const r=bo(document.activeElement,"MuiDataGrid-row"),o=Number(r.getAttribute("data-rowindex"));let i=o;const l=t.current.getSelectedRows();if(l.length>0){const e=l.map((e=>t.current.getRowIndexFromId(e.id))),n=e.map((e=>Math.abs(o-e))),r=Math.max(...n);i=e[n.indexOf(r)];}const a=p(e,!1),s=Array(Math.abs(a.rowIndex-i)+1).fill(a.rowIndex>i?i:a.rowIndex).map(((e,n)=>t.current.getRowIdFromRowIndex(e+n)));n.debug("Selecting rows "),t.current.selectRows(s,!0,!0);}),[n,t,p]),f=react.useCallback((()=>{var e,t;const n=bo(document.activeElement,"MuiDataGrid-row"),r=yo(n);d[r]?null===(e=null===window||void 0===window?void 0:window.getSelection())||void 0===e||e.selectAllChildren(n):null===(t=null===window||void 0===window?void 0:window.getSelection())||void 0===t||t.selectAllChildren(document.activeElement),document.execCommand("copy");}),[d]),b=react.useCallback((e=>{if(_o(e.key)&&(n.debug("Multiple Select key pressed"),g(!0)),vo(document.activeElement))return Fo(e.key)&&e.shiftKey?(e.preventDefault(),void m()):ko(e.key)&&!e.shiftKey?(e.preventDefault(),void p(e.key,e.ctrlKey||e.metaKey)):ko(e.key)&&e.shiftKey?(e.preventDefault(),void h(e.key)):void("c"!==e.key.toLowerCase()||!e.ctrlKey&&!e.metaKey?"a"===e.key.toLowerCase()&&(e.ctrlKey||e.metaKey)&&(e.preventDefault(),t.current.selectRows(t.current.getAllRowIds(),!0)):f())}),[t,n,g,h,f,p,m]),v=react.useCallback((e=>{_o(e.key)&&(n.debug("Multiple Select key released"),g(!1));}),[n,g]),w=react.useCallback((e=>{n.debug("Grid lost focus, releasing key press",e),t.current.getState().keyboard.isMultipleKeyPressed&&g(!1);}),[t,n,g]);Di(t,"keydown",b),Di(t,"keyup",v),Di(t,"gridFocusOut",w);},ua=e=>{const n=Jn("usePagination"),{dispatch:r}=aa(e,"pagination",Qr,Object.assign({},Jr)),i=lo(e,Qo),l=lo(e,Ni),a=lo(e,Ji),s=react.useCallback((t=>{n.debug("Setting page to "+t),r($r(t));const o=e.current.getState("pagination");e.current.publishEvent("pageChange",o);}),[e,r,n]),c=react.useCallback((t=>{r(Wr(t)),e.current.publishEvent("pageSizeChange",e.current.getState("pagination"));}),[e,r]),u=react.useCallback((t=>e.current.subscribeEvent("pageChange",t)),[e]),d=react.useCallback((t=>e.current.subscribeEvent("pageSizeChange",t)),[e]);Di(e,"pageChange",i.onPageChange),Di(e,"pageSizeChange",i.onPageSizeChange),react.useEffect((()=>{r(Ur({paginationMode:i.paginationMode}));}),[e,r,i.paginationMode]),react.useEffect((()=>{s(null!=i.page?i.page:1);}),[e,i.page,s]),react.useEffect((()=>{!i.autoPageSize&&i.pageSize&&c(i.pageSize);}),[i.autoPageSize,i.pageSize,n,c]),react.useEffect((()=>{i.autoPageSize&&a&&(null==a?void 0:a.viewportPageSize)>0&&c(null==a?void 0:a.viewportPageSize);}),[a,i.autoPageSize,c]),react.useEffect((()=>{r(Xr({totalRowCount:l}));}),[e,r,l]);Qn(e,{setPageSize:c,setPage:s,onPageChange:u,onPageSizeChange:d},"paginationApi");},da=n=>{const r=Jn("usePreferencesPanel"),[,i,l]=io(n),a=react.useRef(),s=react.useRef(),c=react.useCallback((()=>{r.debug("Hiding Preferences Panel"),i((e=>Object.assign(Object.assign({},e),{preferencePanel:{open:!1}}))),l();}),[l,r,i]),u=react.useCallback((()=>{s.current=setTimeout((()=>clearTimeout(a.current)),0);}),[]),d=react.useCallback((()=>{a.current=setTimeout(c,100);}),[c]);Qn(n,{showPreferences:react.useCallback((e=>{r.debug("Opening Preferences Panel"),u(),i((t=>Object.assign(Object.assign({},t),{preferencePanel:Object.assign(Object.assign({},t.preferencePanel),{open:!0,openedPanelValue:e})}))),l();}),[u,l,r,i]),hidePreferences:d},"ColumnMenuApi"),react.useEffect((()=>()=>{clearTimeout(a.current),clearTimeout(s.current);}),[]);};function ga(e,t){if(null==e.id)throw new Error(["Material-UI: The data grid component requires all rows to have a unique id property.",t||"A row was provided without id in the rows prop:",JSON.stringify(e)].join("\n"));return !0}function pa({rows:e,totalRowCount:t}){const n={allRows:[],idRowsLookup:{},totalRowCount:t&&t>e.length?t:e.length};return e.forEach((e=>{ga(e),n.allRows.push(e.id),n.idRowsLookup[e.id]=e;})),n}const ma=(n,r)=>{const i=Jn("useRows"),[l,a,s]=io(r),c=react.useRef(),u=react.useCallback((e=>{null==c.current&&(c.current=setTimeout((()=>{i.debug("Updating component"),c.current=null,e&&e(),s();}),100));}),[i,s]),d=react.useRef(l.rows);react.useEffect((()=>()=>clearTimeout(c.current)),[]),react.useEffect((()=>{a((e=>(d.current=pa({rows:n,totalRowCount:e.options.rowCount}),Object.assign(Object.assign({},e),{rows:d.current}))));}),[n,a]);const g=react.useCallback((e=>r.current.state.rows.allRows.indexOf(e)),[r]),p=react.useCallback((e=>r.current.state.rows.allRows[e]),[r]),m=react.useCallback((e=>r.current.state.rows.idRowsLookup[e]),[r]),h=react.useCallback((e=>{i.debug("updating all rows, new length "+e.length),d.current.allRows.length>0&&r.current.publishEvent("rowsCleared");const t=e.reduce(((e,t)=>(e[t.id]=t,e)),{}),n=e.map((e=>e.id)),o=l.options&&l.options.rowCount&&l.options.rowCount>n.length?l.options.rowCount:n.length;d.current={idRowsLookup:t,allRows:n,totalRowCount:o},a((e=>Object.assign(Object.assign({},e),{rows:d.current}))),u((()=>r.current.publishEvent("rowsSet")));}),[i,l.options,r,a,u]),f=react.useCallback((e=>{const t=e.reduce(((e,t)=>(ga(t,"A row was provided without id when calling updateRows():"),e[t.id]=null!=e[t.id]?Object.assign(Object.assign({},e[t.id]),t):t,e)),{}),n=[];if(Object.values(t).forEach((e=>{const t=m(e.id);t?Object.assign(d.current.idRowsLookup[e.id],Object.assign(Object.assign({},t),e)):n.push(e);})),a((e=>Object.assign(Object.assign({},e),{rows:d.current}))),n.length>0){const e=[...Object.values(d.current.idRowsLookup),...n];h(e);}u((()=>r.current.publishEvent("rowsUpdated")));}),[r,u,m,a,h]),b=react.useCallback((()=>r.current.state.rows.allRows.map((e=>r.current.state.rows.idRowsLookup[e]))),[r]),v=react.useCallback((()=>r.current.state.rows.totalRowCount),[r]),w=react.useCallback((()=>r.current.state.rows.allRows),[r]);Qn(r,{getRowIndexFromId:g,getRowIdFromRowIndex:p,getRowFromId:m,getRowModels:b,getRowsCount:v,getAllRowIds:w,setRows:h,updateRows:f},"RowApi");},ha=n=>{const r=Jn("useSelection"),[i,l,a]=io(n),s=lo(n,Qo),c=lo(n,ri),u=lo(n,Xi),d=react.useRef(!1);react.useEffect((()=>{d.current=!s.disableMultipleSelection&&u;}),[u,s.disableMultipleSelection]);const g=react.useCallback((()=>Object.keys(i.selection).map((e=>n.current.getRowFromId(e)))),[n,i.selection]),p=react.useCallback(((e,t,o)=>{if(!n.current.isInitialised)return void l((t=>{const n={};return n[e.id]=!0,Object.assign(Object.assign({},t),{selection:n})}));r.debug("Selecting row "+e.id);const i=t||d.current||s.checkboxSelection;l(i?t=>{const n=Object.assign({},t.selection);return (i&&null!=o?o:!n[e.id])?n[e.id]=!0:delete n[e.id],Object.assign(Object.assign({},t),{selection:n})}:t=>{const n={};return n[e.id]=!0,Object.assign(Object.assign({},t),{selection:n})}),a();const c=n.current.getState("selection"),u={data:e,isSelected:!!c[e.id]},g={rowIds:Object.keys(c)};n.current.publishEvent("rowSelected",u),n.current.publishEvent("selectionChange",g);}),[n,r,s.checkboxSelection,a,l]),m=react.useCallback(((e,t=!0,r=!1)=>{p(n.current.getRowFromId(e),r,t);}),[n,p]),h=react.useCallback(((e,t=!0,r=!1)=>{s.disableMultipleSelection&&e.length>1&&!s.checkboxSelection||(l((n=>{const o=r?{}:Object.assign({},n.selection);return e.reduce(((e,n)=>(t?e[n]=!0:e[n]&&delete e[n],e)),o),Object.assign(Object.assign({},n),{selection:o})})),a(),n.current.publishEvent("selectionChange",{rowIds:Object.keys(n.current.getState("selection"))}));}),[s.disableMultipleSelection,s.checkboxSelection,l,a,n]),f=react.useCallback((e=>{s.disableSelectionOnClick||p(e.row);}),[s.disableSelectionOnClick,p]),b=react.useCallback((e=>n.current.subscribeEvent("rowSelected",e)),[n]),v=react.useCallback((e=>n.current.subscribeEvent("selectionChange",e)),[n]);Di(n,"rowClick",f),Di(n,"rowSelected",s.onRowSelected),Di(n,"selectionChange",s.onSelectionChange);Qn(n,{selectRow:m,getSelectedRows:g,selectRows:h,onRowSelected:b,onSelectionChange:v},"SelectionApi"),react.useEffect((()=>{l((e=>{const t=Object.assign({},e.selection);let n=!1;return Object.keys(t).forEach((e=>{c[e]||(delete t[e],n=!0);})),n?Object.assign(Object.assign({},e),{selection:t}):e})),a();}),[c,n,l,a]);},fa=(n,r)=>{const i=Jn("useSorting"),l=react.useRef(!1),a=react.useRef([]),[s,c,u]=io(n),d=lo(n,Qo),g=lo(n,Zt),p=lo(n,ni),m=react.useCallback((e=>({sortModel:e,api:n.current,columns:n.current.getAllColumns()})),[n]),h=react.useCallback(((e,t)=>{const n=s.sorting.sortModel.findIndex((t=>t.field===e));let r=[...s.sorting.sortModel];return n>-1?t?r.splice(n,1,t):r.splice(n,1):r=[...s.sorting.sortModel,t],r}),[s.sorting.sortModel]),f=react.useCallback(((e,t)=>{const n=s.sorting.sortModel.find((t=>t.field===e.field));if(n){const e=void 0===t?nr(d.sortingOrder,n.sort):t;return null==e?void 0:Object.assign(Object.assign({},n),{sort:e})}return {field:e.field,sort:void 0===t?nr(d.sortingOrder):t}}),[s.sorting.sortModel,d.sortingOrder]),b=react.useCallback(((e,t)=>a.current.reduce(((r,o)=>{const{field:i,comparator:l}=o;return r=r||l(e[i],t[i],Ho({api:n.current,colDef:n.current.getColumnFromField(i),rowModel:e,value:e[i]}),Ho({api:n.current,colDef:n.current.getColumnFromField(i),rowModel:t,value:t[i]}))}),0)),[n]),v=react.useCallback((e=>e.map((e=>{const t=n.current.getColumnFromField(e.field);if(!t)throw new Error(`Error sorting: column with field '${e.field}' not found. `);const r=rr(e.sort)?(e,n,r,o)=>-1*t.sortComparator(e,n,r,o):t.sortComparator;return {field:t.field,comparator:r}}))),[n]),w=react.useCallback((()=>{const e=n.current.getRowModels();if(d.sortingMode===Ar.server)return i.debug("Skipping sorting rows as sortingMode = server"),void c((t=>Object.assign(Object.assign({},t),{sorting:Object.assign(Object.assign({},t.sorting),{sortedRows:e.map((e=>e.id))})})));const t=n.current.getState().sorting.sortModel;i.debug("Sorting rows with ",t);const r=[...e];t.length>0&&(a.current=v(t),r.sort(b)),c((e=>Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortedRows:r.map((e=>e.id))})}))),u();}),[n,i,c,u,v,b,d.sortingMode]),C=react.useCallback((e=>{c((t=>{const n=Object.assign(Object.assign({},t.sorting),{sortModel:e});return Object.assign(Object.assign({},t),{sorting:Object.assign({},n)})})),u(),0!==g.length&&(n.current.publishEvent("sortModelChange",m(e)),n.current.applySorting());}),[c,u,g.length,n,m]),y=react.useCallback(((e,t)=>{if(!e.sortable)return;const n=f(e,t);let r;r=l.current?h(e.field,n):n?[n]:[],C(r);}),[h,C,f]),S=react.useCallback((({colDef:e})=>{y(e);}),[y]),O=react.useCallback((()=>{c((e=>Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortedRows:[]})})));}),[c]),M=react.useCallback((()=>s.sorting.sortModel),[s.sorting.sortModel]),x=react.useCallback((e=>{l.current=!d.disableMultipleColumnsSorting&&e;}),[d.disableMultipleColumnsSorting]),j=react.useCallback((e=>n.current.subscribeEvent("sortModelChange",e)),[n]),I=react.useCallback((()=>{c((e=>{const t=e.sorting.sortModel,n=Kt(e);let r=t;return t.length>0&&(r=t.reduce(((e,t)=>(n.find((e=>e.field===t.field))&&e.push(t),e)),[])),Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortModel:r})})}));}),[c]);Di(n,"columnClick",S),Di(n,"rowsSet",n.current.applySorting),Di(n,"rowsCleared",O),Di(n,"rowsUpdated",n.current.applySorting),Di(n,"columnsUpdated",I),Di(n,"multipleKeyPressChange",x),Di(n,"sortModelChange",d.onSortModelChange);Qn(n,{getSortModel:M,setSortModel:C,sortColumn:y,onSortModelChange:j,applySorting:w},"SortApi"),react.useEffect((()=>{n.current.applySorting();}),[n,r]),react.useEffect((()=>{p>0&&(i.debug("row changed, applying sortModel"),n.current.applySorting());}),[p,n,i]),react.useEffect((()=>{if(g.length>0){const e=n.current.getAllColumns().filter((e=>null!=e.sortDirection)).sort(((e,t)=>e.sortIndex-t.sortIndex)).map((e=>({field:e.field,sort:e.sortDirection})));e.length>0&&!Tt(n.current.getState("sorting").sortModel,e)&&n.current.setSortModel(e);}}),[n,g]),react.useEffect((()=>{const e=d.sortModel||[],t=n.current.state.sorting.sortModel;e.length>0&&!Tt(e,t)&&n.current.setSortModel(e);}),[d.sortModel,n]);},ba=(t,n)=>{const r=Jn("useVirtualColumns"),i=react.useRef(null),l=react.useRef(null),a=react.useRef(0),s=lo(n,qt),c=lo(n,en),u=lo(n,Zt),d=react.useCallback((e=>{const t=s.positions;if(!c)return -1;let n=[...t].reverse().findIndex((t=>e>=t));return n=t.length-1-n,n}),[s.positions,c]),g=react.useCallback((e=>u.length?u[d(e)]:null),[d,u]),p=react.useCallback((e=>{if(!l.current)return !1;const t=l.current.windowSizes.width,n=g(a.current),r=g(a.current+t),o=u.findIndex((e=>e.field===(null==n?void 0:n.field)))+1,i=u.findIndex((e=>e.field===(null==r?void 0:r.field)))-1;return e>=o&&e<=i}),[g,u]),m=react.useCallback(((e,o)=>{var c,p,m,h;if(!e)return !1;l.current=e;const f=e.windowSizes.width;a.current=o,r.debug(`Columns from ${null===(c=g(o))||void 0===c?void 0:c.field} to ${null===(p=g(o+f))||void 0===p?void 0:p.field}`);const b=d(o),v=d(o+f),w=(null===(m=null==i?void 0:i.current)||void 0===m?void 0:m.firstColIdx)||0,C=(null===(h=null==i?void 0:i.current)||void 0===h?void 0:h.lastColIdx)||0,y=t.columnBuffer,S=y>1?y-1:y,O=Math.abs(b-S-w),M=Math.abs(v+S-C);r.debug(`Column buffer: ${y}, tolerance: ${S}`),r.debug(`Previous values  => first: ${w}, last: ${C}`),r.debug(`Current displayed values  => first: ${b}, last: ${v}`),r.debug(`Difference with first: ${O} and last: ${M} `);const x=u.length>0?u.length-1:0,j=b-y>=0?b-y:0,I={leftEmptyWidth:s.positions[j],rightEmptyWidth:0,firstColIdx:j,lastColIdx:v+y>=x?x:v+y};return n.current.state.scrollBar.hasScrollX?I.rightEmptyWidth=s.totalWidth-s.positions[I.lastColIdx]-u[I.lastColIdx].width:t.disableExtendRowFullWidth||(I.rightEmptyWidth=n.current.state.viewportSizes.width-s.totalWidth),Tt(I,i.current)?(r.debug("No rendering needed on columns"),!1):(i.current=I,r.debug("New columns state to render",I),!0)}),[r,g,d,t.columnBuffer,t.disableExtendRowFullWidth,u,s.positions,s.totalWidth,n]);Qn(n,{isColumnVisibleInWindow:p},"ColumnVirtualizationApi");const h=react.useCallback((()=>{r.debug("Clearing previous renderedColRef"),i.current=null;}),[r,i]);return Di(n,"columnsUpdated",h),Di(n,"resize",h),[i,m]},va=(n,i,l,a,s)=>{const c=Jn("useNativeEventListener"),[u,d]=react.useState(!1),g=react.useRef(a),p=react.useCallback((e=>g.current&&g.current(e)),[]);react.useEffect((()=>{g.current=a;}),[a]),react.useEffect((()=>{let e;if(e=Gt(i)?i():i&&i.current?i.current:null,e&&p&&l&&!u){c.debug(`Binding native ${l} event`),e.addEventListener(l,p,s);const t=e;d(!0);const r=()=>{c.debug(`Clearing native ${l} event`),t.removeEventListener(l,p,s);};n.current.onUnmount(r);}}),[i,p,l,u,c,s,n]);};function wa(n,r){const i=Jn("useScrollFn"),l=react.useRef(),a=react.useMemo((()=>debounce$1((()=>{null!=n.current&&(n.current.style.pointerEvents="unset");}),300)),[n]),s=react.useCallback((e=>{var t;e.left===(null===(t=l.current)||void 0===t?void 0:t.left)&&e.top===l.current.top||n&&n.current&&(i.debug(`Moving ${n.current.className} to: ${e.left}-${e.top}`),"none"!==n.current.style.pointerEvents&&(n.current.style.pointerEvents="none"),n.current.style.transform=`translate3d(-${e.left}px, -${e.top}px, 0)`,r.current.style.transform=`translate3d(-${e.left}px, 0, 0)`,a(),l.current=e);}),[n,i,r,a]);return react.useEffect((()=>()=>{a.clear();}),[n,a]),[s]}const Ca=(n,r,i,l)=>{var a;const s=Jn("useVirtualRows"),[c,u,d]=io(l),g=lo(l,Qo),p=lo(l,Xo),m=lo(l,Vl),h=lo(l,ni),f=lo(l,Zt),b=lo(l,qt),[v]=wa(i,n),[w,C]=ba(g,l),y=react.useCallback((e=>{let t=!1;return u((n=>{const r=Object.assign(Object.assign({},n.rendering),e);return Tt(n.rendering,r)?n:(t=!0,Object.assign(Object.assign({},n),{rendering:r}))})),t}),[u]),S=react.useCallback((e=>{if(null==l.current.state.containerSizes)return null;let t=0;g.pagination&&null!=m.pageSize&&"client"===m.paginationMode&&(t=m.pageSize*(m.page-1>0?m.page-1:0));const n=e*l.current.state.containerSizes.viewportPageSize+t;let r=n+l.current.state.containerSizes.renderingZonePageSize;const o=l.current.state.containerSizes.virtualRowsCount+t;r>o&&(r=o);return {page:e,firstRowIdx:n,lastRowIdx:r}}),[l,g.pagination,m.pageSize,m.paginationMode,m.page]),O=react.useCallback((()=>{if(null==l.current.state.containerSizes)return null;return Object.assign(Object.assign(Object.assign({},w.current),S(l.current.state.rendering.virtualPage)),{paginationCurrentPage:m.page,pageSize:m.pageSize})}),[w,S,l,m.page,m.pageSize]),M=react.useCallback((()=>{const e=O();y({renderContext:e,renderedSizes:l.current.state.containerSizes})&&(s.debug("reRender: trigger rendering"),d());}),[l,O,s,d,y]),x=react.useCallback(((e=!1)=>{const t=l.current.getState(),n=t.containerSizes;if(!r||!r.current||!n)return;const o=t.viewportSizes,i=t.scrollBar,{scrollLeft:a,scrollTop:c}=r.current;s.debug(`Handling scroll Left: ${a} Top: ${c}`);let u=C(n,a);const d=a;let g=c/o.height;const p=c%o.height;s.debug(` viewportHeight:${o.height}, rzScrollTop: ${p}, scrollTop: ${c}, current page = ${g}`);const h={left:i.hasScrollX?d:0,top:i.hasScrollY?p:0},f=t.rendering.virtualPage;g=Math.floor(g),f!==g?(y({virtualPage:g}),s.debug(`Changing page from ${f} to ${g}`),u=!0):(v(h),l.current.publishEvent("scrolling",h)),y({renderingZoneScroll:h});const b=t.rendering.renderContext&&t.rendering.renderContext.paginationCurrentPage!==m.page;(e||u||b)&&M();}),[l,s,m.page,M,v,y,C,r]),j=react.useCallback((e=>{let t;s.debug(`Scrolling to cell at row ${e.rowIndex}, col: ${e.colIndex} `);const n=l.current.isColumnVisibleInWindow(e.colIndex);if(s.debug(`Column ${e.colIndex} is ${n?"already":"not"} visible.`),!n){if(e.colIndex+1===b.positions.length){const n=f[e.colIndex].width;t=b.positions[e.colIndex]+n-c.containerSizes.windowSizes.width;}else t=b.positions[e.colIndex+1]-c.containerSizes.windowSizes.width+c.scrollBar.scrollBarSize.y,s.debug("Scrolling to the right, scrollLeft: "+t);c.rendering.renderingZoneScroll.left>t&&(t=b.positions[e.colIndex],s.debug("Scrolling to the left, scrollLeft: "+t));}let o;const i=(e.rowIndex-(c.pagination.page-1)*c.pagination.pageSize)/c.containerSizes.viewportPageSize*c.viewportSizes.height,a=c.viewportSizes.height,u=r.current.scrollTop>i,d=r.current.scrollTop+a<i+p;u?(o=i,s.debug("Row is above, setting scrollTop to "+o)):d&&(o=i-a+p,s.debug("Row is below, setting scrollTop to "+o));const g=!n||u||d;return g&&l.current.scroll({left:t,top:o}),g}),[s,l,c,r,p,b.positions,f]),I=react.useCallback((()=>{v({left:0,top:0}),y({virtualPage:1}),r&&r.current&&r.current.scrollTo(0,0),y({renderingZoneScroll:{left:0,top:0}});}),[v,y,r]),z=react.useRef(null),R=react.useCallback((()=>{r.current.scrollLeft<0||r.current.scrollTop<0||(z.current||u((e=>Object.assign(Object.assign({},e),{isScrolling:!0}))),clearTimeout(z.current),z.current=setTimeout((()=>{z.current=null,u((e=>Object.assign(Object.assign({},e),{isScrolling:!1}))),d();}),300),l.current.updateViewport&&l.current.updateViewport());}),[r,l,u,d]),_=react.useCallback((e=>{r.current&&null!=e.left&&n.current&&(n.current.scrollLeft=e.left,r.current.scrollLeft=e.left,s.debug("Scrolling left: "+e.left)),r.current&&null!=e.top&&(r.current.scrollTop=e.top,s.debug("Scrolling top: "+e.top)),s.debug("Scrolling, updating container, and viewport");}),[r,n,s]),D=react.useCallback((()=>c.containerSizes),[c.containerSizes]),F=react.useCallback((()=>c.rendering.renderContext||void 0),[c.rendering.renderContext]);Gl((()=>{i&&i.current&&(s.debug("applying scrollTop ",c.rendering.renderingZoneScroll.top),v(c.rendering.renderingZoneScroll));}));Qn(l,{scroll:_,scrollToIndexes:j,getContainerPropsState:D,getRenderContextState:F,updateViewport:x},"VirtualizationApi"),react.useEffect((()=>{var e;(null===(e=c.rendering.renderContext)||void 0===e?void 0:e.paginationCurrentPage)!==c.pagination.page&&l.current.updateViewport&&(s.debug(`State pagination.page changed to ${c.pagination.page}. `),l.current.updateViewport(!0),I());}),[l,c.pagination.page,null===(a=c.rendering.renderContext)||void 0===a?void 0:a.paginationCurrentPage,s,I]),react.useEffect((()=>{c.containerSizes!==c.rendering.renderedSizes&&l.current.updateViewport&&(s.debug("gridState.containerSizes updated, updating viewport. "),l.current.updateViewport(!0));}),[l,c.containerSizes,c.rendering.renderedSizes,s]),react.useEffect((()=>{l.current.updateViewport&&(s.debug(`totalRowCount has changed to ${h}, updating viewport.`),l.current.updateViewport(!0));}),[s,h,c.viewportSizes,c.scrollBar,c.containerSizes,l]),react.useEffect((()=>()=>{clearTimeout(z.current);}),[]);const E=react.useCallback((e=>(s.debug("Using keyboard to navigate cells, converting scroll events "),e.target.scrollLeft=0,e.target.scrollTop=0,e.preventDefault(),e.stopPropagation(),!1)),[s]);va(l,r,"scroll",R,{passive:!0}),va(l,(()=>{var e;return null===(e=i.current)||void 0===e?void 0:e.parentElement}),"scroll",E),Di(l,"resize",x);};class ya{constructor(){this.maxListeners=10,this.warnOnce=!1,this.events={};}on(e,t){Array.isArray(this.events[e])||(this.events[e]=[]),this.events[e].push(t),"production"!=="production";}removeListener(e,t){if(Array.isArray(this.events[e])){const n=this.events[e].indexOf(t);n>-1&&this.events[e].splice(n,1);}}removeAllListeners(e){e?Array.isArray(this.events[e])&&(this.events[e]=[]):this.events={};}emit(e,...t){if(Array.isArray(this.events[e])){const n=this.events[e].slice(),r=n.length;for(let e=0;e<r;e+=1)n[e].apply(this,t);}}once(e,t){const n=this;this.on(e,(function r(...o){n.removeListener(e,r),t.apply(n,o);}));}}function Sa(t){const n=react.useRef(new ya);return react.useMemo((()=>t||n),[t,n])}let Oa=!1;function Ma(){if(!Oa){const e=document.createElement("div");e.style.touchAction="none",document.body.appendChild(e),Oa="none"===window.getComputedStyle(e).touchAction,e.parentElement.removeChild(e);}return Oa}function xa(e,t){if(void 0!==t&&e.changedTouches){for(let n=0;n<e.changedTouches.length;n+=1){const r=e.changedTouches[n];if(r.identifier===t)return {x:r.clientX,y:r.clientY}}return !1}return {x:e.clientX,y:e.clientY}}const ja=(n,r)=>{const i=Jn("useColumnResize"),l=react.useRef(),a=react.useRef(),s=react.useRef(),c=react.useRef(),u=react.useRef(),d=react.useRef(),g=n.current,p=e=>{i.debug(`Updating width to ${e} for col ${l.current.field}`),l.current.width=e,a.current.style.width=e+"px",a.current.style.minWidth=e+"px",a.current.style.maxWidth=e+"px",s.current.forEach((t=>{const n=t;n.style.width=e+"px",n.style.minWidth=e+"px",n.style.maxWidth=e+"px";}));},m=Al((()=>{C(),r.current.updateColumn(l.current),clearTimeout(u.current),u.current=setTimeout((()=>{r.current.publishEvent("colResizing:stop");})),i.debug(`Updating col ${l.current.field} with new width: ${l.current.width}`);})),h=Al((e=>{if(0===e.buttons)return void m();let t=c.current+e.clientX-a.current.getBoundingClientRect().left;t=Math.max(50,t),p(t);})),f=Al((e=>{if(0!==e.button)return;if(!e.currentTarget.classList.contains("MuiDataGrid-columnSeparatorResizable"))return;e.preventDefault(),a.current=bo(e.currentTarget,"MuiDataGrid-colCell");const t=a.current.getAttribute("data-field"),n=r.current.getColumnFromField(t);i.debug("Start Resize on col "+n.field),r.current.publishEvent("colResizing:start",{field:t}),l.current=n,a.current=g.querySelector(`[data-field="${n.field}"]`),s.current=Mo(a.current);const o=ownerDocument(r.current.rootElementRef.current);o.body.style.cursor="col-resize",c.current=l.current.width-(e.clientX-a.current.getBoundingClientRect().left),o.addEventListener("mousemove",h),o.addEventListener("mouseup",m);})),b=Al((e=>{xa(e,d.current)&&(C(),r.current.updateColumn(l.current),clearTimeout(u.current),u.current=setTimeout((()=>{r.current.publishEvent("colResizing:stop");})),i.debug(`Updating col ${l.current.field} with new width: ${l.current.width}`));})),v=Al((e=>{const t=xa(e,d.current);if(!t)return;if("mousemove"===e.type&&0===e.buttons)return void b(e);let n=c.current+t.x-a.current.getBoundingClientRect().left;n=Math.max(50,n),p(n);})),w=Al((e=>{if(!bo(e.target,"MuiDataGrid-columnSeparatorResizable"))return;Ma()||e.preventDefault();const t=e.changedTouches[0];null!=t&&(d.current=t.identifier),a.current=bo(e.target,"MuiDataGrid-colCell");const n=So(a.current),o=r.current.getColumnFromField(n);i.debug("Start Resize on col "+o.field),r.current.publishEvent("colResizing:start",{field:n}),l.current=o,a.current=Oo(g,o.field),s.current=Mo(a.current),c.current=l.current.width-(t.clientX-a.current.getBoundingClientRect().left);const u=ownerDocument(e.currentTarget);u.addEventListener("touchmove",v),u.addEventListener("touchend",b);})),C=react.useCallback((()=>{const e=ownerDocument(r.current.rootElementRef.current);e.body.style.removeProperty("cursor"),e.removeEventListener("mousemove",h),e.removeEventListener("mouseup",m),e.removeEventListener("touchmove",v),e.removeEventListener("touchend",b);}),[r,h,m,v,b]);react.useEffect((()=>(null==g||g.addEventListener("touchstart",w,{passive:Ma()}),()=>{null==g||g.removeEventListener("touchstart",w),clearTimeout(u.current),C();})),[g,w,C]),Qn(r,{startResizeOnMouseDown:f},"columnResizeApi");};const Ia={OpenFilterButtonIcon:ur,ColumnFilteredIcon:dr,ColumnSelectorIcon:hr,ColumnMenuIcon:Cr,ColumnSortedAscendingIcon:sr,ColumnSortedDescendingIcon:cr,ColumnResizeIcon:fr,DensityCompactIcon:br,DensityStandardIcon:vr,DensityComfortableIcon:wr},za=Object.assign(Object.assign({},Ia),{ColumnMenu:hl,ErrorOverlay:function({message:e}){const t=react.useContext(Bo).current.getLocaleText("errorOverlayDefaultLabel");return react.createElement(Jo,null,e||t)},Footer:Wl,Header:Ul,LoadingOverlay:Xl,NoRowsOverlay:Yl,Pagination:Zl,FilterPanel:Fl,ColumnsPanel:xl,Panel:Il}),Ra=(e,t,n)=>{const r=react.useMemo((()=>{const t={ColumnFilteredIcon:e&&e.ColumnFilteredIcon||za.ColumnFilteredIcon,ColumnMenuIcon:e&&e.ColumnMenuIcon||za.ColumnMenuIcon,ColumnResizeIcon:e&&e.ColumnResizeIcon||za.ColumnResizeIcon,ColumnSelectorIcon:e&&e.ColumnSelectorIcon||za.ColumnSelectorIcon,ColumnSortedAscendingIcon:e&&e.ColumnSortedAscendingIcon||za.ColumnSortedAscendingIcon,ColumnSortedDescendingIcon:e&&e.ColumnSortedDescendingIcon||za.ColumnSortedDescendingIcon,DensityComfortableIcon:e&&e.DensityComfortableIcon||za.DensityComfortableIcon,DensityCompactIcon:e&&e.DensityCompactIcon||za.DensityCompactIcon,DensityStandardIcon:e&&e.DensityStandardIcon||za.DensityStandardIcon,OpenFilterButtonIcon:e&&e.OpenFilterButtonIcon||za.OpenFilterButtonIcon,ColumnMenu:e&&e.ColumnMenu||za.ColumnMenu,ErrorOverlay:e&&e.ErrorOverlay||za.ErrorOverlay,Footer:e&&e.Footer||za.Footer,Header:e&&e.Header||za.Header,LoadingOverlay:e&&e.LoadingOverlay||za.LoadingOverlay,NoRowsOverlay:e&&e.NoRowsOverlay||za.NoRowsOverlay,Pagination:e&&e.Pagination||za.Pagination,FilterPanel:e&&e.FilterPanel||za.FilterPanel,ColumnsPanel:e&&e.ColumnsPanel||za.ColumnsPanel,Panel:e&&e.Panel||za.Panel};return n.current.components=t,t}),[n,e]);return n.current.componentsProps=t,r};function _a(e,n,i){const[l,a]=react.useState(!1),s=Jn("useApi"),c=react.useCallback(((e,...t)=>{i.current.emit(e,...t);}),[i]),u=react.useCallback(((e,t)=>{s.debug(`Binding ${e} event`),i.current.on(e,t);const n=i.current;return ()=>{s.debug(`Clearing ${e} event`),n.removeListener(e,t);}}),[i,s]),d=react.useCallback((e=>{c("componentError",e);}),[c]);return react.useEffect((()=>{s.debug("Initializing grid api."),i.current.isInitialised=!0,i.current.rootElementRef=e,i.current.columnHeadersElementRef=n,a(!0);const t=i.current;return ()=>{s.debug("Unmounting Grid component"),t.emit("unmount"),s.debug("Clearing all events listeners"),t.removeAllListeners();}}),[e,s,i,n]),Qn(i,{subscribeEvent:u,publishEvent:c,showError:d},"CoreApi"),l}const Da=(n,r)=>{const i=Jn("useContainerProps"),[l,a,s]=io(r),c=react.useRef({width:0,height:0}),u=lo(r,Qo),d=lo(r,Xo),g=lo(r,tn),p=lo(r,Ni),m=lo(r,Vl),h=react.useCallback((()=>{i.debug("Calculating virtual row count.");const e=m.page;let t=u.pagination&&m.pageSize?m.pageSize:null;t=!t||e*t<=p?t:p-(e-1)*t;return null==t||t>p?p:t}),[i,u.pagination,m.page,m.pageSize,p]),f=react.useCallback((e=>{i.debug("Calculating scrollbar sizes.");const t=!u.autoPageSize&&!u.autoHeight&&c.current.height<e*d,n=g>c.current.width;return {hasScrollX:n,hasScrollY:t,scrollBarSize:{y:t?u.scrollbarSize:0,x:n?u.scrollbarSize:0}}}),[i,u.autoPageSize,u.autoHeight,u.scrollbarSize,d,g]),b=react.useCallback(((e,t)=>{if(!n.current)return null;i.debug("Calculating container sizes.");const r=n.current.getBoundingClientRect();c.current={width:r.width,height:r.height},i.debug(`window Size - W: ${c.current.width} H: ${c.current.height} `);return {width:c.current.width-t.scrollBarSize.y,height:u.autoHeight?e*d:c.current.height-t.scrollBarSize.x}}),[i,u.autoHeight,d,n]),v=react.useCallback(((e,t,r)=>{if(!n||!n.current||0===g||Number.isNaN(g))return null;let o=t.height/d;o=u.pagination?Math.floor(o):Math.round(o);const l=2*o,a=u.autoPageSize?1:Math.ceil(e/o);i.debug(`viewportPageSize:  ${o}, rzPageSize: ${l}, viewportMaxPage: ${a}`);const s=l*d+d+r.scrollBarSize.x,p=g-r.scrollBarSize.y;let m=(u.autoPageSize?1:e/o)*t.height+(r.hasScrollY?r.scrollBarSize.x:0);u.autoHeight&&(m=e*d+r.scrollBarSize.x);const h={virtualRowsCount:u.autoPageSize?o:e,renderingZonePageSize:l,viewportPageSize:o,totalSizes:{width:g,height:m||1},dataContainerSizes:{width:p,height:m||1},renderingZone:{width:p,height:s},windowSizes:c.current,lastPage:a};return i.debug("returning container props",h),h}),[n,g,d,u.pagination,u.autoPageSize,u.autoHeight,i]),w=react.useCallback(((e,t)=>{let n=!1;a((r=>(n=e(r),n?t(r):r))),n&&s();}),[s,a]),C=react.useCallback((()=>{i.debug("Refreshing container sizes");const e=h(),t=f(e),n=b(e,t);if(!n)return;w((e=>e.scrollBar!==t),(e=>Object.assign(Object.assign({},e),{scrollBar:t}))),w((e=>e.viewportSizes!==n),(e=>Object.assign(Object.assign({},e),{viewportSizes:n})));const r=v(e,n,t);w((e=>!Tt(e.containerSizes,r)),(e=>Object.assign(Object.assign({},e),{containerSizes:r})));}),[v,f,b,h,i,w]);react.useEffect((()=>{C();}),[l.columns,l.options.hideFooter,C,p]),Di(r,"resize",C);};class Fa extends react.Component{static getDerivedStateFromError(e){return {hasError:!0,error:e}}componentDidCatch(e,t){this.props.api.current&&(this.logError(e),this.props.api.current.showError({error:e,errorInfo:t}));}logError(e,t){this.props.logger.error(`An unexpected error occurred. Error: ${e&&e.message}. `,e,t);}render(){var e;return this.props.hasError||(null===(e=this.state)||void 0===e?void 0:e.hasError)?this.props.render(this.props.componentProps||this.state):this.props.children}}function Ea(e){return react.createElement("div",{className:"MuiDataGrid-main"},e.children)}function Ta(e,t){switch(t.type){case"options::UPDATE":return Go(e,t.payload);default:throw new Error(`Material-UI: Action ${t.type} not found.`)}}const Pa=react.forwardRef((function(i,l){const a=react.useRef(null),s=useForkRef(a,l),c=react.useRef(null),d=react.useRef(null),g=react.useRef(null),p=react.useRef(null),m=react.useRef(null),h=react.useRef(null),f=Sa(i.apiRef),[b]=io(f),v=function(e,n){const r=react.useMemo((()=>({pageSize:n.pageSize,logger:n.logger,sortingMode:n.sortingMode,filterMode:n.filterMode,autoHeight:n.autoHeight,autoPageSize:n.autoPageSize,checkboxSelection:n.checkboxSelection,columnBuffer:n.columnBuffer,columnTypes:n.columnTypes,disableSelectionOnClick:n.disableSelectionOnClick,disableMultipleColumnsSorting:n.disableMultipleColumnsSorting,disableMultipleSelection:n.disableMultipleSelection,disableMultipleColumnsFiltering:n.disableMultipleColumnsFiltering,disableColumnResize:n.disableColumnResize,disableDensitySelector:n.disableDensitySelector,disableColumnReorder:n.disableColumnReorder,disableColumnFilter:n.disableColumnFilter,disableColumnMenu:n.disableColumnMenu,disableColumnSelector:n.disableColumnSelector,disableExtendRowFullWidth:n.disableExtendRowFullWidth,headerHeight:n.headerHeight,hideFooter:n.hideFooter,hideFooterPagination:n.hideFooterPagination,hideFooterRowCount:n.hideFooterRowCount,hideFooterSelectedRowCount:n.hideFooterSelectedRowCount,showToolbar:n.showToolbar,logLevel:n.logLevel,onCellClick:n.onCellClick,onCellHover:n.onCellHover,onColumnHeaderClick:n.onColumnHeaderClick,onError:n.onError,onPageChange:n.onPageChange,onPageSizeChange:n.onPageSizeChange,onRowClick:n.onRowClick,onRowHover:n.onRowHover,onRowSelected:n.onRowSelected,onSelectionChange:n.onSelectionChange,onSortModelChange:n.onSortModelChange,onFilterModelChange:n.onFilterModelChange,onStateChange:n.onStateChange,page:n.page,pagination:n.pagination,paginationMode:n.paginationMode,rowCount:n.rowCount,rowHeight:n.rowHeight,rowsPerPageOptions:n.rowsPerPageOptions,scrollbarSize:n.scrollbarSize,showCellRightBorder:n.showCellRightBorder,showColumnRightBorder:n.showColumnRightBorder,sortingOrder:n.sortingOrder,sortModel:n.sortModel,density:n.density,filterModel:n.filterModel,localeText:Object.assign(Object.assign({},tr),n.localeText)})),[n.pageSize,n.logger,n.sortingMode,n.filterMode,n.autoHeight,n.autoPageSize,n.checkboxSelection,n.columnBuffer,n.columnTypes,n.disableSelectionOnClick,n.disableMultipleColumnsSorting,n.disableMultipleSelection,n.disableMultipleColumnsFiltering,n.disableColumnResize,n.disableDensitySelector,n.disableColumnReorder,n.disableColumnFilter,n.disableColumnMenu,n.disableColumnSelector,n.disableExtendRowFullWidth,n.headerHeight,n.hideFooter,n.hideFooterPagination,n.hideFooterRowCount,n.hideFooterSelectedRowCount,n.showToolbar,n.logLevel,n.onCellClick,n.onCellHover,n.onColumnHeaderClick,n.onError,n.onPageChange,n.onPageSizeChange,n.onRowClick,n.onRowHover,n.onRowSelected,n.onSelectionChange,n.onSortModelChange,n.onFilterModelChange,n.onStateChange,n.page,n.pagination,n.paginationMode,n.rowCount,n.rowHeight,n.rowsPerPageOptions,n.scrollbarSize,n.showCellRightBorder,n.showColumnRightBorder,n.sortingOrder,n.sortModel,n.density,n.filterModel,n.localeText]),{gridState:i,dispatch:l}=aa(e,"options",Ta,Object.assign({},Gr)),a=react.useCallback((e=>{l({type:"options::UPDATE",payload:e});}),[l]);return react.useEffect((()=>{a(r);}),[r,a]),i.options}(f,i);qn(v.logger,v.logLevel);const w=Jn("GridComponent");_a(a,p,f);const C=function(e,n){const[o,i]=react.useState(null),l=e=>{i(e);};return react.useEffect((()=>e.current.subscribeEvent("componentError",l)),[e]),react.useEffect((()=>{e.current.showError(n.error);}),[e,n.error]),o}(f,i);!function(n,r){var i;const l=react.useRef(!1),a=Jn("useEvents"),s=lo(r,Qo),c=react.useCallback((e=>(...t)=>r.current.publishEvent(e,...t)),[r]),u=react.useCallback((e=>{if(null==e.target)throw new Error("Event target null - Target has been removed or component might already be unmounted.");const t=e.target,n={};if(wo(t)){const e=bo(t,"MuiDataGrid-cell"),o=bo(t,"MuiDataGrid-row");if(null==o)return null;const i=yo(o),l=r.current.getRowFromId(i),a=r.current.getRowIndexFromId(i),s=e.getAttribute("data-field"),c=e.getAttribute("data-value"),u=r.current.getColumnFromField(s);if(!u||!u.disableClickEventBubbling){const t={data:l,rowIndex:a,colDef:u,rowModel:l,api:r.current};n.cell=Ho(Object.assign(Object.assign({},t),{element:e,value:c})),n.row=Vo(Object.assign(Object.assign({},t),{element:o}));}}return n}),[r]),d=react.useCallback((e=>{const t=u(e);t&&(t.cell&&r.current.publishEvent("cellClick",t.cell),t.row&&r.current.publishEvent("rowClick",t.row));}),[r,u]),g=react.useCallback((e=>{const t=u(e);t&&(t.cell&&r.current.publishEvent("cellHover",t.cell),t.row&&r.current.publishEvent("rowHover",t.row),t.header&&r.current.publishEvent("columnHeaderHover",t.header));}),[r,u]),p=react.useCallback((e=>{r.current.publishEvent("focusout",e),null===e.relatedTarget&&r.current.publishEvent("gridFocusOut",e);}),[r]),m=react.useCallback((e=>r.current.subscribeEvent("unmount",e)),[r]),h=react.useCallback((e=>r.current.subscribeEvent("resize",e)),[r]),f=react.useCallback((()=>{l.current=!0;}),[]),b=react.useCallback((()=>{l.current=!1;}),[]),v=react.useCallback((()=>r.current.publishEvent("resize")),[r]);Qn(r,{resize:v,onUnmount:m,onResize:h},"EventsApi"),Di(r,"colResizing:start",f),Di(r,"colResizing:stop",b),Di(r,"columnClick",s.onColumnHeaderClick),Di(r,"cellClick",s.onCellClick),Di(r,"rowClick",s.onRowClick),Di(r,"cellHover",s.onCellHover),Di(r,"rowHover",s.onRowHover),Di(r,"componentError",s.onError),Di(r,"stateChange",s.onStateChange),react.useEffect((()=>{var e;if(n&&n.current&&(null===(e=r.current)||void 0===e?void 0:e.isInitialised)){a.debug("Binding events listeners");const e=c("keydown"),t=c("keyup"),o=n.current;o.addEventListener("click",d,{capture:!0}),o.addEventListener("mouseover",g,{capture:!0}),o.addEventListener("focusout",p),o.addEventListener("keydown",e),o.addEventListener("keyup",t),r.current.isInitialised=!0;const i=r.current;return ()=>{a.debug("Clearing all events listeners"),i.publishEvent("unmount"),o.removeEventListener("click",d,{capture:!0}),o.removeEventListener("mouseover",g,{capture:!0}),o.removeEventListener("focusout",p),o.removeEventListener("keydown",e),o.removeEventListener("keyup",t),i.removeAllListeners();}}}),[n,null===(i=r.current)||void 0===i?void 0:i.isInitialised,c,a,d,g,p,r]);}(a,f);const y=function(n){const r=Jn("useResizeContainer"),i=react.useRef(),l=react.useRef(),a=react.useCallback((e=>{clearTimeout(i.current),clearTimeout(l.current),0===e.height&&(i.current=setTimeout((()=>{r.warn(["The parent of the grid has an empty height.","You need to make sure the container has an intrinsic height.","The grid displays with a height of 0px.","","You can find a solution in the docs:","https://material-ui.com/components/data-grid/rendering/#layout"].join("\n"));}))),0===e.width&&(l.current=setTimeout((()=>{r.warn(["The parent of the grid has an empty width.","You need to make sure the container has an intrinsic width.","The grid displays with a width of 0px.","","You can find a solution in the docs:","https://material-ui.com/components/data-grid/rendering/#layout"].join("\n"));}))),r.info("resized...",e),n.current.resize&&n.current.resize();}),[r,n]);return react.useEffect((()=>()=>{clearTimeout(i.current),clearTimeout(l.current);}),[]),a}(f);la(i.columns,f),ma(i.rows,f),ca(0,f),ha(f),fa(f,i.rows),ta(f),da(f),sa(f,i.rows),Da(m,f),(e=>{const n=Jn("useDensity"),{density:r,rowHeight:i,headerHeight:l}=lo(e,Qo),[,a,s]=io(e),c=react.useCallback(((e,t,n)=>{switch(e){case Lr.Compact:return {value:e,headerHeight:Math.floor(.7*t),rowHeight:Math.floor(.7*n)};case Lr.Comfortable:return {value:e,headerHeight:Math.floor(1.3*t),rowHeight:Math.floor(1.3*n)};default:return {value:e,headerHeight:t,rowHeight:n}}}),[]),u=react.useCallback(((e,t=l,r=i)=>{n.debug("Set grid density to "+e),a((n=>Object.assign(Object.assign({},n),{density:Object.assign(Object.assign({},n.density),c(e,t,r))}))),s();}),[n,a,s,c,l,i]);react.useEffect((()=>{u(r,l,i);}),[u,r,i,l]),Qn(e,{setDensity:u},"DensityApi");})(f),Ca(g,m,h,f),(e=>{const{localeText:t}=lo(e,Qo);Qn(e,{getLocaleText:react.useCallback((e=>{if(null==t[e])throw new Error(`Missing translation for key ${e}.`);return t[e]}),[t])},"LocaleTextApi");})(f),ra(f),ja(g,f),ua(f);const S=Ra(i.components,i.componentsProps,f);!function(e,n){const[,r,o]=io(e),i=Jn("useStateProp");react.useEffect((()=>{null!=n&&e.current.state!==n&&(i.debug("Overriding state with props.state"),r((e=>Object.assign(Object.assign({},e),n))),o());}),[e,o,i,n,r]);}(f,i.state),function(e,t){const[n]=io(e);if(null!=n.rendering.renderContext){const{page:e,firstColIdx:r,lastColIdx:o,firstRowIdx:i,lastRowIdx:l}=n.rendering.renderContext;t.info(`Rendering, page: ${e}, col: ${r}-${o}, row: ${i}-${l}`);}}(f,w);const M=zl(f),x=!i.loading&&0===b.rows.totalRowCount;return react.createElement(Bo.Provider,{value:f},react.createElement(Hl,{onResize:y,nonce:i.nonce},(e=>{var t,r,o,l,a;return react.createElement($o,{ref:s,className:i.className,size:e,header:d,footer:c},react.createElement(Fa,{hasError:null!=C,componentProps:C,api:f,logger:w,render:e=>{var t;return react.createElement(Ea,null,react.createElement(S.ErrorOverlay,Object.assign({},e,M,null===(t=i.componentsProps)||void 0===t?void 0:t.errorOverlay)))}},react.createElement("div",{ref:d},react.createElement(S.Header,Object.assign({},M,null===(t=i.componentsProps)||void 0===t?void 0:t.header))),react.createElement(Ea,null,react.createElement(gl,{ContentComponent:S.ColumnMenu,contentComponentProps:Object.assign(Object.assign({},M),null===(r=i.componentsProps)||void 0===r?void 0:r.columnMenu)}),react.createElement(Jl,{licenseStatus:i.licenseStatus}),react.createElement(Ko,{ref:p},react.createElement(ll,{ref:g})),x&&react.createElement(S.NoRowsOverlay,Object.assign({},M,null===(o=i.componentsProps)||void 0===o?void 0:o.noRowsOverlay)),i.loading&&react.createElement(S.LoadingOverlay,Object.assign({},M,null===(l=i.componentsProps)||void 0===l?void 0:l.loadingOverlay)),react.createElement(ei,{ref:m},react.createElement(tl,{ref:h}))),!b.options.hideFooter&&react.createElement("div",{ref:c},react.createElement(S.Footer,Object.assign({},M,null===(a=i.componentsProps)||void 0===a?void 0:a.footer)))))})))})),ka={disableColumnResize:!0,disableColumnReorder:!0,disableMultipleColumnsFiltering:!0,disableMultipleColumnsSorting:!0,disableMultipleSelection:!0,pagination:!0,apiRef:void 0},La=react.forwardRef((function(e,t){const{className:r,pageSize:o}=e,i=X(e,["className","pageSize"]);let l=o;return l&&l>100&&(l=100),react.createElement(Pa,Object.assign({ref:t,className:zo("MuiDataGrid-root",r),pageSize:l},i,ka,{licenseStatus:"Valid"}))}));La.propTypes={apiRef:chainPropTypes(propTypes.any),columns:chainPropTypes(propTypes.any),disableColumnReorder:chainPropTypes(propTypes.bool),disableColumnResize:chainPropTypes(propTypes.bool),disableMultipleColumnsFiltering:chainPropTypes(propTypes.bool),disableMultipleColumnsSorting:chainPropTypes(propTypes.bool),disableMultipleSelection:chainPropTypes(propTypes.bool),pageSize:chainPropTypes(propTypes.number),pagination:e=>!1===e.pagination?new Error(["Material-UI: `<DataGrid pagination={false} />` is not a valid prop.","Infinite scrolling is not available in the MIT version.","","You need to upgrade to the XGrid component to disable the pagination."].join("\n")):null};const Aa=react.memo(La);Aa.Naked=La;

export { Aa as DataGrid };
