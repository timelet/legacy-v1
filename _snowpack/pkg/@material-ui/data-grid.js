import { g as global } from '../common/polyfill-node:global-21e5c503.js';
import { p as process } from '../common/process-2545f00a.js';
import { r as react } from '../common/index-45809189.js';
import { m as _createClass, x as SheetsRegistry, y as createGenerateClassName, S as StylesProvider, _ as _objectWithoutProperties, A as makeStyles, c as clsx, b as _defineProperty, p as formatMuiErrorMessage, j as defaultTheme, h as createMuiTheme, w as withStyles, B as jssPreset, C as hexToRgb, D as rgbToHex, E as hslToRgb, F as decomposeColor, G as recomposeColor, H as getContrastRatio, I as getLuminance, e as emphasize, f as fade, J as darken, K as lighten, L as easing, d as duration, a as capitalize, q as createSvgIcon, i as deepmerge } from '../common/createSvgIcon-81306b7b.js';
import { c as createMuiStrictModeTheme, w as withTheme, T as ThemeProvider, _, N as NoSsr, C as ClickAwayListener } from '../common/NoSsr-5f870b52.js';
import { c as createStyles, m as makeStyles$1, K as KeyboardArrowRight, a as KeyboardArrowLeft } from '../common/KeyboardArrowRight-201738b6.js';
import { _ as _extends } from '../common/extends-7477639a.js';
import { p as propTypes } from '../common/index-c103191b.js';
import { h as hoistNonReactStatics_cjs } from '../common/hoist-non-react-statics.cjs-fec7e822.js';
import { _ as _classCallCheck, u as useTheme, f as useFormControl, T as Typography, d as Toolbar, H, I as InputBase, G as Grow, b as TextField, e as MenuList, B as Button, C as CircularProgress, c as G, N } from '../common/TextField-3a90b499.js';
import { _ as _slicedToArray, I as IconButton, P as Paper } from '../common/Portal-2e7ae8c5.js';
import { d as useControlled, a as useIsFocusVisible, u as useForkRef, s as setRef, b as useEventCallback } from '../common/useIsFocusVisible-b5278cab.js';
import { a as ownerWindow, o as ownerDocument, d as debounce } from '../common/ownerWindow-af75b35f.js';
import { P as Popper } from '../common/Popper-5eb121be.js';
import { u as useId } from '../common/unstable_useId-9eb2bab3.js';
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

  return /*#__PURE__*/react.createElement(ComponentProp, _extends({
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
  return /*#__PURE__*/react.createElement("label", _extends({
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
    root: _extends({}, theme.typography.body2, {
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

  return /*#__PURE__*/react.createElement(Component, _extends({
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
  }, labelRowsPerPage), rowsPerPageOptions.length > 1 && /*#__PURE__*/react.createElement(H, _extends({
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
var B = withStyles(styles$6, {
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
var Tooltip$1 = withStyles(styles$7, {
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
***************************************************************************** */function Y(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);}return n}function K(e,t){return e===t||e!=e&&t!=t}function Z(e,t){for(var n=e.length;n--;)if(K(e[n][0],t))return n;return -1}var q=Array.prototype.splice;function J(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}J.prototype.clear=function(){this.__data__=[],this.size=0;},J.prototype.delete=function(e){var t=this.__data__,n=Z(t,e);return !(n<0)&&(n==t.length-1?t.pop():q.call(t,n,1),--this.size,!0)},J.prototype.get=function(e){var t=this.__data__,n=Z(t,e);return n<0?void 0:t[n][1]},J.prototype.has=function(e){return Z(this.__data__,e)>-1},J.prototype.set=function(e,t){var n=this.__data__,r=Z(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this};var Q="object"==typeof global&&global&&global.Object===Object&&global,ee="object"==typeof self&&self&&self.Object===Object&&self,te=Q||ee||Function("return this")(),ne=te.Symbol,re=Object.prototype,oe=re.hasOwnProperty,ie=re.toString,le=ne?ne.toStringTag:void 0;var ae=Object.prototype.toString;var se=ne?ne.toStringTag:void 0;function ce(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":se&&se in Object(e)?function(e){var t=oe.call(e,le),n=e[le];try{e[le]=void 0;var r=!0;}catch(e){}var o=ie.call(e);return r&&(t?e[le]=n:delete e[le]),o}(e):function(e){return ae.call(e)}(e)}function ue(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function de(e){if(!ue(e))return !1;var t=ce(e);return "[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}var ge,pe=te["__core-js_shared__"],me=(ge=/[^.]+$/.exec(pe&&pe.keys&&pe.keys.IE_PROTO||""))?"Symbol(src)_1."+ge:"";var he=Function.prototype.toString;function fe(e){if(null!=e){try{return he.call(e)}catch(e){}try{return e+""}catch(e){}}return ""}var be=/^\[object .+?Constructor\]$/,ve=Function.prototype,we=Object.prototype,Ce=ve.toString,ye=we.hasOwnProperty,Se=RegExp("^"+Ce.call(ye).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Oe(e){return !(!ue(e)||(t=e,me&&me in t))&&(de(e)?Se:be).test(fe(e));var t;}function Me(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return Oe(n)?n:void 0}var xe=Me(te,"Map"),je=Me(Object,"create");var Ie=Object.prototype.hasOwnProperty;var ze=Object.prototype.hasOwnProperty;function Re(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}function _e(e,t){var n,r,o=e.__data__;return ("string"==(r=typeof(n=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof t?"string":"hash"]:o.map}function De(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1]);}}Re.prototype.clear=function(){this.__data__=je?je(null):{},this.size=0;},Re.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},Re.prototype.get=function(e){var t=this.__data__;if(je){var n=t[e];return "__lodash_hash_undefined__"===n?void 0:n}return Ie.call(t,e)?t[e]:void 0},Re.prototype.has=function(e){var t=this.__data__;return je?void 0!==t[e]:ze.call(t,e)},Re.prototype.set=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=je&&void 0===t?"__lodash_hash_undefined__":t,this},De.prototype.clear=function(){this.size=0,this.__data__={hash:new Re,map:new(xe||J),string:new Re};},De.prototype.delete=function(e){var t=_e(this,e).delete(e);return this.size-=t?1:0,t},De.prototype.get=function(e){return _e(this,e).get(e)},De.prototype.has=function(e){return _e(this,e).has(e)},De.prototype.set=function(e,t){var n=_e(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this};function Fe(e){var t=this.__data__=new J(e);this.size=t.size;}Fe.prototype.clear=function(){this.__data__=new J,this.size=0;},Fe.prototype.delete=function(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n},Fe.prototype.get=function(e){return this.__data__.get(e)},Fe.prototype.has=function(e){return this.__data__.has(e)},Fe.prototype.set=function(e,t){var n=this.__data__;if(n instanceof J){var r=n.__data__;if(!xe||r.length<199)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new De(r);}return n.set(e,t),this.size=n.size,this};function Pe(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new De;++t<n;)this.add(e[t]);}function Ee(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(t(e[n],n,e))return !0;return !1}Pe.prototype.add=Pe.prototype.push=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this},Pe.prototype.has=function(e){return this.__data__.has(e)};function Te(e,t,n,r,o,i){var l=1&n,a=e.length,s=t.length;if(a!=s&&!(l&&s>a))return !1;var c=i.get(e);if(c&&i.get(t))return c==t;var u=-1,d=!0,g=2&n?new Pe:void 0;for(i.set(e,t),i.set(t,e);++u<a;){var p=e[u],m=t[u];if(r)var h=l?r(m,p,u,t,e,i):r(p,m,u,e,t,i);if(void 0!==h){if(h)continue;d=!1;break}if(g){if(!Ee(t,(function(e,t){if(l=t,!g.has(l)&&(p===e||o(p,e,n,r,i)))return g.push(t);var l;}))){d=!1;break}}else if(p!==m&&!o(p,m,n,r,i)){d=!1;break}}return i.delete(e),i.delete(t),d}var ke=te.Uint8Array;function Le(e){var t=-1,n=Array(e.size);return e.forEach((function(e,r){n[++t]=[r,e];})),n}function Ae(e){var t=-1,n=Array(e.size);return e.forEach((function(e){n[++t]=e;})),n}var Ge=ne?ne.prototype:void 0,Ne=Ge?Ge.valueOf:void 0;var He=Array.isArray;var Ve=Object.prototype.propertyIsEnumerable,$e=Object.getOwnPropertySymbols,Be=$e?function(e){return null==e?[]:(e=Object(e),function(e,t){for(var n=-1,r=null==e?0:e.length,o=0,i=[];++n<r;){var l=e[n];t(l,n,e)&&(i[o++]=l);}return i}($e(e),(function(t){return Ve.call(e,t)})))}:function(){return []};function We(e){return null!=e&&"object"==typeof e}function Ue(e){return We(e)&&"[object Arguments]"==ce(e)}var Xe=Object.prototype,Ye=Xe.hasOwnProperty,Ke=Xe.propertyIsEnumerable,Ze=Ue(function(){return arguments}())?Ue:function(e){return We(e)&&Ye.call(e,"callee")&&!Ke.call(e,"callee")};var qe="object"==typeof exports&&exports&&!exports.nodeType&&exports,Je=qe&&"object"==typeof module&&module&&!module.nodeType&&module,Qe=Je&&Je.exports===qe?te.Buffer:void 0,et=(Qe?Qe.isBuffer:void 0)||function(){return !1},tt=/^(?:0|[1-9]\d*)$/;function nt(e,t){var n=typeof e;return !!(t=null==t?9007199254740991:t)&&("number"==n||"symbol"!=n&&tt.test(e))&&e>-1&&e%1==0&&e<t}function rt(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}var ot={};ot["[object Float32Array]"]=ot["[object Float64Array]"]=ot["[object Int8Array]"]=ot["[object Int16Array]"]=ot["[object Int32Array]"]=ot["[object Uint8Array]"]=ot["[object Uint8ClampedArray]"]=ot["[object Uint16Array]"]=ot["[object Uint32Array]"]=!0,ot["[object Arguments]"]=ot["[object Array]"]=ot["[object ArrayBuffer]"]=ot["[object Boolean]"]=ot["[object DataView]"]=ot["[object Date]"]=ot["[object Error]"]=ot["[object Function]"]=ot["[object Map]"]=ot["[object Number]"]=ot["[object Object]"]=ot["[object RegExp]"]=ot["[object Set]"]=ot["[object String]"]=ot["[object WeakMap]"]=!1;var it,lt="object"==typeof exports&&exports&&!exports.nodeType&&exports,at=lt&&"object"==typeof module&&module&&!module.nodeType&&module,st=at&&at.exports===lt&&Q.process,ct=function(){try{return st&&st.binding&&st.binding("util")}catch(e){}}(),ut=ct&&ct.isTypedArray,dt=ut?(it=ut,function(e){return it(e)}):function(e){return We(e)&&rt(e.length)&&!!ot[ce(e)]},gt=Object.prototype.hasOwnProperty;function pt(e,t){var n=He(e),r=!n&&Ze(e),o=!n&&!r&&et(e),i=!n&&!r&&!o&&dt(e),l=n||r||o||i,a=l?function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}(e.length,String):[],s=a.length;for(var c in e)!t&&!gt.call(e,c)||l&&("length"==c||o&&("offset"==c||"parent"==c)||i&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||nt(c,s))||a.push(c);return a}var mt=Object.prototype;var ht=function(e,t){return function(n){return e(t(n))}}(Object.keys,Object),ft=Object.prototype.hasOwnProperty;function bt(e){if(n=(t=e)&&t.constructor,t!==("function"==typeof n&&n.prototype||mt))return ht(e);var t,n,r=[];for(var o in Object(e))ft.call(e,o)&&"constructor"!=o&&r.push(o);return r}function vt(e){return null!=(t=e)&&rt(t.length)&&!de(t)?pt(e):bt(e);var t;}function wt(e){return function(e,t,n){var r=t(e);return He(e)?r:function(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}(r,n(e))}(e,vt,Be)}var Ct=Object.prototype.hasOwnProperty;var yt=Me(te,"DataView"),St=Me(te,"Promise"),Ot=Me(te,"Set"),Mt=Me(te,"WeakMap"),xt=fe(yt),jt=fe(xe),It=fe(St),zt=fe(Ot),Rt=fe(Mt),_t=ce;(yt&&"[object DataView]"!=_t(new yt(new ArrayBuffer(1)))||xe&&"[object Map]"!=_t(new xe)||St&&"[object Promise]"!=_t(St.resolve())||Ot&&"[object Set]"!=_t(new Ot)||Mt&&"[object WeakMap]"!=_t(new Mt))&&(_t=function(e){var t=ce(e),n="[object Object]"==t?e.constructor:void 0,r=n?fe(n):"";if(r)switch(r){case xt:return "[object DataView]";case jt:return "[object Map]";case It:return "[object Promise]";case zt:return "[object Set]";case Rt:return "[object WeakMap]"}return t});var Dt=_t,Ft=Object.prototype.hasOwnProperty;function Pt(e,t,n,r,o,i){var l=He(e),a=He(t),s=l?"[object Array]":Dt(e),c=a?"[object Array]":Dt(t),u="[object Object]"==(s="[object Arguments]"==s?"[object Object]":s),d="[object Object]"==(c="[object Arguments]"==c?"[object Object]":c),g=s==c;if(g&&et(e)){if(!et(t))return !1;l=!0,u=!1;}if(g&&!u)return i||(i=new Fe),l||dt(e)?Te(e,t,n,r,o,i):function(e,t,n,r,o,i,l){switch(n){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return !1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return !(e.byteLength!=t.byteLength||!i(new ke(e),new ke(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return K(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var a=Le;case"[object Set]":var s=1&r;if(a||(a=Ae),e.size!=t.size&&!s)return !1;var c=l.get(e);if(c)return c==t;r|=2,l.set(e,t);var u=Te(a(e),a(t),r,o,i,l);return l.delete(e),u;case"[object Symbol]":if(Ne)return Ne.call(e)==Ne.call(t)}return !1}(e,t,s,n,r,o,i);if(!(1&n)){var p=u&&Ft.call(e,"__wrapped__"),m=d&&Ft.call(t,"__wrapped__");if(p||m){var h=p?e.value():e,f=m?t.value():t;return i||(i=new Fe),o(h,f,n,r,i)}}return !!g&&(i||(i=new Fe),function(e,t,n,r,o,i){var l=1&n,a=wt(e),s=a.length;if(s!=wt(t).length&&!l)return !1;for(var c=s;c--;){var u=a[c];if(!(l?u in t:Ct.call(t,u)))return !1}var d=i.get(e);if(d&&i.get(t))return d==t;var g=!0;i.set(e,t),i.set(t,e);for(var p=l;++c<s;){var m=e[u=a[c]],h=t[u];if(r)var f=l?r(h,m,u,t,e,i):r(m,h,u,e,t,i);if(!(void 0===f?m===h||o(m,h,n,r,i):f)){g=!1;break}p||(p="constructor"==u);}if(g&&!p){var b=e.constructor,v=t.constructor;b==v||!("constructor"in e)||!("constructor"in t)||"function"==typeof b&&b instanceof b&&"function"==typeof v&&v instanceof v||(g=!1);}return i.delete(e),i.delete(t),g}(e,t,n,r,o,i))}function Et(e,t,n,r,o){return e===t||(null==e||null==t||!We(e)&&!We(t)?e!=e&&t!=t:Pt(e,t,n,r,Et,o))}function Tt(e,t){return Et(e,t)}function kt(e){return e instanceof Date}function Lt(e){return Array.isArray(e)}function At(e){return "string"==typeof e}function Gt(e){return "number"==typeof e}function Nt(e){return "function"==typeof e}function Vt(e){return e.type||e.mode}function $t(){return "alpha"in p}function Bt(e,t){var n,r;return $t()?null===(n=p)||void 0===n?void 0:n.alpha(e,t):null===(r=p)||void 0===r?void 0:r.fade(e,t)}function Wt(){try{const e="__some_random_key_you_are_not_going_to_use__";return window.localStorage.setItem(e,e),window.localStorage.removeItem(e),!0}catch(e){return !1}}const Ut=makeStyles$1((e=>{const t="light"===Vt(e.palette)?lighten(Bt(e.palette.divider,1),.88):darken(Bt(e.palette.divider,1),.68),n={root:Object.assign(Object.assign({flex:1,boxSizing:"border-box",position:"relative",border:"1px solid "+t,borderRadius:e.shape.borderRadius,color:e.palette.text.primary},e.typography.body2),{outline:"none",height:"100%",display:"flex",flexDirection:"column","& *, & *::before, & *::after":{boxSizing:"inherit"},"&.MuiDataGrid-autoHeight":{height:"auto"},"& .MuiDataGrid-main":{position:"relative",flexGrow:1,display:"flex",flexDirection:"column"},"& .MuiDataGrid-overlay":{display:"flex",position:"absolute",top:0,left:0,right:0,bottom:0,alignSelf:"center",alignItems:"center",justifyContent:"center",backgroundColor:Bt(e.palette.background.default,e.palette.action.disabledOpacity)},"& .MuiDataGrid-toolbar":{display:"flex",alignItems:"center",padding:"4px 4px 0"},"& .MuiDataGrid-columnsContainer":{position:"absolute",top:0,left:0,right:0,overflow:"hidden",display:"flex",flexDirection:"column",borderBottom:"1px solid "+t},"& .MuiDataGrid-scrollArea":{position:"absolute",top:0,zIndex:101,width:20,bottom:0},"& .MuiDataGrid-scrollArea-left":{left:0},"& .MuiDataGrid-scrollArea-right":{right:0},"& .MuiDataGrid-colCellWrapper":{display:"flex",width:"100%",alignItems:"center",overflow:"hidden"},"& .MuiDataGrid-colCell, & .MuiDataGrid-cell":{WebkitTapHighlightColor:"transparent",lineHeight:null,padding:e.spacing(0,2)},"& .MuiDataGrid-colCell:focus, & .MuiDataGrid-cell:focus":{outline:"dotted",outlineWidth:1,outlineOffset:-2},"& .MuiDataGrid-colCellCheckbox, & .MuiDataGrid-cellCheckbox":{padding:0,justifyContent:"center",alignItems:"center"},"& .MuiDataGrid-colCell":{position:"relative",display:"flex",alignItems:"center"},"& .MuiDataGrid-colCellTitleContainer":{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",display:"inline-flex",flex:1},"& .MuiDataGrid-colCellNumeric .MuiDataGrid-iconButtonContainer":{paddingRight:5},"& .MuiDataGrid-colCellSortable":{cursor:"pointer"},"& .MuiDataGrid-sortIcon":{fontSize:18},"& .MuiDataGrid-colCellCenter .MuiDataGrid-colCellTitleContainer":{justifyContent:"center"},"& .MuiDataGrid-colCellRight .MuiDataGrid-colCellTitleContainer":{justifyContent:"flex-end"},"& .MuiDataGrid-colCellTitle":{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontWeight:e.typography.fontWeightMedium},"& .MuiDataGrid-colCellMoving":{backgroundColor:e.palette.action.hover},"& .MuiDataGrid-columnSeparator":{position:"absolute",right:-12,zIndex:100,display:"flex",flexDirection:"column",justifyContent:"center",color:t},"& .MuiDataGrid-columnSeparatorResizable":{cursor:"col-resize",touchAction:"none","&:hover":{color:e.palette.text.primary,"@media (hover: none)":{color:t}},"&.Mui-resizing":{color:e.palette.text.primary}},"& .MuiDataGrid-iconSeparator":{color:"inherit"},"& .MuiDataGrid-menuIcon":{visibility:"hidden",fontSize:20,marginRight:-6,display:"flex",alignItems:"center"},"& .MuiDataGrid-colCell:hover .MuiDataGrid-menuIcon, .MuiDataGrid-menuOpen":{visibility:"visible"},"& .MuiDataGrid-colCellWrapper.scroll .MuiDataGrid-colCell:last-child":{borderRight:"none"},"& .MuiDataGrid-dataContainer":{position:"relative",flexGrow:1,display:"flex",flexDirection:"column"},"& .MuiDataGrid-window":{position:"absolute",bottom:0,left:0,right:0,overflowX:"auto"},"& .MuiDataGrid-viewport":{position:"sticky",top:0,left:0,display:"flex",flexDirection:"column",overflow:"hidden"},"& .MuiDataGrid-row":{display:"flex",width:"fit-content","&:hover":{backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},"&.Mui-selected":{backgroundColor:Bt(e.palette.primary.main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:Bt(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:Bt(e.palette.primary.main,e.palette.action.selectedOpacity)}}}},"& .MuiDataGrid-cell":{display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",borderBottom:"1px solid "+t},"& .MuiDataGrid-colCellWrapper .MuiDataGrid-cell":{borderBottom:"none"},"& .MuiDataGrid-cellWithRenderer":{display:"flex",alignItems:"center"},"& .MuiDataGrid-withBorder":{borderRight:"1px solid "+t},"& .MuiDataGrid-cellLeft":{textAlign:"left"},"& .MuiDataGrid-cellRight":{textAlign:"right"},"& .MuiDataGrid-cellCenter":{textAlign:"center"},"& .MuiDataGrid-rowCount, & .MuiDataGrid-selectedRowCount":{alignItems:"center",display:"flex",margin:e.spacing(0,2)},"& .MuiDataGrid-footer":{display:"flex",justifyContent:"space-between",alignItems:"center",minHeight:52,"& .MuiDataGrid-selectedRowCount":{visibility:"hidden",width:0,height:0,[e.breakpoints.up("sm")]:{visibility:"visible",width:"auto",height:"auto"}}},"& .MuiDataGrid-colCell-dropZone .MuiDataGrid-colCell-draggable":{cursor:"move"},"& .MuiDataGrid-colCell-draggable":{display:"flex",width:"100%",justifyContent:"inherit"},"& .MuiDataGrid-colCell-dragging":{background:e.palette.background.paper,padding:"0 12px",borderRadius:e.shape.borderRadius,opacity:e.palette.action.disabledOpacity}})};if("dark"===Vt(e.palette)){const e="#202022",t="#585859",r="#838384";n.root=Object.assign(Object.assign({},n.root),{scrollbarColor:`${t} ${e}`,"& *::-webkit-scrollbar":{backgroundColor:e},"& *::-webkit-scrollbar-thumb":{borderRadius:8,backgroundColor:t,minHeight:24,border:"3px solid "+e},"& *::-webkit-scrollbar-thumb:focus":{backgroundColor:r},"& *::-webkit-scrollbar-thumb:active":{backgroundColor:r},"& *::-webkit-scrollbar-thumb:hover":{backgroundColor:r},"& *::-webkit-scrollbar-corner":{backgroundColor:e}});}return n}),{name:"MuiDataGrid"}),Yt=e=>e.columns.all,Kt=e=>e.columns.lookup,Zt=createSelector(Yt,Kt,((e,t)=>e.map((e=>t[e])))),qt=createSelector(Zt,(e=>e.filter((e=>null!=e.field&&!e.hide)))),Jt=createSelector(qt,(e=>{const t=[];return {totalWidth:e.reduce(((e,n)=>(t.push(e),e+n.width)),0),positions:t}})),Qt=createSelector(Zt,(e=>e.filter((e=>e.filterable)))),en=createSelector(Qt,(e=>e.map((e=>e.field)))),tn=createSelector(qt,(e=>e.length)),nn=createSelector(Jt,(e=>e.totalWidth)),Wn=Wt()&&null!=window.localStorage.getItem("DEBUG"),Un=()=>{},Xn={debug:Un,info:Un,warn:Un,error:Un},Yn=["debug","info","warn","error"];function Kn(e,t,n=console){const r=Yn.indexOf(t);if(-1===r)throw new Error(`Material-UI: Log level ${t} not recognized.`);return Yn.reduce(((t,o,i)=>(t[o]=i>=r?(...t)=>{const[r,...i]=t;n[o](`Material-UI: ${e} - ${r}`,...i);}:Un,t)),{})}const Zn=e=>t=>Kn(t,e);let qn;function Jn(e,t=("error")){qn=Wn?Zn("debug"):e?Nt(e)?e:t?n=>Kn(n,t.toString(),e):null:t?Zn(t.toString()):null;}function Qn(t){const{current:n}=react.useRef(qn?qn(t):Xn);return n}function er(n,r,o){const i=Qn("useApiMethod"),l=react.useRef(r);react.useEffect((()=>{l.current=r;}),[r]),react.useEffect((()=>{n.current.isInitialised&&Object.keys(r).forEach((e=>{n.current.hasOwnProperty(e)||(i.debug(`Adding ${o}.${e} to apiRef`),n.current[e]=(...t)=>l.current[e](...t));}));}),[r,o,n,i]);}const nr={rootGridLabel:"grid",noRowsLabel:"No rows",errorOverlayDefaultLabel:"An error occurred.",toolbarDensity:"Density",toolbarDensityLabel:"Density",toolbarDensityCompact:"Compact",toolbarDensityStandard:"Standard",toolbarDensityComfortable:"Comfortable",toolbarColumns:"Columns",toolbarColumnsLabel:"Show Column Selector",toolbarFilters:"Filters",toolbarFiltersLabel:"Show Filters",toolbarFiltersTooltipHide:"Hide Filters",toolbarFiltersTooltipShow:"Show Filters",toolbarFiltersTooltipActive:e=>e+" active filter(s)",columnsPanelTextFieldLabel:"Find column",columnsPanelTextFieldPlaceholder:"Column title",columnsPanelDragIconLabel:"Reorder Column",columnsPanelShowAllButton:"Show All",columnsPanelHideAllButton:"Hide All",filterPanelAddFilter:"Add Filter",filterPanelDeleteIconLabel:"Delete",filterPanelOperators:"Operators",filterPanelOperatorAnd:"And",filterPanelOperatorOr:"Or",filterPanelColumns:"Columns",columnMenuLabel:"Menu",columnMenuShowColumns:"Show columns",columnMenuFilter:"Filter",columnMenuHideColumn:"Hide",columnMenuUnsort:"Unsort",columnMenuSortAsc:"Sort by Asc",columnMenuSortDesc:"Sort by Desc",columnHeaderFiltersTooltipActive:e=>e+" active filter(s)",columnHeaderFiltersLabel:"Show Filters",columnHeaderSortIconLabel:"Sort",footerRowSelected:e=>1!==e?e.toLocaleString()+" rows selected":e.toLocaleString()+" row selected",footerTotalRows:"Total Rows:",footerPaginationRowsPerPage:"Rows per page:"},rr=(e,t)=>{const n=e.indexOf(t);return t&&-1!==n&&n+1!==e.length?e[n+1]:e[0]},or=e=>"desc"===e,ir=(e,t)=>null==e&&null!=t?-1:null==t&&null!=e?1:null==e&&null==t?0:null,lr=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=ir(o,i);return null!==l?l:"string"==typeof o?o.localeCompare(i.toString()):o-i},ar=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=ir(o,i);return null!==l?l:Number(o)-Number(i)},sr=(e,t,n,r)=>{const o=n.getValue(n.field),i=r.getValue(r.field),l=ir(o,i);return null!==l?l:o>i?1:o<i?-1:0},cr=createSvgIcon(react.createElement("path",{d:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"})),ur=createSvgIcon(react.createElement("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"})),dr=createSvgIcon(react.createElement("path",{d:"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"})),gr=createSvgIcon(react.createElement("path",{d:"M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"}));createSvgIcon(react.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}));createSvgIcon(react.createElement("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}));createSvgIcon(react.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}));const fr=createSvgIcon(react.createElement("path",{d:"M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"})),br=createSvgIcon(react.createElement("path",{d:"M11 19V5h2v14z"})),vr=createSvgIcon(react.createElement("path",{d:"M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"})),wr=createSvgIcon(react.createElement("path",{d:"M21,8H3V4h18V8z M21,10H3v4h18V10z M21,16H3v4h18V16z"})),Cr=createSvgIcon(react.createElement("path",{d:"M4 18h17v-6H4v6zM4 5v6h17V5H4z"})),yr=createSvgIcon(react.createElement("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})),Sr=createSvgIcon(react.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),Or=createSvgIcon(react.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})),Mr=createSvgIcon(react.createElement("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"})),xr=createSvgIcon(react.createElement("path",{d:"M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}));function jr(i){const{item:l,applyValue:a,type:s}=i,c=Y(i,["item","applyValue","type"]),u=react.useRef(),[d,g]=react.useState(l.value||""),[p,m]=react.useState(!1),h=react.useCallback((e=>{clearTimeout(u.current);const t=e.target.value;g(t),m(!0),u.current=setTimeout((()=>{a(Object.assign(Object.assign({},l),{value:t})),m(!1);}),500);}),[a,l]);react.useEffect((()=>()=>{clearTimeout(u.current);}),[]),react.useEffect((()=>{g(l.value||"");}),[l.value]);const f=p?{endAdornment:react.createElement(Mr,null)}:c.InputProps;return react.createElement(TextField,Object.assign({label:"Value",placeholder:"Filter value",value:d,onChange:h,type:s||"text",variant:"standard",InputProps:f,InputLabelProps:{shrink:!0}},c))}const Ir=()=>[{label:"contains",value:"contains",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(e.value,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:jr},{label:"equals",value:"equals",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{var r;const o=t.valueGetter?t.valueGetter(n):n.value;return 0===(null===(r=e.value)||void 0===r?void 0:r.localeCompare((null==o?void 0:o.toString())||"",void 0,{sensitivity:"base"}))}:null,InputComponent:jr},{label:"starts with",value:"startsWith",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(`^${e.value}.*$`,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:jr},{label:"ends with",value:"endsWith",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new RegExp(`.*${e.value}$`,"i");return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return n.test((null==r?void 0:r.toString())||"")}},InputComponent:jr}],zr={width:100,hide:!1,sortable:!0,resizable:!0,filterable:!0,sortDirection:null,sortComparator:lr,type:"string",align:"left",filterOperators:Ir()},Rr=()=>[{label:"=",value:"=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)===Number(e.value)}:null,InputComponent:jr,InputComponentProps:{type:"number"}},{label:"!=",value:"!=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)!==Number(e.value)}:null,InputComponent:jr,InputComponentProps:{type:"number"}},{label:">",value:">",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)>Number(e.value)}:null,InputComponent:jr,InputComponentProps:{type:"number"}},{label:">=",value:">=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)>=Number(e.value)}:null,InputComponent:jr,InputComponentProps:{type:"number"}},{label:"<",value:"<",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)<Number(e.value)}:null,InputComponent:jr,InputComponentProps:{type:"number"}},{label:"<=",value:"<=",getApplyFilterFn:(e,t)=>e.columnField&&e.value&&e.operatorValue?n=>{const r=t.valueGetter?t.valueGetter(n):n.value;return Number(r)<=Number(e.value)}:null,InputComponent:jr,InputComponentProps:{type:"number"}}],_r=Object.assign(Object.assign({},zr),{type:"number",align:"right",headerAlign:"right",sortComparator:ar,valueFormatter:({value:e})=>e&&Gt(e)&&e.toLocaleString()||e,filterOperators:Rr()}),Dr=e=>[{label:"is",value:"is",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()===n:new Date(r.toString()).getTime()===n)}},InputComponent:jr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is not",value:"not",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()!==n:new Date(r.toString()).getTime()!==n)}},InputComponent:jr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is after",value:"after",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()>n:new Date(r.toString()).getTime()>n)}},InputComponent:jr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is on or after",value:"onOrAfter",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()>=n:new Date(r.toString()).getTime()>=n)}},InputComponent:jr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is before",value:"before",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()<n:new Date(r.toString()).getTime()<n)}},InputComponent:jr,InputComponentProps:{type:e?"datetime-local":"date"}},{label:"is on or before",value:"onOrBefore",getApplyFilterFn:(e,t)=>{if(!e.columnField||!e.value||!e.operatorValue)return null;const n=new Date(e.value).getTime();return e=>{const r=t.valueGetter?t.valueGetter(e):e.value;return !!r&&(r instanceof Date?r.getTime()<=n:new Date(r.toString()).getTime()<=n)}},InputComponent:jr,InputComponentProps:{type:e?"datetime-local":"date"}}];function Fr({value:e}){return kt(e)?e.toLocaleDateString():e}function Pr({value:e}){return kt(e)?e.toLocaleString():e}const Er=Object.assign(Object.assign({},zr),{type:"date",sortComparator:sr,valueFormatter:Fr,filterOperators:Dr()}),Tr=Object.assign(Object.assign({},zr),{type:"dateTime",sortComparator:sr,valueFormatter:Pr,filterOperators:Dr(!0)}),Lr=()=>{const e={string:Object.assign({},zr),number:Object.assign({},_r),date:Object.assign({},Er),dateTime:Object.assign({},Tr)};return e.__default__=Object.assign({},zr),e};var Ar;!function(e){e.Compact="compact",e.Standard="standard",e.Comfortable="comfortable";}(Ar||(Ar={}));const Gr={client:"client",server:"server"},Nr={rowHeight:52,headerHeight:56,scrollbarSize:15,columnBuffer:2,rowsPerPageOptions:[25,50,100],pageSize:100,paginationMode:Gr.client,sortingMode:Gr.client,filterMode:Gr.client,sortingOrder:["asc","desc",null],columnTypes:Lr(),density:Ar.Standard,showToolbar:!1,localeText:nr};var Vr;!function(e){e.And="and",e.Or="or";}(Vr||(Vr={}));const $r=()=>({items:[],linkOperator:Vr.And});function Wr(e){return {type:"SET_PAGE_ACTION",payload:{page:e}}}function Ur(e){return {type:"SET_PAGESIZE_ACTION",payload:{pageSize:e}}}function Xr(e){return {type:"SET_PAGINATION_MODE_ACTION",payload:e}}function Yr(e){return {type:"SET_ROWCOUNT_ACTION",payload:e}}const Kr=(e,t)=>e&&t>0?Math.ceil(t/e):1,Zr=(e,{page:t})=>e.page!==t?Object.assign(Object.assign({},e),{page:t}):e,qr=(e,t)=>{const{pageSize:n}=t;if(e.pageSize===n)return e;return Object.assign(Object.assign({},e),{pageSize:n,pageCount:Kr(n,e.rowCount)})},Jr=(e,t)=>{const{totalRowCount:n}=t;if(e.rowCount!==n){const t=Kr(e.pageSize,n);return Object.assign(Object.assign({},e),{pageCount:t,rowCount:n,page:e.page>t?t:e.page})}return e},Qr={page:1,pageCount:0,pageSize:0,paginationMode:"client",rowCount:0},eo=(e,t)=>{switch(t.type){case"SET_PAGE_ACTION":return Zr(e,t.payload);case"SET_PAGESIZE_ACTION":return qr(e,t.payload);case"SET_PAGINATION_MODE_ACTION":return Object.assign(Object.assign({},e),{paginationMode:t.payload.paginationMode});case"SET_ROWCOUNT_ACTION":return Jr(e,t.payload);default:throw new Error("Material-UI: Action not found - "+JSON.stringify(t))}};const oo=()=>({rows:{idRowsLookup:{},allRows:[],totalRowCount:0},pagination:Qr,options:Nr,isScrolling:!1,columns:{all:[],lookup:{}},columnReorder:{dragCol:""},rendering:{realScroll:{left:0,top:0},renderContext:null,renderingZoneScroll:{left:0,top:0},virtualPage:0,virtualRowsCount:0,renderedSizes:null},containerSizes:null,scrollBar:{hasScrollX:!1,hasScrollY:!1,scrollBarSize:{x:0,y:0}},viewportSizes:{width:0,height:1},sorting:{sortedRows:[],sortModel:[]},keyboard:{cell:null,isMultipleKeyPressed:!1},selection:{},filter:$r(),columnMenu:{open:!1},preferencePanel:{open:!1},visibleRows:{visibleRowsLookup:{}},density:{value:Nr.density,rowHeight:Nr.rowHeight,headerHeight:Nr.headerHeight}}),io=e=>{const t=Qn("useGridApi"),[,n]=react.useState();e.current.isInitialised||e.current.state||(t.info("Initialising state."),e.current.state=oo(),e.current.forceUpdate=n);const i=react.useCallback((t=>t?e.current.state[t]:e.current.state),[e]),l=react.useCallback((t=>e.current.subscribeEvent("stateChange",t)),[e]),a=react.useCallback((t=>{let r;r=Nt(t)?t(e.current.state):t,e.current.state=r,n((()=>r));const o={api:e.current,state:r};e.current.publishEvent("stateChange",o);}),[e]);return er(e,{getState:i,onStateChange:l,setState:a},"StateApi"),e.current},lo=e=>{io(e);const t=react.useCallback((()=>e.current.forceUpdate((()=>e.current.state))),[e]),n=react.useCallback((t=>{const n=t(e.current.state),r=e.current.state!==n;if(e.current.state=n,r&&e.current.publishEvent){const t={api:e.current,state:n};e.current.publishEvent("stateChange",t);}}),[e]);return [e.current.state,n,t]},ao=(e,t)=>{const[n]=lo(e);return t(n)};function bo(e){return e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth}function vo(e,t){return e.closest("."+t)}function wo(e){return null!=e&&e.classList.contains("MuiDataGrid-cell")}function Co(e){return null!=e&&(wo(e)||null!==vo(e,"MuiDataGrid-cell"))}function So(e){return e.getAttribute("data-id")}function Oo(e){return e.getAttribute("data-field")}function Mo(e,t){return e.querySelector(`[data-field="${t}"]`)}function xo(e){const t=e.getAttribute("data-field"),n=vo(e,"MuiDataGrid-root");if(!n)throw new Error("Material-UI: The root element is not found.");return n.querySelectorAll(`:scope .MuiDataGrid-cell[data-field="${t}"]`)}function Ro(...e){return e.reduce(((e,t)=>t?(Lt(t)?e+=t.join(" "):At(t)?e+=t:"object"==typeof t&&(Object.keys(t).forEach((n=>{t[n]&&(e+=n+" ");})),e=e.trim()),e+=" "):e),"").trim()}const _o=["Meta","Control"],Do=e=>_o.indexOf(e)>-1,Po=e=>" "===e,Eo=e=>0===e.indexOf("Arrow"),To=e=>"Home"===e||"End"===e,ko=e=>0===e.indexOf("Page"),Lo=e=>To(e)||Eo(e)||ko(e)||Po(e);function Ao(e,t){const n=Object.assign(Object.assign({},e),t),r={};return Object.entries(n).forEach((([e,t])=>{t=t.extendType?Object.assign(Object.assign(Object.assign({},n[t.extendType]),t),{type:e}):Object.assign(Object.assign(Object.assign({},n.__default__),t),{type:e}),r[e]=t;})),r}function Go(e){const t=Object.assign({},e);return Object.keys(e).forEach((n=>{e.hasOwnProperty(n)&&void 0===e[n]&&delete t[n];})),t}function No(e,t){t=Go(t);return Object.assign(Object.assign({},e),t)}function Vo({element:e,value:t,rowIndex:n,rowModel:r,colDef:o,api:i}){return {element:e,value:t,field:null==o?void 0:o.field,getValue:t=>{const o=i.getColumnFromField(t);return o&&o.valueGetter?o.valueGetter(Vo({value:r[t],colDef:o,rowIndex:n,element:e,rowModel:r,api:i})):r[t]},row:r,colDef:o,rowIndex:n,api:i}}function $o({element:e,rowIndex:t,rowModel:n,api:r}){return {element:e,columns:r.getAllColumns(),getValue:e=>n[e],row:n,rowIndex:t,api:r}}const Bo=react.createContext(void 0),Wo=react.forwardRef((function(e,t){const{className:r}=e,o=Y(e,["className"]),i=Ut(),l=react.useContext(Bo),s=ao(l,tn),[c]=lo(l);return react.createElement("div",Object.assign({ref:t,className:Ro(i.root,r,{"MuiDataGrid-autoHeight":c.options.autoHeight}),role:"grid","aria-colcount":s,"aria-rowcount":c.rows.totalRowCount,tabIndex:0,"aria-label":l.current.getLocaleText("rootGridLabel"),"aria-multiselectable":!c.options.disableMultipleSelection},o))})),Uo=e=>e.density;createSelector(Uo,(e=>e.value));const Yo=createSelector(Uo,(e=>e.rowHeight)),Ko=createSelector(Uo,(e=>e.headerHeight)),Zo=react.forwardRef((function(e,t){const{className:r,style:o}=e,i=Y(e,["className","style"]),l=react.useContext(Bo),s=ao(l,Ko);return react.createElement("div",Object.assign({ref:t,className:Ro("MuiDataGrid-columnsContainer",r)},i,{style:Object.assign({minHeight:s,maxHeight:s,lineHeight:s+"px"},o)}))}));function qo(e){var t,r,o,i;const{className:l}=e,s=Y(e,["className"]),c=react.useContext(Bo),[u]=lo(c);return react.createElement("div",Object.assign({className:Ro("MuiDataGrid-dataContainer","data-container",l),style:{minHeight:null===(r=null===(t=u.containerSizes)||void 0===t?void 0:t.dataContainerSizes)||void 0===r?void 0:r.height,minWidth:null===(i=null===(o=u.containerSizes)||void 0===o?void 0:o.dataContainerSizes)||void 0===i?void 0:i.width}},s))}const Jo=function(e){const{className:t}=e,r=Y(e,["className"]);return react.createElement("div",Object.assign({className:Ro("MuiDataGrid-footer",t)},r))};function Qo(e){const{className:t,style:r}=e,o=Y(e,["className","style"]),i=react.useContext(Bo),l=ao(i,Ko);return react.createElement("div",Object.assign({className:Ro("MuiDataGrid-overlay",t),style:Object.assign({top:l},r)},o))}const ei=e=>e.options,ti=(e,t,n)=>{if(!e.autoHeight)return n;let r=t&&t.dataContainerSizes.height||0;return r<e.rowHeight&&(r=2*e.rowHeight),e.headerHeight+r},ni=react.forwardRef((function(e,r){const{className:o,size:i}=e,l=Y(e,["className","size"]),s=react.useContext(Bo),{autoHeight:c}=ao(s,ei),u=ao(s,Ko),[d]=lo(s);return react.useEffect((()=>{s.current.resize();}),[s]),react.createElement("div",{style:{width:i.width,height:ti(d.options,d.containerSizes,i.height)}},react.createElement("div",Object.assign({ref:r,className:Ro("MuiDataGrid-window",o)},l,{style:{top:u,overflowY:c?"hidden":"auto"}})))})),ri=e=>e.rows,oi=createSelector(ri,(e=>e&&e.totalRowCount)),ii=createSelector(ri,(e=>e&&e.idRowsLookup)),li=createSelector(ri,(e=>e.allRows.map((t=>e.idRowsLookup[t])))),ai=e=>e.selection,si=createSelector(ai,(e=>Object.keys(e).length)),ci=()=>{const e=react.useContext(Bo),o=ao(e,si),i=ao(e,oi),[l,s]=react.useState(o>0&&o!==i),[c,u]=react.useState(o===i||l);react.useEffect((()=>{const e=o>0&&o!==i;u(o===i||l),s(e);}),[l,i,o]);return react.createElement(j,{indeterminate:l,checked:c,onChange:(t,n)=>{u(n),e.current.selectRows(e.current.getAllRowIds(),n);},className:"MuiDataGrid-checkboxInput",color:"primary",inputProps:{"aria-label":"Select All Rows checkbox"}})};ci.displayName="HeaderCheckbox";const ui=react.memo((e=>{const{row:t,getValue:r,field:o}=e,i=react.useContext(Bo);return react.createElement(j,{checked:!!r(o),onChange:(e,n)=>{i.current.selectRow(t.id,n,!0);},className:"MuiDataGrid-checkboxInput",color:"primary",inputProps:{"aria-label":"Select Row checkbox"}})}));ui.displayName="CellCheckboxRenderer";const di={field:"__check__",headerName:"Checkbox Selection",description:"Select Multiple Rows",type:"checkboxSelection",width:48,align:"center",headerAlign:"center",resizable:!0,sortable:!1,filterable:!1,disableClickEventBubbling:!0,disableColumnMenu:!0,valueGetter:e=>e.api.getState().selection[e.row.id],renderHeader:e=>react.createElement(ci,Object.assign({},e)),renderCell:e=>react.createElement(ui,Object.assign({},e)),cellClassName:"MuiDataGrid-cellCheckbox",headerClassName:"MuiDataGrid-colCellCheckbox"},gi=(e,t)=>t?e[t]:e.__default__;function bi(e,t){const r="asc"===t?e.ColumnSortedAscendingIcon:e.ColumnSortedDescendingIcon;return react.createElement(r,{className:"MuiDataGrid-sortIcon"})}const vi=react.memo((function(e){const{direction:t,index:r,hide:o}=e,i=react.useContext(Bo);return o||null==t?null:react.createElement("div",{className:"MuiDataGrid-iconButtonContainer"},react.createElement("div",null,null!=r&&react.createElement(I,{badgeContent:r,color:"default"},react.createElement(IconButton,{"aria-label":i.current.getLocaleText("columnHeaderSortIconLabel"),title:i.current.getLocaleText("columnHeaderSortIconLabel"),size:"small"},bi(i.current.components,t))),null==r&&react.createElement(IconButton,{"aria-label":i.current.getLocaleText("columnHeaderSortIconLabel"),title:i.current.getLocaleText("columnHeaderSortIconLabel"),size:"small"},bi(i.current.components,t))))})),wi=react.forwardRef((function(e,t){const{className:r}=e,o=Y(e,["className"]);return react.createElement("div",Object.assign({ref:t,className:Ro("MuiDataGrid-colCellTitle",r)},o))}));function Ci(o){const{label:i,description:l,columnWidth:a}=o,s=react.useRef(null),[c,u]=react.useState("");return react.useEffect((()=>{if(!l&&s&&s.current){const e=bo(s.current);u(e?i:"");}}),[s,a,l,i]),react.createElement(Tooltip$1,{title:l||c},react.createElement(wi,{ref:s},i))}const yi=react.memo((function(e){const{resizable:t,resizing:r,height:i}=e,l=Y(e,["resizable","resizing","height"]),s=react.useContext(Bo),{showColumnRightBorder:c}=ao(s,ei),u=s.current.components.ColumnResizeIcon,d=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();}),[]);return react.createElement("div",Object.assign({className:Ro("MuiDataGrid-columnSeparator",{"MuiDataGrid-columnSeparatorResizable":t,"Mui-resizing":r}),style:{minHeight:i,opacity:c?0:1}},l,{onClick:d}),react.createElement(u,{className:"MuiDataGrid-iconSeparator"}))})),Si=e=>e.columnMenu;function Oi(e){const{column:t}=e,r=react.useContext(Bo),i=ao(r,Si),l=r.current.components.ColumnMenuIcon,s=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();const n=r.current.getState().columnMenu;n.open&&n.field===t.field?r.current.hideColumnMenu():r.current.showColumnMenu(t.field);}),[r,t.field]),c=i.open&&i.field===t.field;return react.createElement("div",{className:Ro("MuiDataGrid-menuIcon",{"MuiDataGrid-menuOpen":c})},react.createElement(IconButton,{className:"MuiDataGrid-menuIconButton","aria-label":r.current.getLocaleText("columnMenuLabel"),title:r.current.getLocaleText("columnMenuLabel"),size:"small",onClick:s},react.createElement(l,{fontSize:"small"})))}const Mi=e=>e.preferencePanel;var ji;function Ii(e){const{counter:t}=e,r=react.useContext(Bo),i=ao(r,ei),l=ao(r,Mi),s=r.current.components.ColumnFilteredIcon,c=react.useCallback((e=>{e.preventDefault(),e.stopPropagation();const{open:t,openedPanelValue:n}=l;t&&n===ji.filters?r.current.hideFilterPanel():r.current.showFilterPanel();}),[r,l]);if(!t||i.disableColumnFilter||i.showToolbar)return null;const u=react.createElement(IconButton,{onClick:c,color:"default","aria-label":r.current.getLocaleText("columnHeaderFiltersLabel"),size:"small"},react.createElement(s,{fontSize:"small"}));return react.createElement(Tooltip$1,{title:r.current.getLocaleText("columnHeaderFiltersTooltipActive")(t),enterDelay:1e3},react.createElement("div",{className:"MuiDataGrid-iconButtonContainer"},react.createElement("div",null,t>1&&react.createElement(I,{badgeContent:t,color:"default"},u),1===t&&u)))}!function(e){e.filters="filters",e.columns="columns";}(ji||(ji={}));const zi=({column:e,colIndex:t,isDragging:r,isResizing:i,sortDirection:l,sortIndex:s,options:u,filterItemsCounter:d})=>{const g=react.useContext(Bo),p=ao(g,Ko),{disableColumnReorder:m,showColumnRightBorder:h,disableColumnResize:f,disableColumnMenu:b}=u,v=null!=e.sortDirection,w="number"===e.type;let C=null;e.renderHeader&&(C=e.renderHeader({api:g.current,colDef:e,colIndex:t,field:e.field}));const y=react.useCallback((t=>g.current.onColItemDragStart(e,t.currentTarget)),[g,e]),S=react.useCallback((e=>g.current.onColItemDragEnter(e)),[g]),O=react.useCallback((t=>g.current.onColItemDragOver(e,{x:t.clientX,y:t.clientY})),[g,e]),M=react.useCallback((()=>{const n={field:e.field,colDef:e,colIndex:t,api:g.current};g.current.publishEvent("columnClick",n);}),[g,t,e]),x=Ro("MuiDataGrid-colCell",e.headerClassName,"center"===e.headerAlign&&"MuiDataGrid-colCellCenter","right"===e.headerAlign&&"MuiDataGrid-colCellRight",{"MuiDataGrid-colCellSortable":e.sortable,"MuiDataGrid-colCellMoving":r,"MuiDataGrid-colCellSorted":v,"MuiDataGrid-colCellNumeric":w,"MuiDataGrid-withBorder":h}),j={draggable:!m,onDragStart:y,onDragEnter:S,onDragOver:O},I=e.width;let z;null!=l&&(z={"aria-sort":"asc"===l?"ascending":"descending"});const R=react.createElement(react.Fragment,null,react.createElement(vi,{direction:l,index:s,hide:e.hideSortIcons}),react.createElement(Ii,{counter:d})),_=react.createElement(Oi,{column:e});return react.createElement("div",Object.assign({className:x,key:e.field,"data-field":e.field,style:{width:I,minWidth:I,maxWidth:I},role:"columnheader",tabIndex:-1,"aria-colindex":t+1},z,{onClick:M}),react.createElement("div",Object.assign({className:"MuiDataGrid-colCell-draggable"},j),!b&&w&&!e.disableColumnMenu&&_,react.createElement("div",{className:"MuiDataGrid-colCellTitleContainer"},w&&R,C||react.createElement(Ci,{label:e.headerName||e.field,description:e.description,columnWidth:I}),!w&&R),!w&&!b&&!e.disableColumnMenu&&_),react.createElement(yi,{resizable:!f&&!!e.resizable,resizing:i,height:p,onMouseDown:null==g?void 0:g.current.startResizeOnMouseDown}))},Ri=e=>e.rendering,_i=react.memo((r=>{const{align:o,children:i,colIndex:l,cssClass:a,hasFocus:s,field:c,formattedValue:u,rowIndex:d,showRightBorder:g,tabIndex:p,value:m,width:h,height:f}=r,b=u||m,v=react.useRef(null);return react.useEffect((()=>{s&&v.current&&v.current.focus();}),[s]),react.createElement("div",{ref:v,className:Ro("MuiDataGrid-cell",a,"MuiDataGrid-cell"+capitalize(o),{"MuiDataGrid-withBorder":g}),role:"cell","data-value":m,"data-field":c,"data-rowindex":d,"aria-colindex":l,style:{minWidth:h,maxWidth:h,lineHeight:f-1+"px",minHeight:f,maxHeight:f},tabIndex:p},i||(null==b?void 0:b.toString()))}));_i.displayName="GridCell";const Di=react.memo((({width:e,height:t})=>e&&t?react.createElement(_i,{width:e,height:t,align:"left"}):null));Di.displayName="LeftEmptyCell";const Fi=react.memo((({width:e,height:t})=>e&&t?react.createElement(_i,{width:e,height:t,align:"left"}):null));function Pi(e,n,r){const o=Qn("useApiEventHandler");react.useEffect((()=>{if(r&&n)return e.current.subscribeEvent(n,r)}),[e,o,n,r]);}Fi.displayName="RightEmptyCell";const Ei=react.memo((function(i){const{scrollDirection:l}=i,s=react.useRef(null),c=react.useContext(Bo),u=react.useRef(),[d,g]=react.useState(!1),p=react.useRef({left:0,top:0}),m=react.useCallback((e=>{p.current=e;}),[]),h=react.useCallback((e=>{let t;if("left"===l)t=e.clientX-s.current.getBoundingClientRect().right;else {if("right"!==l)throw new Error("wrong dir");t=Math.max(1,e.clientX-s.current.getBoundingClientRect().left);}t=1.5*(t-1)+1,clearTimeout(u.current),u.current=setTimeout((()=>{c.current.scroll({left:p.current.left+t,top:p.current.top});}));}),[l,c]);react.useEffect((()=>()=>{clearTimeout(u.current);}),[]);const f=react.useCallback((()=>{g((e=>!e));}),[]);return Pi(c,"scrolling",m),Pi(c,"colReordering:dragStart",f),Pi(c,"colReordering:dragStop",f),d?react.createElement("div",{ref:s,className:Ro("MuiDataGrid-scrollArea","MuiDataGrid-scrollArea-"+l),onDragOver:h}):null})),Ti=e=>e.sorting,ki=createSelector(Ti,(e=>e.sortedRows)),Li=createSelector(ki,ii,li,((e,t,n)=>e.length>0?e.map((e=>t[e])):n)),Ai=createSelector(Ti,(e=>e.sortModel)),Gi=createSelector(Ai,(e=>e.reduce(((t,n,r)=>(t[n.field]={sortDirection:n.sort,sortIndex:e.length>1?r+1:void 0},t)),{}))),Ni=e=>e.visibleRows,Hi=createSelector(Ni,Li,((e,t)=>[...t].filter((t=>!1!==e.visibleRowsLookup[t.id])))),Vi=createSelector(Ni,oi,((e,t)=>null==e.visibleRows?t:e.visibleRows.length)),$i=e=>e.filter,Bi=createSelector($i,(e=>{var t;return null===(t=e.items)||void 0===t?void 0:t.filter((e=>{var t;return null!=e.value&&""!==(null===(t=e.value)||void 0===t?void 0:t.toString())}))}));createSelector(Bi,(e=>e.length));const Ui=createSelector(Bi,(e=>e.reduce(((e,t)=>(e[t.columnField]?e[t.columnField].push(t):e[t.columnField]=[t],e)),{}))),Xi=e=>e.keyboard,Yi=createSelector(Xi,(e=>e.cell)),Ki=createSelector(Xi,(e=>e.isMultipleKeyPressed)),Zi=react.forwardRef((({height:e,width:t,children:r},o)=>react.createElement("div",{ref:o,className:"rendering-zone",style:{maxHeight:e,width:t}},r)));Zi.displayName="RenderingZone";const qi=({selected:e,id:t,className:r,rowIndex:o,children:i})=>{const l=o+2,s=react.useContext(Bo),c=ao(s,Yo);return react.createElement("div",{key:t,"data-id":t,"data-rowindex":o,role:"row",className:Ro("MuiDataGrid-row",r,{"Mui-selected":e}),"aria-rowindex":l,"aria-selected":e,style:{maxHeight:c,minHeight:c}},i)};qi.displayName="Row";const Ji=react.memo((e=>{const{columns:t,domIndex:r,firstColIdx:o,hasScroll:i,lastColIdx:l,row:s,rowIndex:u,scrollSize:d,cellFocus:g,showCellRightBorder:p}=e,m=react.useContext(Bo),h=ao(m,Yo),f=t.slice(o,l+1).map(((n,l)=>{const a=o+l===t.length-1,c=a&&i.y&&i.x?n.width-d:n.width,f=a&&i.x&&!i.y,b=a?!f&&!e.extendRowFullWidth:p;let v=s[n.field];const w=Vo({rowModel:s,colDef:n,rowIndex:u,value:v,api:m.current});let C={cssClass:""};if(n.cellClassName&&(C=Nt(n.cellClassName)?{cssClass:n.cellClassName(w)}:{cssClass:Ro(n.cellClassName)}),n.cellClassRules){const e=(y=n.cellClassRules,S=w,Object.entries(y).reduce(((e,t)=>e+((Nt(t[1])?t[1](S):t[1])?t[0]+" ":"")),""));C={cssClass:`${C.cssClass} ${e}`};}var y,S;let O=null;n.renderCell&&(O=n.renderCell(w),C={cssClass:C.cssClass+" MuiDataGrid-cellWithRenderer"}),n.valueGetter&&(v=n.valueGetter(w),w.value=v);let M={};n.valueFormatter&&(M={formattedValue:n.valueFormatter(w)});return Object.assign(Object.assign(Object.assign(Object.assign({value:v,field:n.field,width:c,height:h,showRightBorder:b},M),{align:n.align||"left"}),C),{tabIndex:0===r&&0===l?0:-1,rowIndex:u,colIndex:l+o,children:O,hasFocus:null!==g&&g.rowIndex===u&&g.colIndex===l+o})}));return react.createElement(react.Fragment,null,f.map((e=>react.createElement(_i,Object.assign({key:e.field},e)))))}));Ji.displayName="RowCells";const Qi=({height:e,width:t,children:r})=>react.createElement("div",{className:"MuiDataGrid-viewport",style:{minWidth:t,maxWidth:t,minHeight:e,maxHeight:e}},r);Qi.displayName="StickyContainer";const el=e=>e.containerSizes,tl=e=>e.viewportSizes,nl=e=>e.scrollBar,rl=react.forwardRef(((e,t)=>{const r=react.useContext(Bo),o=ao(r,ei),i=ao(r,el),l=ao(r,tl),s=ao(r,nl),c=ao(r,qt),u=ao(r,Ri),d=ao(r,Yi),g=ao(r,ai),p=ao(r,Hi),m=ao(r,Yo);return react.createElement(qo,null,react.createElement(Qi,Object.assign({},l),react.createElement(Zi,Object.assign({ref:t},(null==i?void 0:i.renderingZone)||{width:0,height:0}),(()=>{if(null==u.renderContext)return null;return p.slice(u.renderContext.firstRowIdx,u.renderContext.lastRowIdx).map(((e,t)=>react.createElement(qi,{className:(u.renderContext.firstRowIdx+t)%2==0?"Mui-even":"Mui-odd",key:e.id,id:e.id,selected:!!g[e.id],rowIndex:u.renderContext.firstRowIdx+t},react.createElement(Di,{width:u.renderContext.leftEmptyWidth,height:m}),react.createElement(Ji,{columns:c,row:e,firstColIdx:u.renderContext.firstColIdx,lastColIdx:u.renderContext.lastColIdx,hasScroll:{y:s.hasScrollY,x:s.hasScrollX},scrollSize:o.scrollbarSize,showCellRightBorder:!!o.showCellRightBorder,extendRowFullWidth:!o.disableExtendRowFullWidth,rowIndex:u.renderContext.firstRowIdx+t,cellFocus:d,domIndex:t}),react.createElement(Fi,{width:u.renderContext.rightEmptyWidth,height:m}))))})())))}));rl.displayName="Viewport";const ol=e=>e.columnReorder,il=createSelector(ol,(e=>e.dragCol));function ll(e){const{columns:t}=e,[i,l]=react.useState(""),s=react.useContext(Bo),u=ao(s,ei),d=ao(s,Gi),g=ao(s,Ui),p=ao(s,il),m=react.useCallback((e=>{l(e.field);}),[]),h=react.useCallback((()=>{l("");}),[]);Pi(s,"colResizing:start",m),Pi(s,"colResizing:stop",h);const f=t.map(((e,t)=>react.createElement(zi,Object.assign({key:e.field},d[e.field],{filterItemsCounter:g[e.field]&&g[e.field].length,options:u,isDragging:e.field===p,column:e,colIndex:t,isResizing:i===e.field}))));return react.createElement(react.Fragment,null,f)}const al=e=>e.scrollBar,sl=react.forwardRef((function(e,t){var r;const o=react.useContext(Bo),i=ao(o,qt),{disableColumnReorder:l}=ao(o,ei),s=ao(o,el),d=ao(o,Ko),g=ao(o,Ri).renderContext,{hasScrollX:p}=ao(o,al),m="MuiDataGrid-colCellWrapper "+(p?"scroll":""),h=react.useMemo((()=>null==g?[]:i.slice(g.firstColIdx,g.lastColIdx+1)),[i,g]),f=!l&&o?e=>o.current.onColHeaderDragOver(e,t):void 0;return react.createElement(react.Fragment,null,react.createElement(Ei,{scrollDirection:"left"}),react.createElement("div",{ref:t,className:m,"aria-rowindex":1,role:"row",style:{minWidth:null===(r=null==s?void 0:s.totalSizes)||void 0===r?void 0:r.width},onDragOver:f},react.createElement(Di,{width:null==g?void 0:g.leftEmptyWidth,height:d}),react.createElement(ll,{columns:h}),react.createElement(Fi,{width:null==g?void 0:g.rightEmptyWidth,height:d})),react.createElement(Ei,{scrollDirection:"right"}))})),cl=({onClick:e})=>{const t=react.useContext(Bo),r=ao(t,ei),i=react.useCallback((n=>{e(n),t.current.showPreferences(ji.columns);}),[t,e]);return r.disableColumnSelector?null:react.createElement(_,{onClick:i},t.current.getLocaleText("columnMenuShowColumns"))},ul=({column:e,onClick:t})=>{const r=react.useContext(Bo),i=ao(r,ei),l=react.useCallback((n=>{t(n),r.current.showFilterPanel(null==e?void 0:e.field);}),[r,null==e?void 0:e.field,t]);return i.disableColumnFilter||!(null==e?void 0:e.filterable)?null:react.createElement(_,{onClick:l},r.current.getLocaleText("columnMenuFilter"))},dl={"bottom-start":"top left","bottom-end":"top right"},gl=e=>{var{open:t,target:r,onClickAway:o,children:i,position:l}=e,a=Y(e,["open","target","onClickAway","children","position"]);return react.createElement(Popper,Object.assign({open:t,anchorEl:r,transition:!0,placement:l},a),(({TransitionProps:e,placement:t})=>react.createElement(Grow,Object.assign({},e,{style:{transformOrigin:dl[t]}}),react.createElement(Paper,null,react.createElement(ClickAwayListener,{onClickAway:o},react.createElement("div",null,i))))))},pl=e=>e.columnMenu;function ml({ContentComponent:i,contentComponentProps:l}){const s=react.useContext(Bo),c=ao(s,pl),u=c.field?null==s?void 0:s.current.getColumnFromField(c.field):null,[d,g]=react.useState(null),p=react.useRef(),m=react.useRef(),h=react.useCallback((()=>{null==s||s.current.hideColumnMenu();}),[s]),f=react.useCallback((()=>{p.current=setTimeout(h,50);}),[h]),b=react.useCallback((({open:e,field:t})=>{if(t&&e){m.current=setTimeout((()=>clearTimeout(p.current)),0);const e=Mo(s.current.rootElementRef.current,t).querySelector(".MuiDataGrid-menuIconButton");g(e);}}),[s]);return react.useEffect((()=>{b(c);}),[c,b]),react.useEffect((()=>()=>{clearTimeout(p.current),clearTimeout(m.current);}),[]),d&&u?react.createElement(gl,{placement:"bottom-"+("right"===u.align?"start":"end"),open:c.open,target:d,onClickAway:f},react.createElement(i,Object.assign({currentColumn:u,hideMenu:h,open:c.open},l))):null}const hl=({column:r,onClick:i})=>{const l=react.useContext(Bo),s=react.useRef(),c=react.useCallback((e=>{i(e),s.current=setTimeout((()=>{l.current.toggleColumn(null==r?void 0:r.field,!0);}),10);}),[l,null==r?void 0:r.field,i]);return react.useEffect((()=>()=>clearTimeout(s.current)),[]),r?react.createElement(_,{onClick:c},l.current.getLocaleText("columnMenuHideColumn")):null},fl=({column:e,onClick:t})=>{const r=react.useContext(Bo),i=ao(r,Ai),l=react.useMemo((()=>{if(!e)return null;const t=i.find((t=>t.field===e.field));return null==t?void 0:t.sort}),[e,i]),s=react.useCallback((n=>{t(n);const o=n.currentTarget.getAttribute("data-value")||null;null==r||r.current.sortColumn(e,o);}),[r,e,t]);return e&&e.sortable?react.createElement(react.Fragment,null,react.createElement(_,{onClick:s,disabled:null==l},r.current.getLocaleText("columnMenuUnsort")),react.createElement(_,{onClick:s,"data-value":"asc",disabled:"asc"===l},r.current.getLocaleText("columnMenuSortAsc")),react.createElement(_,{onClick:s,"data-value":"desc",disabled:"desc"===l},r.current.getLocaleText("columnMenuSortDesc"))):null};function bl(e){const{hideMenu:t,currentColumn:r}=e,i=react.useCallback((e=>{"Tab"===e.key&&(e.preventDefault(),t());}),[t]);return react.createElement(MenuList,{id:"menu-list-grow",onKeyDown:i},react.createElement(fl,{onClick:t,column:r}),react.createElement(ul,{onClick:t,column:r}),react.createElement(hl,{onClick:t,column:r}),react.createElement(cl,{onClick:t,column:r}))}const vl=makeStyles$1((()=>({root:{display:"flex",flexDirection:"column",overflow:"auto",flex:"1 1",maxHeight:400}})),{name:"MuiDataGridPanelContent"});function wl(e){const t=vl(),{className:r}=e,o=Y(e,["className"]);return react.createElement("div",Object.assign({className:Ro(t.root,r)},o))}const Cl=makeStyles$1((()=>({root:{padding:4,display:"flex",justifyContent:"space-between"}})),{name:"MuiDataGridPanelFooter"});function yl(e){const t=Cl(),{className:r}=e,o=Y(e,["className"]);return react.createElement("div",Object.assign({className:Ro(t.root,r)},o))}const Sl=makeStyles$1((e=>({root:{padding:e.spacing(1)}})),{name:"MuiDataGridPanelHeader"});function Ol(e){const t=Sl(),{className:r}=e,o=Y(e,["className"]);return react.createElement("div",Object.assign({className:Ro(t.root,r)},o))}const Ml=makeStyles$1((()=>({root:{display:"flex",flexDirection:"column",flex:1}})),{name:"MuiDataGridPanelWrapper"});function xl(e){const t=Ml(),{className:r}=e,o=Y(e,["className"]);return react.createElement("div",Object.assign({className:Ro(t.root,r)},o))}const jl=makeStyles$1({container:{padding:"8px 0px 8px 8px"},column:{display:"flex",justifyContent:"space-between",padding:"1px 8px 1px 7px"},switch:{marginRight:4},dragIcon:{justifyContent:"flex-end"}},{name:"MuiDataGridColumnsPanel"});function Il(){const i=jl(),l=react.useContext(Bo),s=react.useRef(null),c=ao(l,Zt),{disableColumnReorder:d}=ao(l,ei),[g,p]=react.useState(""),m=react.useCallback((e=>{const{name:t}=e.target;l.current.toggleColumn(t);}),[l]),h=react.useCallback((e=>{l.current.updateColumns(c.map((t=>(t.hide=e,t))));}),[l,c]),f=react.useCallback((()=>h(!1)),[h]),b=react.useCallback((()=>h(!0)),[h]),w=react.useCallback((e=>{p(e.target.value);}),[]),C=react.useMemo((()=>g?c.filter((e=>e.field.toLowerCase().indexOf(g.toLowerCase())>-1||e.headerName&&e.headerName.toLowerCase().indexOf(g.toLowerCase())>-1)):c),[c,g]);return react.useEffect((()=>{s.current.focus();}),[]),react.createElement(xl,null,react.createElement(Ol,null,react.createElement(TextField,{label:l.current.getLocaleText("columnsPanelTextFieldLabel"),placeholder:l.current.getLocaleText("columnsPanelTextFieldPlaceholder"),inputRef:s,value:g,onChange:w,variant:"standard",fullWidth:!0})),react.createElement(wl,null,react.createElement("div",{className:i.container},C.map((e=>react.createElement("div",{key:e.field,className:i.column},react.createElement(A,{control:react.createElement(k,{className:i.switch,checked:!e.hide,onClick:m,name:e.field,color:"primary",size:"small"}),label:e.headerName||e.field}),!d&&react.createElement(IconButton,{draggable:!0,className:i.dragIcon,"aria-label":l.current.getLocaleText("columnsPanelDragIconLabel"),title:l.current.getLocaleText("columnsPanelDragIconLabel"),size:"small",disabled:!0},react.createElement(xr,null))))))),react.createElement(yl,null,react.createElement(Button,{onClick:b,color:"primary"},l.current.getLocaleText("columnsPanelHideAllButton")),react.createElement(Button,{onClick:f,color:"primary"},l.current.getLocaleText("columnsPanelShowAllButton"))))}const zl=makeStyles$1((e=>({root:{backgroundColor:e.palette.background.paper,minWidth:300,maxHeight:450,display:"flex"}})),{name:"MuiDataGridPanel"});function Rl(e){var t,r;const i=zl(),{children:l,open:s}=e,c=react.useContext(Bo),u=react.useCallback((()=>{c.current.hidePreferences();}),[c]);let d;return c.current&&(null===(t=c.current.columnHeadersElementRef)||void 0===t?void 0:t.current)&&(d=null===(r=null==c?void 0:c.current.columnHeadersElementRef)||void 0===r?void 0:r.current),d?react.createElement(Popper,{placement:"bottom-start",open:s,anchorEl:d,modifiers:$t()?[{name:"flip",enabled:!1}]:{flip:{enabled:!1}}},react.createElement(ClickAwayListener,{onClickAway:u},react.createElement(Paper,{className:i.root,elevation:8},l))):null}const _l=e=>{const t=ao(e,ei),n=ao(e,li),r=ao(e,qt),[o]=lo(e);return react.useMemo((()=>e&&{state:o,rows:n,columns:r,options:t,api:e,rootElement:e.current.rootElementRef}),[o,n,r,t,e])};function Dl(){var e,t,r;const o=react.useContext(Bo),i=ao(o,Zt),l=ao(o,ei),s=ao(o,Mi),c=_l(o),u=s.openedPanelValue===ji.columns,d=!s.openedPanelValue||!u,g=o.current.components.ColumnsPanel,p=o.current.components.FilterPanel,m=o.current.components.Panel;return react.createElement(m,Object.assign({open:i.length>0&&s.open},c,null===(e=null==o?void 0:o.current.componentsProps)||void 0===e?void 0:e.panel),!l.disableColumnSelector&&u&&react.createElement(g,Object.assign({},c,null===(t=null==o?void 0:o.current.componentsProps)||void 0===t?void 0:t.columnsPanel)),!l.disableColumnFilter&&d&&react.createElement(p,Object.assign({},c,null===(r=null==o?void 0:o.current.componentsProps)||void 0===r?void 0:r.filterPanel)))}const Fl=makeStyles$1((()=>({root:{display:"flex",justifyContent:"space-around",padding:8},linkOperatorSelect:{width:60},columnSelect:{width:150},operatorSelect:{width:120},filterValueInput:{width:190},closeIcon:{flexShrink:0,justifyContent:"flex-end",marginRight:6,marginBottom:2}})),{name:"MuiDataGridFilterForm"});function Pl(e){var t;const{item:i,hasMultipleFilters:l,deleteFilter:s,applyFilterChanges:c,multiFilterOperator:u,showMultiFilterOperators:d,disableMultiFilterOperator:g,applyMultiFilterOperatorChanges:p}=e,m=Fl(),h=react.useContext(Bo),f=ao(h,Qt),[b,v]=react.useState((()=>i.columnField?h.current.getColumnFromField(i.columnField):null)),[w,C]=react.useState((()=>{var e;return i.operatorValue&&b&&(null===(e=b.filterOperators)||void 0===e?void 0:e.find((e=>e.value===i.operatorValue)))||null})),y=react.useCallback((e=>{const t=e.target.value,n=h.current.getColumnFromField(t),r=n.filterOperators[0];C(r),v(n),c(Object.assign(Object.assign({},i),{value:void 0,columnField:t,operatorValue:r.value}));}),[h,c,i]),S=react.useCallback((e=>{var t;const n=e.target.value;c(Object.assign(Object.assign({},i),{operatorValue:n}));const r=(null===(t=b.filterOperators)||void 0===t?void 0:t.find((e=>e.value===n)))||null;C(r);}),[c,b,i]),O=react.useCallback((e=>{const t=e.target.value===Vr.And.toString()?Vr.And:Vr.Or;p(t);}),[p]),M=react.useCallback((()=>{s(i);}),[s,i]);return react.createElement("div",{className:m.root},react.createElement(G,{className:m.closeIcon},react.createElement(IconButton,{"aria-label":h.current.getLocaleText("filterPanelDeleteIconLabel"),title:h.current.getLocaleText("filterPanelDeleteIconLabel"),onClick:M,size:"small"},react.createElement(Sr,{fontSize:"small"}))),react.createElement(G,{className:m.linkOperatorSelect,style:{display:l?"block":"none",visibility:d?"visible":"hidden"}},react.createElement(N,{id:"columns-filter-operator-select-label"},h.current.getLocaleText("filterPanelOperators")),react.createElement(H,{labelId:"columns-filter-operator-select-label",id:"columns-filter-operator-select",value:u,onChange:O,disabled:!!g,native:!0},react.createElement("option",{key:Vr.And.toString(),value:Vr.And.toString()},h.current.getLocaleText("filterPanelOperatorAnd")),react.createElement("option",{key:Vr.Or.toString(),value:Vr.Or.toString()},h.current.getLocaleText("filterPanelOperatorOr")))),react.createElement(G,{className:m.columnSelect},react.createElement(N,{id:"columns-filter-select-label"},h.current.getLocaleText("filterPanelColumns")),react.createElement(H,{labelId:"columns-filter-select-label",id:"columns-filter-select",value:i.columnField||"",onChange:y,native:!0},f.map((e=>react.createElement("option",{key:e.field,value:e.field},e.headerName||e.field))))),react.createElement(G,{className:m.operatorSelect},react.createElement(N,{id:"columns-operators-select-label"},h.current.getLocaleText("filterPanelOperators")),react.createElement(H,{labelId:"columns-operators-select-label",id:"columns-operators-select",value:i.operatorValue,onChange:S,native:!0},null===(t=null==b?void 0:b.filterOperators)||void 0===t?void 0:t.map((e=>react.createElement("option",{key:e.value,value:e.value},e.label))))),react.createElement(G,{className:m.filterValueInput},b&&w&&react.createElement(w.InputComponent,Object.assign({item:i,applyValue:c},w.InputComponentProps))))}function El(){const e=react.useContext(Bo),[r]=lo(e),{disableMultipleColumnsFiltering:i}=ao(e,ei),l=react.useMemo((()=>r.filter.items.length>1),[r.filter.items.length]),s=react.useCallback((t=>{e.current.upsertFilter(t);}),[e]),c=react.useCallback((t=>{e.current.applyFilterLinkOperator(t);}),[e]),d=react.useCallback((()=>{e.current.upsertFilter({});}),[e]),g=react.useCallback((t=>{e.current.deleteFilter(t);}),[e]);return react.useEffect((()=>{0===r.filter.items.length&&d();}),[d,r.filter.items.length]),react.createElement(xl,null,react.createElement(wl,null,r.filter.items.map(((e,t)=>react.createElement(Pl,{key:e.id,item:e,applyFilterChanges:s,deleteFilter:g,hasMultipleFilters:l,showMultiFilterOperators:t>0,multiFilterOperator:r.filter.linkOperator,disableMultiFilterOperator:1!==t,applyMultiFilterOperatorChanges:c})))),!i&&react.createElement(yl,null,react.createElement(Button,{onClick:d,startIcon:react.createElement(Or,null),color:"primary"},e.current.getLocaleText("filterPanelAddFilter"))))}react.forwardRef((function(e,t){const{className:r,children:o}=e,i=Y(e,["className","children"]);return o?react.createElement("div",Object.assign({ref:t,className:Ro("MuiDataGrid-toolbar",r)},i),o):null}));function Nl(e){return useEventCallback(e)}const Hl="undefined"!=typeof window?react.useLayoutEffect:react.useEffect;function Vl(e,t){var n=function(e){var t=e.__resizeTriggers__,n=t.firstElementChild,r=t.lastElementChild,o=n.firstElementChild;r.scrollLeft=r.scrollWidth,r.scrollTop=r.scrollHeight,o.style.width=n.offsetWidth+1+"px",o.style.height=n.offsetHeight+1+"px",n.scrollLeft=n.scrollWidth,n.scrollTop=n.scrollHeight;},r=function(e){if(!(e.target.className.indexOf("contract-trigger")<0&&e.target.className.indexOf("expand-trigger")<0)){var r=this;n(this),this.__resizeRAF__&&t.cancelAnimationFrame(this.__resizeRAF__),this.__resizeRAF__=t.requestAnimationFrame((function(){(function(e){return e.offsetWidth!=e.__resizeLast__.width||e.offsetHeight!=e.__resizeLast__.height})(r)&&(r.__resizeLast__.width=r.offsetWidth,r.__resizeLast__.height=r.offsetHeight,r.__resizeListeners__.forEach((function(t){t.call(r,e);})));}));}},o=!1,i="",l="animationstart",a="Webkit Moz O ms".split(" "),s="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),c=document.createElement("fakeelement");if(void 0!==c.style.animationName&&(o=!0),!1===o)for(var u=0;u<a.length;u++)if(void 0!==c.style[a[u]+"AnimationName"]){i="-"+a[u].toLowerCase()+"-",l=s[u],o=!0;break}var d="resizeanim",g="@"+i+"keyframes "+"resizeanim { from { opacity: 0; } to { opacity: 0; } } ",p=i+"animation: 1ms "+"resizeanim; ";return {addResizeListener:function(o,i){if(!o.__resizeTriggers__){var a=o.ownerDocument,s=t.getComputedStyle(o);s&&"static"==s.position&&(o.style.position="relative"),function(t){if(!t.getElementById("muiDetectElementResize")){var n=(g||"")+".Mui-resizeTriggers { "+(p||"")+'visibility: hidden; opacity: 0; } .Mui-resizeTriggers, .Mui-resizeTriggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .Mui-resizeTriggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',r=t.head||t.getElementsByTagName("head")[0],o=t.createElement("style");o.id="muiDetectElementResize",o.type="text/css",null!=e&&o.setAttribute("nonce",e),o.styleSheet?o.styleSheet.cssText=n:o.appendChild(t.createTextNode(n)),r.appendChild(o);}}(a),o.__resizeLast__={},o.__resizeListeners__=[],(o.__resizeTriggers__=a.createElement("div")).className="Mui-resizeTriggers",o.__resizeTriggers__.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>',o.appendChild(o.__resizeTriggers__),n(o),o.addEventListener("scroll",r,!0),l&&(o.__resizeTriggers__.__animationListener__=function(e){e.animationName==d&&n(o);},o.__resizeTriggers__.addEventListener(l,o.__resizeTriggers__.__animationListener__));}o.__resizeListeners__.push(i);},removeResizeListener:function(e,t){if(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1),!e.__resizeListeners__.length){e.removeEventListener("scroll",r,!0),e.__resizeTriggers__.__animationListener__&&(e.__resizeTriggers__.removeEventListener(l,e.__resizeTriggers__.__animationListener__),e.__resizeTriggers__.__animationListener__=null);try{e.__resizeTriggers__=!e.removeChild(e.__resizeTriggers__);}catch(e){}}}}}const $l=react.forwardRef((function(t,o){const{children:i,defaultHeight:l=null,defaultWidth:a=null,disableHeight:s=!1,disableWidth:c=!1,nonce:u,onResize:d,style:g}=t,p=Y(t,["children","defaultHeight","defaultWidth","disableHeight","disableWidth","nonce","onResize","style"]),[m,h]=react.useState({height:l,width:a}),f=react.useRef(null),b=react.useRef(null),v=Nl((()=>{if(b.current){const e=b.current.offsetHeight||0,t=b.current.offsetWidth||0,n=ownerWindow(b.current).getComputedStyle(b.current),r=parseInt(n.paddingLeft,10)||0,o=parseInt(n.paddingRight,10)||0,i=e-(parseInt(n.paddingTop,10)||0)-(parseInt(n.paddingBottom,10)||0),l=t-r-o;(!s&&m.height!==i||!c&&m.width!==l)&&(h({height:i,width:l}),d&&d({height:i,width:l}));}}));Hl((()=>{var e;if(b.current=f.current.parentElement,!b)return;const t=ownerWindow(null!==(e=b.current)&&void 0!==e?e:void 0),n=Vl(u,t);return n.addResizeListener(b.current,v),v(),()=>{n.removeResizeListener(b.current,v);}}),[u,v]);const w={overflow:"visible"},C={};s||(w.height=0,C.height=m.height),c||(w.width=0,C.width=m.width);const y=useForkRef(f,o);return react.createElement("div",Object.assign({ref:y,style:Object.assign(Object.assign({},w),g)},p),null===m.height&&null===m.width?null:i(C))})),Bl=e=>e.pagination,Wl=({rowCount:e})=>{const t=react.useContext(Bo);return 0===e?null:react.createElement("div",{className:"MuiDataGrid-rowCount"},`${t.current.getLocaleText("footerTotalRows")} ${e.toLocaleString()}`)};function Ul(e){const{selectedRowCount:t}=e,r=react.useContext(Bo).current.getLocaleText("footerRowSelected")(t);return react.createElement("div",{className:"MuiDataGrid-selectedRowCount"},r)}function Xl(){var e;const t=react.useContext(Bo),r=ao(t,oi),o=ao(t,ei),i=ao(t,si),l=ao(t,Bl),s=_l(t),c=!o.hideFooterSelectedRowCount&&i>0?react.createElement(Ul,{selectedRowCount:i}):react.createElement("div",null),u=o.hideFooterRowCount||o.pagination?null:react.createElement(Wl,{rowCount:r}),d=!!o.pagination&&null!=l.pageSize&&!o.hideFooterPagination&&(null==t?void 0:t.current.components.Pagination),g=d&&react.createElement(d,Object.assign({},s,null===(e=null==t?void 0:t.current.componentsProps)||void 0===e?void 0:e.pagination));return react.createElement(Jo,null,c,u,g)}function Yl(){var e,t;const r=react.useContext(Bo),o=_l(r),i=null==r?void 0:r.current.components.PreferencesPanel,l=i&&react.createElement(i,Object.assign({},o,null===(e=null==r?void 0:r.current.componentsProps)||void 0===e?void 0:e.preferencesPanel)),s=null==r?void 0:r.current.components.Toolbar,u=s&&react.createElement(s,Object.assign({},o,null===(t=null==r?void 0:r.current.componentsProps)||void 0===t?void 0:t.toolbar));return react.createElement(react.Fragment,null,l,u)}function Kl(){return react.createElement(Qo,null,react.createElement(CircularProgress,null))}function Zl(){const e=react.useContext(Bo).current.getLocaleText("noRowsLabel");return react.createElement(Qo,null,e)}const ql=makeStyles$1((e=>({caption:{"&[id]":{display:"none",[e.breakpoints.up("md")]:{display:"block"}}},input:{display:"none",[e.breakpoints.up("md")]:{display:"inline-flex"}}})));function Jl(){const e=ql(),t=react.useContext(Bo),r=ao(t,Bl),i=ao(t,ei),l=react.useCallback((e=>{const n=Number(e.target.value);t.current.setPageSize(n);}),[t]),s=react.useCallback(((e,n)=>{t.current.setPage(n+1);}),[t]);return react.createElement(B,Object.assign({classes:e,component:"div",count:r.rowCount,page:r.page-1,rowsPerPageOptions:i.rowsPerPageOptions&&i.rowsPerPageOptions.indexOf(r.pageSize)>-1?i.rowsPerPageOptions:[],rowsPerPage:r.pageSize,labelRowsPerPage:t.current.getLocaleText("footerPaginationRowsPerPage")},$t()?{onPageChange:s,onRowsPerPageChange:l}:{onChangePage:s,onChangeRowsPerPage:l}))}var Ql;!function(e){e.NotFound="NotFound",e.Invalid="Invalid",e.Expired="Expired",e.Valid="Valid";}(Ql||(Ql={}));const ea=({licenseStatus:e})=>e===Ql.Valid.toString()?null:react.createElement("div",{style:{position:"absolute",pointerEvents:"none",color:"#8282829e",zIndex:1e5,width:"100%",textAlign:"center",bottom:"50%",right:0,letterSpacing:5,fontSize:24}}," ",function(e){switch(e){case Ql.Expired.toString():return "Material-UI X License Expired";case Ql.Invalid.toString():return "Material-UI X Invalid License";case Ql.NotFound.toString():return "Material-UI X Unlicensed product";default:throw new Error("Material-UI: Unhandled license status.")}}(e)," ");void 0!==process.env.EXPERIMENTAL_ENABLED&&Wt()&&window.localStorage.getItem("EXPERIMENTAL_ENABLED")?"true"===window.localStorage.getItem("EXPERIMENTAL_ENABLED"):"true"===process.env.EXPERIMENTAL_ENABLED;const ra=e=>{const n=Qn("useColumnMenu"),[r,i,l]=lo(e),a=react.useCallback((t=>{n.debug("Opening Column Menu"),i((e=>Object.assign(Object.assign({},e),{columnMenu:{open:!0,field:t}}))),e.current.hidePreferences(),l();}),[e,l,n,i]),s=react.useCallback((()=>{n.debug("Hiding Column Menu"),i((e=>Object.assign(Object.assign({},e),{columnMenu:Object.assign(Object.assign({},e.columnMenu),{open:!1})}))),l();}),[l,n,i]);react.useEffect((()=>{r.isScrolling&&s();}),[r.isScrolling,s]),er(e,{showColumnMenu:a,hideColumnMenu:s},"ColumnMenuApi");},oa=(e,t)=>e.x<=t.x?"right":"left",ia=n=>{const r=Qn("useColumnReorder"),[,i,l]=lo(n),a=ao(n,il),s=react.useRef(null),c=react.useRef(null),u=react.useRef({x:0,y:0}),d=react.useRef(),g=react.useCallback((()=>{r.debug("End dragging col"),n.current.publishEvent("colReordering:dragStop"),clearTimeout(d.current),c.current.classList.remove("MuiDataGrid-colCell-dropZone"),s.current.removeEventListener("dragend",g),s.current=null,i((e=>Object.assign(Object.assign({},e),{columnReorder:Object.assign(Object.assign({},e.columnReorder),{dragCol:""})}))),l();}),[n,i,l,r]),p=react.useCallback(((e,t)=>{r.debug("Start dragging col "+e.field),n.current.publishEvent("colReordering:dragStart"),s.current=t,s.current.addEventListener("dragend",g,{once:!0}),s.current.classList.add("MuiDataGrid-colCell-dragging"),i((t=>Object.assign(Object.assign({},t),{columnReorder:Object.assign(Object.assign({},t.columnReorder),{dragCol:e.field})}))),l(),d.current=setTimeout((()=>{s.current.classList.remove("MuiDataGrid-colCell-dragging");}));}),[n,i,l,g,r]);react.useEffect((()=>()=>{clearTimeout(d.current);}),[]);const m=react.useCallback(((e,t)=>{e.preventDefault(),n.current.publishEvent("colReordering:dragOverHeader"),c.current=t.current,c.current.classList.add("MuiDataGrid-colCell-dropZone");}),[n]),h=react.useCallback((e=>{e.preventDefault(),n.current.publishEvent("colReordering:dragEnter");}),[n]),f=react.useCallback(((e,t)=>{if(r.debug("Dragging over col "+e.field),n.current.publishEvent("colReordering:dragOver"),e.field!==a&&(o=u.current,i=t,o.x!==i.x||o.y!==i.y)){const r=n.current.getColumnIndex(e.field,!1),o=n.current.getColumnIndex(a,!1);("right"===oa(u.current,t)&&o<r||"left"===oa(u.current,t)&&r<o)&&n.current.moveColumn(a,r),u.current=t;}var o,i;}),[n,a,r]);er(n,{onColItemDragStart:p,onColHeaderDragOver:m,onColItemDragOver:f,onColItemDragEnter:h},"ColReorderApi");};function la(e,t){const n=e.filter((e=>!!e.flex&&!e.hide)).length;let r=0;n&&t&&e.forEach((e=>{e.hide||(e.flex?r+=e.flex:t-=e.width);}));let o=e;if(t>0&&n){const n=t/r;o=e.map((e=>Object.assign(Object.assign({},e),{width:e.flex?Math.floor(n*e.flex):e.width})));}return o}function aa(e,t){return e.debug("Building columns lookup"),t.reduce(((e,t)=>(e[t.field]=t,e)),{})}function sa(e,n){const r=Qn("useColumns"),[i,l,a]=lo(n),s=ao(n,Jt),c=ao(n,Zt),u=ao(n,qt),d=ao(n,ei),g=react.useCallback(((e,t=!0)=>{r.debug("Updating columns state."),l((t=>Object.assign(Object.assign({},t),{columns:e}))),a(),n.current&&t&&n.current.publishEvent("columnsUpdated",e.all);}),[r,l,a,n]),p=react.useCallback((e=>n.current.state.columns.lookup[e]),[n]),m=react.useCallback((()=>c),[c]),h=react.useCallback((()=>u),[u]),f=react.useCallback((()=>s),[s]),b=react.useCallback(((e,t=!0)=>t?u.findIndex((t=>t.field===e)):c.findIndex((t=>t.field===e))),[c,u]),v=react.useCallback((e=>{const t=b(e);return s.positions[t]}),[s.positions,b]),w=react.useCallback((e=>{r.debug("updating Columns with new state");const t=((e,t)=>{const n={all:[...e.all],lookup:Object.assign({},e.lookup)};return t.forEach((e=>{null==n.lookup[e.field]?(n.lookup[e.field]=e,n.all.push(e.field)):n.lookup[e.field]=Object.assign(Object.assign({},n.lookup[e.field]),e);})),n})(i.columns,e);g(t,!1);}),[r,i.columns,g]),C=react.useCallback((e=>w([e])),[w]),y=react.useCallback(((e,t)=>{const n=p(e),r=Object.assign(Object.assign({},n),{hide:null==t?!n.hide:t});w([r]),a();}),[a,p,w]),S=react.useCallback(((e,t)=>{r.debug(`Moving column ${e} to index ${t}`);const n=i.columns.all.findIndex((t=>t===e)),o=[...i.columns.all];o.splice(t,0,o.splice(n,1)[0]),g(Object.assign(Object.assign({},i.columns),{all:o}),!1);}),[i.columns,r,g]);er(n,{getColumnFromField:p,getAllColumns:m,getColumnIndex:b,getColumnPosition:v,getVisibleColumns:h,getColumnsMeta:f,updateColumn:C,updateColumns:w,toggleColumn:y,moveColumn:S},"ColApi"),react.useEffect((()=>{if(r.info("Columns have changed, new length "+e.length),e.length>0){const t=la(function(e,t,n,r){r.debug("Hydrating Columns with default definitions");const o=Ao(Lr(),t),i=e.map((e=>Object.assign(Object.assign({},gi(o,e.type)),e)));return n?[di,...i]:i}(e,d.columnTypes,!!d.checkboxSelection,r),n.current.getState().viewportSizes.width);g({all:t.map((e=>e.field)),lookup:aa(r,t)});}else g({all:[],lookup:{}});}),[r,n,e,d.columnTypes,d.checkboxSelection,g]),react.useEffect((()=>{r.debug("Columns gridState.viewportSizes.width, changed "+i.viewportSizes.width);const e=la(Zt(n.current.getState()),i.viewportSizes.width);n.current.updateColumns(e);}),[n,i.viewportSizes.width,r]);}const ca=(n,r,i,l)=>{const a=io(n),[s,c,u]=lo(n),d=react.useCallback((e=>{void 0===s[r]&&(s[r]=l),c((t=>{const n=Object.assign({},t);return n[r]=i(t[r],e),n})),u();}),[u,s,l,i,c,r]),g=react.useRef(d);react.useEffect((()=>{g.current=d;}),[d]);const p=react.useCallback((e=>g.current(e)),[]);return {gridState:s,dispatch:p,gridApi:a}},ua=(e,n)=>{const r=Qn("useFilter"),[i,l,a]=lo(e),s=ao(e,en),c=ao(e,ei),u=react.useCallback((()=>({filterModel:e.current.getState("filter"),api:e.current,columns:e.current.getAllColumns(),rows:e.current.getRowModels()})),[e]),d=react.useCallback((()=>{r.debug("clearing filtered rows"),l((e=>Object.assign(Object.assign({},e),{visibleRows:{visibleRowsLookup:{}}})));}),[r,l]),g=react.useCallback(((t,n=Vr.And)=>{if(!t.columnField||!t.operatorValue||!t.value)return;r.debug(`Filtering column: ${t.columnField} ${t.operatorValue} ${t.value} `);const o=e.current.getColumnFromField(t.columnField);if(!o)return;const i=o.filterOperators;if(!(null==i?void 0:i.length))throw new Error(`Material-UI: No filter operators found for column '${o.field}'.`);const s=i.find((e=>e.value===t.operatorValue));if(!s)throw new Error(`Material-UI: No filter operator found for column '${o.field}' and operator value '${t.operatorValue}'.`);const c=s.getApplyFilterFn(t,o);l((t=>{const r=Object.assign({},t.visibleRows.visibleRowsLookup);return Li(t).forEach(((t,i)=>{const l=Vo({rowModel:t,colDef:o,rowIndex:i,value:t[o.field],api:e.current}),a=c(l);null==r[t.id]?r[t.id]=a:r[t.id]=n===Vr.And?r[t.id]&&a:r[t.id]||a;})),Object.assign(Object.assign({},t),{visibleRows:{visibleRowsLookup:r,visibleRows:Object.entries(r).filter((e=>e[1])).map((e=>e[0]))}})})),a();}),[e,a,r,l]),p=react.useCallback((()=>{if(c.filterMode===Gr.server)return;d();const{items:t,linkOperator:n}=e.current.state.filter;t.forEach((t=>{e.current.applyFilter(t,n);})),a();}),[e,d,a,c.filterMode]),m=react.useCallback((t=>{r.debug("Upserting filter"),l((n=>{const r=[...n.filter.items],o=Object.assign({},t),i=r.findIndex((e=>e.id===o.id));if(1===r.length&&Tt(r[0],{})?r[0]=o:-1===i?r.push(o):r[i]=o,null==o.id&&(o.id=(new Date).getTime()),null==o.columnField&&(o.columnField=s[0]),null!=o.columnField&&null==o.operatorValue){const t=e.current.getColumnFromField(o.columnField);o.operatorValue=t&&t.filterOperators[0].value;}c.disableMultipleColumnsFiltering&&r.length>1&&(r.length=1);return Object.assign(Object.assign({},n),{filter:Object.assign(Object.assign({},n.filter),{items:r})})})),e.current.publishEvent("filterModelChange",u()),p();}),[r,l,e,u,p,c.disableMultipleColumnsFiltering,s]),h=react.useCallback((t=>{r.debug(`Deleting filter on column ${t.columnField} with value ${t.value}`);let n=!1;l((e=>{const r=[...e.filter.items.filter((e=>e.id!==t.id))];n=0===r.length;return Object.assign(Object.assign({},e),{filter:Object.assign(Object.assign({},e.filter),{items:r})})})),n&&m({}),e.current.publishEvent("filterModelChange",u()),p();}),[e,p,u,r,l,m]),f=react.useCallback((t=>{if(r.debug("Displaying filter panel"),t){const n=i.filter.items.length>0?i.filter.items[i.filter.items.length-1]:null;n&&n.columnField===t||e.current.upsertFilter({columnField:t});}e.current.showPreferences(ji.filters);}),[e,i.filter.items,r]),b=react.useCallback((()=>{r.debug("Hiding filter panel"),null==e||e.current.hidePreferences();}),[e,r]),v=react.useCallback(((e=Vr.And)=>{r.debug("Applying filter link operator"),l((t=>Object.assign(Object.assign({},t),{filter:Object.assign(Object.assign({},t.filter),{linkOperator:e})}))),p();}),[p,r,l]),w=react.useCallback((()=>{d(),r.debug("Clearing filter model"),l((e=>Object.assign(Object.assign({},e),{filter:$r()})));}),[d,r,l]),C=react.useCallback((t=>{w(),r.debug("Setting filter model"),v(t.linkOperator),t.items.forEach((e=>m(e))),e.current.publishEvent("filterModelChange",u());}),[e,v,w,u,r,m]),y=react.useCallback((t=>e.current.subscribeEvent("filterModelChange",t)),[e]);er(e,{applyFilterLinkOperator:v,applyFilters:p,applyFilter:g,deleteFilter:h,upsertFilter:m,onFilterModelChange:y,setFilterModel:C,showFilterPanel:f,hideFilterPanel:b},"FilterApi"),Pi(e,"rowsSet",e.current.applyFilters),Pi(e,"rowsUpdated",e.current.applyFilters),Pi(e,"filterModelChange",c.onFilterModelChange),react.useEffect((()=>{const t=c.filterModel,n=e.current.state.filter;t&&t.items.length>0&&!Tt(t,n)&&(r.debug("filterModel prop changed, applying filters"),e.current.setFilterModel(t));}),[e,r,c.filterModel]),react.useEffect((()=>{e.current&&(r.debug("Rows prop changed, applying filters"),d(),e.current.applyFilters());}),[e,d,r,n]);const S=react.useCallback((()=>{r.debug("onColUpdated - Columns changed, applying filters");const t=e.current.getState("filter"),n=en(e.current.state);r.debug("Columns changed, applying filters"),t.items.forEach((t=>{n.find((e=>e===t.columnField))||e.current.deleteFilter(t);})),e.current.applyFilters();}),[e,r]);Pi(e,"columnsUpdated",S);},da=(e,t)=>{const n=Qn("useKeyboard"),r=ao(t,ei),[,i,l]=lo(t),a=ao(t,Bl),s=ao(t,oi),c=ao(t,tn),u=ao(t,el),d=ao(t,ai),g=react.useCallback((e=>{i((t=>{n.debug("Toggling keyboard multiple key pressed to "+e);const r=Object.assign(Object.assign({},t.keyboard),{isMultipleKeyPressed:e});return Object.assign(Object.assign({},t),{keyboard:r})})),l(),t.current.publishEvent("multipleKeyPressChange",e);}),[t,l,n,i]),p=react.useCallback(((e,o)=>{const d=vo(document.activeElement,"MuiDataGrid-cell");d.tabIndex=-1;const g=Number(d.getAttribute("aria-colindex")),p=Number(d.getAttribute("data-rowindex")),m=r.pagination?a.pageSize*a.page:s;let h;if(Eo(e))h=((e,t)=>{if(!Eo(e))throw new Error("Material-UI: The first argument (code) should be an arrow key code.");return "ArrowLeft"===e?Object.assign(Object.assign({},t),{colIndex:t.colIndex-1}):"ArrowRight"===e?Object.assign(Object.assign({},t),{colIndex:t.colIndex+1}):"ArrowUp"===e?Object.assign(Object.assign({},t),{rowIndex:t.rowIndex-1}):Object.assign(Object.assign({},t),{rowIndex:t.rowIndex+1})})(e,{colIndex:g,rowIndex:p});else if(To(e)){const t="Home"===e?0:c-1;if(o){let e=0;e=0===t?r.pagination?m-a.pageSize:0:m-1,h={colIndex:t,rowIndex:e};}else h={colIndex:t,rowIndex:p};}else {if(!ko(e)&&!Po(e))throw new Error("Material-UI. Key not mapped to navigation behavior.");{const t=p+(e.indexOf("Down")>-1||Po(e)?u.viewportPageSize:-1*u.viewportPageSize);h={colIndex:g,rowIndex:t};}}return h.rowIndex=h.rowIndex<=0?0:h.rowIndex,h.rowIndex=h.rowIndex>=m&&m>0?m-1:h.rowIndex,h.colIndex=h.colIndex<=0?0:h.colIndex,h.colIndex=h.colIndex>=c?c-1:h.colIndex,t.current.scrollToIndexes(h),i((e=>(n.debug("Setting keyboard state, cell focus to "+JSON.stringify(h)),Object.assign(Object.assign({},e),{keyboard:Object.assign(Object.assign({},e.keyboard),{cell:h})})))),l(),h}),[r.pagination,a.pageSize,a.page,s,c,t,i,l,u,n]),m=react.useCallback((()=>{const e=So(vo(document.activeElement,"MuiDataGrid-row"));t.current.selectRow(e);}),[t]),h=react.useCallback((e=>{const r=vo(document.activeElement,"MuiDataGrid-row"),o=Number(r.getAttribute("data-rowindex"));let i=o;const l=t.current.getSelectedRows();if(l.length>0){const e=l.map((e=>t.current.getRowIndexFromId(e.id))),n=e.map((e=>Math.abs(o-e))),r=Math.max(...n);i=e[n.indexOf(r)];}const a=p(e,!1),s=Array(Math.abs(a.rowIndex-i)+1).fill(a.rowIndex>i?i:a.rowIndex).map(((e,n)=>t.current.getRowIdFromRowIndex(e+n)));n.debug("Selecting rows "),t.current.selectRows(s,!0,!0);}),[n,t,p]),f=react.useCallback((()=>{var e,t;const n=vo(document.activeElement,"MuiDataGrid-row"),r=So(n);d[r]?null===(e=null===window||void 0===window?void 0:window.getSelection())||void 0===e||e.selectAllChildren(n):null===(t=null===window||void 0===window?void 0:window.getSelection())||void 0===t||t.selectAllChildren(document.activeElement),document.execCommand("copy");}),[d]),b=react.useCallback((e=>{if(Do(e.key)&&(n.debug("Multiple Select key pressed"),g(!0)),wo(document.activeElement))return Po(e.key)&&e.shiftKey?(e.preventDefault(),void m()):Lo(e.key)&&!e.shiftKey?(e.preventDefault(),void p(e.key,e.ctrlKey||e.metaKey)):Lo(e.key)&&e.shiftKey?(e.preventDefault(),void h(e.key)):void("c"!==e.key.toLowerCase()||!e.ctrlKey&&!e.metaKey?"a"===e.key.toLowerCase()&&(e.ctrlKey||e.metaKey)&&(e.preventDefault(),t.current.selectRows(t.current.getAllRowIds(),!0)):f())}),[t,n,g,h,f,p,m]),v=react.useCallback((e=>{Do(e.key)&&(n.debug("Multiple Select key released"),g(!1));}),[n,g]),w=react.useCallback((e=>{n.debug("Grid lost focus, releasing key press",e),t.current.getState().keyboard.isMultipleKeyPressed&&g(!1);}),[t,n,g]);Pi(t,"keydown",b),Pi(t,"keyup",v),Pi(t,"gridFocusOut",w);},ga=e=>{const n=Qn("usePagination"),{dispatch:r}=ca(e,"pagination",eo,Object.assign({},Qr)),i=ao(e,ei),l=ao(e,Vi),a=ao(e,el),s=react.useCallback((t=>{n.debug("Setting page to "+t),r(Wr(t));const o=e.current.getState("pagination");e.current.publishEvent("pageChange",o);}),[e,r,n]),c=react.useCallback((t=>{r(Ur(t)),e.current.publishEvent("pageSizeChange",e.current.getState("pagination"));}),[e,r]),u=react.useCallback((t=>e.current.subscribeEvent("pageChange",t)),[e]),d=react.useCallback((t=>e.current.subscribeEvent("pageSizeChange",t)),[e]);Pi(e,"pageChange",i.onPageChange),Pi(e,"pageSizeChange",i.onPageSizeChange),react.useEffect((()=>{r(Xr({paginationMode:i.paginationMode}));}),[e,r,i.paginationMode]),react.useEffect((()=>{s(null!=i.page?i.page:1);}),[e,i.page,s]),react.useEffect((()=>{!i.autoPageSize&&i.pageSize&&c(i.pageSize);}),[i.autoPageSize,i.pageSize,n,c]),react.useEffect((()=>{i.autoPageSize&&a&&(null==a?void 0:a.viewportPageSize)>0&&c(null==a?void 0:a.viewportPageSize);}),[a,i.autoPageSize,c]),react.useEffect((()=>{r(Yr({totalRowCount:l}));}),[e,r,l]);er(e,{setPageSize:c,setPage:s,onPageChange:u,onPageSizeChange:d},"paginationApi");},pa=n=>{const r=Qn("usePreferencesPanel"),[,i,l]=lo(n),a=react.useRef(),s=react.useRef(),c=react.useCallback((()=>{r.debug("Hiding Preferences Panel"),i((e=>Object.assign(Object.assign({},e),{preferencePanel:{open:!1}}))),l();}),[l,r,i]),u=react.useCallback((()=>{s.current=setTimeout((()=>clearTimeout(a.current)),0);}),[]),d=react.useCallback((()=>{a.current=setTimeout(c,100);}),[c]);er(n,{showPreferences:react.useCallback((e=>{r.debug("Opening Preferences Panel"),u(),i((t=>Object.assign(Object.assign({},t),{preferencePanel:Object.assign(Object.assign({},t.preferencePanel),{open:!0,openedPanelValue:e})}))),l();}),[u,l,r,i]),hidePreferences:d},"ColumnMenuApi"),react.useEffect((()=>()=>{clearTimeout(a.current),clearTimeout(s.current);}),[]);};function ma(e,t){if(null==e.id)throw new Error(["Material-UI: The data grid component requires all rows to have a unique id property.",t||"A row was provided without id in the rows prop:",JSON.stringify(e)].join("\n"));return !0}function ha(e,t){return null==t?e:Object.assign({id:t(e)},e)}function fa(e,t,n){const r=Object.assign(Object.assign({},{idRowsLookup:{},allRows:[],totalRowCount:0}),{totalRowCount:t&&t>e.length?t:e.length});return e.forEach((e=>{const t=ha(e,n);ma(t),r.allRows.push(t.id),r.idRowsLookup[t.id]=t;})),r}const ba=(n,r,i)=>{const l=Qn("useRows"),[a,s,c]=lo(n),u=react.useRef(),d=react.useCallback((e=>{null==u.current&&(u.current=setTimeout((()=>{l.debug("Updating component"),u.current=null,e&&e(),c();}),100));}),[l,c]),g=react.useRef(a.rows);react.useEffect((()=>()=>clearTimeout(u.current)),[]),react.useEffect((()=>{s((e=>(g.current=fa(r,e.options.rowCount,i),Object.assign(Object.assign({},e),{rows:g.current}))));}),[i,r,s]);const p=react.useCallback((e=>n.current.state.rows.allRows.indexOf(e)),[n]),m=react.useCallback((e=>n.current.state.rows.allRows[e]),[n]),h=react.useCallback((e=>n.current.state.rows.idRowsLookup[e]),[n]),f=react.useCallback((e=>{l.debug("updating all rows, new length "+e.length),g.current.allRows.length>0&&n.current.publishEvent("rowsCleared");const t=[],r=e.reduce(((e,n)=>(ma(n=ha(n,i)),e[n.id]=n,t.push(n.id),e)),{}),o=a.options&&a.options.rowCount&&a.options.rowCount>t.length?a.options.rowCount:t.length;g.current={idRowsLookup:r,allRows:t,totalRowCount:o},s((e=>Object.assign(Object.assign({},e),{rows:g.current}))),d((()=>n.current.publishEvent("rowsSet")));}),[l,a.options,s,d,n,i]),b=react.useCallback((e=>{const t=e.reduce(((e,t)=>{const n=ha(t,i),r=n.id;return ma(n,"A row was provided without id when calling updateRows():"),e[r]=null!=e[r]?Object.assign(Object.assign({},e[r]),n):n,e}),{}),r=[],o=[];if(Object.entries(t).forEach((([e,t])=>{if("delete"===t._action)return void o.push(t);const n=h(e);n?Object.assign(g.current.idRowsLookup[e],Object.assign(Object.assign({},n),t)):r.push(t);})),s((e=>Object.assign(Object.assign({},e),{rows:g.current}))),o.length>0||r.length>0){o.forEach((e=>{delete g.current.idRowsLookup[e.id];}));const e=[...Object.values(g.current.idRowsLookup),...r];f(e);}d((()=>n.current.publishEvent("rowsUpdated")));}),[n,d,h,i,s,f]),v=react.useCallback((()=>n.current.state.rows.allRows.map((e=>n.current.state.rows.idRowsLookup[e]))),[n]),w=react.useCallback((()=>n.current.state.rows.totalRowCount),[n]),C=react.useCallback((()=>n.current.state.rows.allRows),[n]);er(n,{getRowIndexFromId:p,getRowIdFromRowIndex:m,getRowFromId:h,getRowModels:v,getRowsCount:w,getAllRowIds:C,setRows:f,updateRows:b},"RowApi");},va=n=>{const r=Qn("useSelection"),[i,l,a]=lo(n),s=ao(n,ei),c=ao(n,ii),u=ao(n,Ki),d=react.useRef(!1);react.useEffect((()=>{d.current=!s.disableMultipleSelection&&u;}),[u,s.disableMultipleSelection]);const g=react.useCallback((()=>Object.keys(i.selection).map((e=>n.current.getRowFromId(e)))),[n,i.selection]),p=react.useCallback(((e,t,o)=>{if(!n.current.isInitialised)return void l((t=>{const n={};return n[e.id]=!0,Object.assign(Object.assign({},t),{selection:n})}));r.debug("Selecting row "+e.id);const i=t||d.current||s.checkboxSelection;l(i?t=>{const n=Object.assign({},t.selection);return (i&&null!=o?o:!n[e.id])?n[e.id]=!0:delete n[e.id],Object.assign(Object.assign({},t),{selection:n})}:t=>{const n={};return n[e.id]=!0,Object.assign(Object.assign({},t),{selection:n})}),a();const c=n.current.getState("selection"),u={data:e,isSelected:!!c[e.id]},g={rowIds:Object.keys(c)};n.current.publishEvent("rowSelected",u),n.current.publishEvent("selectionChange",g);}),[n,r,s.checkboxSelection,a,l]),m=react.useCallback(((e,t=!0,r=!1)=>{p(n.current.getRowFromId(e),r,t);}),[n,p]),h=react.useCallback(((e,t=!0,r=!1)=>{s.disableMultipleSelection&&e.length>1&&!s.checkboxSelection||(l((n=>{const o=r?{}:Object.assign({},n.selection);return e.reduce(((e,n)=>(t?e[n]=!0:e[n]&&delete e[n],e)),o),Object.assign(Object.assign({},n),{selection:o})})),a(),n.current.publishEvent("selectionChange",{rowIds:Object.keys(n.current.getState("selection"))}));}),[s.disableMultipleSelection,s.checkboxSelection,l,a,n]),f=react.useCallback((e=>{s.disableSelectionOnClick||p(e.row);}),[s.disableSelectionOnClick,p]),b=react.useCallback((e=>n.current.subscribeEvent("rowSelected",e)),[n]),v=react.useCallback((e=>n.current.subscribeEvent("selectionChange",e)),[n]);Pi(n,"rowClick",f),Pi(n,"rowSelected",s.onRowSelected),Pi(n,"selectionChange",s.onSelectionChange);er(n,{selectRow:m,getSelectedRows:g,selectRows:h,onRowSelected:b,onSelectionChange:v},"SelectionApi"),react.useEffect((()=>{l((e=>{const t=Object.assign({},e.selection);let n=!1;return Object.keys(t).forEach((e=>{c[e]||(delete t[e],n=!0);})),n?Object.assign(Object.assign({},e),{selection:t}):e})),a();}),[c,n,l,a]);},wa=(n,r)=>{const i=Qn("useSorting"),l=react.useRef(!1),a=react.useRef([]),[s,c,u]=lo(n),d=ao(n,ei),g=ao(n,qt),p=ao(n,oi),m=react.useCallback((e=>({sortModel:e,api:n.current,columns:n.current.getAllColumns()})),[n]),h=react.useCallback(((e,t)=>{const n=s.sorting.sortModel.findIndex((t=>t.field===e));let r=[...s.sorting.sortModel];return n>-1?t?r.splice(n,1,t):r.splice(n,1):r=[...s.sorting.sortModel,t],r}),[s.sorting.sortModel]),f=react.useCallback(((e,t)=>{const n=s.sorting.sortModel.find((t=>t.field===e.field));if(n){const e=void 0===t?rr(d.sortingOrder,n.sort):t;return null==e?void 0:Object.assign(Object.assign({},n),{sort:e})}return {field:e.field,sort:void 0===t?rr(d.sortingOrder):t}}),[s.sorting.sortModel,d.sortingOrder]),b=react.useCallback(((e,t)=>a.current.reduce(((r,o)=>{const{field:i,comparator:l}=o;return r=r||l(e[i],t[i],Vo({api:n.current,colDef:n.current.getColumnFromField(i),rowModel:e,value:e[i]}),Vo({api:n.current,colDef:n.current.getColumnFromField(i),rowModel:t,value:t[i]}))}),0)),[n]),v=react.useCallback((e=>e.map((e=>{const t=n.current.getColumnFromField(e.field);if(!t)throw new Error(`Error sorting: column with field '${e.field}' not found. `);const r=or(e.sort)?(e,n,r,o)=>-1*t.sortComparator(e,n,r,o):t.sortComparator;return {field:t.field,comparator:r}}))),[n]),w=react.useCallback((()=>{const e=n.current.getRowModels();if(d.sortingMode===Gr.server)return i.debug("Skipping sorting rows as sortingMode = server"),void c((t=>Object.assign(Object.assign({},t),{sorting:Object.assign(Object.assign({},t.sorting),{sortedRows:e.map((e=>e.id))})})));const t=n.current.getState().sorting.sortModel;i.debug("Sorting rows with ",t);const r=[...e];t.length>0&&(a.current=v(t),r.sort(b)),c((e=>Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortedRows:r.map((e=>e.id))})}))),u();}),[n,i,c,u,v,b,d.sortingMode]),C=react.useCallback((e=>{c((t=>{const n=Object.assign(Object.assign({},t.sorting),{sortModel:e});return Object.assign(Object.assign({},t),{sorting:Object.assign({},n)})})),u(),0!==g.length&&(n.current.publishEvent("sortModelChange",m(e)),n.current.applySorting());}),[c,u,g.length,n,m]),y=react.useCallback(((e,t)=>{if(!e.sortable)return;const n=f(e,t);let r;r=l.current?h(e.field,n):n?[n]:[],C(r);}),[h,C,f]),S=react.useCallback((({colDef:e})=>{y(e);}),[y]),O=react.useCallback((()=>{c((e=>Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortedRows:[]})})));}),[c]),M=react.useCallback((()=>s.sorting.sortModel),[s.sorting.sortModel]),x=react.useCallback((e=>{l.current=!d.disableMultipleColumnsSorting&&e;}),[d.disableMultipleColumnsSorting]),j=react.useCallback((e=>n.current.subscribeEvent("sortModelChange",e)),[n]),I=react.useCallback((()=>{c((e=>{const t=e.sorting.sortModel,n=Zt(e);let r=t;return t.length>0&&(r=t.reduce(((e,t)=>(n.find((e=>e.field===t.field))&&e.push(t),e)),[])),Object.assign(Object.assign({},e),{sorting:Object.assign(Object.assign({},e.sorting),{sortModel:r})})}));}),[c]);Pi(n,"columnClick",S),Pi(n,"rowsSet",n.current.applySorting),Pi(n,"rowsCleared",O),Pi(n,"rowsUpdated",n.current.applySorting),Pi(n,"columnsUpdated",I),Pi(n,"multipleKeyPressChange",x),Pi(n,"sortModelChange",d.onSortModelChange);er(n,{getSortModel:M,setSortModel:C,sortColumn:y,onSortModelChange:j,applySorting:w},"SortApi"),react.useEffect((()=>{n.current.applySorting();}),[n,r]),react.useEffect((()=>{p>0&&(i.debug("row changed, applying sortModel"),n.current.applySorting());}),[p,n,i]),react.useEffect((()=>{if(g.length>0){const e=n.current.getAllColumns().filter((e=>null!=e.sortDirection)).sort(((e,t)=>e.sortIndex-t.sortIndex)).map((e=>({field:e.field,sort:e.sortDirection})));e.length>0&&!Tt(n.current.getState("sorting").sortModel,e)&&n.current.setSortModel(e);}}),[n,g]),react.useEffect((()=>{const e=d.sortModel||[],t=n.current.state.sorting.sortModel;e.length>0&&!Tt(e,t)&&n.current.setSortModel(e);}),[d.sortModel,n]);},Ca=(t,n)=>{const r=Qn("useVirtualColumns"),i=react.useRef(null),l=react.useRef(null),a=react.useRef(0),s=ao(n,Jt),c=ao(n,tn),u=ao(n,qt),d=react.useCallback((e=>{const t=s.positions;if(!c)return -1;let n=[...t].reverse().findIndex((t=>e>=t));return n=t.length-1-n,n}),[s.positions,c]),g=react.useCallback((e=>u.length?u[d(e)]:null),[d,u]),p=react.useCallback((e=>{if(!l.current)return !1;const t=l.current.windowSizes.width,n=g(a.current),r=g(a.current+t),o=u.findIndex((e=>e.field===(null==n?void 0:n.field)))+1,i=u.findIndex((e=>e.field===(null==r?void 0:r.field)))-1;return e>=o&&e<=i}),[g,u]),m=react.useCallback(((e,o)=>{var c,p,m,h;if(!e)return !1;l.current=e;const f=e.windowSizes.width;a.current=o,r.debug(`Columns from ${null===(c=g(o))||void 0===c?void 0:c.field} to ${null===(p=g(o+f))||void 0===p?void 0:p.field}`);const b=d(o),v=d(o+f),w=(null===(m=null==i?void 0:i.current)||void 0===m?void 0:m.firstColIdx)||0,C=(null===(h=null==i?void 0:i.current)||void 0===h?void 0:h.lastColIdx)||0,y=t.columnBuffer,S=y>1?y-1:y,O=Math.abs(b-S-w),M=Math.abs(v+S-C);r.debug(`Column buffer: ${y}, tolerance: ${S}`),r.debug(`Previous values  => first: ${w}, last: ${C}`),r.debug(`Current displayed values  => first: ${b}, last: ${v}`),r.debug(`Difference with first: ${O} and last: ${M} `);const x=u.length>0?u.length-1:0,j=b-y>=0?b-y:0,I={leftEmptyWidth:s.positions[j],rightEmptyWidth:0,firstColIdx:j,lastColIdx:v+y>=x?x:v+y};return n.current.state.scrollBar.hasScrollX?I.rightEmptyWidth=s.totalWidth-s.positions[I.lastColIdx]-u[I.lastColIdx].width:t.disableExtendRowFullWidth||(I.rightEmptyWidth=n.current.state.viewportSizes.width-s.totalWidth),Tt(I,i.current)?(r.debug("No rendering needed on columns"),!1):(i.current=I,r.debug("New columns state to render",I),!0)}),[r,g,d,t.columnBuffer,t.disableExtendRowFullWidth,u,s.positions,s.totalWidth,n]);er(n,{isColumnVisibleInWindow:p},"ColumnVirtualizationApi");const h=react.useCallback((()=>{r.debug("Clearing previous renderedColRef"),i.current=null;}),[r,i]);return Pi(n,"columnsUpdated",h),Pi(n,"resize",h),[i,m]},ya=(n,i,l,a,s)=>{const c=Qn("useNativeEventListener"),[u,d]=react.useState(!1),g=react.useRef(a),p=react.useCallback((e=>g.current&&g.current(e)),[]);react.useEffect((()=>{g.current=a;}),[a]),react.useEffect((()=>{let e;if(e=Nt(i)?i():i&&i.current?i.current:null,e&&p&&l&&!u){c.debug(`Binding native ${l} event`),e.addEventListener(l,p,s);const t=e;d(!0);const r=()=>{c.debug(`Clearing native ${l} event`),t.removeEventListener(l,p,s);};n.current.onUnmount(r);}}),[i,p,l,u,c,s,n]);};function Sa(n,r){const i=Qn("useScrollFn"),l=react.useRef(),a=react.useMemo((()=>debounce((()=>{null!=n.current&&(n.current.style.pointerEvents="unset");}),300)),[n]),s=react.useCallback((e=>{var t;e.left===(null===(t=l.current)||void 0===t?void 0:t.left)&&e.top===l.current.top||n&&n.current&&(i.debug(`Moving ${n.current.className} to: ${e.left}-${e.top}`),"none"!==n.current.style.pointerEvents&&(n.current.style.pointerEvents="none"),n.current.style.transform=`translate3d(-${e.left}px, -${e.top}px, 0)`,r.current.style.transform=`translate3d(-${e.left}px, 0, 0)`,a(),l.current=e);}),[n,i,r,a]);return react.useEffect((()=>()=>{a.clear();}),[n,a]),[s]}const Oa=(n,r,i,l)=>{var a;const s=Qn("useVirtualRows"),[c,u,d]=lo(l),g=ao(l,ei),p=ao(l,Yo),m=ao(l,Bl),h=ao(l,oi),f=ao(l,qt),b=ao(l,Jt),[v]=Sa(i,n),[w,C]=Ca(g,l),y=react.useCallback((e=>{let t=!1;return u((n=>{const r=Object.assign(Object.assign({},n.rendering),e);return Tt(n.rendering,r)?n:(t=!0,Object.assign(Object.assign({},n),{rendering:r}))})),t}),[u]),S=react.useCallback((e=>{if(null==l.current.state.containerSizes)return null;let t=0;g.pagination&&null!=m.pageSize&&"client"===m.paginationMode&&(t=m.pageSize*(m.page-1>0?m.page-1:0));const n=e*l.current.state.containerSizes.viewportPageSize+t;let r=n+l.current.state.containerSizes.renderingZonePageSize;const o=l.current.state.containerSizes.virtualRowsCount+t;r>o&&(r=o);return {page:e,firstRowIdx:n,lastRowIdx:r}}),[l,g.pagination,m.pageSize,m.paginationMode,m.page]),O=react.useCallback((()=>{if(null==l.current.state.containerSizes)return null;return Object.assign(Object.assign(Object.assign({},w.current),S(l.current.state.rendering.virtualPage)),{paginationCurrentPage:m.page,pageSize:m.pageSize})}),[w,S,l,m.page,m.pageSize]),M=react.useCallback((()=>{const e=O();y({renderContext:e,renderedSizes:l.current.state.containerSizes})&&(s.debug("reRender: trigger rendering"),d());}),[l,O,s,d,y]),x=react.useCallback(((e=!1)=>{const t=l.current.getState(),n=t.containerSizes;if(!r||!r.current||!n)return;const o=t.viewportSizes,i=t.scrollBar,{scrollLeft:a,scrollTop:c}=r.current;s.debug(`Handling scroll Left: ${a} Top: ${c}`);let u=C(n,a);const d=a;let g=c/o.height;const p=c%o.height;s.debug(` viewportHeight:${o.height}, rzScrollTop: ${p}, scrollTop: ${c}, current page = ${g}`);const h={left:i.hasScrollX?d:0,top:i.hasScrollY?p:0},f=t.rendering.virtualPage;g=Math.floor(g),f!==g?(y({virtualPage:g}),s.debug(`Changing page from ${f} to ${g}`),u=!0):(v(h),l.current.publishEvent("scrolling",h)),y({renderingZoneScroll:h});const b=t.rendering.renderContext&&t.rendering.renderContext.paginationCurrentPage!==m.page;(e||u||b)&&M();}),[l,s,m.page,M,v,y,C,r]),j=react.useCallback((e=>{let t;s.debug(`Scrolling to cell at row ${e.rowIndex}, col: ${e.colIndex} `);const n=l.current.isColumnVisibleInWindow(e.colIndex);if(s.debug(`Column ${e.colIndex} is ${n?"already":"not"} visible.`),!n){if(e.colIndex+1===b.positions.length){const n=f[e.colIndex].width;t=b.positions[e.colIndex]+n-c.containerSizes.windowSizes.width;}else t=b.positions[e.colIndex+1]-c.containerSizes.windowSizes.width+c.scrollBar.scrollBarSize.y,s.debug("Scrolling to the right, scrollLeft: "+t);c.rendering.renderingZoneScroll.left>t&&(t=b.positions[e.colIndex],s.debug("Scrolling to the left, scrollLeft: "+t));}let o;const i=(e.rowIndex-(c.pagination.page-1)*c.pagination.pageSize)/c.containerSizes.viewportPageSize*c.viewportSizes.height,a=c.viewportSizes.height,u=r.current.scrollTop>i,d=r.current.scrollTop+a<i+p;u?(o=i,s.debug("Row is above, setting scrollTop to "+o)):d&&(o=i-a+p,s.debug("Row is below, setting scrollTop to "+o));const g=!n||u||d;return g&&l.current.scroll({left:t,top:o}),g}),[s,l,c,r,p,b.positions,f]),I=react.useCallback((()=>{v({left:0,top:0}),y({virtualPage:1}),r&&r.current&&r.current.scrollTo(0,0),y({renderingZoneScroll:{left:0,top:0}});}),[v,y,r]),z=react.useRef(null),R=react.useCallback((()=>{r.current.scrollLeft<0||r.current.scrollTop<0||(z.current||u((e=>Object.assign(Object.assign({},e),{isScrolling:!0}))),clearTimeout(z.current),z.current=setTimeout((()=>{z.current=null,u((e=>Object.assign(Object.assign({},e),{isScrolling:!1}))),d();}),300),l.current.updateViewport&&l.current.updateViewport());}),[r,l,u,d]),_=react.useCallback((e=>{r.current&&null!=e.left&&n.current&&(n.current.scrollLeft=e.left,r.current.scrollLeft=e.left,s.debug("Scrolling left: "+e.left)),r.current&&null!=e.top&&(r.current.scrollTop=e.top,s.debug("Scrolling top: "+e.top)),s.debug("Scrolling, updating container, and viewport");}),[r,n,s]),D=react.useCallback((()=>c.containerSizes),[c.containerSizes]),F=react.useCallback((()=>c.rendering.renderContext||void 0),[c.rendering.renderContext]);Hl((()=>{i&&i.current&&(s.debug("applying scrollTop ",c.rendering.renderingZoneScroll.top),v(c.rendering.renderingZoneScroll));}));er(l,{scroll:_,scrollToIndexes:j,getContainerPropsState:D,getRenderContextState:F,updateViewport:x},"VirtualizationApi"),react.useEffect((()=>{var e;(null===(e=c.rendering.renderContext)||void 0===e?void 0:e.paginationCurrentPage)!==c.pagination.page&&l.current.updateViewport&&(s.debug(`State pagination.page changed to ${c.pagination.page}. `),l.current.updateViewport(!0),I());}),[l,c.pagination.page,null===(a=c.rendering.renderContext)||void 0===a?void 0:a.paginationCurrentPage,s,I]),react.useEffect((()=>{c.containerSizes!==c.rendering.renderedSizes&&l.current.updateViewport&&(s.debug("gridState.containerSizes updated, updating viewport. "),l.current.updateViewport(!0));}),[l,c.containerSizes,c.rendering.renderedSizes,s]),react.useEffect((()=>{l.current.updateViewport&&(s.debug(`totalRowCount has changed to ${h}, updating viewport.`),l.current.updateViewport(!0));}),[s,h,c.viewportSizes,c.scrollBar,c.containerSizes,l]),react.useEffect((()=>()=>{clearTimeout(z.current);}),[]);const P=react.useCallback((e=>(s.debug("Using keyboard to navigate cells, converting scroll events "),e.target.scrollLeft=0,e.target.scrollTop=0,e.preventDefault(),e.stopPropagation(),!1)),[s]);ya(l,r,"scroll",R,{passive:!0}),ya(l,(()=>{var e;return null===(e=i.current)||void 0===e?void 0:e.parentElement}),"scroll",P),Pi(l,"resize",x);};class Ma{constructor(){this.maxListeners=10,this.warnOnce=!1,this.events={};}on(e,t){Array.isArray(this.events[e])||(this.events[e]=[]),this.events[e].push(t),"production"!=="production";}removeListener(e,t){if(Array.isArray(this.events[e])){const n=this.events[e].indexOf(t);n>-1&&this.events[e].splice(n,1);}}removeAllListeners(e){e?Array.isArray(this.events[e])&&(this.events[e]=[]):this.events={};}emit(e,...t){if(Array.isArray(this.events[e])){const n=this.events[e].slice(),r=n.length;for(let e=0;e<r;e+=1)n[e].apply(this,t);}}once(e,t){const n=this;this.on(e,(function r(...o){n.removeListener(e,r),t.apply(n,o);}));}}function xa(n){const r=react.useRef(new Ma);return react.useEffect((()=>{(null==n?void 0:n.current)&&(n.current=r.current);})),r}let ja=!1;function Ia(){if(!ja){const e=document.createElement("div");e.style.touchAction="none",document.body.appendChild(e),ja="none"===window.getComputedStyle(e).touchAction,e.parentElement.removeChild(e);}return ja}function za(e,t){if(void 0!==t&&e.changedTouches){for(let n=0;n<e.changedTouches.length;n+=1){const r=e.changedTouches[n];if(r.identifier===t)return {x:r.clientX,y:r.clientY}}return !1}return {x:e.clientX,y:e.clientY}}const Ra=(n,r)=>{const i=Qn("useColumnResize"),l=react.useRef(),a=react.useRef(),s=react.useRef(),c=react.useRef(),u=react.useRef(),d=react.useRef(),g=n.current,p=e=>{i.debug(`Updating width to ${e} for col ${l.current.field}`),l.current.width=e,a.current.style.width=e+"px",a.current.style.minWidth=e+"px",a.current.style.maxWidth=e+"px",s.current.forEach((t=>{const n=t;n.style.width=e+"px",n.style.minWidth=e+"px",n.style.maxWidth=e+"px";}));},m=Nl((()=>{C(),r.current.updateColumn(l.current),clearTimeout(u.current),u.current=setTimeout((()=>{r.current.publishEvent("colResizing:stop");})),i.debug(`Updating col ${l.current.field} with new width: ${l.current.width}`);})),h=Nl((e=>{if(0===e.buttons)return void m();let t=c.current+e.clientX-a.current.getBoundingClientRect().left;t=Math.max(50,t),p(t);})),f=Nl((e=>{if(0!==e.button)return;if(!e.currentTarget.classList.contains("MuiDataGrid-columnSeparatorResizable"))return;e.preventDefault(),a.current=vo(e.currentTarget,"MuiDataGrid-colCell");const t=a.current.getAttribute("data-field"),n=r.current.getColumnFromField(t);i.debug("Start Resize on col "+n.field),r.current.publishEvent("colResizing:start",{field:t}),l.current=n,a.current=g.querySelector(`[data-field="${n.field}"]`),s.current=xo(a.current);const o=ownerDocument(r.current.rootElementRef.current);o.body.style.cursor="col-resize",c.current=l.current.width-(e.clientX-a.current.getBoundingClientRect().left),o.addEventListener("mousemove",h),o.addEventListener("mouseup",m);})),b=Nl((e=>{za(e,d.current)&&(C(),r.current.updateColumn(l.current),clearTimeout(u.current),u.current=setTimeout((()=>{r.current.publishEvent("colResizing:stop");})),i.debug(`Updating col ${l.current.field} with new width: ${l.current.width}`));})),v=Nl((e=>{const t=za(e,d.current);if(!t)return;if("mousemove"===e.type&&0===e.buttons)return void b(e);let n=c.current+t.x-a.current.getBoundingClientRect().left;n=Math.max(50,n),p(n);})),w=Nl((e=>{if(!vo(e.target,"MuiDataGrid-columnSeparatorResizable"))return;Ia()||e.preventDefault();const t=e.changedTouches[0];null!=t&&(d.current=t.identifier),a.current=vo(e.target,"MuiDataGrid-colCell");const n=Oo(a.current),o=r.current.getColumnFromField(n);i.debug("Start Resize on col "+o.field),r.current.publishEvent("colResizing:start",{field:n}),l.current=o,a.current=Mo(g,o.field),s.current=xo(a.current),c.current=l.current.width-(t.clientX-a.current.getBoundingClientRect().left);const u=ownerDocument(e.currentTarget);u.addEventListener("touchmove",v),u.addEventListener("touchend",b);})),C=react.useCallback((()=>{const e=ownerDocument(r.current.rootElementRef.current);e.body.style.removeProperty("cursor"),e.removeEventListener("mousemove",h),e.removeEventListener("mouseup",m),e.removeEventListener("touchmove",v),e.removeEventListener("touchend",b);}),[r,h,m,v,b]);react.useEffect((()=>(null==g||g.addEventListener("touchstart",w,{passive:Ia()}),()=>{null==g||g.removeEventListener("touchstart",w),clearTimeout(u.current),C();})),[g,w,C]),er(r,{startResizeOnMouseDown:f},"columnResizeApi");};const _a={OpenFilterButtonIcon:dr,ColumnFilteredIcon:gr,ColumnSelectorIcon:fr,ColumnMenuIcon:yr,ColumnSortedAscendingIcon:cr,ColumnSortedDescendingIcon:ur,ColumnResizeIcon:br,DensityCompactIcon:vr,DensityStandardIcon:wr,DensityComfortableIcon:Cr},Da=Object.assign(Object.assign({},_a),{ColumnMenu:bl,ColumnsPanel:Il,ErrorOverlay:function({message:e}){const t=react.useContext(Bo).current.getLocaleText("errorOverlayDefaultLabel");return react.createElement(Qo,null,e||t)},FilterPanel:El,Footer:Xl,Header:Yl,PreferencesPanel:Dl,LoadingOverlay:Kl,NoRowsOverlay:Zl,Pagination:Jl,Panel:Rl}),Fa=(e,t,n)=>{const r=react.useMemo((()=>{const t={ColumnFilteredIcon:e&&e.ColumnFilteredIcon||Da.ColumnFilteredIcon,ColumnMenuIcon:e&&e.ColumnMenuIcon||Da.ColumnMenuIcon,ColumnResizeIcon:e&&e.ColumnResizeIcon||Da.ColumnResizeIcon,ColumnSelectorIcon:e&&e.ColumnSelectorIcon||Da.ColumnSelectorIcon,ColumnSortedAscendingIcon:e&&e.ColumnSortedAscendingIcon||Da.ColumnSortedAscendingIcon,ColumnSortedDescendingIcon:e&&e.ColumnSortedDescendingIcon||Da.ColumnSortedDescendingIcon,DensityComfortableIcon:e&&e.DensityComfortableIcon||Da.DensityComfortableIcon,DensityCompactIcon:e&&e.DensityCompactIcon||Da.DensityCompactIcon,DensityStandardIcon:e&&e.DensityStandardIcon||Da.DensityStandardIcon,OpenFilterButtonIcon:e&&e.OpenFilterButtonIcon||Da.OpenFilterButtonIcon,ColumnMenu:e&&e.ColumnMenu||Da.ColumnMenu,ErrorOverlay:e&&e.ErrorOverlay||Da.ErrorOverlay,Footer:e&&e.Footer||Da.Footer,Header:e&&e.Header||Da.Header,Toolbar:e&&e.Toolbar,PreferencesPanel:e&&e.PreferencesPanel||Da.PreferencesPanel,LoadingOverlay:e&&e.LoadingOverlay||Da.LoadingOverlay,NoRowsOverlay:e&&e.NoRowsOverlay||Da.NoRowsOverlay,Pagination:e&&e.Pagination||Da.Pagination,FilterPanel:e&&e.FilterPanel||Da.FilterPanel,ColumnsPanel:e&&e.ColumnsPanel||Da.ColumnsPanel,Panel:e&&e.Panel||Da.Panel};return n.current.components=t,t}),[n,e]);return n.current.componentsProps=t,r};function Pa(e,n,i){const[l,a]=react.useState(!1),s=Qn("useApi"),c=react.useCallback(((e,...t)=>{i.current.emit(e,...t);}),[i]),u=react.useCallback(((e,t)=>{s.debug(`Binding ${e} event`),i.current.on(e,t);const n=i.current;return ()=>{s.debug(`Clearing ${e} event`),n.removeListener(e,t);}}),[i,s]),d=react.useCallback((e=>{c("componentError",e);}),[c]);return react.useEffect((()=>{s.debug("Initializing grid api."),i.current.isInitialised=!0,i.current.rootElementRef=e,i.current.columnHeadersElementRef=n,a(!0);const t=i.current;return ()=>{s.debug("Unmounting Grid component"),t.emit("unmount"),s.debug("Clearing all events listeners"),t.removeAllListeners();}}),[e,s,i,n]),er(i,{subscribeEvent:u,publishEvent:c,showError:d},"CoreApi"),l}const Ea=(n,r)=>{const i=Qn("useContainerProps"),[l,a,s]=lo(r),c=react.useRef({width:0,height:0}),u=ao(r,ei),d=ao(r,Yo),g=ao(r,nn),p=ao(r,Vi),m=ao(r,Bl),h=react.useCallback((()=>{i.debug("Calculating virtual row count.");const e=m.page;let t=u.pagination&&m.pageSize?m.pageSize:null;t=!t||e*t<=p?t:p-(e-1)*t;return null==t||t>p?p:t}),[i,u.pagination,m.page,m.pageSize,p]),f=react.useCallback((e=>{i.debug("Calculating scrollbar sizes.");const t=!u.autoPageSize&&!u.autoHeight&&c.current.height<e*d,n=g>c.current.width;return {hasScrollX:n,hasScrollY:t,scrollBarSize:{y:t?u.scrollbarSize:0,x:n?u.scrollbarSize:0}}}),[i,u.autoPageSize,u.autoHeight,u.scrollbarSize,d,g]),b=react.useCallback(((e,t)=>{if(!n.current)return null;i.debug("Calculating container sizes.");const r=n.current.getBoundingClientRect();c.current={width:r.width,height:r.height},i.debug(`window Size - W: ${c.current.width} H: ${c.current.height} `);return {width:c.current.width-t.scrollBarSize.y,height:u.autoHeight?e*d:c.current.height-t.scrollBarSize.x}}),[i,u.autoHeight,d,n]),v=react.useCallback(((e,t,r)=>{if(!n||!n.current||0===g||Number.isNaN(g))return null;let o=t.height/d;o=u.pagination?Math.floor(o):Math.round(o);const l=2*o,a=u.autoPageSize?1:Math.ceil(e/o);i.debug(`viewportPageSize:  ${o}, rzPageSize: ${l}, viewportMaxPage: ${a}`);const s=l*d+d+r.scrollBarSize.x,p=g-r.scrollBarSize.y;let m=(u.autoPageSize?1:e/o)*t.height+(r.hasScrollY?r.scrollBarSize.x:0);u.autoHeight&&(m=e*d+r.scrollBarSize.x);const h={virtualRowsCount:u.autoPageSize?o:e,renderingZonePageSize:l,viewportPageSize:o,totalSizes:{width:g,height:m||1},dataContainerSizes:{width:p,height:m||1},renderingZone:{width:p,height:s},windowSizes:c.current,lastPage:a};return i.debug("returning container props",h),h}),[n,g,d,u.pagination,u.autoPageSize,u.autoHeight,i]),w=react.useCallback(((e,t)=>{let n=!1;a((r=>(n=e(r),n?t(r):r))),n&&s();}),[s,a]),C=react.useCallback((()=>{i.debug("Refreshing container sizes");const e=h(),t=f(e),n=b(e,t);if(!n)return;w((e=>e.scrollBar!==t),(e=>Object.assign(Object.assign({},e),{scrollBar:t}))),w((e=>e.viewportSizes!==n),(e=>Object.assign(Object.assign({},e),{viewportSizes:n})));const r=v(e,n,t);w((e=>!Tt(e.containerSizes,r)),(e=>Object.assign(Object.assign({},e),{containerSizes:r})));}),[v,f,b,h,i,w]);react.useEffect((()=>{C();}),[l.columns,l.options.hideFooter,C,p]),Pi(r,"resize",C);};class Ta extends react.Component{static getDerivedStateFromError(e){return {hasError:!0,error:e}}componentDidCatch(e,t){this.props.api.current&&(this.logError(e),this.props.api.current.showError({error:e,errorInfo:t}));}logError(e,t){this.props.logger.error(`An unexpected error occurred. Error: ${e&&e.message}. `,e,t);}render(){var e;return this.props.hasError||(null===(e=this.state)||void 0===e?void 0:e.hasError)?this.props.render(this.props.componentProps||this.state):this.props.children}}function ka(e){return react.createElement("div",{className:"MuiDataGrid-main"},e.children)}function La(e,t){switch(t.type){case"options::UPDATE":return No(e,t.payload);default:throw new Error(`Material-UI: Action ${t.type} not found.`)}}const Aa=react.forwardRef((function(i,l){var a,s,c,d,g;const p=react.useRef(null),m=useForkRef(p,l),h=react.useRef(null),f=react.useRef(null),b=react.useRef(null),v=react.useRef(null),w=react.useRef(null),C=react.useRef(null),y=xa(i.apiRef),[S]=lo(y),M=function(e,n){const r=react.useMemo((()=>({pageSize:n.pageSize,logger:n.logger,sortingMode:n.sortingMode,filterMode:n.filterMode,autoHeight:n.autoHeight,autoPageSize:n.autoPageSize,checkboxSelection:n.checkboxSelection,columnBuffer:n.columnBuffer,columnTypes:n.columnTypes,disableSelectionOnClick:n.disableSelectionOnClick,disableMultipleColumnsSorting:n.disableMultipleColumnsSorting,disableMultipleSelection:n.disableMultipleSelection,disableMultipleColumnsFiltering:n.disableMultipleColumnsFiltering,disableColumnResize:n.disableColumnResize,disableDensitySelector:n.disableDensitySelector,disableColumnReorder:n.disableColumnReorder,disableColumnFilter:n.disableColumnFilter,disableColumnMenu:n.disableColumnMenu,disableColumnSelector:n.disableColumnSelector,disableExtendRowFullWidth:n.disableExtendRowFullWidth,headerHeight:n.headerHeight,hideFooter:n.hideFooter,hideFooterPagination:n.hideFooterPagination,hideFooterRowCount:n.hideFooterRowCount,hideFooterSelectedRowCount:n.hideFooterSelectedRowCount,showToolbar:n.showToolbar,logLevel:n.logLevel,onCellClick:n.onCellClick,onCellHover:n.onCellHover,onColumnHeaderClick:n.onColumnHeaderClick,onError:n.onError,onPageChange:n.onPageChange,onPageSizeChange:n.onPageSizeChange,onRowClick:n.onRowClick,onRowHover:n.onRowHover,onRowSelected:n.onRowSelected,onSelectionChange:n.onSelectionChange,onSortModelChange:n.onSortModelChange,onFilterModelChange:n.onFilterModelChange,onStateChange:n.onStateChange,page:n.page,pagination:n.pagination,paginationMode:n.paginationMode,rowCount:n.rowCount,rowHeight:n.rowHeight,rowsPerPageOptions:n.rowsPerPageOptions,scrollbarSize:n.scrollbarSize,showCellRightBorder:n.showCellRightBorder,showColumnRightBorder:n.showColumnRightBorder,sortingOrder:n.sortingOrder,sortModel:n.sortModel,density:n.density,filterModel:n.filterModel,localeText:Object.assign(Object.assign({},nr),n.localeText)})),[n.pageSize,n.logger,n.sortingMode,n.filterMode,n.autoHeight,n.autoPageSize,n.checkboxSelection,n.columnBuffer,n.columnTypes,n.disableSelectionOnClick,n.disableMultipleColumnsSorting,n.disableMultipleSelection,n.disableMultipleColumnsFiltering,n.disableColumnResize,n.disableDensitySelector,n.disableColumnReorder,n.disableColumnFilter,n.disableColumnMenu,n.disableColumnSelector,n.disableExtendRowFullWidth,n.headerHeight,n.hideFooter,n.hideFooterPagination,n.hideFooterRowCount,n.hideFooterSelectedRowCount,n.showToolbar,n.logLevel,n.onCellClick,n.onCellHover,n.onColumnHeaderClick,n.onError,n.onPageChange,n.onPageSizeChange,n.onRowClick,n.onRowHover,n.onRowSelected,n.onSelectionChange,n.onSortModelChange,n.onFilterModelChange,n.onStateChange,n.page,n.pagination,n.paginationMode,n.rowCount,n.rowHeight,n.rowsPerPageOptions,n.scrollbarSize,n.showCellRightBorder,n.showColumnRightBorder,n.sortingOrder,n.sortModel,n.density,n.filterModel,n.localeText]),{gridState:i,dispatch:l}=ca(e,"options",La,Object.assign({},Nr)),a=react.useCallback((e=>{l({type:"options::UPDATE",payload:e});}),[l]);return react.useEffect((()=>{a(r);}),[r,a]),i.options}(y,i);Jn(M.logger,M.logLevel);const x=Qn("GridComponent");Pa(p,v,y);const j=function(e,n){const[o,i]=react.useState(null),l=e=>{i(e);};return react.useEffect((()=>e.current.subscribeEvent("componentError",l)),[e]),react.useEffect((()=>{e.current.showError(n.error);}),[e,n.error]),o}(y,i);!function(n,r){var i;const l=react.useRef(!1),a=Qn("useEvents"),s=ao(r,ei),c=react.useCallback((e=>(...t)=>r.current.publishEvent(e,...t)),[r]),u=react.useCallback((e=>{if(null==e.target)throw new Error("Event target null - Target has been removed or component might already be unmounted.");const t=e.target,n={};if(Co(t)){const e=vo(t,"MuiDataGrid-cell"),o=vo(t,"MuiDataGrid-row");if(null==o)return null;const i=So(o),l=r.current.getRowFromId(i),a=r.current.getRowIndexFromId(i),s=e.getAttribute("data-field"),c=e.getAttribute("data-value"),u=r.current.getColumnFromField(s);if(!u||!u.disableClickEventBubbling){const t={data:l,rowIndex:a,colDef:u,rowModel:l,api:r.current};n.cell=Vo(Object.assign(Object.assign({},t),{element:e,value:c})),n.row=$o(Object.assign(Object.assign({},t),{element:o}));}}return n}),[r]),d=react.useCallback((e=>{const t=u(e);t&&(t.cell&&r.current.publishEvent("cellClick",t.cell),t.row&&r.current.publishEvent("rowClick",t.row));}),[r,u]),g=react.useCallback((e=>{const t=u(e);t&&(t.cell&&r.current.publishEvent("cellHover",t.cell),t.row&&r.current.publishEvent("rowHover",t.row),t.header&&r.current.publishEvent("columnHeaderHover",t.header));}),[r,u]),p=react.useCallback((e=>{r.current.publishEvent("focusout",e),null===e.relatedTarget&&r.current.publishEvent("gridFocusOut",e);}),[r]),m=react.useCallback((e=>r.current.subscribeEvent("unmount",e)),[r]),h=react.useCallback((e=>r.current.subscribeEvent("resize",e)),[r]),f=react.useCallback((()=>{l.current=!0;}),[]),b=react.useCallback((()=>{l.current=!1;}),[]),v=react.useCallback((()=>r.current.publishEvent("resize")),[r]);er(r,{resize:v,onUnmount:m,onResize:h},"EventsApi"),Pi(r,"colResizing:start",f),Pi(r,"colResizing:stop",b),Pi(r,"columnClick",s.onColumnHeaderClick),Pi(r,"cellClick",s.onCellClick),Pi(r,"rowClick",s.onRowClick),Pi(r,"cellHover",s.onCellHover),Pi(r,"rowHover",s.onRowHover),Pi(r,"componentError",s.onError),Pi(r,"stateChange",s.onStateChange),react.useEffect((()=>{var e;if(n&&n.current&&(null===(e=r.current)||void 0===e?void 0:e.isInitialised)){a.debug("Binding events listeners");const e=c("keydown"),t=c("keyup"),o=n.current;o.addEventListener("click",d,{capture:!0}),o.addEventListener("mouseover",g,{capture:!0}),o.addEventListener("focusout",p),o.addEventListener("keydown",e),o.addEventListener("keyup",t),r.current.isInitialised=!0;const i=r.current;return ()=>{a.debug("Clearing all events listeners"),i.publishEvent("unmount"),o.removeEventListener("click",d,{capture:!0}),o.removeEventListener("mouseover",g,{capture:!0}),o.removeEventListener("focusout",p),o.removeEventListener("keydown",e),o.removeEventListener("keyup",t),i.removeAllListeners();}}}),[n,null===(i=r.current)||void 0===i?void 0:i.isInitialised,c,a,d,g,p,r]);}(p,y),(e=>{const{localeText:t}=ao(e,ei);er(e,{getLocaleText:react.useCallback((e=>{if(null==t[e])throw new Error(`Missing translation for key ${e}.`);return t[e]}),[t])},"LocaleTextApi");})(y);const I=function(n){const r=Qn("useResizeContainer"),i=react.useRef(),l=react.useRef(),{autoHeight:a}=ao(n,ei),s=react.useCallback((e=>{clearTimeout(i.current),clearTimeout(l.current),0!==e.height||a||(i.current=setTimeout((()=>{r.warn(["The parent of the grid has an empty height.","You need to make sure the container has an intrinsic height.","The grid displays with a height of 0px.","","You can find a solution in the docs:","https://material-ui.com/components/data-grid/rendering/#layout"].join("\n"));}))),0===e.width&&(l.current=setTimeout((()=>{r.warn(["The parent of the grid has an empty width.","You need to make sure the container has an intrinsic width.","The grid displays with a width of 0px.","","You can find a solution in the docs:","https://material-ui.com/components/data-grid/rendering/#layout"].join("\n"));}))),r.info("resized...",e),n.current.resize();}),[r,n,a]);return react.useEffect((()=>()=>{clearTimeout(i.current),clearTimeout(l.current);}),[]),s}(y);sa(i.columns,y),ba(y,i.rows,i.getRowId),da(0,y),va(y),wa(y,i.rows),ra(y),pa(y),ua(y,i.rows),Ea(w,y),(e=>{const n=Qn("useDensity"),{density:r,rowHeight:i,headerHeight:l}=ao(e,ei),[,a,s]=lo(e),c=react.useCallback(((e,t,n)=>{switch(e){case Ar.Compact:return {value:e,headerHeight:Math.floor(.7*t),rowHeight:Math.floor(.7*n)};case Ar.Comfortable:return {value:e,headerHeight:Math.floor(1.3*t),rowHeight:Math.floor(1.3*n)};default:return {value:e,headerHeight:t,rowHeight:n}}}),[]),u=react.useCallback(((e,t=l,r=i)=>{n.debug("Set grid density to "+e),a((n=>Object.assign(Object.assign({},n),{density:Object.assign(Object.assign({},n.density),c(e,t,r))}))),s();}),[n,a,s,c,l,i]);react.useEffect((()=>{u(r,l,i);}),[u,r,i,l]),er(e,{setDensity:u},"DensityApi");})(y),Oa(b,w,C,y),ia(y),Ra(b,y),ga(y);const z=Fa(i.components,i.componentsProps,y);!function(e,n){const[,r,o]=lo(e),i=Qn("useStateProp");react.useEffect((()=>{null!=n&&e.current.state!==n&&(i.debug("Overriding state with props.state"),r((e=>Object.assign(Object.assign({},e),n))),o());}),[e,o,i,n,r]);}(y,i.state),function(e,t){const[n]=lo(e);if(null!=n.rendering.renderContext){const{page:e,firstColIdx:r,lastColIdx:o,firstRowIdx:i,lastRowIdx:l}=n.rendering.renderContext;t.info(`Rendering, page: ${e}, col: ${r}-${o}, row: ${i}-${l}`);}}(y,x);const R=_l(y),_=!i.loading&&0===S.rows.totalRowCount;return react.createElement(Bo.Provider,{value:y},react.createElement(NoSsr,null,react.createElement(Wo,{ref:m,className:i.className},react.createElement(Ta,{hasError:null!=j,componentProps:j,api:y,logger:x,render:e=>{var t;return react.createElement(ka,null,react.createElement(z.ErrorOverlay,Object.assign({},e,R,null===(t=i.componentsProps)||void 0===t?void 0:t.errorOverlay)))}},react.createElement("div",{ref:f},react.createElement(z.Header,Object.assign({},R,null===(a=i.componentsProps)||void 0===a?void 0:a.header))),react.createElement(ka,null,react.createElement(ml,{ContentComponent:z.ColumnMenu,contentComponentProps:Object.assign(Object.assign({},R),null===(s=i.componentsProps)||void 0===s?void 0:s.columnMenu)}),react.createElement(ea,{licenseStatus:i.licenseStatus}),react.createElement(Zo,{ref:v},react.createElement(sl,{ref:b})),_&&react.createElement(z.NoRowsOverlay,Object.assign({},R,null===(c=i.componentsProps)||void 0===c?void 0:c.noRowsOverlay)),i.loading&&react.createElement(z.LoadingOverlay,Object.assign({},R,null===(d=i.componentsProps)||void 0===d?void 0:d.loadingOverlay)),react.createElement($l,{onResize:I,nonce:i.nonce,disableHeight:i.autoHeight},(e=>react.createElement(ni,{ref:w,size:e},react.createElement(rl,{ref:C}))))),!S.options.hideFooter&&react.createElement("div",{ref:h},react.createElement(z.Footer,Object.assign({},R,null===(g=i.componentsProps)||void 0===g?void 0:g.footer)))))))})),Ga={disableColumnResize:!0,disableColumnReorder:!0,disableMultipleColumnsFiltering:!0,disableMultipleColumnsSorting:!0,disableMultipleSelection:!0,pagination:!0,apiRef:void 0},Na=react.forwardRef((function(e,t){const{className:r,pageSize:o}=e,i=Y(e,["className","pageSize"]);let l=o;return l&&l>100&&(l=100),react.createElement(Aa,Object.assign({ref:t,className:Ro("MuiDataGrid-root",r),pageSize:l},i,Ga,{licenseStatus:"Valid"}))}));Na.propTypes={apiRef:chainPropTypes(propTypes.any),columns:chainPropTypes(propTypes.any),disableColumnReorder:chainPropTypes(propTypes.bool),disableColumnResize:chainPropTypes(propTypes.bool),disableMultipleColumnsFiltering:chainPropTypes(propTypes.bool),disableMultipleColumnsSorting:chainPropTypes(propTypes.bool),disableMultipleSelection:chainPropTypes(propTypes.bool),pageSize:chainPropTypes(propTypes.number),pagination:e=>!1===e.pagination?new Error(["Material-UI: `<DataGrid pagination={false} />` is not a valid prop.","Infinite scrolling is not available in the MIT version.","","You need to upgrade to the XGrid component to disable the pagination."].join("\n")):null};const Ha=react.memo(Na);Ha.Naked=Na;

export { Ha as DataGrid };
