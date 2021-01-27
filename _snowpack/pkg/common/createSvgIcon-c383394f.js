import { c as createCommonjsModule } from './_commonjsHelpers-f5d70792.js';
import { a as capitalize, q as createSvgIcon$1 } from './createSvgIcon-a7ae7e83.js';
import { e as createChainedFunction, d as debounce, i as isMuiElement, o as ownerDocument, c as ownerWindow, s as setRef, f as useControlled, b as useEventCallback, u as useForkRef, a as useIsFocusVisible } from './useIsFocusVisible-4c435ae6.js';
import { u as useId } from './unstable_useId-cb546235.js';

function deprecatedPropType(validator, reason) {
  {
    return function () {
      return null;
    };
  }
}

function requirePropFactory(componentNameInError) {
  {
    return function () {
      return null;
    };
  }
}

function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  capitalize: capitalize,
  createChainedFunction: createChainedFunction,
  createSvgIcon: createSvgIcon$1,
  debounce: debounce,
  deprecatedPropType: deprecatedPropType,
  isMuiElement: isMuiElement,
  ownerDocument: ownerDocument,
  ownerWindow: ownerWindow,
  requirePropFactory: requirePropFactory,
  setRef: setRef,
  unsupportedProp: unsupportedProp,
  useControlled: useControlled,
  useEventCallback: useEventCallback,
  useForkRef: useForkRef,
  unstable_useId: useId,
  useIsFocusVisible: useIsFocusVisible
});

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

var interopRequireWildcard = createCommonjsModule(function (module) {
function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof_1(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;
});

var createSvgIcon = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return utils.createSvgIcon;
  }
});
});

export { createSvgIcon as c, interopRequireWildcard as i };
