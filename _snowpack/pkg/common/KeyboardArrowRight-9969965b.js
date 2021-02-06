import { _ as _extends } from './extends-7477639a.js';
import { A as makeStyles$1, j as defaultTheme, s as createSvgIcon } from './createSvgIcon-2c0a731f.js';
import { r as react } from './index-8f144fe1.js';

function createStyles(styles) {
  return styles;
}

// To remove in v5

function createStyles$1(styles) {
  // warning(
  //   warnOnce,
  //   [
  //     'Material-UI: createStyles from @material-ui/core/styles is deprecated.',
  //     'Please use @material-ui/styles/createStyles',
  //   ].join('\n'),
  // );
  // warnOnce = true;
  return createStyles(styles);
}

function makeStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return makeStyles$1(stylesOrCreator, _extends({
    defaultTheme: defaultTheme
  }, options));
}

/**
 * @ignore - internal component.
 */

var KeyboardArrowLeft = createSvgIcon( /*#__PURE__*/react.createElement("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}));

/**
 * @ignore - internal component.
 */

var KeyboardArrowRight = createSvgIcon( /*#__PURE__*/react.createElement("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}));

export { KeyboardArrowRight as K, KeyboardArrowLeft as a, createStyles$1 as c, makeStyles as m };
